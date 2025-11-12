const App = require('./src/app');

async function debug() {
  console.log('🔧 DEBUG - Démarrage de l\'application...');
  
  const app = new App();
  
  // Vérification des routes AVANT démarrage
  console.log('📋 Routes configurées:');
  const routes = app.app._router.stack
    .filter(layer => layer.route)
    .map(layer => {
      return {
        path: layer.route.path,
        methods: Object.keys(layer.route.methods)
      };
    });
  
  console.log('Routes trouvées:', routes.length);
  routes.forEach(route => {
    console.log(`  ${route.methods.join(',')} ${route.path}`);
  });
  
  // Démarrage
  await app.start();
  
  console.log('✅ Application démarrée');
  console.log('🌐 Testez: curl http://192.168.1.99:3000/api/v1/users');
}

debug().catch(console.error);
