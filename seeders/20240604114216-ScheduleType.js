'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Schedules',
      [
        {
          ScheduleType: 'one time only' // id:1
        },
        {
          ScheduleType: 'recuring daily' //id:2
        },
        {
          ScheduleType: 'recuring weekly' //id:3
        }
      ]
      , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schedules', null, {});
  }
};
