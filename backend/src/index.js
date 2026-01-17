const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const sportsRoutes = require('./routes/sportsRoutes');
const slotsRoutes = require('./routes/slotsRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/sports', sportsRoutes);
app.use('/api/v1/slots', slotsRoutes);
app.use('/api/v1/bookings', bookingsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));