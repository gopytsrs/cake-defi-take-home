import readline from 'readline';
import Parser from './lib/parse';

const readLines = async () => {
	const rl = readline.createInterface({
		input: process.stdin,
		crlfDelay: Infinity,
	});
	const lines = [];
	for await (const line of rl) {
		lines.push(line);
	}

	return lines;
};

const main = async () => {
	const lines = await readLines();
	const parser = new Parser();
	for (const [index, line] of lines.entries()) {
		await parser.parseLine(line, index);
	}
};

main();
