//config
import { coinGeckoApiParams as params, coinGeckoApiUrl } from './config';
//lib
import axios from 'axios';
import BigNumber from 'bignumber.js';
//types
import { CoinGeckoPriceData, PriceData } from './types';

const getCurrentPrices = async () => {
	const coinMap: { [key: string]: string } = { bitcoin: 'BTC', ethereum: 'ETH', dogecoin: 'DOGE' };
	const response = await axios.get(coinGeckoApiUrl, { params });
	const coinGeckoPrices: CoinGeckoPriceData = await response.data;
	const prices: PriceData = Object.entries(coinGeckoPrices).reduce(
		(prices, [coin, currencies]) => ({
			[coinMap[coin]]: new BigNumber(currencies.usd),
			...prices,
		}),
		{}
	);
	return prices;
};

export default { getCurrentPrices };
