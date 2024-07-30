module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks: true,
    collectCoverageFrom: [
        '!<rootDir>/src/domain/',
        '<rootDir>/src//*.ts',
        '!<rootDir>/src/main/',
        '!<rootDir>/src//*-protocols.ts',
        '!<rootDir>/src//helpers/',
        '!/test/'
    ],
    testMatch: ['<rootDir>/test/*.test.ts'],
    setupFiles: ['<rootDir>/test/env_setup.js'],
    coverageDirectory: 'coverage',
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1'
    },
    transform: {
        '.+\\.ts$': 'ts-jest'
    }
}