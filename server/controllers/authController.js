import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const getJwtConfig = () => {
  const tokenTtl = process.env.JWT_EXPIRES_IN || '7d';
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieSecure = isProduction; // rely on HTTPS in prod
  const sameSite = isProduction ? 'none' : 'lax';

  return { tokenTtl, cookieSecure, sameSite };
};

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

const sendAuthCookie = (res, token) => {
  const { cookieSecure, sameSite } = getJwtConfig();
  const maxAgeMs = 7 * 24 * 60 * 60 * 1000; // 7 days
  res.cookie('token', token, {
    httpOnly: true,
    secure: cookieSecure,
    sameSite,
    maxAge: maxAgeMs
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, error: 'Email already registered' });
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    sendAuthCookie(res, token);

    return res.status(201).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = signToken(user._id);
    sendAuthCookie(res, token);

    return res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    return res.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Me error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const logout = async (_req, res) => {
  try {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    return res.json({ success: true, message: 'Logged out' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};


