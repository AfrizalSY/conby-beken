const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');


module.exports = function(passport) {
    passport.use(
        new LocalStrategy( { usernameField: 'email'} ,(email,password,done) => {
            // Find User (Matching User)
            User.findOne( {email: email })
            .then(user => {
                if(!user) {
                    return done(null,false, {message: 'Email is not registered!'});
                }
            // Matching Password
            bcrypt.compare(password, user.password, (err,isMatch) => {
                // Kalau error , throw error
                if (err) throw err;

                // Kalo match , passing user dengan done
                if(isMatch) {
                    return done(null, user);
                // Kalo !match return done false, sama message kalo password engga sama
                } else {
                    return done(null, false, { message : 'Password wrong!'});
                }
            } );

            }) 
            .catch(err => console.log(err));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
    passport.deserializeUser((id, done) => {
        User.findById(id,(err, user) => {
            done(err, user);
        });
    });  
}