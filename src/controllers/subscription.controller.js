const subscriptionService = require('../services/subscription.service');

// Subscribe to a magazine
exports.subscribe = async (req, res) => {
  try {
    const { user_id, magazine_id, plan_id } = req.body;
    const subscription = await subscriptionService.subscribe(
      user_id,
      magazine_id,
      plan_id
    );
    res.status(201).json({ message: 'Subscription successful', subscription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Retrieve all subscriptions for a user
exports.getUserSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getActiveSubscriptions(
      req.params.user_id
    );
    res.json(subscriptions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Update a subscription like change plan
exports.updateSubscription = async (req, res) => {
    try {
      const { subscription_id } = req.params;
      const { plan_id } = req.body;
  
      const updatedSubscription = await subscriptionService.updateSubscription(subscription_id, plan_id);
  
      res.json({ message: 'Subscription updated successfully', updatedSubscription });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  //Delete a sunscription like cancel
exports.cancelSubscription = async (req, res) => {
  try {
    const result = await subscriptionService.cancelSubscription(
      req.params.subscription_id
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
