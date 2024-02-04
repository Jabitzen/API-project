const express = require('express');
const { requireAuth } = require('../../utils/auth');

const { Spot, Review, ReviewImage, User, SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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

router.get('/current', requireAuth, async(req, res) => {
    const userId = req.user.id;

    const reviews = await Review.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                }
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['reviewId', 'updatedAt', 'createdAt']
                }
            }
        ]
    })

    for (let review of reviews) {
        let preview = await SpotImage.findOne({
            where: {
                spotId: review.dataValues.Spot.dataValues.id
            },
            attributes: ['url'],
        })
        review.dataValues.Spot.dataValues.previewImage = preview.url;

        review.dataValues.Spot.dataValues.lat = parseFloat(review.dataValues.Spot.dataValues.lat);
        review.dataValues.Spot.dataValues.lng = parseFloat(review.dataValues.Spot.dataValues.lng);
        review.dataValues.Spot.dataValues.price = parseFloat(review.dataValues.Spot.dataValues.price);
    }

    res.json({Reviews: reviews});
})

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    const { url} = req.body;


    const review = await Review.findByPk(reviewId, {
        include: ReviewImage
    })

    if (!review) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found"
        })
    }

    if (userId !== review.userId) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }

    if (review.ReviewImages.length >= 10) {
        res.status(403);
        return res.json({
            message: "Maximum number of images for this resource was reached"
        })
    }

    const newImage = await review.createReviewImage({url});

    res.json({
        id: newImage.dataValues.id,
        url: newImage.dataValues.url
    })
})

router.put('/:reviewId', requireAuth, validateReviews, async (req, res) => {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    const { review, stars } = req.body;


    const updatedReview = await Review.findByPk(reviewId);

    if (!updatedReview) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found"
        })
    }

    if (userId !== updatedReview.userId) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }

    updatedReview.review = review || updatedReview.review
    updatedReview.stars = stars || updatedReview.stars

    await updatedReview.save();

    res.json(updatedReview)
})

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;

    const review = await Review.findByPk(reviewId);

    if (!review) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found"
        })
    }

    if (userId !== review.userId) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }

    await review.destroy();

    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;
