const Plan = require('../models/Plan.model');

const predefinedPlans = [
  {
    title: 'Silver Plan',
    description: 'Basic plan, renews monthly',
    renewalPeriod: 1,
    tier: 1,
    discount: 0.0,
  },
  {
    title: 'Gold Plan',
    description: 'Standard plan, renews every 3 months',
    renewalPeriod: 3,
    tier: 2,
    discount: 0.05,
  },
  {
    title: 'Platinum Plan',
    description: 'Premium plan, renews every 6 months',
    renewalPeriod: 6,
    tier: 3,
    discount: 0.1,
  },
  {
    title: 'Diamond Plan',
    description: 'Exclusive plan, renews annually',
    renewalPeriod: 12,
    tier: 4,
    discount: 0.25,
  },
];

exports.initializePlans = async () => {
  const bulkOperations = predefinedPlans.map((plan) => ({
    updateOne: {
      filter: { title: plan.title },
      update: plan,
      upsert: true,
    },
  }));

  await Plan.bulkWrite(bulkOperations);
  console.log(' Plans initialized (upserted)');
};

exports.getAllPlans = async () => {
  return await Plan.find().lean();
};
