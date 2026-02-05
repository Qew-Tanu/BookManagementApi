const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

exports.register = async (req, res) => {
  try { 
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ accessToken: null, message: 'Invalid Password!' });
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'name', 'email']
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
