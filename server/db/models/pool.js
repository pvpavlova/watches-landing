'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pool extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pool.init({
    userName: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    userPhone: DataTypes.STRING,
    userImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pool',
  });
  return Pool;
};