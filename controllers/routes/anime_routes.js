const router = require('express').Router();
const sequelize = require('sequelize');
const db = require('../../models');
// this is a representative sample of the return json from our database.
// from the point, the data that has been populated in our database needs to be translated into this format.

const animes = [

    {
        "id": 1,
        'titles': {
            "en": "Cowboy Bebop",
            "ja_jp": "カウボーイビバップ",
        },
        'averageRating': '88.55',
        'startDate': '1998-04-03',
        'endDate': '1999-04-24',
        'ageRatingGuide': '17+ (violence & profanity)',
        'posterImage': {
            'tiny': 'https://media.kitsu.io/anime/poster_images/1/tiny.jpg?1431697256',
            'small': 'https://media.kitsu.io/anime/poster_images/1/small.jpg?1431697256',
            'medium': 'https://media.kitsu.io/anime/poster_images/1/medium.jpg?1431697256',
            'large': 'https://media.kitsu.io/anime/poster_images/1/large.jpg?1431697256',
            'original': 'https://media.kitsu.io/anime/poster_images/1/original.jpg?1431697256',
        },
        'synopsis': 'In the year 2071, humanity has colonoized several of the planets and moons...',
        'episodeCount': 26,
        'episodeLength': 25,
    },

    {
        "id": 2,
        'titles': {
            "en": "Jo Mama",
            "ja_jp": "一つな",
        },
        'averageRating': '80.55',
        'startDate': '2000-02-03',
        'endDate': '2007-09-19',
        'ageRatingGuide': '14+ (violence)',
        'posterImage': {
            'tiny': 'https://media.kitsu.io/anime/poster_images/1/tiny.jpg?1431697256',
            'small': 'https://media.kitsu.io/anime/poster_images/1/small.jpg?1431697256',
            'medium': 'https://media.kitsu.io/anime/cover_images/000/010/857/original/tumblr_nrqg5brAx31ta0h4lo1_1280.jpg',
            'large': 'https://media.kitsu.io/anime/poster_images/1/large.jpg?1431697256',
            'original': 'https://media.kitsu.io/anime/poster_images/1/original.jpg?1431697256',
        },
        'episodeCount': 13,
        'episodeLength': 25,
    },
    {
        "id": 2,
        'titles': {
            "en": "Big",
            "ja_jp": "つな",
        },
        'averageRating': '35.43',
        'startDate': '1992-01-09',
        'endDate': '1999-09-19',
        'ageRatingGuide': 'TV-G',
        'posterImage': {
            'tiny': 'https://media.kitsu.io/anime/poster_images/1/tiny.jpg?1431697256',
            'small': 'https://media.kitsu.io/anime/poster_images/1/small.jpg?1431697256',
            'medium': 'https://media.kitsu.io/anime/cover_images/000/010/857/original/tumblr_nrqg5brAx31ta0h4lo1_1280.jpg',
            'large': 'https://media.kitsu.io/anime/poster_images/1/large.jpg?1431697256',
            'original': 'https://media.kitsu.io/anime/poster_images/1/original.jpg?1431697256',
        },
        'episodeCount': 10,
        'episodeLength': 25,
    },

    {
        "id": 1,
        'titles': {
            "en": "Cowboy Bebop",
            "ja_jp": "カウボーイビバップ",
        },
        'averageRating': '88.55',
        'startDate': '1998-04-03',
        'endDate': '1999-04-24',
        'ageRatingGuide': '17+ (violence & profanity)',
        'posterImage': {
            'tiny': 'https://media.kitsu.io/anime/poster_images/1/tiny.jpg?1431697256',
            'small': 'https://media.kitsu.io/anime/poster_images/1/small.jpg?1431697256',
            'medium': 'https://media.kitsu.io/anime/poster_images/1/medium.jpg?1431697256',
            'large': 'https://media.kitsu.io/anime/poster_images/1/large.jpg?1431697256',
            'original': 'https://media.kitsu.io/anime/poster_images/1/original.jpg?1431697256',
        },
        'synopsis': 'In the year 2071, humanity has colonoized several of the planets and moons...',
        'episodeCount': 26,
        'episodeLength': 25,
    },

    {
        "id": 1,
        'titles': {
            "en": "Cowboy Bebop",
            "ja_jp": "カウボーイビバップ",
        },
        'averageRating': '88.55',
        'startDate': '1998-04-03',
        'endDate': '1999-04-24',
        'ageRatingGuide': '17+ (violence & profanity)',
        'posterImage': {
            'tiny': 'https://media.kitsu.io/anime/poster_images/1/tiny.jpg?1431697256',
            'small': 'https://media.kitsu.io/anime/poster_images/1/small.jpg?1431697256',
            'medium': 'https://media.kitsu.io/anime/poster_images/1/medium.jpg?1431697256',
            'large': 'https://media.kitsu.io/anime/poster_images/1/large.jpg?1431697256',
            'original': 'https://media.kitsu.io/anime/poster_images/1/original.jpg?1431697256',
        },
        'synopsis': 'In the year 2071, humanity has colonoized several of the planets and moons...',
        'episodeCount': 26,
        'episodeLength': 25,
    },
    {
        "id": 1,
        'titles': {
            "en": "Cowboy Bebop",
            "ja_jp": "カウボーイビバップ",
        },
        'averageRating': '88.55',
        'startDate': '1998-04-03',
        'endDate': '1999-04-24',
        'ageRatingGuide': '17+ (violence & profanity)',
        'posterImage': {
            'tiny': 'https://media.kitsu.io/anime/poster_images/1/tiny.jpg?1431697256',
            'small': 'https://media.kitsu.io/anime/poster_images/1/small.jpg?1431697256',
            'medium': 'https://media.kitsu.io/anime/poster_images/1/medium.jpg?1431697256',
            'large': 'https://media.kitsu.io/anime/poster_images/1/large.jpg?1431697256',
            'original': 'https://media.kitsu.io/anime/poster_images/1/original.jpg?1431697256',
        },
        'synopsis': 'In the year 2071, humanity has colonoized several of the planets and moons...',
        'episodeCount': 26,
        'episodeLength': 25,
    },
    {
        "id": 1,
        'titles': {
            "en": "Cowboy Bebop",
            "ja_jp": "カウボーイビバップ",
        },
        'averageRating': '88.55',
        'startDate': '1998-04-03',
        'endDate': '1999-04-24',
        'ageRatingGuide': '17+ (violence & profanity)',
        'posterImage': {
            'tiny': 'https://media.kitsu.io/anime/poster_images/1/tiny.jpg?1431697256',
            'small': 'https://media.kitsu.io/anime/poster_images/1/small.jpg?1431697256',
            'medium': 'https://media.kitsu.io/anime/poster_images/1/medium.jpg?1431697256',
            'large': 'https://media.kitsu.io/anime/poster_images/1/large.jpg?1431697256',
            'original': 'https://media.kitsu.io/anime/poster_images/1/original.jpg?1431697256',
        },
        'synopsis': 'In the year 2071, humanity has colonoized several of the planets and moons...',
        'episodeCount': 26,
        'episodeLength': 25,
    }

];

reviews = [{
        "id": 1,
        "comment": "I really enjoyed the dynamic story and the Naruto run at the end!",
        'rating': 35

    },
    {
        "id": 2,
        "comment": "The carnage and bloodshed was a little much for me. ",
        'rating': 85
    },
    {
        "id": 3,
        "comment": "Hated it! ROFLCOPTER",
        'rating': 20,
    },
    {
        "id": 4,
        "comment": "Who would've thought he could turn himself into a pickle? LulRblades",
        'rating': "35",
        "points": 263
    }


];

user = [{

        "id": 1,
        "username": "PhatMan",
        "email": "megadood@aol.com",
        "points": 23

    },
    {
        "id": 2,
        "username": "Senpai",
        "email": "roflcopter@aol.com",
        "points": 26

    },
    {
        "id": 3,
        "username": "8up",
        "email": "cool@aol.com",
        "points": 46

    },
    {
        "id": 4,
        "username": "Anime_Master",
        "email": "babblingCreek@aol.com",
        "points": 09

    },
]

singleAnimeSample =

    router.get('/', async(req, res) => {
        res.render('home');
    });

// router.post('/', async(req, res) => {

// });
router.get('/register', (req, res) => {
    res.render('register');
});

// router.post('/register', (req, res) => {

// })

router.get('/anime/:num', async(req, res) => {
    return res.render('singleAnime', animes[req.params.num - 1], { reviews: reviews });
    // this 
});
router.get('/anime', async(req, res) => {
    return res.render('anime', { animes: animes })
});

router.get('/reviews', async(req, res) => {
    return res.render('reviews', { reviews: reviews });
})

router.get('/search', async(req, res) => {
    console.log(req.query.search);
    try {
        const searchResults = await db.AnimeTitle.findAll({
            where: {
                en: req.query.search
            }
        })
        const animeResults = await db.Anime.findOne({
            include: [{
                model: Anime
            }]
        })
        console.log(searchResults); //render and talk to rob
        res.render('singleAnime', {animes:searchResults} )
    }catch (err){
        console.log(err);//hit other api
        res.status(404);
    };

    // return res.render('singleAnime');

})

// 
// 
// 
// 


console.log('anime rules')

module.exports = router;