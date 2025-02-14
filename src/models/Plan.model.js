const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    renewalPeriod: { type: Number, required: true, min: 1 },
    tier: { type: Number, required: true },
    discount: { type: Number, required: true, min: 0, max: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plan', PlanSchema);
