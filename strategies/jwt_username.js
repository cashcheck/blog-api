const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;
opts.passReqToCallback = true;

module.exports = new JwtStrategy(opts, (req, payload, done) => {
  const username = req.params.username;
  if (username === payload.username) {
    return done(null, true);
  }
  return done(null, false);
});
