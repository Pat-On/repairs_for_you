const express = require("express");
const router = express.Router();

/*
    the main root of this router is: "/api/v1/booking"
*/

router
    .route("/")
    .get(async (req, res, next) => {
        res.status(200).json({
            status: "success",
            msg: 'get method bookingRouter "/"',
        });
    })
    .post(async (req, res, next) => {
        res.status(200).json({
            status: "success",
            msg: 'post method bookingRouter "/"',
        });
    });

router
    .route("/:bookingId")
    .get(async (req, res, next) => {

        const {
            bookingId
        } = req.params

        res.status(200).json({
            status: "success",
            msg: `get method bookingRouter "/:bookingId" You sent ${bookingId}`,
        });
    })
    .patch(async (req, res, next) => {

        const {
            bookingId
        } = req.params

        res.status(200).json({
            status: "success",
            msg: `patch method bookingRouter "/:bookingId" You sent ${bookingId}`,
        });
    })
    .delete(async (req, res, next) => {

        const {
            bookingId
        } = req.params

        res.status(200).json({
            status: "success",
            msg: `delete method bookingRouter "/:bookingId" You sent ${bookingId}`,
        });
    });

module.exports = router;