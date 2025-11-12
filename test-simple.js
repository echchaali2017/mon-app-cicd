const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur simple fonctionne!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Serveur simple démarré sur le port', PORT);
  console.log('📍 Testez: curl http://192.168.1.99:3000/test');
});
