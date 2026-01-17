const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  date: { type: String, required: true }, // year-month-date-> 2026-01-01
  startTime: { type: String, required: true }, // hours:minutes
  endTime: { type: String, required: true }, // hours:minutes
  isBooked: { type: Boolean, default: false },
});

// Unique index to prevent duplicate slots
slotSchema.index({ sport: 1, date: 1, startTime: 1 }, { unique: true });

module.exports = mongoose.model('Slot', slotSchema);