const jwt = require('jsonwebtoken');
const config = require('../config/index');

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.JWTSecret, { expiresIn: '1d' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, config.JWTSecret);
};
