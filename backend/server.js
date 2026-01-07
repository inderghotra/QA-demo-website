require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI) // no options needed
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
