'use strict';

/ @type {import('sequelize-cli').Migration} /
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('KindOfMedications',
      [
        {
          medicationType: 'pill' // id:1
        },
        {
          medicationType: 'capsule' //id:2
        },
        {
          medicationType: 'injection' //id:3
        },
        {
          medicationType: 'amp' //id:4
        },
      ]
      , {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('KindOfMedications', null, {});
  }
};
