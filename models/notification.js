'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
   
    static associate(models) {
      // 1 to n relationship between medication & notifications
      Notification.belongsTo(models.Medication);
      models.Medication.hasMany(Notification);
    }
  }
  Notification.init({
    name: DataTypes.STRING,
    medicationId: DataTypes.INTEGER,
    markAsDone: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};