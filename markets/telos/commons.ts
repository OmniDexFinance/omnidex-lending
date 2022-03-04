import BigNumber from 'bignumber.js';
import {
  oneEther,
  oneRay,
  RAY,
  ZERO_ADDRESS,
  MOCK_CHAINLINK_AGGREGATORS_PRICES,
  oneUsd,
} from '../../helpers/constants';
import { ICommonConfiguration, eTelosNetwork } from '../../helpers/types';

// ----------------
// PROTOCOL GLOBAL PARAMS
// ----------------

export const CommonsConfig: ICommonConfiguration = {
  MarketId: 'Commons',
  OTokenNamePrefix: 'OmniDex Telos Market',
  StableDebtTokenNamePrefix: 'OmniDex Telos Market stable debt',
  VariableDebtTokenNamePrefix: 'OmniDex Telos Market variable debt',
  SymbolPrefix: 'o',
  ProviderId: 0, // Overriden in index.ts
  OracleQuoteCurrency: 'USD',
  OracleQuoteUnit: oneUsd.toString(),
  ProtocolGlobalParams: {
    TokenDistributorPercentageBase: '10000',
    MockUsdPriceInWei: '5848466240000000',
    UsdAddress: '0x10F7Fc1F91Ba351f9C629c5947AD69bD03C05b96', // TODO: what is this?
    NilAddress: '0x0000000000000000000000000000000000000000',
    OneAddress: '0x0000000000000000000000000000000000000001',
    OmniDexReferral: '0',
  },

  // ----------------
  // COMMON PROTOCOL PARAMS ACROSS POOLS AND NETWORKS
  // ----------------

  Mocks: {
    AllAssetsInitialPrices: {
      ...MOCK_CHAINLINK_AGGREGATORS_PRICES,
    },
  },
  // TODO: reorg alphabetically, checking the reason of tests failing
  LendingRateOracleRatesCommon: {
    WETH: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    USDC: {
      borrowRate: oneRay.multipliedBy(0.039).toFixed(),
    },
    USDT: {
      borrowRate: oneRay.multipliedBy(0.035).toFixed(),
    },
    KARMA: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    WBTC: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    WAVAX: {
      borrowRate: oneRay.multipliedBy(0.05).toFixed(), // TODO: fix borrowRate?
    },
    WTLOS: {
      borrowRate: oneRay.multipliedBy(0.05).toFixed(), // TODO: fix borrowRate?
    },
  },
  // ----------------
  // COMMON PROTOCOL ADDRESSES ACROSS POOLS
  // ----------------

  // If PoolAdmin/emergencyAdmin is set, will take priority over PoolAdminIndex/emergencyAdminIndex
  PoolAdmin: {
    [eTelosNetwork.telos_mainnet]: undefined,
    [eTelosNetwork.telos_testnet]: undefined,
  },
  PoolAdminIndex: 0,
  EmergencyAdminIndex: 0,
  EmergencyAdmin: {
    [eTelosNetwork.telos_mainnet]: undefined,
    [eTelosNetwork.telos_testnet]: undefined,
  },
  ProviderRegistry: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0x41844918A23f1c304853D75d6326988E36C29864',
  },
  ProviderRegistryOwner: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0x365212Ecc6715A561C1ec128FCc3AEd9DBF3c404',
  },
  LendingRateOracle: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0x2A222B96DF993B3e350D6B5C29a471CEa2b7E2f3',
  },
  LendingPoolCollateralManager: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0x787e94C92c0232bD6b42DD3eE9239b5C9A03874A',
  },
  LendingPoolConfigurator: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0x48debce7ba11231Db28883E52487BBd19073753B',
  },
  LendingPool: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0x6f7FdE6BFC2EE69A8E92575Fe49ea65433BDe2C0',
  },
  WethGateway: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0xBDDbA7497B040c2FCa5F87eaF56e173FC63D4474',
  },
  TokenDistributor: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '',
  },
  OmniDexOracle: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0x62b10debDaD0a6d19480e0F254511E1C7c200123',
  },
  FallbackOracle: {
    [eTelosNetwork.telos_mainnet]: ZERO_ADDRESS,
    [eTelosNetwork.telos_testnet]: '0xED6b3b9D352Ad02f1685fB8Db9a35EC541de609b',
  },
  ChainlinkAggregator: {
    [eTelosNetwork.telos_mainnet]: {
      WETH: ZERO_ADDRESS,
      USDT: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      KARMA: ZERO_ADDRESS,
      WBTC: ZERO_ADDRESS,
      WAVAX: ZERO_ADDRESS,
      WTLOS: ZERO_ADDRESS,
      USD: ZERO_ADDRESS,
    },
    [eTelosNetwork.telos_testnet]: {
      WETH: ZERO_ADDRESS,
      USDT: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      KARMA: ZERO_ADDRESS,
      WBTC: ZERO_ADDRESS,
      WAVAX: ZERO_ADDRESS,
      WTLOS: ZERO_ADDRESS,
      USD: ZERO_ADDRESS,
    },
  },
  ReserveAssets: {
    [eTelosNetwork.telos_mainnet]: {},
    [eTelosNetwork.telos_testnet]: {},
  },
  ReservesConfig: {},
  OTokenDomainSeparator: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '',
  },
  WETH: {
    [eTelosNetwork.telos_mainnet]: ZERO_ADDRESS,
    [eTelosNetwork.telos_testnet]: ZERO_ADDRESS,
  },
  WrappedNativeToken: {
    [eTelosNetwork.telos_mainnet]: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E', // Official WTLOS
    [eTelosNetwork.telos_testnet]: '0xaE85Bf723A9e74d6c663dd226996AC1b8d075AA9', // Official WTLOS
  },
  ReserveFactorTreasuryAddress: {
    [eTelosNetwork.telos_mainnet]: '0x365212Ecc6715A561C1ec128FCc3AEd9DBF3c404',
    [eTelosNetwork.telos_testnet]: '0x365212Ecc6715A561C1ec128FCc3AEd9DBF3c404', // Self-controlled EOA for testing
  },
  IncentivesController: {
    [eTelosNetwork.telos_mainnet]: ZERO_ADDRESS,
    [eTelosNetwork.telos_testnet]: ZERO_ADDRESS,
  },
};
