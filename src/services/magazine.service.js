const Magazine = require('../models/Magazine.model');
const Plan = require('../models/Plan.model');

exports.createMagazine = async (data) => {
  const { name, description, base_price } = data;

  if (!name || !base_price) throw new Error('Name and base_price are required');
  if (typeof base_price !== 'number' || base_price <= 0)
    throw new Error('Base price must be greater than zero');

  const magazine = new Magazine({ name, description, base_price });
  await magazine.save();

  return { message: 'Magazine created successfully', magazine };
};

exports.getMagazinesWithPlans = async () => {
  const magazines = await Magazine.find().lean();
  const plans = await Plan.find().lean();

  return magazines.map((magazine) => ({
    ...magazine,
    plans: plans.map((plan) => {
      const originalPrice = magazine.base_price * plan.renewalPeriod;
      const discountedPrice = originalPrice * (1 - plan.discount);

      return {
        title: plan.title,
        renewalPeriod: plan.renewalPeriod,
        discount: plan.discount,
        original_price: originalPrice.toFixed(2),
        discounted_price: discountedPrice.toFixed(2),
      };
    }),
  }));
};
