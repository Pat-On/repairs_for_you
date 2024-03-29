const express = require("express");
const router = express.Router();

import { pool } from "./../db";
import authController from "./../controller/authController";
import userController from "./../controller/userController";

router.post("/signup", authController.signup);
router.post("/login", authController.login);
// router.get('/logout', /* FUNCTION*/);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// all bellow - you need to be authenticated

//at this point we can use the route which is going to protect everything below
// because middleware are called sequentially

/**
 * To reach routes bellow You need to be logged in
 */
router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);

router.get("/me", async (req, res, next) => {
  res.status(200).json({
    status: "success",
    msg: `get method usersRouter "/me"`,
  });
});

// we are getting id from the token jwt so no one can update someone else account! <3
router.patch("/updateMe", authController.protect, userController.updateMe);
router.delete("/deleteMe", async (req, res, next) => {
  res.status(200).json({
    status: "success",
    msg: `delete method usersRouter "/deleteMe"`,
  });
});

/*

    Routes dedicated only for admin

*/

/**
 * To reach routes bellow You need to be logged in as a administrator
 */
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const bookingsAll = await pool.query("SELECT * FROM users");

      res.status(200).json({
        status: "success",
        length: bookingsAll.rowCount,
        data: bookingsAll.rows,
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
      msg: 'post method usersRouter "/"',
    });
  });

router
  .route("/:userId")
  .get(async (req, res, next) => {
    try {
      const { userId } = req.params;

      const bookingsAll = await pool.query(
        `SELECT * FROM users WHERE user_id = $1`,
        [userId]
      );

      res.status(200).json({
        status: "success",
        status: "success",
        length: bookingsAll.rowCount,
        data: bookingsAll.rows[0],
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        msg: error.message,
      });
    }
  })
  .patch(async (req, res, next) => {
    const { userId } = req.params;

    res.status(200).json({
      status: "success",
      msg: `patch method usersRouter "/:offerId" You sent ${userId}`,
    });
  })
  .delete(async (req, res, next) => {
    const { userId } = req.params;

    res.status(200).json({
      status: "success",
      msg: `delete method usersRouter "/:offerId" You sent ${userId}`,
    });
  });

module.exports = router;
