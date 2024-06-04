'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    mobileNo: DataTypes.STRING,
    gender: DataTypes.STRING,
    password: DataTypes.STRING,
    isDeleted: DataTypes.TINYINT,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (User, options) => {
        // User.salt = await bcrypt.genSalt(5);
        // User.token = new Date().getTime().toString();
        User.password = await bcrypt.hash(User.password, 10);
        User.createdAt = new Date();
      },
      beforeUpdate: async (User, options) => {
        User.password = bcrypt.hash(User.password, 10);
        User.updatedAt = new Date();
      },
    }
  });
  return User;
};