const mongoose = require('mongoose');

async function test() {
  try {
    console.log('1. Test connexion MongoDB...');
    await mongoose.connect('mongodb://app_user:app_password123@localhost:27017/mon-app-cicd?authSource=mon-app-cicd', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('2. ✅ Connecté à MongoDB');
    console.log('3. Base:', mongoose.connection.name);
    
    const result = await mongoose.connection.db.admin().ping();
    console.log('4. ✅ Ping:', result);
    
    await mongoose.connection.close();
    console.log('5. ✅ Déconnecté');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

test();
