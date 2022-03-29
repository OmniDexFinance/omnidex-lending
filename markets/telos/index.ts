import { eTelosNetwork, ITelosConfiguration } from '../../helpers/types';

import { CommonsConfig } from './commons';
import {
  strategyWETH,
  strategyUSDC,
  strategyUSDT,
  strategyKARMA,
  strategyWBTC,
  strategyWAVAX,
  strategyWTLOS,
  strategyWBNB,
  strategyWMATIC,
  strategyWFTM,
} from './reservesConfigs';

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const TelosConfig: ITelosConfiguration = {
  ...CommonsConfig,
  MarketId: 'Telos Market',
  ProviderId: 7,
  ReservesConfig: {
    WETH: strategyWETH,
    USDT: strategyUSDT,
    USDC: strategyUSDC,
    KARMA: strategyKARMA,
    WBTC: strategyWBTC,
    WAVAX: strategyWAVAX,
    WTLOS: strategyWTLOS,
    WBNB: strategyWBNB,
    WMATIC: strategyWMATIC,
    WFTM: strategyWFTM,
  },
  ReserveAssets: {
    [eTelosNetwork.telos_mainnet]: {
      WETH: '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
      USDT: '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
      USDC: '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b',
      KARMA: '0x730d2Fa7dC7642E041bcE231E85b39e9bF4a6a64',
      WBTC: '0xf390830df829cf22c53c8840554b98eafc5dcbc2',
      WAVAX: '0x7c598c96d02398d89fbcb9d41eab3df0c16f227d',
      WTLOS: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
    },
    [eTelosNetwork.telos_testnet]: {
      WETH: '0xC2F29fe79a438735186001d6416383C97712cB78', // MintableERC20 token
      USDT: '0x5e70fe707B7ac9bb9B809853F2d8EDE3d478556A', // MintableERC20 token
      USDC: '0xca69f2E8f3614C2011AcAA47d1516CFA36fa540F', // MintableERC20 token
      KARMA: '0x0A54DC84B497c25A314A997B4Bb8b09bcaF31Abd',
      WTLOS: '0xaE85Bf723A9e74d6c663dd226996AC1b8d075AA9',
      WBNB: '0x56A76233ca1aDc23eECb503E59Ae6E83887a9ABa', // MintableERC20 token
      WBTC: '0xA23D982c76d0cc99D5497060E8122953b2B20c88', // MintableERC20 token
      WFTM: '0xA4F1FfA5187Eb1B61c97FA34B871E8C46A6325F0', // MintableERC20 token
      WMATIC: '0xE0DbA1F5aB9ec3e53D7d59859E9a53D6FB251D0a', // MintableERC20 token
    },
  },
};

export default TelosConfig;