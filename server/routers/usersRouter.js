const express = require('express');
const router = express.Router();

/* 
/signup
/login
/logout
/forgotPassword
/resetPassword/:token

Are going to be implemented later with authentication
*/

// this is different that others because we are going to handle a lot of things
// like authorization, that is why we are going to have special routes
// signup - is like special case so it is not suitable to other endpoints - divide by philosophy :>
// router.post('/signup', /* FUNCTION*/); 
// router.post('/login', /* FUNCTION*/);
// router.get('/logout', /* FUNCTION*/);

// router.post('/forgotPassword', /* FUNCTION*/);
// router.patch('/resetPassword/:token', /* FUNCTION*/);

// all bellow - you need to be authenticated

//at this point we can use the route which is going to protect everything below
// because middleware are called sequentially

router.patch(
    '/updateMyPassword',
    async (req, res, next) => {

        res.status(200).json({
            status: "success",
            msg: `get method usersRouter "/updateMyPassword"`,
        });
    }
);
router.get(
    '/me',
    async (req, res, next) => {

        res.status(200).json({
            status: "success",
            msg: `get method usersRouter "/me"`,
        });
    }
);
router.patch(
    '/updateMe',
    async (req, res, next) => {

        res.status(200).json({
            status: "success",
            msg: `get method usersRouter "/updateMe"`,
        });
    }
);
router.delete(
    '/deleteMe',
    async (req, res, next) => {

        res.status(200).json({
            status: "success",
            msg: `get method usersRouter "/deleteMe"`,
        });
    }
);

/*

    Routes dedicated only for admin

*/

router
    .route('/')
    .get(async (req, res, next) => {
        res.status(200).json({
            status: "success",
            msg: 'get method usersRouter "/"',
        });
    })
    .post(async (req, res, next) => {
        res.status(200).json({
            status: "success",
            msg: 'post method usersRouter "/"',
        });
    });
router
    .route('/:userId')
    .get(async (req, res, next) => {

        const {
            userId
        } = req.params

        res.status(200).json({
            status: "success",
            msg: `get method usersRouter "/:offerId" You sent ${userId}`,
        });
    })
    .patch(async (req, res, next) => {

        const {
            userId
        } = req.params

        res.status(200).json({
            status: "success",
            msg: `get method usersRouter "/:offerId" You sent ${userId}`,
        });
    })
    .delete(async (req, res, next) => {

        const {
            userId
        } = req.params

        res.status(200).json({
            status: "success",
            msg: `get method usersRouter "/:offerId" You sent ${userId}`,
        });
    });

module.exports = router;