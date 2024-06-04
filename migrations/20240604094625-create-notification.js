'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      medicationId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      markAsDone: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isDeleted: {
        allowNull: false,
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });

    await queryInterface.addConstraint("Notifications", {
      type: "foreign key",
      fields: ["medicationId"],
      name: "fk_notifications_medication_medicationId",
      references: {
        table: "Medications",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('fk_notifications_medication_medicationId', {})
    await queryInterface.dropTable('Notifications');
  }
};