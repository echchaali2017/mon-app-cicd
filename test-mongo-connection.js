const { db } = require('./src/config/database');

async function test() {
  try {
    console.log('1. Test connexion MongoDB...');
    await db.connect();
    console.log('2. ✅ MongoDB connecté');
    
    const status = db.getStatus();
    console.log('3. Statut:', status);
    
    console.log('4. Test modèle User...');
    const User = require('./src/models/User');
    console.log('5. ✅ Modèle chargé');
    
    await db.disconnect();
    console.log('6. ✅ Déconnecté');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error('Stack:', error.stack);
  }
}

test();
