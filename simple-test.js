const mongoose = require('mongoose');

async function test() {
  console.log('1. Connexion à MongoDB...');
  
  try {
    await mongoose.connect('mongodb://app_user:app_password123@localhost:27017/mon-app-cicd?authSource=mon-app-cicd', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('2. ✅ Connecté à MongoDB');
    console.log('3. Base de données:', mongoose.connection.name);
    
    // Test simple
    const result = await mongoose.connection.db.admin().ping();
    console.log('4. ✅ Ping MongoDB:', result);
    
    await mongoose.connection.close();
    console.log('5. ✅ Déconnexion réussie');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

test();
