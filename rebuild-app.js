const fs = require('fs');

const appContent = `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config/config');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const healthRoutes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes');
const appRoutes = require('./routes/appRoutes');
const { db } = require('./config/database');

class App {
  constructor() {
    this.app = express();
    this.server = null;
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(helmet());
    this.app.use(cors());
    
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100
    });
    this.app.use(limiter);

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use((req, res, next) => {
      const timestamp = new Date().toISOString();
      if (process.env.NODE_ENV !== 'test') {
        console.log(\`\${timestamp} - \${req.method} \${req.url} - IP: \${req.ip}\`);
      }
      next();
    });

    this.app.use(logger);
  }

  setupRoutes() {
    this.app.use(config.api.prefix, appRoutes);
    this.app.use(config.api.prefix + '/users', userRoutes);
    this.app.use(config.api.prefix + '/health', healthRoutes);

    this.app.get('/', (req, res) => {
      res.redirect(config.api.prefix);
    });

    this.app.use('*', (req, res) => {
      res.status(404).json({
        error: 'Route not found',
        message: \`The route \${req.originalUrl} does not exist\`,
        availableRoutes: [
          \`\${config.api.prefix}/\`,
          \`\${config.api.prefix}/users\`,
          \`\${config.api.prefix}/health\`
        ]
      });
    });

    this.app.use(errorHandler);
  }

  async start() {
    try {
      await db.connect();
      
      this.server = this.app.listen(config.app.port, '0.0.0.0', () => {
        if (process.env.NODE_ENV !== 'test') {
          console.log('🚀 ============================================================');
          console.log(\`✅ \${config.app.name} avec MongoDB démarrée!\`);
          console.log(\`📡 Port: \${config.app.port}\`);
          console.log(\`🌐 Environnement: \${config.app.environment}\`);
          console.log(\`🗃️  MongoDB: Connecté\`);
          console.log(\`🔧 API: http://0.0.0.0:\${config.app.port}\${config.api.prefix}/\`);
          console.log(\`👥 Users: http://0.0.0.0:\${config.app.port}\${config.api.prefix}/users\`);
          console.log(\`❤️  Health: http://0.0.0.0:\${config.app.port}\${config.api.prefix}/health\`);
          console.log('🚀 ============================================================');
        }
      });
      return this.server;
    } catch (error) {
      console.error('❌ Erreur démarrage:', error);
      throw error;
    }
  }

  async stop() {
    if (this.server) {
      await db.disconnect();
      this.server.close();
    }
  }

  getApp() {
    return this.app;
  }

  getServer() {
    return this.server;
  }
}

module.exports = App;`;

fs.writeFileSync('src/app.js', appContent);
console.log('✅ app.js reconstruit avec succès');
