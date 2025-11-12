const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

// GET /api/v1/users - Récupérer tous les utilisateurs depuis MongoDB
router.get('/', async (req, res) => {
  try {
    const users = await UserService.findAll();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des utilisateurs'
    });
  }
});

// GET /api/v1/users/:id - Récupérer un utilisateur par ID depuis MongoDB
router.get('/:id', async (req, res) => {
  try {
    const user = await UserService.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération de l utilisateur'
    });
  }
});

// POST /api/v1/users - Créer un nouvel utilisateur dans MongoDB
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Tous les champs sont requis'
      });
    }

    const existingUser = await UserService.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Un utilisateur avec cet email existe déjà'
      });
    }

    const user = await UserService.create({
      username,
      email,
      password,
      role: 'user',
      isActive: true
    });

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création de l utilisateur'
    });
  }
});

// PUT /api/v1/users/:id - Mettre à jour un utilisateur dans MongoDB
router.put('/:id', async (req, res) => {
  try {
    const user = await UserService.update(req.params.id, req.body);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la mise à jour de l utilisateur'
    });
  }
});

// DELETE /api/v1/users/:id - Supprimer un utilisateur de MongoDB
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await UserService.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Utilisateur supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la suppression de l utilisateur'
    });
  }
});

module.exports = router;
