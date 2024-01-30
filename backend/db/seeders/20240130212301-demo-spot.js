'use strict';

const { Spot } = require('../models');

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
   await Spot.bulkCreate([
    {
      ownerId: 1,
      address: "Lazenith Avenue",
      city: "Ereonnor",
      state: "Kayangel",
      country: "Elgacia",
      lat: 42.1337,
      lng: 86.7531,
      name: "Ereonnor Lobby",
      description: "The central hotspot of Elgacia, land of the Lazeniths",
      price: 24.98
    },
    {
      ownerId: 2,
      address: "Yoz Lane",
      city: "Umar",
      state: "Blackrock",
      country: "Yorn",
      lat: 21.8792,
      lng: 75.2348,
      name: "The Great Castle",
      description: "Land of the blacksmiths, Yorn is where the finest weapons are crafted",
      price: 46.89
    },
    {
      ownerId: 3,
      address: "Fort Shushire",
      city: "Luterra",
      state: "Yudia",
      country: "Rethramis",
      lat: 57.9873,
      lng: 55.2340,
      name: "Port Krona",
      description: "Luterra's finest port with easy access to the vast seas of arkesia",
      price: 34.89
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Ereonnor Lobby', 'The Great Castle', 'Port Krona'] }
    }, {});
  }
};
