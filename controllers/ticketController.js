const sendEmail = require('../utils/sendEmail');
const ticketTemplate = require('../templates/ticketTemplate');

exports.createTicket = async (req, res) => {
  const { subject, description } = req.body;
  const ticket = await Ticket.create({ subject, description, user: req.user._id });

  const user = await User.findById(req.user._id);
  await sendEmail({
    to: user.email,
    subject: 'Ticket Created ✅',
    html: ticketTemplate(subject, user.name),
  });

  res.status(201).json(ticket);
};
