const { Database } = require('./src/config/database');

async function testConnection() {
  const db = new Database();
  
  try {
    console.log('🔗 Test de connexion MongoDB...');
    await db.connect();
    
    console.log('✅ Connexion réussie!');
    console.log('📊 Statut:', db.getStatus());
    
    // Test simple avec le modèle User
    const User = require('./src/models/User');
    const testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'test123'
    });
    
    await testUser.save();
    console.log('✅ Utilisateur de test créé');
    
    await testUser.deleteOne();
    console.log('✅ Utilisateur de test supprimé');
    
    await db.disconnect();
    console.log('✅ Déconnexion réussie');
    
  } catch (error) {
    console.error('❌ Erreur de test:', error);
  }
}

testConnection();
