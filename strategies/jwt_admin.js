const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;

module.exports = new JwtStrategy(opts, (payload, done) => {
  if (payload.username === "cashcheck") {
    return done(null, true);
  }
  return done(null, false);
});
