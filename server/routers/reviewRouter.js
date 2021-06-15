const express = require('express');
const router = express.Router();

/*
    the main root of this router is: "/api/v1/booking"

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
    .route("/:id")
    .get(async (req, res, next) => {

        const {
            id
        } = req.params

        res.status(200).json({
            status: "success",
            msg: `get method reviewRouter "/:id" You sent ${id}`,
        });
    })
    .patch(async (req, res, next) => {

        const {
            id
        } = req.params

        res.status(200).json({
            status: "success",
            msg: `patch method reviewRouter "/:id" You sent ${id}`,
        });
    })
    .delete(async (req, res, next) => {

        const {
            id
        } = req.params

        res.status(200).json({
            status: "success",
            msg: `delete method bookingRouter "/:id" You sent ${id}`,
        });
    });





module.exports = router;