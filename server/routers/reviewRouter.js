const express = require('express');
const router = express.Router();
import {
    pool
} from "./../db";

/*
    the main root of this router is: "/api/v1/reviews"

    or

    if the request upcoming from offersRouter"
    /api/v1/booking/:offerId/reviews
    
    but it still will work in the same way, just it is another redirection

    try: http://localhost:3000/api/v1/offers/22/reviews
*/
router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const bookingsAll = await pool.query("SELECT * FROM reviews")

            res.status(200).json({
                status: "success",
                length: bookingsAll.rowCount,
                data: bookingsAll.rows
            });

        } catch (error) {

            res.status(400).json({
                status: "fail",
                msg: error.message,
              });
        }
        res.status(200).json({
            status: "success",
            msg: 'get method bookingRouter "/"',
        });
    });

router
    .route("/:reviewId")
    .get(async (req, res, next) => {
        try {
            const {
                reviewId
            } = req.params;

            const bookingsAll = await pool.query(
                `SELECT * FROM offers WHERE offer_id = $1`,
                [reviewId]
            );

            res.status(200).json({
                status: "success",
                status: "success",
                length: bookingsAll.rowCount,
                data: bookingsAll.rows[0]
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                msg: error.message,
            });
        }
    })
    .patch(async (req, res, next) => {

        const {
            reviewId
        } = req.params

        res.status(200).json({
            status: "success",
            msg: `patch method reviewRouter "/:reviewId" You sent ${reviewId}`,
        });
    })
    .delete(async (req, res, next) => {

        const {
            reviewId
        } = req.params

        res.status(200).json({
            status: "success",
            msg: `delete method bookingRouter "/:reviewId" You sent ${reviewId}`,
        });
    });

module.exports = router;