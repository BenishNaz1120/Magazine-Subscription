require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4002,
  dbUrl: process.env.MONGO_URI,

  JWTSecret: process.env.JWT_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
};
