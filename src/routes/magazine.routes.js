const express = require('express');
const {
  getMagazinesWithPlans,
  createMagazine,
} = require('../controllers/magazine.controller');

const router = express.Router();
router.post('/create-magazine', createMagazine);

router.get('/magazines', getMagazinesWithPlans);
// router.get('/plans', getPlans);

module.exports = router;
