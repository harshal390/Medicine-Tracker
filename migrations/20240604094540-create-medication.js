'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medications', {
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
      purpose: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      scheduleId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      kindOfMedicationId: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.addConstraint("Medications", {
      type: "foreign key",
      fields: ["userId"],
      name: "fk_medications_user_userId",
      references: {
        table: "Users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
    await queryInterface.addConstraint("Medications", {
      type: "foreign key",
      fields: ["ScheduleId"],
      name: "fk_medications_schedule_scheduleId",
      references: {
        table: "Schedules",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
    await queryInterface.addConstraint("Medications", {
      type: "foreign key",
      fields: ["kindOfMedicationId"],
      name: "fk_medications_kindOfMedication_kindOfMedicationId",
      references: {
        table: "KindOfMedications",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('fk_medications_kindOfMedication_kindOfMedicationId', {})
    await queryInterface.removeConstraint('fk_medications_schedule_scheduleId', {})
    await queryInterface.removeConstraint('fk_medications_user_userId', {})
    await queryInterface.dropTable('Medications');
  }
};