module.exports = (name, resetLink) => `
  <h2>Hello ${name},</h2>
  <p>Click below to reset your password:</p>
  <a href="${resetLink}">Reset Password</a>
`;
