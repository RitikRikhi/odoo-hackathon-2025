const router = require('express').Router();
const auth = require('../middleware/auth');
const { createTicket, getTickets, updateTicket, commentTicket, voteTicket } = require('../controllers/ticketController');

router.post('/', auth, createTicket);
router.get('/', auth, getTickets);
router.put('/:id', auth, updateTicket);
router.post('/:id/comment', auth, commentTicket);
router.post('/:id/vote', auth, voteTicket);
module.exports = router;