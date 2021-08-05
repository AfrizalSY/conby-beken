const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
// const passport = require('passport');

const PORT = process.env.PORT || 5000;

const app = express();

require('dotenv').config();
// require('./app/config/passport')(passport);

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

// Bodyparser
// Bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express Session 
app.use(session({
  secret: 'sunda-empire',
  resave: true,
  saveUninitialized: true
}))

// Passport
// app.use(passport.initialize());
// app.use(passport.session());

// Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


//Routes
app.use('/', require('./app/routes/index'));
app.use('/users', require('./app/routes/users'));



app.listen(PORT, console.log(`Server started on port ${PORT}`));

