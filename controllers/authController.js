const crypto = require('crypto');
const Token = require('../models/Token');
const sendEmail = require('../utils/sendEmail');
const welcomeTemplate = require('../templates/welcomeTemplate');
const resetPasswordTemplate = require('../templates/resetPasswordTemplate');
const verifyEmailTemplate = require('../templates/verifyEmailTemplate');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });

  await sendEmail({
    to: email,
    subject: 'Welcome to QuickDesk 🎉',
    html: welcomeTemplate(name),
  });

  const verifyToken = crypto.randomBytes(32).toString('hex');
  await Token.create({ userId: user._id, token: verifyToken });

  const verifyLink = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`;
  await sendEmail({
    to: email,
    subject: 'Verify Your Email',
    html: verifyEmailTemplate(name, verifyLink),
  });

  res.status(201).json({ message: 'User registered. Verification email sent.' });
};

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const resetToken = crypto.randomBytes(32).toString('hex');
  await Token.create({ userId: user._id, token: resetToken });

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  await sendEmail({
    to: email,
    subject: 'Reset Your Password',
    html: resetPasswordTemplate(user.name, resetLink),
  });

  res.status(200).json({ message: 'Password reset email sent.' });
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  const tokenDoc = await Token.findOne({ token });
  if (!tokenDoc) return res.status(400).json({ message: 'Invalid or expired token' });

  const user = await User.findById(tokenDoc.userId);
  user.isVerified = true;
  await user.save();
  await tokenDoc.deleteOne();

  res.status(200).json({ message: 'Email verified successfully.' });
};
