'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("Sessions", {
      type: "foreign key",
      fields: ["userId"],
      name: "fk_sessions_user_userId",
      references: {
        table: "Users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Sessions", "fk_sessions_user_userId", {});
  }
};
