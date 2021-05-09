const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Anime extends Model {}

Anime.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        // slug: {
        //     type: DataTypes.STRING
        // },
        averageRating: {
            type: DataTypes.DECIMAL
        },
        startDate: {
            type: DataTypes.DATE
        },
        endDate: {
            type: DataTypes.DATE
        },
        ageRatingGuide: {
            type: DataTypes.STRING
        },
        synopsis: {
            type: DataTypes.TEXT
        },
        episodeCount: {
            type: DataTypes.INTEGER
        },
        episodeLength: {
            type: DataTypes.INTEGER
        }
    },



    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'anime',
    });

module.exports = Anime;