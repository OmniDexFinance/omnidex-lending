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
  },
  ReserveAssets: {
    [eTelosNetwork.telos_mainnet]: {
      WETH: '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab',
      USDT: '0xc7198437980c041c805a1edcba50c1ce5db95118',
      USDC: '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
      KARMA: '0x63a72806098bd3d9520cc43356dd78afe5d386d9',
      WBTC: '0x50b7545627a5162f82a992c33b87adc75187b218',
      WAVAX: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      WTLOS: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    },
    [eTelosNetwork.telos_testnet]: {
      WETH: '0xC2F29fe79a438735186001d6416383C97712cB78', // MintableERC20 token
      USDT: '0x6D4b73084e0B74908B9B4a8EE1FAE178a59f778B', // MintableERC20 token
      USDC: '0x9B102eC3677E74E66123b778D509581dC87f5F4e', // MintableERC20 token
      KARMA: '0x0A54DC84B497c25A314A997B4Bb8b09bcaF31Abd',
      WTLOS: '0xaE85Bf723A9e74d6c663dd226996AC1b8d075AA9',
    },
  },
};

export default TelosConfig;