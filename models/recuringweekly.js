'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecuringWeekly extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  RecuringWeekly.init({
    day: DataTypes.TINYINT,
    time: DataTypes.TIME,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    isDeleted: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RecuringWeekly',
  });
  return RecuringWeekly;
};