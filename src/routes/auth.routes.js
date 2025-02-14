const express = require('express');
const {
  register,
  login,
  requestPasswordReset,
  resetPassword,
} = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const {
  registerSchema,
  loginSchema,
} = require('../validations/auth.validation');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

module.exports = router;
