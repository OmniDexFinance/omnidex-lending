import { eContractid, IReserveParams } from '../../helpers/types';

import { rateStrategyStableOne, rateStrategyVolatileOne } from './rateStrategies';

export const strategyWTLOS: IReserveParams = {
  strategy: rateStrategyVolatileOne,
  baseLTVAsCollateral: '5000',
  liquidationThreshold: '6500',
  liquidationBonus: '11000',
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: '18',
  oTokenImpl: eContractid.OToken,
  reserveFactor: '750',
};

export const strategyWAVAX: IReserveParams = {
  strategy: rateStrategyVolatileOne,
  baseLTVAsCollateral: '5000',
  liquidationThreshold: '6500',
  liquidationBonus: '11000',
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: '18',
  oTokenImpl: eContractid.OToken,
  reserveFactor: '750',
};

export const strategyWBNB: IReserveParams = {
  strategy: rateStrategyVolatileOne,
  baseLTVAsCollateral: '5000',
  liquidationThreshold: '6500',
  liquidationBonus: '11000',
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: '18',
  oTokenImpl: eContractid.OToken,
  reserveFactor: '750',
};

export const strategyWMATIC: IReserveParams = {
  strategy: rateStrategyVolatileOne,
  baseLTVAsCollateral: '5000',
  liquidationThreshold: '6500',
  liquidationBonus: '11000',
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: '18',
  oTokenImpl: eContractid.OToken,
  reserveFactor: '750',
};

export const strategyWFTM: IReserveParams = {
  strategy: rateStrategyVolatileOne,
  baseLTVAsCollateral: '2500',
  liquidationThreshold: '5000',
  liquidationBonus: '11500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: '18',
  oTokenImpl: eContractid.OToken,
  reserveFactor: '750',
};

export const strategyWETH: IReserveParams = {
  strategy: rateStrategyVolatileOne,
  baseLTVAsCollateral: '8000',
  liquidationThreshold: '8250',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: '18',
  oTokenImpl: eContractid.OToken,
  reserveFactor: '500',
};

export const strategyWBTC: IReserveParams = {
  strategy: rateStrategyVolatileOne,
  baseLTVAsCollateral: '6000',
  liquidationThreshold: '7500',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: '8',
  oTokenImpl: eContractid.OToken,
  reserveFactor: '500',
};

export const strategyKARMA: IReserveParams = {
  strategy: rateStrategyVolatileOne,
  baseLTVAsCollateral: '2500',
  liquidationThreshold: '5000',
  liquidationBonus: '11500',
  borrowingEnabled: false,
  stableBorrowRateEnabled: false,
  reserveDecimals: '18',
  oTokenImpl: eContractid.OToken,
  reserveFactor: '1000',
};

export const strategyUSDT: IReserveParams = {
  strategy: rateStrategyStableOne,
  baseLTVAsCollateral: '0',
  liquidationThreshold: '0',
  liquidationBonus: '0',
  borrowingEnabled: true,
  stableBorrowRateEnabled: true,
  reserveDecimals: '6',
  oTokenImpl: eContractid.OToken,
  reserveFactor: '500',
};

export const strategyUSDC: IReserveParams = {
  strategy: rateStrategyStableOne,
  baseLTVAsCollateral: '7500',
  liquidationThreshold: '8000',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: true,
  reserveDecimals: '6',
  oTokenImpl: eContractid.OToken,
  reserveFactor: '500',
};
