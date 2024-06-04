'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medication extends Model {
   
    static associate(models) {
      // 1 to n relation between user & medications
      Medication.belongsTo(models.User);
      models.User.hasMany(Medication);
      // 1 to 1 relation between schedule & medications
      Medication.belongsTo(models.Schedule);
      models.Schedule.hasOne(Medication);
      //1 to 1 relation between kindofmedication & medications
      Medication.belongsTo(models.KindOfMedication);
      models.KindOfMedication.hasOne(Medication);
    }
  }
  Medication.init({
    name: DataTypes.STRING,
    purpose: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    scheduleId: DataTypes.INTEGER,
    kindOfMedicationId: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Medication',
  });
  return Medication;
};