module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 40,
      lines: 40,
      statements: 40
    }
  },
  maxWorkers: 1,
  testTimeout: 30000,
  verbose: true,
  testMatch: [
    '**/test/ci-pipeline.test.js'
  ]
};
