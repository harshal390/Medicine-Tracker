'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecuringDaily extends Model {
   
    static associate(models) {
      // 1 to n relationship between medication & OneTimeOnlyMedication
      RecuringDaily.belongsTo(models.Medication);
      models.Medication.hasOne(RecuringDaily);
    }
  }
  RecuringDaily.init({
    medicationId: DataTypes.INTEGER,
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