const { Database } = require('./src/config/database');

async function testMongoDB() {
  console.log('🧪 Test connexion MongoDB...');
  
  const db = new Database();
  
  try {
    // Connexion
    await db.connect();
    console.log('✅ Connexion MongoDB réussie');
    
    // Statut
    const status = db.getStatus();
    console.log('📊 Statut MongoDB:', status);
    
    // Test avec le modèle User
    const User = require('./src/models/User');
    console.log('✅ Modèle User chargé');
    
    // Test création utilisateur
    console.log('📝 Test création utilisateur...');
    const testUser = new User({
      username: 'mongouser',
      email: 'mongo@example.com',
      password: 'mongopassword123'
    });
    
    const savedUser = await testUser.save();
    console.log('✅ Utilisateur créé:', savedUser.username);
    
    // Test recherche
    console.log('🔍 Test recherche utilisateur...');
    const foundUser = await User.findOne({ email: 'mongo@example.com' });
    console.log('✅ Utilisateur trouvé:', foundUser.username);
    
    // Nettoyage
    console.log('🧹 Nettoyage...');
    await User.deleteOne({ email: 'mongo@example.com' });
    console.log('✅ Utilisateur test supprimé');
    
    // Déconnexion
    await db.disconnect();
    console.log('✅ Déconnexion réussie');
    console.log('🎉 TEST MONGODB RÉUSSI !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testMongoDB();
