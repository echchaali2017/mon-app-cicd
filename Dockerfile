# Utilise une image de base officielle Node.js
FROM node:18-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie les fichiers de définition des dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install --production

# Copie le code source de l'application
COPY . .

# Expose le port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
