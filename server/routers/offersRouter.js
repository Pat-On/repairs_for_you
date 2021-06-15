const express = require('express');
const router = express.Router();

import reviewRouter from "./reviewRouter"

/*
    the main root of this router is: "/api/v1/offers"
*/
router.use('/:offerId/reviews', reviewRouter);

router
    .route('/')
    .get(async (req, res, next) => {
        res.status(200).json({
            status: "success",
            msg: 'post method offersRouter "/"',
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

        const {
            offerId
        } = req.params

        res.status(200).json({
            status: "success",
            msg: `get method offersRouter "/:offerId" You sent ${offerId}`,
        });
    })
    .patch(async (req, res, next) => {

            const {
                offerId
            } = req.params

            res.status(200).json({
                status: "success",
                msg: `get method offersRouter "/:offerId" You sent ${offerId}`,
            });
        }

    )
    .delete(async (req, res, next) => {

            const {
                offerId
            } = req.params

            res.status(200).json({
                status: "success",
                msg: `get method offersRouter "/:offerId" You sent ${offerId}`,
            });
        }
    );

module.exports = router;