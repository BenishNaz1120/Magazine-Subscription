const authService = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const response = await authService.registerUser(
      req.body.name,
      req.body.email,
      req.body.password
    );
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const response = await authService.loginUser(
      req.body.email,
      req.body.password
    );
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await authService.requestPasswordReset(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const response = await authService.resetPassword(token, newPassword);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
