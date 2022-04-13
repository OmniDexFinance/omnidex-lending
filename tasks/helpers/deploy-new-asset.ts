import { task } from 'hardhat/config';
import { eEthereumNetwork, eContractid } from '../../helpers/types';
import { loadPoolConfig, ConfigNames, getTreasuryAddress } from '../../helpers/configuration';
import * as marketConfigs from '../../markets/telos';
import * as reserveConfigs from '../../markets/telos/reservesConfigs';
import {
  getLendingPoolAddressesProvider,
  getLendingPoolConfiguratorProxy,
  getOTokensAndRatesHelper,
} from './../../helpers/contracts-getters';
import { deployDefaultReserveInterestRateStrategy } from './../../helpers/contracts-deployments';
import { setDRE } from '../../helpers/misc-utils';
import { ZERO_ADDRESS } from './../../helpers/constants';
import { BigNumberish } from 'ethers';
import { chunk, waitForTx, getOTokenExtraParams } from '../../helpers/misc-utils';
import { ICommonConfiguration } from '../../helpers/types';
import { getContractAddressWithJsonFallback } from '../../helpers/contracts-helpers';

const LENDING_POOL_ADDRESS_PROVIDER = {
  telos_mainnet: '0x64968B59Dd39128C287D76BE50015161d10C08C2',
  telos_testnet: '0x5205eCa2F42e9594955fBE4440312072201CEBe9',
};

const OTOKENS_AND_RATES_HELPER = {
  telos_mainnet: '0x210cA0ef4142E33e14E6904814F5A9c45e2DE078',
  telos_testnet: '0xE07bF5C7F83b2c00E1385eC0816fCeD022a8f3a6',
};

const isSymbolValid = (symbol: string, network: eEthereumNetwork) =>
  Object.keys(reserveConfigs).includes('strategy' + symbol) &&
  marketConfigs.TelosConfig.ReserveAssets[network][symbol] &&
  marketConfigs.TelosConfig.ReservesConfig[symbol] === reserveConfigs['strategy' + symbol];

task('external:deploy-new-asset', 'Deploy A token, Debt Tokens, Risk Parameters')
  .addParam('symbol', `Asset symbol, needs to have configuration ready`)
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify, symbol }, localBRE) => {
    const network = localBRE.network.name;
    if (!isSymbolValid(symbol, network as eEthereumNetwork)) {
      throw new Error(
        `
WRONG RESERVE ASSET SETUP:
        The symbol ${symbol} has no reserve Config and/or reserve Asset setup.
        update /markets/telos/index.ts and add the asset address for ${network} network
        update /markets/telos/reservesConfigs.ts and add parameters for ${symbol}
        `
      );
    }
    setDRE(localBRE);
    const strategyParams = reserveConfigs['strategy' + symbol];
    const reserveAssetAddress =
      marketConfigs.TelosConfig.ReserveAssets[localBRE.network.name][symbol];
    const addressProvider = await getLendingPoolAddressesProvider(
      LENDING_POOL_ADDRESS_PROVIDER[network]
    );
    const otokenAndRatesDeployer = await getOTokensAndRatesHelper(
      OTOKENS_AND_RATES_HELPER[network]
    );
    const rates = await deployDefaultReserveInterestRateStrategy(
      [
        addressProvider.address,
        strategyParams.strategy.optimalUtilizationRate,
        strategyParams.strategy.baseVariableBorrowRate,
        strategyParams.strategy.variableRateSlope1,
        strategyParams.strategy.variableRateSlope2,
        strategyParams.strategy.stableRateSlope1,
        strategyParams.strategy.stableRateSlope2,
      ],
      verify
    );

    let reserveSymbols: string[] = [];

    let initInputParams: {
      oTokenImpl: string;
      stableDebtTokenImpl: string;
      variableDebtTokenImpl: string;
      underlyingAssetDecimals: BigNumberish;
      interestRateStrategyAddress: string;
      underlyingAsset: string;
      treasury: string;
      incentivesController: string;
      underlyingAssetName: string;
      oTokenName: string;
      oTokenSymbol: string;
      variableDebtTokenName: string;
      variableDebtTokenSymbol: string;
      stableDebtTokenName: string;
      stableDebtTokenSymbol: string;
      params: string;
    }[] = [];

    const poolConfig = loadPoolConfig(ConfigNames.Telos);
    const {
      OTokenNamePrefix,
      StableDebtTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
    } = poolConfig as ICommonConfiguration;

    let treasuryAddress = await getTreasuryAddress(poolConfig);

    // Prepare input parameters
    reserveSymbols.push(symbol);
    initInputParams.push({
      oTokenImpl: await getContractAddressWithJsonFallback(
        strategyParams.oTokenImpl,
        ConfigNames.Telos
      ),
      stableDebtTokenImpl: await getContractAddressWithJsonFallback(
        eContractid.StableDebtToken,
        ConfigNames.Telos
      ),
      variableDebtTokenImpl: await getContractAddressWithJsonFallback(
        eContractid.VariableDebtToken,
        ConfigNames.Telos
      ),
      underlyingAssetDecimals: strategyParams.reserveDecimals,
      interestRateStrategyAddress: rates.address,
      underlyingAsset: reserveAssetAddress,
      treasury: treasuryAddress,
      incentivesController: ZERO_ADDRESS,
      underlyingAssetName: symbol,
      oTokenName: `${OTokenNamePrefix} ${symbol}`,
      oTokenSymbol: `o${SymbolPrefix}${symbol}`,
      variableDebtTokenName: `${VariableDebtTokenNamePrefix} ${SymbolPrefix}${symbol}`,
      variableDebtTokenSymbol: `variableDebt${SymbolPrefix}${symbol}`,
      stableDebtTokenName: `${StableDebtTokenNamePrefix} ${symbol}`,
      stableDebtTokenSymbol: `stableDebt${SymbolPrefix}${symbol}`,
      params: await getOTokenExtraParams(strategyParams.oTokenImpl, reserveAssetAddress),
    });

    const chunkedSymbols = chunk(reserveSymbols, 1);
    const chunkedInitInputParams = chunk(initInputParams, 1);

    const configurator = await getLendingPoolConfiguratorProxy();

    console.log(`- Reserves initialization in ${chunkedInitInputParams.length} txs`);
    for (let chunkIndex = 0; chunkIndex < chunkedInitInputParams.length; chunkIndex++) {
      const tx3 = await waitForTx(
        await configurator.batchInitReserve(chunkedInitInputParams[chunkIndex])
      );

      console.log(`  - Reserve ready for: ${chunkedSymbols[chunkIndex].join(', ')}`);
      console.log('    * gasUsed', tx3.gasUsed.toString());
    }

    const tokens: string[] = [];
    const configInputParams: {
      asset: string;
      baseLTV: BigNumberish;
      liquidationThreshold: BigNumberish;
      liquidationBonus: BigNumberish;
      reserveFactor: BigNumberish;
      stableBorrowingEnabled: boolean;
      borrowingEnabled: boolean;
    }[] = [];

    configInputParams.push({
      asset: reserveAssetAddress,
      baseLTV: strategyParams.baseLTVAsCollateral,
      liquidationThreshold: strategyParams.liquidationThreshold,
      liquidationBonus: strategyParams.liquidationBonus,
      reserveFactor: strategyParams.reserveFactor,
      stableBorrowingEnabled: strategyParams.stableBorrowRateEnabled,
      borrowingEnabled: strategyParams.borrowingEnabled,
    });

    tokens.push(reserveAssetAddress);

    // Set oTokenAndRatesDeployer as temporal admin
    const admin = await addressProvider.getPoolAdmin();
    await waitForTx(await addressProvider.setPoolAdmin(otokenAndRatesDeployer.address));

    // Deploy init per chunks
    const chunkedInputParams = chunk(configInputParams, 1);

    console.log(`- Configure reserves in ${chunkedInputParams.length} txs`);
    for (let chunkIndex = 0; chunkIndex < chunkedInputParams.length; chunkIndex++) {
      const tx4 = await waitForTx(
        await otokenAndRatesDeployer.configureReserves(chunkedInputParams[chunkIndex])
      );

      console.log(`  - Init for: ${chunkedSymbols[chunkIndex].join(', ')}`);
      console.log('    * gasUsed', tx4.gasUsed.toString());
    }

    // Set deployer back as admin
    await waitForTx(await addressProvider.setPoolAdmin(admin));
  });
