module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/src/mocks/styleMock.js',
    '^.+\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/mocks/fileMock.js',
  },
  setupTestFrameworkScriptFile: './src/setupTests.ts',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
}
