import type { Config } from 'jest';

const config: Config = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	collectCoverageFrom: ['src/lib/*.{ts,tsx}', '!src/**/*.d.ts'],
};

export default config;
