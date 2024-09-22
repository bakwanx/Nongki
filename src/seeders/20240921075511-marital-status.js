'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'MaritalStatuses', 
      [
        {
          id:1,
          maritalStatus: "Belum kawin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id:2,
          maritalStatus: "Kawin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id:3,
          maritalStatus: "Cerai hidup",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id:4,
          maritalStatus: "Cerai mati",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
