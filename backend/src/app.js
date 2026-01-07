const express = require('express');
const cors = require('cors');
const hotelsRoutes = require('./routes/hotels.routes');

const Hotel = require("../models/hotels");
const mongoose = require("mongoose");

const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const bookingRoutes = require('./routes/booking.routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/hotels', hotelsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/health', (_, res) => res.send('OK'));
app.get("/api/cities", async (req, res) => {
  const cities = await Hotel.distinct("city");
  res.json(cities);
});
module.exports = app;
