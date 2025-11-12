module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
  ],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20
    }
  },
  maxWorkers: 1,
  testTimeout: 30000,
  verbose: true,
  testMatch: [
    '**/test/ci-pipeline.test.js'
  ]
};
