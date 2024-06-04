'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecuringDaily extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  RecuringDaily.init({
    time: DataTypes.TIME,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    isDeleted: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RecuringDaily',
  });
  return RecuringDaily;
};