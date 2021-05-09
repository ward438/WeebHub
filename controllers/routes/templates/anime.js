const router = require('express').Router();
const sequelize = require('sequelize');
const db = require('./../../../models');
const { Review, User, Anime, PosterImage, AnimeTitle } = require('./../../../models')
const { requireLogin } = require('../../../auth');
const { request } = require('express');


router.get('/search', requireLogin, (req, res) => {


    let limit = 100;
    if (req.query.limit != undefined) {
        limit = parseInt(req.query.limit);
    }
    let whereClause = {};
    if (req.query.search != undefined) {
        whereClause = {
            where: {
                en: {
                    [sequelize.Op.like]: '%' + req.query.search + '%'
                }
            }
        }
    }
    return AnimeTitle.findAll({
        limit: limit,
        ...whereClause,
        include: [{
            model: Anime,
            include: [
                { model: PosterImage },
                {
                    model: Review,
                    include: [{
                            model: User,
                            attributes: ['username']
                        }

                    ]
                },
            ],
        }, ]
    })

    .then(titles => titles.map(record => record.get({ plain: true })))
        // .then(title => console.log(title[0].anime.reviews))
        .then(title => res.render('animes/singleAnime', { title: title, user: req.user }))
});

router.post('/reviews', requireLogin, (req, res) => {
    Review.create({
            comment: req.body.comment,
            user_id: req.user.id,
            anime_id: req.body.animeId
        })
        // console.log(req.body);
        // console.log(req.user);
        .then(res.render('animes/singleAnime'))
});

// .then(reviews => res.render('animes/reviews', { reviews: reviews, user: req.user }))

router.get('/reviews', requireLogin, (req, res) => {
    let limit = 100;
    let whereClause = {};
    return Review.findAll({
            limit: limit,
            ...whereClause,
            include: [
                { model: User },
                {
                    model: Anime,
                    include: [
                        { model: PosterImage },
                        { model: AnimeTitle },

                    ]
                }
            ]
        })
        // this converts directly to JSON so that the developer doesn't have to use .dataValues
        .then(results => results.map(record => record.get({ plain: true })))
        // keep the print statement for future development
        // .then(results => { console.log(results[0]); return results })
        .then(reviews => res.render('animes/reviews', { reviews: reviews, user: req.user }))
});

// Goes last since it will catch before other routes are checked
router.get('', requireLogin, (req, res) => {
    let limit = 100;
    let whereClause = {};
    return Anime.findAll({
            limit: limit,
            ...whereClause,
            include: [
                { model: PosterImage },
                { model: AnimeTitle },
            ]
        })
        // this converts directly to JSON so that the developer doesn't have to use .dataValues
        .then(results => results.map(record => record.get({ plain: true })))
        // keep the print statement for future development
        .then(animes => res.render('animes/anime', { animes: animes, user: req.user }))
});





module.exports = router;