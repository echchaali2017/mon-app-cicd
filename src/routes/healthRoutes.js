const express = require('express');
const router = express.Router();
const { getHealth, getReady } = require('../controllers/healthController');

router.get('/health', getHealth);
router.get('/ready', getReady);

module.exports = router;
