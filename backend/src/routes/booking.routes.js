const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const {
  createBooking, getBookings, getBooking,
  updateBooking, cancelBooking, restoreBooking
} = require('../controllers/booking.controller');

router.use(auth); // all routes protected

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/:id', getBooking);
router.put('/:id', updateBooking);
router.delete('/:id', cancelBooking);
router.post('/:id/restore', restoreBooking);

module.exports = router;
