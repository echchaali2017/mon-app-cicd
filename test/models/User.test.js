const mongoose = require('mongoose');
const User = require('../../src/models/User');

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test-mon-app-cicd', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('Création d\\'utilisateur', () => {
    it('devrait créer un utilisateur valide', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.username).toBe(userData.username);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.role).toBe('user');
      expect(savedUser.isActive).toBe(true);
    });

    it('ne devrait pas créer un utilisateur avec email dupliqué', async () => {
      const userData = {
        username: 'user1',
        email: 'duplicate@example.com',
        password: 'password123'
      };

      await new User(userData).save();
      
      const duplicateUser = new User({
        username: 'user2',
        email: 'duplicate@example.com',
        password: 'password456'
      });

      await expect(duplicateUser.save()).rejects.toThrow();
    });
  });

  describe('Validation des champs', () => {
    it('devrait rejeter un email invalide', async () => {
      const user = new User({
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123'
      });

      await expect(user.save()).rejects.toThrow();
    });

    it('devrait rejeter un username trop court', async () => {
      const user = new User({
        username: 'ab',
        email: 'test@example.com',
        password: 'password123'
      });

      await expect(user.save()).rejects.toThrow();
    });
  });
});
