const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', async (req, res) => {
        const allSpots = await Spot.findAll();

        for (const curr of allSpots) {
            // rating
            let count = await Review.count({
                where: {
                    spotId: curr.id
                }
            });
            let sum = await Review.sum('stars', {
                where: {
                    spotId: curr.id
                }
            })
            let avgRating = (sum / count) || 0;
            curr.dataValues.avgRating = avgRating;
            // preview image
            let spotImage = await SpotImage.findOne({
                where: {
                    spotId: curr.id
                }
            })
            if (spotImage) {
                curr.dataValues.previewImage = spotImage.url;
            } else {
                curr.datavalues.previewImage = null;
            }

        }


        res.json({
            Spots: allSpots
        });
    }
);

module.exports = router;
