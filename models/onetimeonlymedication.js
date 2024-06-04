'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OneTimeOnlyMedication extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  OneTimeOnlyMedication.init({
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    isDeleted: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OneTimeOnlyMedication',
  });
  return OneTimeOnlyMedication;
};