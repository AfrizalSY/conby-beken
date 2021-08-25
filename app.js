const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
// const passport = require('passport');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

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

// cors
app.use(cors());

// var allowlist = ['http://localhost:3000'];
// var corsOptionsDelegate = (req, callback) => {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true };
//   } else {
//     corsOptions = { origin: false };
//   }
//   callback(null, corsOptions);
// };

// app.use(cors(corsOptionsDelegate));

// static folder
const uploadsDir = require('path').join(__dirname, '/uploads');
app.use(express.static(uploadsDir));

//Routes
app.use('/', require('./app/routes/index'));
app.use('/users', require('./app/routes/users'));
app.use('/admin', require('./app/routes/admin'));
app.use('/consultant', require('./app/routes/consultant'));
app.use('/order', require('./app/routes/order'));



app.listen(PORT, console.log(`Server started on port ${PORT}`));

