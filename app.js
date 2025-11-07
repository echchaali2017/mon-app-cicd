const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.get('/', (req, res) => {
  res.json({
    message: '🚀 Bonjour depuis notre application CI/CD!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    hostname: process.env.HOSTNAME || 'local'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    host: 'ubuntu-app-cicd (192.168.1.99)'
  });
});

app.listen(PORT, HOST, () => {
  console.log(`✅ Serveur démarré sur ${HOST}:${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🌐 URL réseau: http://192.168.1.99:${PORT}`);
});
