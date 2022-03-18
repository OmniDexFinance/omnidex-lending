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
  SymbolPrefix: '',
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
    [eTelosNetwork.telos_testnet]: '0x2a93677B0cD0c661C95258D660BFFBDFE7e82e3c',
  },
  ProviderRegistryOwner: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0x365212Ecc6715A561C1ec128FCc3AEd9DBF3c404',
  },
  LendingRateOracle: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0xcCE91b7656ae0Bd43bF9c5D4DBf1B0064f037383',
  },
  LendingPoolCollateralManager: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0x8a3e482a4575FD00c6222873992dE1f82B9b8791',
  },
  LendingPoolConfigurator: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0xfa50D90aC1de87d3A6F3cc4605058F71aD272Ba1',
  },
  LendingPool: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0x27aa06D0c9B48adce4B449763441602D03f49F88',
  },
  WethGateway: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0x66094EEb44f328Ce79083C5233847813f43544BC',
  },
  TokenDistributor: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '',
  },
  OmniDexOracle: {
    [eTelosNetwork.telos_mainnet]: '',
    [eTelosNetwork.telos_testnet]: '0xB95b6C20E28C0Cd9E4C0B1628EB3E9c48d674AEe',
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
