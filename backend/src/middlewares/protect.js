const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const protect = async (req, res, next) => {
  let token;

  // The token is usually sent in the 'Authorization' header,
  // formatted as "Bearer [token]". We need to extract just the token part.
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Get token from header
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Get user from the token's payload (we stored the user's id in it)
      // We attach the user object to the request, but exclude the password.
      req.user = await User.findById(decoded.id).select('-password');

      // 4. Call the next middleware or controller
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
