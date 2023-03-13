const coinGeckoApiUrl = 'https://api.coingecko.com/api/v3/simple/price';
const coinGeckoApiParams = {
	ids: 'bitcoin,ethereum,dogecoin',
	vs_currencies: 'usd',
	precision: 'full',
};
const coins = ['BTC', 'ETH', 'DOGE'];

export { coinGeckoApiParams, coinGeckoApiUrl, coins };
