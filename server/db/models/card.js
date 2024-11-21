'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Card.init({
    name: DataTypes.STRING,
    body: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};