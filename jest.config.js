module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePaths: ['src'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/src/mocks/styleMock.js',
    '^.+\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/src/mocks/fileMock.js',
    '^actions(.*)$': '<rootDir>/src/newtab/actions$1',
    '^modals(.*)$': '<rootDir>/src/newtab/components/ui/modals$1',
    '^components(.*)$': '<rootDir>/src/newtab/components$1',
    '^constants(.*)$': '<rootDir>/src/newtab/constants$1',
    '^containers(.*)$': '<rootDir>/src/newtab/containers$1',
    '^models(.*)$': '<rootDir>/src/newtab/models$1',
    '^reducers(.*)$': '<rootDir>/src/newtab/reducers$1',
    '^resources(.*)$': '<rootDir>/src/newtab/resources$1',
    '^selectors(.*)$': '<rootDir>/src/newtab/selectors$1',
    '^store(.*)$': '<rootDir>/src/newtab/store$1',
    '^styles(.*)$': '<rootDir>/src/newtab/styles$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
}
