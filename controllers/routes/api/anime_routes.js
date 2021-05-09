const router = require('express').Router();
const { Anime, AnimeTitle, PosterImage } = require('../../../models');

// /api/anime

// GET anime by search
// /api/anime/?filter[text]=${urlSearch} => req.query = { filter: { text: 'cowboy' } }
router.get('/', async(req, res) => {
    try {
        const foundAnimeData = await Anime.findOne();
        if (!foundAnimeData) {
            res.status(404).json({ message: 'Anime not found' });
        }
        foundAnime = foundAnimeData.get({ plain: true });
        res.json(foundAnime);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    res.render('home')
});


module.exports = router;