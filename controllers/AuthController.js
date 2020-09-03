var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var passport = require('passport');

require('dotenv').config();

require('../passport');

var User = require('../models/user');

exports.signIn = function (req, res, next) {

    const username = req.body.username;
    const password = req.body.password;

    passport.authenticate('local', {session: false}, (err, user, info) => {
	if (info) {console.log(info)}
	if (err) { return next(err); }
        if (!user) {
            return res.status(400).json({
                message: 'user not found',
                user: user
            });
        }  req.login(user, {session: false}, (err) => {
           if (err) {res.send(err);}
	   const token = 'JWT ' + jwt.sign({user}, process.env.JWT_KEY);
           return res.json({user, token});
        });
    })(req, res);
}

exports.signUp= function (req, res, next) {
    const uname = req.body.username
    const pword = req.body.password;
    
    console.log(uname + ' ' + pword);

    bcrypt.hash(pword, 10, (err, hashedPassword) => {
        if (err) { console.log(err); return next(err); }
        const user = new User(
	  {
             username: uname,
             password: hashedPassword
	  }
	);
        try {	
	    user.save(function(err) {
                if (err) {console.log(err); return next(err)}
	        else {res.json({message: 'registered'});}
            });
	} catch (error) {
            res.status(400).json({ error })
        }
    });
}
