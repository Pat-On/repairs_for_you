import { createHash } from "crypto";
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
import userModel from "../model/userModel";
const sendEmail = require("../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/**
 * @description function is creating and sending token and expiration time. Function is using signToken() helper function
 * @param {object} user
 * @param {integer} statusCode
 * @param {response object} res
 */
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.user_id);

  const expirationTime = new Date();
  expirationTime.setMinutes(
    expirationTime.getMinutes() +
      parseInt(process.env.JWT_COOKIE_EXPIRES_IN_MINUTES)
  );

  const cookieOptions = {
    expires: expirationTime,
    httpOnly: true,
  };
  if (process.env.DATABASE_URL) cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    expirationTime,
    data: {
      user,
    },
  });
};

/**
 *  * @Description this is the controller responsible for signing up the user.
 * this controller importing signUpUser from userModel.js
 * */
exports.signup = async (req, res, next) => {
  try {
    // Is it logical to pass req.body or just to split data here to?
    const newUser = await userModel.signUpUser(req.body);

    createSendToken(newUser.rows[0], 201, res);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
};

/**
 *  * @Description this is the controller responsible for login  the user.
 * this controller importing logInUser from userModel.js
 * */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // to check email and password
    if (!email || !password)
      throw new Error("Please provide email and password");

    // correctness of password and email
    const newUser = await userModel.logInUser(req.body);

    // all ok - > send token
    createSendToken(newUser, 201, res);

  } catch (error) {
    res.status(401).json({
      status: "fail",
      msg: error.message,
    });
  }
};

/**
 * @description Middleware used to protection of routes
 */
exports.protect = async (req, res, next) => {
  try {
    // 1 - getting token and check if it exist
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      //!TODO: next step it would be great to implement GLOBAL error handling!
      res.status(401).json({
        status: "fail",
        msg: "You are not logged in! Please log in to get access.",
      });
    }
    // 2 verification of token <- the most important jwt is going to do it
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3 check if the user still exist
    // 4 if user changed password after jwt token was sent to him
    const fetchedUser = await userModel.findUserByTokenDecoded(decoded);

    //GRANTING ACCESS TO PROTECTED ROUTE
    req.user = fetchedUser;
    next();
  } catch (error) {
    res.status(401).json({
      status: "fail",
      msg: error.message,
    });
  }
};

/**
 *
 * @param  {Array of strings} roles  is the Array of the roles which are passed to the function
 * @returns
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //!TODO it should send error 403 -> We need to specify the global error handling or introduce temporary solution
    if (!roles.includes(req.user.user_role))
      throw new Error("You do not have permission to perform this action");
    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  try {
    // get user based on posted email
    const user = await userModel.findOneUser(req.body);

    // generate the random reset token and saving it to DB
    const passwordResetToken = await userModel.createPasswordResetToken(user);

    // send back as a email
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${passwordResetToken}`;

    const message = `Forgot Your password? Submit a Patch request with your new password and password Confirm  to: 
          ${resetURL}. \nIf You did not forger your password, please ignore this email!`;

    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid 10 minutes)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to your email address",
    });
  } catch (error) {
    // !TODO in this place in case of error we have to undone the changes in DB in users -> password token and expire token - delete it
    res.status(404).json({
      status: "fail",
      msg: error.message,
    });
  }
};
exports.resetPassword = async (req, res, next) => {
  try {
    // get user base on the token
    const hashedToken = createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    //set new password only if the token is not expired and there is the user - set new password
    // ANOTHER APPROACH IS TO BUILD ERROR BASE ON FETCHING OR NOT FETCHING USERS (?)
    const user = await userModel.findUserBaseOnResetToken(hashedToken);

    // update changedPasswordAt for the current user
    // - it looks very repetitive. There must be better way
    // - I need to hash the new password as well.

    await userModel.updatePasswordAfterRecovery(
      user,
      req.body.password,
      req.body.passwordConfirm
    );

    //login user in
    createSendToken(user, 201, res);
  } catch (error) {
    res.status(404).json({
      status: "fail",
      msg: error.message,
    });
  }
};

/**
 * @@description only for logged in user
 */
exports.updatePassword = async (req, res, next) => {
  //TODO: logically it would be much better to check if passwordCandidate and passwordCandidateConfirm
  // are the same from start because it would save at least 1 request to DB
  try {
    // get user from DB
    const user = await userModel.findUserById(
      req.user.user_id,
      req.body.passwordCurrent
    );

    // check if posted password is correct - second level confirmation
    //!TODO: temporary implemented in messy way in one function inside userModel

    // if correct update password
    //!TODO: think over if i need to return something here for security reasons
    const updatesUser = await userModel.updateUserPassword(
      user.user_id,
      req.body.passwordCandidate,
      req.body.passwordCandidateConfirm
    );

    // log user in with new password - jwt token
    //login user in
    createSendToken(user, 201, res);

  } catch (error) {
    res.status(404).json({
      status: "fail",
      msg: error.message,
    });
  }
};
