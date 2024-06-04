'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OneTimeOnlyMedication extends Model {
   
    static associate(models) {
      // 1 to n relationship between medication & OneTimeOnlyMedication
      OneTimeOnlyMedication.belongsTo(models.Medication);
      models.Medication.hasOne(OneTimeOnlyMedication);
    }
  }
  OneTimeOnlyMedication.init({
    medicationId: DataTypes.INTEGER,
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