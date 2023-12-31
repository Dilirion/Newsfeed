/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@features(.*)$': '<rootDir>/src/features$1',
    '^@app(.*)$': '<rootDir>/src/app$1',
    '^@images(.*)$': '<rootDir>/src/images$1',
    '^.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
