'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecuringWeekly extends Model {
   
    static associate(models) {
     // 1 to 1 relationship between medication & OneTimeOnlyMedication
     RecuringWeekly.belongsTo(models.Medication);
     models.Medication.hasOne(RecuringWeekly);
    }
  }
  RecuringWeekly.init({
    medicationId: DataTypes.INTEGER,
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