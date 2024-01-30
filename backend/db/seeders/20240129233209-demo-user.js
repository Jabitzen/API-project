'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

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
    await User.bulkCreate([
      {
        email: 'nineveh@loa.io',
        username: 'Nineveh1',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'Nineveh',
        lastName: 'Sidereal'
      },
      {
        email: 'balthorr@loa.io',
        username: 'Balthorr2',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Balthorr',
        lastName: "Sidereal"
      },
      {
        email: 'thirain@loa.io',
        username: 'Thirain3',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: "Thirain",
        lastName: 'Sidereal'
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
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Nineveh1', 'Balthorr2', 'Thirain3'] }
    }, {});
  }
};
