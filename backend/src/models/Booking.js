const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Unique index to prevent duplicate bookings (though atomic update handles it)
bookingSchema.index({ slotId: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);