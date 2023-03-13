import { PriceData } from '../src/types';

const convertToStrings = (prices: PriceData) => {
	return Object.entries(prices).reduce((fixedPrices, [coin, price]) => ({ ...fixedPrices, [coin]: price.toString() }), {});
};

export { convertToStrings };
