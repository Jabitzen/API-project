'use strict';

const { Review } = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 3,
        review: "Elgacia looks pretty cool but man, the story quest takes forever. Still better than Punika.",
        stars: 2
      },
      {
        spotId: 2,
        userId: 2,
        review: "Yorn story quest was pretty solid, but the abyssal dungeons take a while so its alright overall.",
        stars: 3
      },
      {
        spotId: 3,
        userId: 1,
        review: "Luterra was super insane cutscene wise, so this one is going high on my list!",
        stars: 5
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      stars: { [Op.in]: [2, 3, 5] }
    }, {});
  }
};
