const App = require('./src/app');

async function start() {
  try {
    console.log('🚀 Démarrage application...');
    const app = new App();
    await app.start();
    console.log('✅ Application démarrée avec succès');
    
    // Garder en vie
    process.on('SIGINT', async () => {
      await app.stop();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Erreur démarrage:', error);
    process.exit(1);
  }
}

start();
