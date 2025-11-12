module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
  ],
  // Pas de seuil de couverture pour CI - on veut juste que les tests passent
  testTimeout: 15000,
  verbose: true,
  testMatch: [
    '**/test/ci-pipeline.test.js'
  ],
  // Désactive les logs pendant les tests
  silent: true
};
