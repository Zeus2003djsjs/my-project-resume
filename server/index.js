// index.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // 👈 Add this line
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // 👈 Add this line    

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Define Routes
app.use('/api/auth', require('./routes/auth')); // 👈 Add this line
app.use('/api/resumes', require('./routes/resumes')); // 👈 Add this line
app.use('/api/ai', require('./routes/ai')); // ✨ ADD THIS LINE

// A simple test route
app.get('/', (req, res) => {
  res.send('AI Resume Builder Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});