module.exports = (name, verifyLink) => `
  <h2>Hi ${name},</h2>
  <p>Click below to verify your email:</p>
  <a href="${verifyLink}">Verify Email</a>
`;
