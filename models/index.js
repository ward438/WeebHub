const Anime = require('./Anime');
const Review = require('./Review');
const User = require('./User');
const AnimeTitle = require('./AnimeTitle');
const PosterImage = require('./PosterImage');


Review.belongsTo(Anime);

Anime.hasMany(Review, {
    foreignKey: 'anime_id'
});

Anime.hasOne(AnimeTitle);
AnimeTitle.belongsTo(Anime);

Anime.hasOne(PosterImage);
PosterImage.belongsTo(Anime);

User.hasMany(Review);
Review.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { Anime, User, Review, AnimeTitle, PosterImage }


module.exports = { Anime, User, Review, AnimeTitle, PosterImage }