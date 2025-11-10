const logger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
      userAgent: req.get('User-Agent') || 'Unknown'
    });
  });
  
  next();
};

module.exports = logger;
