db = db.getSiblingDB('mon-app-cicd');

// Création d'un utilisateur pour l'application
db.createUser({
  user: 'app_user',
  pwd: 'app_password123',
  roles: [
    {
      role: 'readWrite',
      db: 'mon-app-cicd'
    }
  ]
});

// Création des collections initiales
db.createCollection('users');
db.createCollection('metrics');
db.createCollection('logs');
db.createCollection('sessions');

// Index pour la collection users
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });

print('✅ Base de données MongoDB initialisée avec succès');
