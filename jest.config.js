module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
  },
  testEnvironment: 'jsdom',
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(t|j)sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  moduleNameMapper: {
    '~/lib/(.*)': ['<rootDir>/lib/$1'],
    '~/data/(.*)': ['<rootDir>/_data/$1']
  }
}
