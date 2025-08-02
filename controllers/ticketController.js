const Ticket = require('../models/Ticket');
const sendMail = require('../utils/emailService');

exports.createTicket = async (req, res) => {
  const { subject, description, category } = req.body;
  const attachment = req.files?.file?.name || '';
  const ticket = new Ticket({ subject, description, category, attachment, user: req.user.id });
  await ticket.save();
  sendMail('Ticket Created', `Your ticket "${subject}" is submitted.`);
  res.status(201).json(ticket);
};

exports.getTickets = async (req, res) => {
  const query = { ...req.query };
  if (req.user.role === 'user') query.user = req.user.id;
  const tickets = await Ticket.find(query).sort('-createdAt').populate('user agent');
  res.json(tickets);
};

exports.updateTicket = async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  sendMail('Ticket Updated', `Ticket status changed to ${ticket.status}`);
  res.json(ticket);
};

exports.commentTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  ticket.comments.push({ user: req.user.id, message: req.body.message });
  await ticket.save();
  res.json(ticket);
};

exports.voteTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  ticket.votes += req.body.vote; // +1 or -1
  await ticket.save();
  res.json(ticket);
};