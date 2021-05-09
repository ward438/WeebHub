const sequelize = require('../config/connection');
const { User, Anime, Review, AnimeTitle, PosterImage } = require('../models');
const Kitsu = require('kitsu');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');

const api = new Kitsu();

const PAGE_OFFSETS = [0, 20, 40, 60, 80, 100];
const ANIME_FIELDSETS = 'id,slug,titles,averageRating,startDate,endDate,ageRatingGuide,posterImage,synopsis,episodeCount,episodeLength';

const seed = async () => {

  try {

    await sequelize.sync({ force: true });

    const apiAnimeData = [];
    // iterate through page offsets and call anime api
    for (const offset of PAGE_OFFSETS) {
      console.log(`Requesting page ${offset} of anime data from Kitsu api...`);
      const reqAnime = await api.get('anime', {
        params: {
          fields: {
            anime: ANIME_FIELDSETS
          },
          page: {
            limit: 20, 
            offset
          }
        }
      });
  
      apiAnimeData.push(...reqAnime.data);
      
    };
    // adds animeTitle property to each anime object copied from titles
    const reformattedApiAnimeData = apiAnimeData.map((anime) => {
      return { ...anime, animeTitle: { ...anime.titles } }
    });
    
    // creates Anime, PosterImage, and Title in one step
    const newAnimeData = await Anime.bulkCreate(reformattedApiAnimeData, {
      returning: true,
      include: [
        PosterImage,
        AnimeTitle
      ]
    });
    
    const newAnime = newAnimeData.map((anime) => anime.get({ plain: true }));
    
    const newUsersData = await User.bulkCreate(userData, {
      returning: true,
      individualHooks: true,
    });

    const newUsers = newUsersData.map((user) => user.get({ plain: true }));
    
    // create random user reviews for random animes
    for (const review of reviewData) {
      const randAnimeId = newAnime[getRandomInt(0, newAnime.length - 1)].id;
      const randUserId = newUsers[getRandomInt(0, newUsers.length - 1)].id;
      
      await Review.create(
        {
          ...review,
          user_id: randUserId,
          anime_id: randAnimeId,
        },
        {
          returning: true
        }
      );

    };

    process.exit(0);
    
  } catch (err) {
    console.log(err);
  }
  
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

seed();

