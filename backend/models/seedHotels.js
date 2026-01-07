const mongoose = require('mongoose');
const Hotel = require('./hotels'); // make sure Hotel.js exists

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/qademo')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const hotelsData = [
  { city: "Toronto", hotels: ["Toronto Grand", "Maple Stay", "Bayview Hotel", "CN Tower Inn", "Royal York"] },
  { city: "Vancouver", hotels: ["Vancouver Suites", "Pacific Inn", "Granville Hotel", "West Coast Lodge", "Seawall Stay"] },
  { city: "Montreal", hotels: ["Montreal Palace", "Old Port Inn", "Saint Laurent Hotel", "Ville-Marie Suites", "Plateau Lodge"] },
  { city: "Calgary", hotels: ["Calgary Tower Inn", "Stampede Suites", "Bow River Hotel", "Foothills Lodge", "Downtown Calgary Inn"] },
  { city: "Ottawa", hotels: ["Parliament Hotel", "Rideau Inn", "Byward Suites", "Capital Lodge", "Ottawa Stay"] }
];


Hotel.insertMany(hotels)
  .then(() => {
    console.log('Hotels added successfully');
    mongoose.connection.close();
  })
  .catch(err => console.log(err));


