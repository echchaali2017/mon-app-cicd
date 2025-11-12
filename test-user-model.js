const mongoose = require('mongoose');

async function testUserModel() {
  console.log('🧪 Test modèle User...');
  
  try {
    // Connexion
    await mongoose.connect('mongodb://app_user:app_password123@localhost:27017/mon-app-cicd?authSource=mon-app-cicd', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ Connecté à MongoDB');
    
    // Test modèle
    const User = require('./src/models/User');
    console.log('✅ Modèle User chargé');
    
    // Test création
    const testUser = new User({
      username: 'testmodel',
      email: 'model@example.com',
      password: 'model123'
    });
    
    const savedUser = await testUser.save();
    console.log('✅ Utilisateur créé:', savedUser.username);
    
    // Nettoyage
    await User.deleteOne({ email: 'model@example.com' });
    console.log('✅ Utilisateur supprimé');
    
    await mongoose.connection.close();
    console.log('🎉 Modèle User fonctionne !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testUserModel();
