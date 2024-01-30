'use strict';

const { SpotImage } = require('../models');

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
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://images.ctfassets.net/umhrp0op95v1/3YXXX3qRkniuJ0ZERiHez3/4dceeae15cee2feca809a39ee8971816/LA_Elgacia_KayAngel_Beauty_Shots_0011_740.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://images.ctfassets.net/umhrp0op95v1/7zcOxjyT464azRCDVpQZCJ/ec15010734031691837760200a3e3e4d/Yorn-Notes-Header-1080.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://images.ctfassets.net/umhrp0op95v1/g6jo58M8vu9BOEw4Lab5S/7a53517db07c3e29259997a5926cafef/East_Luterra_740.jpg",
        preview: false
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
