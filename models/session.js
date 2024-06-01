'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    
    static associate(models) {
      // 1 to n relation between user & sesssions
      Session.belongsTo(models.User);
      models.User.hasMany(Session);
    }
  }
  Session.init({
    sessionToken: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    expiresAt: DataTypes.DATE,
    isDeleted: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};