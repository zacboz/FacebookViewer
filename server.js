const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      passport = require('passport'),
      // LocalStrategy = require('passport-local').Strategy,
      FacebookStrategy = require('passport-facebook').Strategy,
      port = 3021;
      config = require('./config.js'),
      // cors = require('cors'),
      // cookieParser = require('cookie-parser'),
      session = require('express-session');

const app = express();
app.use(bodyParser.json());
// app.use(cookieParser());

app.use(session({secret: 'keyboardcat'}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./public'));


passport.use(new FacebookStrategy({
  clientID: '387518721587708',
  clientSecret: '7926e24db9fa456f10ded4d63742e0e8',
  callbackURL: 'http://localhost:3021/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function(req, res) {
    res.status(200).send(req.user);
})

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));








app.listen(port, function() {
  console.log('Connected on', port)
})
