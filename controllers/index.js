const router = require('express').Router();
const templateRoutes = require('./routes/templates');
const apiRoutes = require('./routes/api');
// const internalAPIRoute = require('./routes/api/anime_routes')

router.use('/api', apiRoutes);
router.use('', templateRoutes);

module.exports = router;