const getHealth = (req, res) => {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  };

  res.json(health);
};

const getReady = (req, res) => {
  // Ici vous pourriez vérifier la connexion à la base de données, etc.
  res.json({
    status: 'READY',
    timestamp: new Date().toISOString(),
    services: {
      database: 'connected', // simulé
      cache: 'connected'     // simulé
    }
  });
};

module.exports = {
  getHealth,
  getReady
};
