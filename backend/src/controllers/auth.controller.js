const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [ { email: 'inder@test.com', password: 'Test@123' }]; 
exports.register = (req, res) => {
  const { email, password } = req.body;
 if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ email, password }); // store plain password for testing
  return res.status(201).json({ message: "User registered" });
};


exports.login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // Sign a real JWT
  const token = jwt.sign(
    { email }, 
    process.env.JWT_SECRET || 'MY_SECRET_KEY', // secret must match middleware
    { expiresIn: '1h' }
  );

  return res.json({ token });
};
