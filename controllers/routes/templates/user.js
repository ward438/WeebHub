const router = require('express').Router();
const { Review, User, Anime, PosterImage, AnimeTitle } = require('./../../../models')
const { passport, requireLogin } = require('../../../auth');




router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', (req, res) => {
    let errors = [];
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    return User.findOne({ where: { email: email } }).then((user) => {
        if (user) {
            errors.push({ message: "Email already exists" });
            return res.render('user/register', { errors: errors });
        } else {
            console.log(email);
            console.log(username);
            return User.create({ email: email, password: password, username: username }).then(user => {
                    return res.redirect('/');
                })
                .catch((error) => {
                    errors.push({ message: error });
                    console.log(errors)
                    return res.render('user/register', { errors: errors });
                })
        }
    });
});





// router.post('/register', (req, res) => {

// })

module.exports = router;