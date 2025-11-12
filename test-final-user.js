const mongoose = require('mongoose');

async function test() {
  try {
    console.log('1. Connexion MongoDB...');
    await mongoose.connect('mongodb://app_user:app_password123@localhost:27017/mon-app-cicd?authSource=mon-app-cicd', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('2. Chargement modèle...');
    const User = require('./src/models/User');
    
    console.log('3. Création utilisateur...');
    const user = new User({
      username: 'finaltest',
      email: 'final@example.com',
      password: 'final123'
    });
    
    const saved = await user.save();
    console.log('✅ Utilisateur créé:', saved.username);
    
    console.log('4. Recherche...');
    const found = await User.findOne({ email: 'final@example.com' });
    console.log('✅ Utilisateur trouvé:', found.username);
    
    console.log('5. Nettoyage...');
    await User.deleteOne({ email: 'final@example.com' });
    console.log('✅ Nettoyé');
    
    await mongoose.connection.close();
    console.log('🎉 MODÈLE USER FONCTIONNE !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

test();
