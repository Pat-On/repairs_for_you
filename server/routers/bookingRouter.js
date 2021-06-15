const express = require("express");
const router = express.Router();

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
            msg: 'get method bookingRouter "/"',
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
            msg: `get method bookingRouter "/:id" You sent${id}`,
        });
    })
    .patch(async (req, res, next) => {

        const {
            id
        } = req.params

        res.status(200).json({
            status: "success",
            msg: `patch method bookingRouter "/:id" You sent${id}`,
        });
    })
    .delete(async (req, res, next) => {

        const {id} = req.params
        
                res.status(200).json({
                    status: "success",
                    msg: `delete method bookingRouter "/:id" You sent${id}`,
                });
            });

module.exports = router;