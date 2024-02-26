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
        spotId: 1,
        url: "https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://img.freepik.com/free-photo/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai_188544-9655.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1708387200&semt=sph",
        preview: false
      },
      {
        spotId: 1,
        url: "https://starwalk.space/gallery/images/what-is-space/1920x1080.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://t4.ftcdn.net/jpg/03/86/82/73/360_F_386827376_uWOOhKGk6A4UVL5imUBt20Bh8cmODqzx.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://images.ctfassets.net/umhrp0op95v1/7zcOxjyT464azRCDVpQZCJ/ec15010734031691837760200a3e3e4d/Yorn-Notes-Header-1080.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://www.gamespot.com/a/uploads/scale_super/1552/15524586/3288115-destiny_2_earth_forest_3840.1495133169.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.gamespot.com/a/uploads/scale_super/1552/15524586/3288089-2017091511303314.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.gamespot.com/a/uploads/scale_super/1552/15524586/3288092-03_farm_travelershard_getlightback_super.mp4.00_00_23_06.still001.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.gamespot.com/a/uploads/scale_super/1552/15524586/3288082-2017091511042822.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://images.ctfassets.net/umhrp0op95v1/g6jo58M8vu9BOEw4Lab5S/7a53517db07c3e29259997a5926cafef/East_Luterra_740.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.gamespot.com/a/uploads/scale_super/1552/15524586/3288078-2017091314185521.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.gamespot.com/a/uploads/scale_super/1552/15524586/3288079-2017091310313737.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.gamespot.com/a/uploads/scale_super/1552/15524586/3288080-2017091511013987.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.gamespot.com/a/uploads/scale_super/1552/15524586/3288081-2017091510585057.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://images.ctfassets.net/umhrp0op95v1/4a4VThLd74ApE2bS053N40/1d2e02de3de6a4f643377da24c8d70ea/LA_Voldis_Beauty_Screenshot__3__740.jpeg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://www.gamespot.com/a/uploads/scale_super/1552/15524586/3288090-2017091511352431.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://www.gamespot.com/a/uploads/scale_super/1552/15524586/3288088-2017091511282715.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://www.gamespot.com/a/uploads/scale_super/1552/15524586/3288083-2017091511092219.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://www.gamespot.com/a/uploads/scale_super/1552/15524586/3288087-2017091511192193.jpg",
        preview: false
      },
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
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
