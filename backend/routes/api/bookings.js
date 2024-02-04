const express = require('express');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const { Booking, Spot, SpotImage } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const bookings = await Booking.findAll({
        where: {
            userId: userId
        },
        include: {
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            }
        }
    })

    for (const booking of bookings) {
        const spot = booking.dataValues.Spot;
        const spotImg = await SpotImage.findOne({
            where: {
                spotId: spot.dataValues.id,
                // preview: true
            }
        })
        spot.dataValues.previewImage = spotImg.dataValues.preview ? spotImg.dataValues.url : "Preview not available";
        spot.dataValues.lat = parseFloat(spot.dataValues.lat);
        spot.dataValues.lng = parseFloat(spot.dataValues.lng);
        spot.dataValues.price = parseFloat(spot.dataValues.price);
    }

    res.json({
        Bookings: bookings
    })
})

router.put('/:bookingId', requireAuth, async (req, res) => {

    const userId = req.user.id;
    const { startDate, endDate } = req.body;
    const bookingId = req.params.bookingId;

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found"
        })
    }

    if (userId !== booking.userId) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }

    if (new Date(endDate) < Date.now()) {
        res.status(403);
        return res.json({
            message: "Past bookings can't be modified"
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
                startDate: "endDate cannot be on or before startDate"
            }
        })
    }

    const conflictBooking = await Booking.findOne({
        where: {
            id: {[Op.ne]: booking.id},
            spotId: booking.spotId,
            [Op.and]: [
                { startDate: { [Op.lte]: new Date(endDate)}},
                { endDate: { [Op.gte]: new Date(startDate)}}
            ]
        }
    })

    if (conflictBooking) {
        res.status(403);
        return res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing Booking"
            }
        })
    }

    booking.startDate = startDate || booking.startDate;
    booking.endDate = endDate || booking.endDate;

    await booking.save();
    res.json(booking);
});

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found"
        });
    }

    const spot = await Spot.findOne({
        where: {
            id: booking.spotId
        }
    });

    if (userId !== booking.userId && userId !== spot.ownerId) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }

    if (new Date(booking.startDate) <= Date.now()) {
        res.status(403);
        return res.json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    await booking.destroy();

    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;
