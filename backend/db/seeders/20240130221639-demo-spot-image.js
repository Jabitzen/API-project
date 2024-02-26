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
        url: "https://m.media-amazon.com/images/I/81SNLEuNQuL.jpg",
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
        url: "https://destiny.wiki.gallery/images/thumb/7/79/Cosmodrome_pano.jpg/1200px-Cosmodrome_pano.jpg",
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
        url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/destiny/5/51/DTG_PlanetDetailPage_venus.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://pbs.twimg.com/media/Bd5FmmpIEAAQys_.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://cdn.mos.cms.futurecdn.net/CFhnxDSXFW9QMvGcXRTEAH-1200-80.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://hothardware.com/newsimages/Item30738/Big_DestinyVenus.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://i.pinimg.com/originals/74/79/11/747911bc162ef44e95182a23f1677d74.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/destiny/2/24/DTG_PlanetDetailPage_mars.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://i.insider.com/53ee6ab16bb3f7cd3c812217?width=700",
        preview: false
      },
      {
        spotId: 4,
        url: "https://imageio.forbes.com/specials-images/imageserve/5d6fab4b5b52ce0008824a07/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
        preview: false
      },
      {
        spotId: 4,
        url: "https://i.redd.it/tadw5zob75f31.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://pbs.twimg.com/media/BbER6V3IYAA1AHS.jpg:large",
        preview: false
      },
      {
        spotId: 5,
        url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2021/02/Destiny-2-Europa.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/destiny-2/e/e0/Europa.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://i.redd.it/3cjaayanp3s81.png",
        preview: false
      },
      {
        spotId: 5,
        url: "https://d1lss44hh2trtw.cloudfront.net/assets/article/2020/11/11/reclaiming-europa-quest-destiny-2_feature.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://cdn.mos.cms.futurecdn.net/npLBsvJtuVF4dpSLTWWxpZ.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://www.pcgamesn.com/wp-content/sites/pcgamesn/2018/08/destiny-2-forsaken-last-wish.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://cdn.mos.cms.futurecdn.net/2yodcpeBohYHGFgmBVSdJU.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://destiny.wiki.gallery/images/thumb/4/42/Dreamingcity.png/1200px-Dreamingcity.png",
        preview: false
      },
      {
        spotId: 6,
        url: "https://imageio.forbes.com/blogs-images/insertcoin/files/2018/09/dreaming-city-destiny3.jpg?format=jpg&height=600&width=1200&fit=bounds",
        preview: false
      },
      {
        spotId: 6,
        url: "https://s3.amazonaws.com/prod-media.gameinformer.com/styles/full/s3/2018/07/17/ecc33a36/DreamingCity2.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/destiny/c/c0/DTG_PlanetDetailPage_moon.jpg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://miro.medium.com/v2/resize:fit:1400/0*IrcmEvPNILuF7nSs.png",
        preview: false
      },
      {
        spotId: 7,
        url: "https://www.pcgamesn.com/wp-content/sites/pcgamesn/2019/07/destiny-2-shadowkeep-moon-map.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://cdn.mos.cms.futurecdn.net/WGwpkLqsnxTSnKshdw2i7W.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://cdn.vox-cdn.com/thumbor/1S3Q2m42RYGZ6-v-JYMQs4ciVtk=/0x0:1920x1080/1200x675/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/64017779/D2_Moon_01.0.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://pbs.twimg.com/media/Fg1G5g0WYAA4FPw.jpg:large",
        preview: true
      },
      {
        spotId: 8,
        url: "https://i.redd.it/xl3xcjyi5tl01.png",
        preview: false
      },
      {
        spotId: 8,
        url: "https://kseeker5.github.io/wallpapers/images/wallpapers/destiny2/Destiny%202%20-%20Io%205.png",
        preview: false
      },
      {
        spotId: 8,
        url: "https://i.ytimg.com/vi/HwAcyoDhMn0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB-fhwk19NonJDm0HwJEkWivvVQwA",
        preview: false
      },
      {
        spotId: 8,
        url: "https://cdnb.artstation.com/p/assets/images/images/032/809/667/large/eve-astra-cradle-tree-013.jpg?1607532549",
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
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {});
  }
};
