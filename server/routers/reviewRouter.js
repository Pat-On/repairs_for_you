const express = require('express');
const router = express.Router();

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
        res.status(200).json({
            status: "success",
            msg: 'get method reviewRouter "/"',
        });
    })
    .post(async (req, res, next) => {
        res.status(200).json({
            status: "success",
            msg: 'post method reviewRouter "/"',
        });
    });

router
    .route("/:reviewId")
    .get(async (req, res, next) => {

        const {
            reviewId
        } = req.params

        res.status(200).json({
            status: "success",
            msg: `get method reviewRouter "/:reviewId" You sent ${reviewId}`,
        });
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