const mongoose = require('mongoose');

const databaseConfig = {
  url: process.env.MONGODB_URI || 'mongodb://app_user:app_password123@localhost:27017/mon-app-cicd?authSource=mon-app-cicd',
  
  testUrl: 'mongodb://localhost:27017/test-mon-app-cicd',
  
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    bufferCommands: false,
    bufferMaxEntries: 0
  },
  
  collections: {
    users: 'users',
    metrics: 'metrics',
    logs: 'logs',
    sessions: 'sessions'
  }
};

class Database {
  constructor() {
    this.mongoose = mongoose;
    this.isConnected = false;
  }

  async connect() {
    try {
      const url = process.env.NODE_ENV === 'test' ? databaseConfig.testUrl : databaseConfig.url;
      
      await this.mongoose.connect(url, databaseConfig.options);
      this.isConnected = true;
      console.log('✅ MongoDB connecté avec succès');
      console.log(`📊 Base de données: ${this.mongoose.connection.name}`);
      
    } catch (error) {
      console.error('❌ Erreur de connexion MongoDB:', error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.mongoose.connection.close();
      this.isConnected = false;
      console.log('✅ MongoDB déconnecté');
    } catch (error) {
      console.error('❌ Erreur de déconnexion MongoDB:', error);
      throw error;
    }
  }

  getStatus() {
    return {
      connected: this.isConnected,
      readyState: this.mongoose.connection.readyState,
      host: this.mongoose.connection.host,
      name: this.mongoose.connection.name
    };
  }
}

// Connexion automatique au démarrage
const db = new Database();

// Gestion propre de la déconnexion
process.on('SIGINT', async () => {
  await db.disconnect();
  process.exit(0);
});

module.exports = { Database, databaseConfig, db };
