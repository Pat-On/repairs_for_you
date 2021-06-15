const express = require('express');
const router = express.Router();

import reviewRouter from "./reviewRouter"
import {
    pool
} from "./../db";
/*
    the main root of this router is: "/api/v1/offers"
*/
router.use('/:offerId/reviews', reviewRouter);

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const bookingsAll = await pool.query("SELECT * FROM offers")

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
    })
    .post(async (req, res, next) => {
            res.status(200).json({
                status: "success",
                msg: 'post method offersRouter "/"',
            });
        }

    );

router
    .route('/:offerId')
    .get(async (req, res, next) => {
        try {
            const {
                offerId
            } = req.params;

            const bookingsAll = await pool.query(
                `SELECT * FROM offers WHERE offer_id = $1`,
                [offerId]
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
                offerId
            } = req.params

            res.status(200).json({
                status: "success",
                msg: `patch method offersRouter "/:offerId" You sent ${offerId}`,
            });
        }

    )
    .delete(async (req, res, next) => {

            const {
                offerId
            } = req.params

            res.status(200).json({
                status: "success",
                msg: `delete method offersRouter "/:offerId" You sent ${offerId}`,
            });
        }
    );

module.exports = router;