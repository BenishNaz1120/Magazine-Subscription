const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtUtil = require('../utils/jwt.util');
const emailService = require('./email.service');

exports.registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('Email already exists');

  const user = new User({ name, email, password });
  await user.save();
  return { message: 'User registered successfully', user };
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return { token: jwtUtil.generateToken(user._id) };
};

exports.requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  // Generate a reset token valid for 15 minutes
  const resetToken = jwtUtil.generateToken(user._id, '15m');

  // Send email with reset token
  const subject = 'Password Reset Request';
  const text = `Use the following token to reset your password: ${resetToken}`;
  await emailService.sendEmail(email, subject, text);

  return { message: 'Password reset token sent to email' };
};

exports.resetPassword = async (token, newPassword) => {
  const decoded = jwtUtil.verifyToken(token);
  const user = await User.findById(decoded.id);
  if (!user) throw new Error('Invalid or expired token');

  // Directly assign new password (it will be hashed in the pre-save hook)
  user.password = newPassword;
  await user.save(); // This will trigger the hashing in the User model

  return { message: 'Password reset successful' };
};
