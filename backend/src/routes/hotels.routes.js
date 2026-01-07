const express = require('express');
const router = express.Router();
const Hotel = require('../../models/hotels'); // make sure this path is correct

// GET /api/hotels?city=Toronto
router.get('/', async (req, res) => {
  try {
    const { city } = req.query; // get city from query string
    let hotels;
    if (city) {
      hotels = await Hotel.find({ city }); // filter by city
    } else {
      hotels = await Hotel.find(); // all hotels if no city
    }
    res.json(hotels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

