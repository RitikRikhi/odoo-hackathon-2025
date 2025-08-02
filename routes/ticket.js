const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, ticketController.createTicket);

module.exports = router;
