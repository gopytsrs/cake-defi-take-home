//libs
import BigNumber from 'bignumber.js';

export interface CoinGeckoPriceData {
	[coin: string]: { usd: number };
}

export interface PriceData {
	[coin: string]: BigNumber;
}
