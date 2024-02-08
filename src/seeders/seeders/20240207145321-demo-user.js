"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    Example: await queryInterface.bulkInsert(
      "User", //ten table
      [
        {
          email: "John Doe",
          password: "123",
          username: "fake1",
        },
        {
          email: "John Doe2",
          password: "12345",
          username: "fake2",
        },
        {
          email: "John Doe3",
          password: "123456789",
          username: "fake3",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
