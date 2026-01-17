const Slot = require('../models/Slot');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');

exports.bookSlot = async (req, res, next) => {
  const { slotId } = req.body;
  if (!slotId) return res.status(400).json({ success: false, message: 'slotId required' });

  if (!mongoose.Types.ObjectId.isValid(slotId)) return res.status(400).json({ success: false, message: 'Invalid slotId' });

  try {
    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ success: false, message: 'Slot not found' });

    // Check if it is past slot
    const slotStart = new Date(`${slot.date}T${slot.startTime}:00`);
    if (slotStart < new Date()) return res.status(400).json({ success: false, message: 'Cannot book past slot' });

    // Atomic update to prevent double booking
    const updatedSlot = await Slot.findOneAndUpdate(
      { _id: slotId, isBooked: false },
      { isBooked: true },
      { new: true }
    );

    if (!updatedSlot) return res.status(409).json({ success: false, message: 'Slot already booked' });

    // Create booking
    const booking = new Booking({ userId: req.user.userId, slotId });
    await booking.save();

    res.json({ success: true, message: 'Slot booked successfully' });
  } catch (err) {
    next(err);
  }
};