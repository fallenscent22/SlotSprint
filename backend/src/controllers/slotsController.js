const Slot = require('../models/Slot');

const slotTimes = [
  { start: '10:00', end: '11:00' },
  { start: '11:00', end: '12:00' },
  { start: '12:00', end: '13:00' },
  { start: '13:00', end: '14:00' },
  { start: '14:00', end: '15:00' },
  { start: '15:00', end: '16:00' },
  { start: '16:00', end: '17:00' },
  { start: '17:00', end: '18:00' },
  { start: '18:00', end: '19:00' },
  { start: '19:00', end: '20:00' },
  { start: '20:00', end: '21:00' },
  { start: '21:00', end: '22:00' },
];

exports.getSlots = async (req, res, next) => {
  const { sport, date } = req.query;
  if (!sport || !date) return res.status(400).json({ success: false, message: 'Sport and date required' });

  const requestedDate = new Date(date);
  if (isNaN(requestedDate)) return res.status(400).json({ success: false, message: 'Invalid date' });

  try {
    // Generate slots if not exist
    for (const time of slotTimes) {
      await Slot.findOneAndUpdate(
        { sport, date, startTime: time.start },
        { $setOnInsert: { endTime: time.end, isBooked: false } },
        { upsert: true, new: true }
      );
    }

    const slots = await Slot.find({ sport, date }).sort('startTime');

    // Filter out past slots
    const now = new Date();
    const filteredSlots = slots.map(slot => {
      const slotStart = new Date(`${date}T${slot.startTime}:00`);
      const isPast = slotStart < now;
      return { ...slot.toObject(), status: slot.isBooked ? 'booked' : (isPast ? 'past' : 'available'), isPast };
    });

    res.json({ success: true, slots: filteredSlots });
  } catch (err) {
    next(err);
  }
};