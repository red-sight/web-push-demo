/* eslint-disable no-undef */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  globals: {
    'ts-jest': {
      tsconfig: `tsconfig.base.json`,
    },
  },
  projects: [
    {
      preset: 'ts-jest',
      testMatch: [
        '<rootDir>/apps/*/src/**/*.spec.ts',
        '<rootDir>/packages/*/src/**/*.spec.ts',
      ],
    },
  ],
};
