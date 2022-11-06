/* eslint-disable canonical/filename-match-exported */
import type { Config } from 'jest';

const config: Config = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '\\.(component-)?test\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: ['src/main.ts', 'src/app.module.ts'],
    testEnvironment: 'node',
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
        },
    },
};

export default config;
