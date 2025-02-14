const Subscription = require('../models/Subscription.model');
const Magazine = require('../models/Magazine.model');
const Plan = require('../models/Plan.model');

// Helper function to calculate the price after discount
const calculatePrice = (base_price, discount) => base_price * (1 - discount);

// Create or modify a subscription
exports.subscribe = async (user_id, magazine_id, plan_id) => {
  const magazine = await Magazine.findById(magazine_id);
  const plan = await Plan.findById(plan_id);

  if (!magazine || !plan) {
    throw new Error('Invalid Magazine or Plan');
  }

  // Calculate price after discount
  const price = calculatePrice(magazine.base_price, plan.discount);
  const renewal_date = new Date();
  renewal_date.setMonth(renewal_date.getMonth() + plan.renewalPeriod);

  // Deactivate any existing subscription for this user & magazine
  await Subscription.updateMany(
    { user_id, magazine_id, is_active: true },
    { $set: { is_active: false } }
  );

  // Create new subscription
  const newSubscription = await Subscription.create({
    user_id,
    magazine_id,
    plan_id,
    price,
    renewal_date,
    is_active: true,
  });

  return newSubscription;
};

// Get active subscriptions for a user
exports.getActiveSubscriptions = async (user_id) => {
  return await Subscription.find({ user_id, is_active: true })
    .populate('magazine_id', 'name')
    .populate('plan_id', 'title renewalPeriod discount')
    .lean();
};
// Modify subscription (e.g., change plan)
exports.updateSubscription = async (subscription_id, plan_id) => {
    const subscription = await Subscription.findById(subscription_id);
    if (!subscription) {
      throw new Error('Subscription not found');
    }
  
    subscription.plan_id = plan_id;
    await subscription.save();
  
    return subscription;
  };
// Cancel a subscription
exports.cancelSubscription = async (subscription_id) => {
  const subscription = await Subscription.findById(subscription_id);
  if (!subscription) throw new Error('Subscription not found');

  subscription.is_active = false;
  await subscription.save();

  return { message: 'Subscription cancelled successfully' };
};
