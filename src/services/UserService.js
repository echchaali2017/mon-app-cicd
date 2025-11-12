const User = require('../models/User');

class UserService {
  
  async create(userData) {
    try {
      const user = new User(userData);
      const savedUser = await user.save();
      return savedUser.toJSON();
    } catch (error) {
      throw new Error(`Erreur création utilisateur: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const user = await User.findById(id);
      return user ? user.toJSON() : null;
    } catch (error) {
      throw new Error(`Erreur recherche utilisateur: ${error.message}`);
    }
  }

  async findByEmail(email) {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      return user ? user.toJSON() : null;
    } catch (error) {
      throw new Error(`Erreur recherche par email: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const users = await User.find({});
      return users.map(user => user.toJSON());
    } catch (error) {
      throw new Error(`Erreur récupération utilisateurs: ${error.message}`);
    }
  }

  async update(id, updates) {
    try {
      const user = await User.findByIdAndUpdate(
        id, 
        { ...updates, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      return user ? user.toJSON() : null;
    } catch (error) {
      throw new Error(`Erreur mise à jour utilisateur: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const result = await User.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      throw new Error(`Erreur suppression utilisateur: ${error.message}`);
    }
  }

  async count() {
    try {
      return await User.countDocuments();
    } catch (error) {
      throw new Error(`Erreur comptage utilisateurs: ${error.message}`);
    }
  }
}

module.exports = new UserService();
