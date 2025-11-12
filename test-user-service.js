const UserService = require('./src/services/UserService');

async function testUserService() {
  console.log('🧪 Test UserService avec MongoDB...');
  
  try {
    // Test création
    console.log('1. Création utilisateur...');
    const user = await UserService.create({
      username: 'testservice',
      email: 'service@example.com',
      password: 'service123',
      role: 'user'
    });
    console.log('✅ Utilisateur créé:', user.username);
    
    // Test recherche
    console.log('2. Recherche par email...');
    const found = await UserService.findByEmail('service@example.com');
    console.log('✅ Utilisateur trouvé:', found.username);
    
    // Test liste
    console.log('3. Liste utilisateurs...');
    const users = await UserService.findAll();
    console.log('✅ Nombre d utilisateurs:', users.length);
    
    // Nettoyage
    console.log('4. Nettoyage...');
    await UserService.delete(found.id);
    console.log('✅ Utilisateur supprimé');
    
    console.log('🎉 UserService MongoDB fonctionne !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testUserService();
