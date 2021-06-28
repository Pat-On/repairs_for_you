const express = require("express");
const router = express.Router();
import {
    pool,
} from "./../db";
/*
    the main root of this router is: "/api/v1/booking"
*/

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const bookingsAll = await pool.query("SELECT * FROM offers");

            res.status(200).json({
                status: "success",
                msg: "bookings route was not created yet",
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                msg: error.message,
            });
        }
    })
    .post(async (req, res, next) => {
        res.status(200).json({
            status: "success",
            msg: "post method bookingRouter \"/\"",
        });
    });

router
    .route("/:bookingId")
    .get(async (req, res, next) => {
        try {
            const {
                bookingId,
            } = req.params;

            const bookingsAll = await pool.query(
                "SELECT * FROM offers WHERE offer_id = $1",
                [bookingId]
            );

            res.status(200).json({
                status: "success",
                msg: "bookings route was not created yet",
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
            bookingId,
        } = req.params;

        res.status(200).json({
            status: "success",
            msg: `patch method bookingRouter "/:bookingId" You sent ${bookingId}`,
        });
    })
    .delete(async (req, res, next) => {
        const {
            bookingId,
        } = req.params;

        res.status(200).json({
            status: "success",
            msg: `delete method bookingRouter "/:bookingId" You sent ${bookingId}`,
        });
    });

module.exports = router;