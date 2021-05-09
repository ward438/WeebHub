const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PosterImage extends Model {}

PosterImage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tiny: {
            type: DataTypes.STRING
        },
        small: {
            type: DataTypes.STRING
        },
        medium: {
            type: DataTypes.STRING
        },
        large: {
            type: DataTypes.STRING
        },
        original: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'posterImage',
    }
);

module.exports = PosterImage;