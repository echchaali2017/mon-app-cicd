const { db } = require('./src/config/database');
const UserService = require('./src/services/UserService');

async function testComplet() {
  console.log('🚀 TEST COMPLET MONGODB + USER SERVICE');
  
  try {
    // Connexion
    await db.connect();
    console.log('1. ✅ MongoDB connecté');
    
    // Test service User
    console.log('2. Test UserService...');
    const user = await UserService.create({
      username: 'completetest',
      email: 'complete@example.com',
      password: 'complete123'
    });
    console.log('✅ Utilisateur créé:', user.username);
    
    // Recherche
    const found = await UserService.findByEmail('complete@example.com');
    console.log('✅ Utilisateur trouvé:', found.username);
    
    // Liste
    const users = await UserService.findAll();
    console.log('✅ Nombre total utilisateurs:', users.length);
    
    // Nettoyage
    await UserService.delete(found.id);
    console.log('✅ Utilisateur nettoyé');
    
    // Déconnexion
    await db.disconnect();
    console.log('🎉 TEST COMPLET RÉUSSI !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testComplet();
