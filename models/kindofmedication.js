'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KindOfMedication extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  KindOfMedication.init({
    medicationType: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'KindOfMedication',
  });
  return KindOfMedication;
};