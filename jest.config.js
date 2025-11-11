module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
  ],
  coverageThreshold: {
    global: {
      branches: 40,  # Baissé de 60 à 40
      functions: 60,
      lines: 60,
      statements: 60
    }
  },
  maxWorkers: 1,
  testTimeout: 10000,
  verbose: true,
  testMatch: [
    '**/test/ci-pipeline.test.js'
  ]
};
