const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class AnimeTitle extends Model {}

AnimeTitle.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        en: {
            type: DataTypes.STRING
        },
        en_jp: {
            type: DataTypes.STRING
        },
        ja_jp: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'animeTitle',
    }
);

module.exports = AnimeTitle;