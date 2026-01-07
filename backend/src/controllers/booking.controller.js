let bookings = [];
let bookingId = 1;

exports.createBooking = (req, res) => {
  const { city, hotel, guests, checkIn, checkOut, payment } = req.body;
  if (!city || !hotel || !guests || !checkIn || !checkOut || !payment) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newBooking = {
    id: bookingId++,
    userEmail: req.user.email,
    city, hotel, guests, checkIn, checkOut, payment,
    status: "confirmed"
  };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
};

exports.getBookings = (req, res) => {
  const userBookings = bookings.filter(b => b.userEmail === req.user.email);
  res.json(userBookings);
};

exports.getBooking = (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id && b.userEmail === req.user.email);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json(booking);
};

exports.updateBooking = (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id && b.userEmail === req.user.email);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  const { city, hotel, guests, checkIn, checkOut, payment } = req.body;
  Object.assign(booking, { city, hotel, guests, checkIn, checkOut, payment });
  res.json(booking);
};

exports.cancelBooking = (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id && b.userEmail === req.user.email);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  booking.status = "cancelled";
  res.json({ message: "Booking cancelled", booking });
};

exports.restoreBooking = (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id && b.userEmail === req.user.email);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  booking.status = "confirmed";
  res.json({ message: "Booking restored", booking });
};
