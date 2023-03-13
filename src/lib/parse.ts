//config
import { coins } from '../config';
//libs
import BigNumber from 'bignumber.js';
//services
import CurrentPriceService from '../services/CurrentPriceService';
//types
import { PriceData } from '../types';

class Parser {
	prices: PriceData;
	constructor() {
		this.prices = {};
	}

	/**
	 * Parses and returns the prices (not current/live)
	 *
	 * @param {string} line
	 * @returns {PriceData}
	 */
	_parsePrices(line: string): PriceData {
		const prices: PriceData = line
			.split(' ')
			.map((price) => new BigNumber(price))
			.reduce((prices, price, i) => ({ [coins[i]]: price, ...prices }), {});
		return prices;
	}

	/**
	 * Parses and returns the prices
	 *
	 * @param {string} line
	 * @returns {PriceData}
	 */
	async _getPrices(line: string): Promise<PriceData> {
		if (line !== 'CURRENT') {
			return this._parsePrices(line);
		} else {
			const prices = await CurrentPriceService.getCurrentPrices();
			return prices;
		}
	}

	/**
	 * Returns the amount of sale tokens that can be bought as a string
	 *
	 * @param {string} line
	 * @returns {Promise<string>}
	 */
	async getSaleTokens(line: string): Promise<string> {
		// Parse each standalone case
		const parts = line.split(' ');
		const ethSaleRate = new BigNumber(parts[0]);
		const saleDecimalPlaces = parseInt(parts[1]);
		const baseToken = parts[2];
		const baseTokenPurchaseAmount = new BigNumber(parts[3]);

		// Sale token price always calculated by ETH price
		const saleTokenPrice = this.prices['ETH'].dividedBy(ethSaleRate);
		// Total amount of baseToken that we currently have
		const baseTokenTotalAmount = baseTokenPurchaseAmount.multipliedBy(this.prices[baseToken]);
		const saleTokenPurchaseAmount = baseTokenTotalAmount.dividedBy(saleTokenPrice).toFixed(saleDecimalPlaces, BigNumber.ROUND_DOWN);

		return saleTokenPurchaseAmount;
	}

	/**
	 * Parses a line input and outputs a result to console, either calculates the price, or the amount of
	 * sale token that can be purchased.
	 * @param {string}line
	 * @param {index} index
	 */
	async parseLine(line: string, index: number) {
		if (!index) {
			// For the first line, we get the price data
			const prices = await this._getPrices(line);
			this.prices = prices;
		} else {
			const saleTokenPurchaseAmount = await this.getSaleTokens(line);
			console.log(saleTokenPurchaseAmount);
		}
	}
}

export default Parser;
