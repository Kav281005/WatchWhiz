
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const flash = require('connect-flash');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
//const axios = require('axios'); 

const app = express();

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/WatchWhiz_x')
  .then(() => console.log('✅ MongoDB connected to WatchWhiz_x'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(flash());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// ✅ Session and Passport
app.use(session({
  secret: 'hey hey hey',
  resave: false,
  saveUninitialized: false
}));

const userModel = require('./models/User');
app.use(passport.initialize());
app.use(passport.session());
passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// ✅ Set up EJS if needed (optional views)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ✅ Routes
const indexRouter = require('./routes/index');
const authRoutes = require('./routes/auth');
const watchlistRoutes = require('./routes/watchlist');

// Public route
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);
// Protected route
const isLoggedIn = require('./middleware/isLoggedIn');


// Optional root
app.use('/', indexRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Server Error'
  });
});
// axios.post('/api/auth/register', { username, password, email, fullname }, {
//   withCredentials: true
// });

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server listening on port ${PORT}`);
});

module.exports = app;
