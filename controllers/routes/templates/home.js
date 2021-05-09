const router = require('express').Router();
const Sequelize = require('sequelize');
const User = require('../../../models/User');
const { passport, requireLogin } = require('../../../auth');

router.get('/', async(req, res) => {
    res.render('home/home', { user: req.user });
});

router.post("/", (req, res, next) => {
    return passport.authenticate("local", {
        successRedirect: "/anime",
        failureRedirect: "/",
        failureFlash: false,
    })(req, res, next);
});

router.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    });

});


module.exports = router;