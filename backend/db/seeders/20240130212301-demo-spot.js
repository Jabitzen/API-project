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
      address: "Galaxy Avenue",
      city: "Supernove",
      state: "Outerspace",
      country: "Universe",
      lat: 42.1337,
      lng: 86.7531,
      name: "Galaxy way",
      description: "The most luxurious place to stay in the cosmos",
      price: 24.98
    },
    {
      ownerId: 2,
      address: "Cosmodrome Landing",
      city: "Winding Cove",
      state: "Fallen Shore",
      country: "European Dead Zone",
      lat: 21.8792,
      lng: 75.2348,
      name: "The cosmodrome",
      description: "One of the few remaining places left from the golden age of humanity",
      price: 46.89
    },
    {
      ownerId: 3,
      address: "Venus Landing",
      city: "Venus",
      state: "Rift",
      country: "Ishtar Collective",
      lat: 57.9873,
      lng: 55.2340,
      name: "Vault of Glass",
      description: "Venus, one of the planets of sol currently inhabited by the advanced vex civilization",
      price: 34.89
    },
    {
      ownerId: 1,
      address: "Mars",
      city: "Hive",
      state: "Xivu Arath",
      country: "The great basin",
      lat: 35.9873,
      lng: 35.2340,
      name: "The red planet",
      description: "Mars was the a place where clovis bray managed to create a technological empire, unfortunately it is now lost to the darkness",
      price: 77.89
    },
    {
      ownerId: 1,
      address: "Europa",
      city: "Deep",
      state: "Stone",
      country: "House Salvation",
      lat: 35.9873,
      lng: 35.2340,
      name: "The crypt",
      description: "Europa is where humanity makes first contact with the darkness, that was then used to develop the exo race",
      price: 67.89
    },
    {
      ownerId: 1,
      address: "Dreaming City",
      city: "Mara",
      state: "Sov",
      country: "Pocket Dimension",
      lat: 35.9873,
      lng: 35.2340,
      name: "The last wish",
      description: "The dreaming city is the awoken's greatest secret holding one of the most dangerous creatures know to mankind",
      price: 57.89
    },
    {
      ownerId: 1,
      address: "Moon Landing",
      city: "Moon",
      state: "Crota",
      country: "The nightmare planet",
      lat: 35.9873,
      lng: 35.2340,
      name: "Hellmouth",
      description: "The moon was originally the domain of crota, a hive prince wielding a sinister sword",
      price: 47.89
    },
    {
      ownerId: 1,
      address: "Io",
      city: "Ikora",
      state: "Rey",
      country: "Ashir mir",
      lat: 35.9873,
      lng: 35.2340,
      name: "The hidden valley",
      description: "Io was a place for warlocks to master the light, and attune themselves to void energy",
      price: 37.89
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
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
