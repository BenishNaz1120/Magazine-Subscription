const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    magazine_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Magazine',
      required: true,
    },
    plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    renewal_date: { type: Date, required: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Ensure a user can only have one active subscription for a magazine & plan
SubscriptionSchema.index(
  { user_id: 1, magazine_id: 1, plan_id: 1 },
  { unique: true }
);

module.exports = mongoose.model('Subscription', SubscriptionSchema);
