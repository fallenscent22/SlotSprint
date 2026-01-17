const express = require('express');
const { getSports } = require('../controllers/sportsController');

const router = express.Router();

router.get('/', getSports);

module.exports = router;