const express = require('express');
const router = express.Router();
const {
  subscribe,
  getUserSubscriptions,
  cancelSubscription,
  updateSubscription ,
} = require('../controllers/subscription.controller');

router.post('/subscribe', subscribe);
router.get('/:user_id', getUserSubscriptions);
router.post('/cancel/:subscription_id', cancelSubscription);
router.put('/update/:subscription_id', updateSubscription );
module.exports = router;
