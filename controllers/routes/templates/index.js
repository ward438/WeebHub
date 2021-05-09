const router = require('express').Router();
const animeRoutes = require('./anime');
const homeRoutes = require('./home');
const userRoutes = require('./user');

router.use('/anime', animeRoutes);
router.use('/user', userRoutes);
router.use('/', homeRoutes);

module.exports = router;