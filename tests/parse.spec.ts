//code
import Parser from '../src/lib/parse';
import CurrentPriceService from '../src/services/CurrentPriceService';
//helpers
import { convertToStrings } from './helpers';

describe('Parser tests:', () => {
	describe('Price parsing', () => {
		const parser = new Parser();

		it('should calculate the prices if provided', async () => {
			const priceMap = {
				BTC: '3825.281112',
				ETH: '138.8911',
				DOGE: '0.00198422341298374987',
			};

			await parser.parseLine('3825.281112 138.8911 0.00198422341298374987', 0);

			expect(convertToStrings(parser.prices)).toEqual(priceMap);
		});

		it('should calcuate the live prices if CURRENT', async () => {
			const priceMap = {
				BTC: '1',
				ETH: '2',
				DOGE: '3',
			};
			const mockGetCurrentPrices = jest.fn().mockResolvedValue(priceMap);
			CurrentPriceService.getCurrentPrices = mockGetCurrentPrices;

			await parser.parseLine('CURRENT', 0);

			expect(convertToStrings(parser.prices)).toEqual(priceMap);
		});
	});

	describe('Sale amount', () => {
		const parser = new Parser();
		beforeEach(async () => {
			await parser.parseLine('3825.281112 138.8911 0.00198422341298374987', 0);
		});

		it('should calculate the correct number of SALE tokens that can be bought using ETH', async () => {
			const expectedAmount = '5.250';
			const consoleSpy = jest.spyOn(console, 'log');

			await parser.parseLine('1.5 3 ETH 3.5', 1);

			expect(consoleSpy).toHaveBeenCalledWith(expectedAmount);
		});

		it('should calculate the correct number of SALE tokens that can be bought using BTC', async () => {
			const expectedAmount = '144.593';
			const consoleSpy = jest.spyOn(console, 'log');

			await parser.parseLine('1.5 3 BTC 3.5', 3);

			expect(consoleSpy).toHaveBeenCalledWith(expectedAmount);
		});

		it('should calculate the correct number of SALE tokens that can be bought using DOGE', async () => {
			const expectedAmount = '0.00007';
			const consoleSpy = jest.spyOn(console, 'log');

			await parser.parseLine('1.5 5 DOGE 3.5', 9);

			expect(consoleSpy).toHaveBeenCalledWith(expectedAmount);
		});
	});
});
