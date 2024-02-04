const express = require('express');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');

const router = express.Router();

const validateSpots = [
    check('address')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true})
        .isFloat({ min: -90, max: 90})
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .exists({ checkFalsy: true})
        .isFloat({ min: -180, max: 180})
        .withMessage('Longitude must be within -180 and 180'),
    check('name')
        .exists({ checkFalsy: true})
        .notEmpty()
        .isLength({ max: 50})
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true})
        .isFloat({ min: 0.01})
        .withMessage('Price per day must be a positive number'),
    handleValidationErrors
]

validateReviews = [
    check('review')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true})
        .notEmpty()
        .isInt({ min: 1, max:5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

validateQuery = [
    query('page')
        .optional()
        .isInt({min: 1, max:10})
        .withMessage('Page must be greater than or equal to 1'),
    query('size')
        .optional()
        .isInt({min: 1, max:20})
        .withMessage('Size must be greater than or equal to 1'),
    query('minLat')
        .optional()
        .isFloat({min: -90, max:90})
        .withMessage('Minimum latitude is invalid'),
    query('maxLat')
        .optional()
        .isFloat({min: -90, max:90})
        .withMessage('Maximum latitude is invalid'),
    query('minLng')
        .optional()
        .isFloat({min: -180, max:180})
        .withMessage('Minimum longitude is invalid'),
    query('maxLng')
        .optional()
        .isFloat({min: -180, max:180})
        .withMessage('Maximum longitude is invalid'),
    query('minPrice')
        .optional()
        .isFloat({min: 0})
        .withMessage("Minimum price must be greater than or equal to 0"),
    query('maxPrice')
        .optional()
        .isFloat({min: 0})
        .withMessage("Maximum    price must be greater than or equal to 0"),
    handleValidationErrors
]

router.get('/current', requireAuth, async (req, res) => {
    const currUserId = req.user.id;
    const userSpots = await Spot.findAll({
        where: {
            ownerId: currUserId
        }
    });

    for (const curr of userSpots) {
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
        if (spotImage && spotImage.url) {
            curr.dataValues.previewImage = spotImage.url;
        } else {
            curr.dataValues.previewImage = "Not Available";
        }
    }
    res.json({
        Spots: userSpots
    });
});

router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: {
            model: Review
        }
    });

    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    const reviews = spot.Reviews
    for (const review of reviews) {
        const user = await User.findByPk(review.userId, {
            attributes: ['id', 'firstName', 'lastName']
        })
        review.dataValues.User = user;

        const reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: review.dataValues.id
            },
            attributes: ['id', 'url']
        })
        // console.log(reviewImages)
        review.dataValues.ReviewImages = reviewImages;
    }
    res.json({
        Reviews: reviews
    });
});

router.post('/:spotId/reviews', requireAuth, validateReviews, async (req, res) => {
    const userId = req.user.id;
    const { review, stars } = req.body;
    const {spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        })
    }


    const currReview = await Review.findOne({
        where: {
            userId: userId,
            spotId: spotId
        }
    })

    if (currReview) {
        res.status(500);
        return res.json({
            message: 'User already has a review for this spot'
        })
    }

    const newReview = await spot.createReview({userId, review, stars})
    res.status(201);
    res.json(newReview);
});

router.get('/:spotId/bookings', requireAuth, async (req, res) => {

    const userId = req.user.id;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    if (userId !== spot.ownerId) {
        const bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })

        return res.json({
            Bookings: bookings
        })
    } else {
        const bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        })

        return res.json({
            Bookings: bookings
        })
    }
});

router.post('/:spotId/bookings', requireAuth, async (req, res) => {

    const userId = req.user.id;
    const spotId = req.params.spotId;
    const { startDate, endDate } = req.body;
    const spot = await Spot.findByPk(spotId, {
        include: {
            model: Booking
        }
    });

    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    if (userId === spot.ownerId) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }

    if (new Date(startDate) < Date.now()) {
        res.status(400);
        return res.json({
            message: "Bad Request",
            errors: {
                startDate: "startDate cannot be in the past"
            }
        })
    }

    if (new Date(startDate) >= new Date(endDate)) {
        res.status(400);
        return res.json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        })
    }

    const booking = await Booking.findOne({
        where: {
            spotId: spotId,
            [Op.and]: [
                { startDate: { [Op.lte]: new Date(endDate)}},
                { endDate: { [Op.gte]: new Date(startDate)}}
            ]
        }
    })

    if (booking) {
        res.status(403);
        return res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with and existing Booking"
            }
        })
    }

    const newBooking = await spot.createBooking({
        userId: userId,
        startDate: startDate,
        endDate: endDate
    })

    res.json(newBooking);
});

router.get('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                as: "Owner"
            }
        ]
    });

    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    // hide url if preview is false
    const spotImages = spot.dataValues.SpotImages;
    for (image of spotImages) {
        if (!image.dataValues.preview) {
            image.dataValues.url = "No preview available";
        }
    }

    let count = await Review.count({
        where: {
            spotId: spot.id
        }
    });
    let sum = await Review.sum('stars', {
        where: {
            spotId: spot.id
        }
    })
    let avgRating = (sum / count) || 0;
    spot.dataValues.numReviews = count;
    spot.dataValues.avgStarRating = avgRating;
    // preview image
    res.json(spot);
});

router.get('/', validateQuery, async (req, res) => {
    let { size, page, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    if (!size) {
        size = 20;
    }
    if (!page) {
        page = 1;
    }

    if (size > 20 || size < 1) {
        size = 20;
    }

    if (page > 10 || page < 1) {
        page = 1;
    }

    const queryObj = {
        where: {}
    }

    const pagination = {
        limit: size,
        offset: size * (page - 1)
    }

    if (minLat) {
        queryObj.where.lat = { [Op.gte] : minLat }
    }

    if (maxLat) {
        queryObj.where.lat = { [Op.lte] : maxLat }
    }

    if (minLat && maxLat) {
        queryObj.where.lat = { [Op.between] : [minLat, maxLat] }
    }

    if (minLng) {
        queryObj.where.lng = { [Op.gte] : minLng }
    }

    if (maxLng) {
        queryObj.where.lng = { [Op.lte] : maxLng }
    }

    if (minLng && maxLng) {
        queryObj.where.lng = { [Op.between] : [minLng, maxLng] }
    }

    if (minPrice) {
        queryObj.where.price = { [Op.gte] : minPrice }
    }

    if (maxPrice) {
        queryObj.where.price = { [Op.lte] : maxPrice }
    }

    if (minPrice && maxPrice) {
        queryObj.where.price = { [Op.between] : [minPrice, maxPrice] }
    }

    const allSpots = await Spot.findAll({...queryObj, ...pagination});

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

        if (spotImage && spotImage.url) {
            curr.dataValues.previewImage = spotImage.url;
        } else {
            curr.dataValues.previewImage = "Not available";
        }

        curr.lat = parseFloat(curr.lat);
        curr.lng = parseFloat(curr.lng);
        curr.price = parseFloat(curr.price);
    }
    res.json({
        Spots: allSpots,
        page,
        size
    });
});

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const userId  = req.user.id;
    const { spotId } = req.params;
    const { url, preview } = req.body;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        });
    }

    if (userId !== spot.ownerId) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }

    const spotImage = await spot.createSpotImage({
        spotId,
        url,
        preview
    })
    res.json({
        id: spotImage.id,
        url: spotImage.url,
        preview: spotImage.preview
    });
});

router.post('/', requireAuth, validateSpots, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const spot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.status(201);
    res.json(spot);
});

router.put('/:spotId', requireAuth, validateSpots, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const { spotId } = req.params;
    const userId = req.user.id;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        });
    }

    if (userId !== spot.ownerId) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }

    spot.address = address || spot.address
    spot.city = city || spot.city
    spot.state = state || spot.state
    spot.country = country || spot.country
    spot.lat = lat || spot.lat
    spot.lng = lng || spot.lng
    spot.name = name || spot.name
    spot.description = description || spot.description
    spot.price = price || spot.price

    await spot.save();
    res.json(spot);
});

router.post('/', requireAuth, validateSpots, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const spot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.status(201);
    res.json(spot);
});

router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        });
    }

    if (userId !== spot.ownerId) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }

    await spot.destroy();

    res.json({
        message: "Successfully deleted"
    })
});



module.exports = router;
