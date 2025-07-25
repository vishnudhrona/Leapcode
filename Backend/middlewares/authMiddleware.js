// middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains role, email, etc.
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default verifyToken;
