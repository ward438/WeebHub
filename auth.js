const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');



passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        // usernameField: 'username'
    },
    function(email, password, done) {
        return User.findOne({ where: { email: email } }).then((user) => {
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            return user.validPassword(password, user.password).then(valid => {
                if (valid) {
                    return done(null, user);
                }
                return done(null, false, { message: 'Incorrect password.' });
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ where: { id: id } }).then(user => {
        // console.log(user)
        done(null, user.get({ plain: true }));
    }).catch(error => {
        done(error, null);
    });
});

function requireLogin(req, res, next) {
    if (req.user) {
        next(); // allow the next route to run
    } else {
        // require the user to log in
        res.redirect("/"); // or render a form, etc.
    }
}

module.exports = { passport, requireLogin };