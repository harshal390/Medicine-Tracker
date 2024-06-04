'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'OneTimeOnlyMedications',
      'medicationId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    );
    await queryInterface.addColumn(
      'RecuringDailies',
      'medicationId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    );
    await queryInterface.addColumn(
      'RecuringWeeklies',
      'medicationId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    );
    await queryInterface.addConstraint("OneTimeOnlyMedications", {
      type: "foreign key",
      fields: ["medicationId"],
      name: "fk_onetimeonlymedications_medication_medicationId",
      references: {
        table: "Medications",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
    await queryInterface.addConstraint("RecuringDailies", {
      type: "foreign key",
      fields: ["medicationId"],
      name: "fk_recuringdailies_medication_medicationId",
      references: {
        table: "Medications",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
    await queryInterface.addConstraint("RecuringWeeklies", {
      type: "foreign key",
      fields: ["medicationId"],
      name: "fk_recuringweeklies_medication_medicationId",
      references: {
        table: "Medications",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("OneTimeOnlyMedications", "fk_onetimeonlymedications_medication_medicationId", {});
    await queryInterface.removeConstraint("RecuringDailies", "fk_recuringdailies_medication_medicationId", {});
    await queryInterface.removeConstraint("RecuringWeeklies", "fk_recuringweeklies_medication_medicationId", {});
    await queryInterface.removeColumn(
      'OneTimeOnlyMedications',
      'medicationId'
    );
    await queryInterface.removeColumn(
      'RecuringDailies',
      'medicationId'
    );
    await queryInterface.removeColumn(
      'RecuringWeeklies',
      'medicationId'
    );
  }
};
