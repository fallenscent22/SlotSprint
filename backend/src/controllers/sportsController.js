const sports = ['Cricket', 'Badminton', 'Football', 'Tennis', 'Basketball'];

exports.getSports = (req, res) => {
  res.json({ success: true, sports });
};