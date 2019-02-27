var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var TwitchStrategy = require("passport-twitch").Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "686972780255-tnddnteua6ehl7e17gsk0mk542doaeqn.apps.googleusercontent.com",
      clientSecret: "991E3MF4lNn2mz_giN9utv4g",
      callbackURL: "http://localhost:4500/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      var userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken
      };
      done(null, userData);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "238496020438116",
      clientSecret: "c329a0192ae027f6380818617d232be0",
      callbackURL: "http://localhost:4500/auth/facebook/callback",
      profileFields: ["emails"]
    },
    function(accessToken, refreshToken, profile, done) {
      var userData = {
        email: profile.emails
          ? profile.emails[0].value
          : `${profile.username}@facebook.com`,
        name: profile.displayName,
        token: accessToken
      };
      done(null, userData);
    }
  )
);

passport.use(
  new TwitchStrategy(
    {
      clientID: "qfkna7pnfzsb7px5llhyhqoi7wn7td",
      clientSecret: "f9rj9cjw9nzw9v3fi3kdkwuxz20bw9",
      callbackURL: "http://localhost:4500/auth/twitch/callback",
      scope: "user_read"
    },
    function(accessToken, refreshToken, profile, done) {
      var userData = {
        name: profile.displayName,
        token: accessToken
      };
      done(null, userData);
    }
  )
);
