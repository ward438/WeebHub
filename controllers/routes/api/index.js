const router = require('express').Router();
const animeRoutes = require('./anime_routes');

router.use('/anime', animeRoutes);

module.exports = router;