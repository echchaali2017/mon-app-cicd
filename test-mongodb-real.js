const { db } = require('./src/config/database');
const UserService = require('./src/services/UserService');

async function testMongoDBReal() {
  console.log('🧪 TEST MONGODB RÉEL AVEC CRÉATION UTILISATEUR');
  
  try {
    // Connexion
    await db.connect();
    console.log('1. ✅ MongoDB connecté');
    
    // Nettoyage préalable
    const existingUser = await UserService.findByEmail('realuser@example.com');
    if (existingUser) {
      await UserService.delete(existingUser.id);
      console.log('🗑️  Ancien utilisateur nettoyé');
    }
    
    // Création utilisateur réel
    console.log('2. Création utilisateur réel...');
    const user = await UserService.create({
      username: 'realuser',
      email: 'realuser@example.com',
      password: 'realpassword123',
      role: 'user',
      profile: {
        firstName: 'John',
        lastName: 'Doe'
      }
    });
    console.log('✅ Utilisateur créé dans MongoDB:');
    console.log('   ID:', user.id);
    console.log('   Username:', user.username);
    console.log('   Email:', user.email);
    console.log('   Role:', user.role);
    
    // Vérification dans la base
    console.log('3. Vérification en base...');
    const found = await UserService.findByEmail('realuser@example.com');
    console.log('✅ Utilisateur trouvé en base:');
    console.log('   ID:', found.id);
    console.log('   Username:', found.username);
    
    // Liste tous les utilisateurs
    console.log('4. Liste complète des utilisateurs...');
    const allUsers = await UserService.findAll();
    console.log('📊 Utilisateurs en base:', allUsers.length);
    allUsers.forEach(u => console.log(`   - ${u.username} (${u.email}) - ID: ${u.id}`));
    
    // Test de comptage
    const count = await UserService.count();
    console.log('5. Nombre total d utilisateurs:', count);
    
    console.log('🎉 MONGODB RÉEL FONCTIONNE PARFAITEMENT !');
    
    // Vérification dans MongoDB directement
    console.log('6. Vérification directe MongoDB...');
    const User = require('./src/models/User');
    const dbUsers = await User.find({});
    console.log('📋 Documents dans collection users:', dbUsers.length);
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await db.disconnect();
  }
}

testMongoDBReal();
