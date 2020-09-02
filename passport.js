var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require('bcryptjs');

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

var User = require('./models/user');

passport.use( new LocalStrategy (
    function(username, password, done) {
        User.findOne({name: username}, function(err, user) {
            if (err) return done(err);

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            bcrypt.compare( password, user.salted, (err, res) => {
                if (res) {
                    return done(null, user);
                }
                else {
                    return done(null, false,
                        { message: 'Incorrect password.' });
                }
            });
       });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
        secretOrKey   : process.env.JWT_KEY
    },
    function (jwtPayload, cb) {
        return User.findById(jwtPayload.id)
            .then(user => {
                return cb(null, {user});
            })
            .catch(err => {
                return cb(err);
            });
    }
));
