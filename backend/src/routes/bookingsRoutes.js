const express = require('express');
const { bookSlot } = require('../controllers/bookingsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, bookSlot);

module.exports = router;