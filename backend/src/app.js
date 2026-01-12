const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const path = require('path');
const PORT = process.env.PORT || 4000;


const hotelsRoutes = require('./routes/hotels.routes');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const bookingRoutes = require('./routes/booking.routes');
const Hotel = require("../models/hotels");

const app = express();
//middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/hotels', hotelsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/bookings', bookingRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../../frontend')));
app.get('/health', (_, res) => res.send('OK'));
app.get("/api/cities", async (req, res) => {
  const cities = await Hotel.distinct("city");
  res.json(cities);
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/login.html'));
});

module.exports = app;
