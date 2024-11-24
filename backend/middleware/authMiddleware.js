const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the request object
    req.user = await User.findById(decoded.id).select('-password'); // Don't include password in the user object

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateUser;
