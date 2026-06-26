import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { authMiddleware } from './middlewares/authMiddleware.js';

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async (req, res) => {
  const {  name, email, password, birthdate } = req.body;

  if (!name || !email || !password ) {
    return res.status(400).json({ error: 'name, email, and password are required' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, birthdate) VALUES (?, ?, ?, ?)',
    [name, email, passwordHash, birthdate]
  );

  res.json({ message: 'You are registered successfully', userId: result.insertId });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

  if (result.length === 0) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const user = result[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });

  res.json({ message: 'You are logged in successfully', token });
});

app.get('/users', authMiddleware, async (req, res) => {
  const [users] = await pool.query(
    'SELECT id, name, email, birthdate, created_at FROM users'
  );

  res.json(users);
});

app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});