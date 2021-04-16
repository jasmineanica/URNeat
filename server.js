const express = require('express');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

app.get('/', (req, res) =>
          res.json({ msg: 'Welcome to the URNeat API' }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/drinks', require('./routes/drinks'));
app.use('/api/ratings', require('./routes/ratings'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));