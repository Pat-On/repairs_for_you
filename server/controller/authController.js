import { createHmac, randomBytes, createHash } from "crypto";
import { send } from "process";
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
import userModel from "../model/userModel";
const sendEmail = require("../utils/email");

// const secret = "abcdefg";
// const hash = createHmac("sha256", secret)
//   .update("I love cupcakes")
//   .digest("hex");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
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
    console.log(newUser.rows[0].user_id);
    const token = signToken(newUser.rows[0].user_id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        //envelope
        user: newUser.rows[0],
      },
    });
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
    const token = signToken(newUser.user_id);
    res.status(200).json({
      status: "success",
      token,
    });
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
    console.log(token);
    if (!token) {
      //!TODO: next step it would be great to implement GLOBAL error handling!
      res.status(401).json({
        status: "fail",
        msg: "You are not logged in! Please log in to get access.",
      });
    }
    // 2 verification of token <- the most important jwt is going to do it
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    // 3 check if the user still exist
    // 4 if user changed password after jwt token was sent to him
    const fetchedUser = await userModel.findUserByTokenDecoded(decoded);
    console.log(fetchedUser);

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
    console.log(req.body);
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
      message: "Token sent to email",
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
    console.log(req.params.token);
    // get user base on the token
    const hashedToken = createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    //set new password only if the token is not expired and there is the user - set new password
    // ANOTHER APPROACH IS TO BUILD ERROR BASE ON FETCHING OR NOT FETCHING USERS (?)
    const user = await userModel.findUserBaseOnResetToken(hashedToken);
    console.log(user);
    // update changedPasswordAt for the current user
    // - it looks very repetitive. There must be better way
    // - I need to hash the new password as well.

    await userModel.updatePasswordAfterRecovery(
      user,
      req.body.password,
      req.body.passwordConfirm
    );

    //login user in
    const token = signToken(user.user_id);
    res.status(200).json({
      status: "success",
      token,
    });
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
    console.log("I got to auth 111111111111111 CONTROLER*********************************************")
    // get user from DB
    console.log(req.user)
    const user = await userModel.findUserById(
      req.user.user_id,
      req.body.passwordCurrent
    );
    // console.log(req.user);
    // console.log(user);
    // check if posted password is correct - second level confirmation
    //!TODO: temporary implemented in messy way in one function inside userModel
    console.log("I got to auth CONTROLER*********************************************")
    // if correct update password
    //!TODO: think over if i need to return something here for security reasons
    const updatesUser = await userModel.updateUserPassword(
      user.user_id,
      req.body.passwordCandidate,
      req.body.passwordCandidateConfirm
    );

    // log user in with new password - jwt token
    //login user in
    const token = signToken(user.user_id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      msg: error.message,
    });
  }
};

//   npm install jsonwebtoken
// npm WARN acorn-jsx@5.3.1 requires a peer of acorn@^6.0.0 || ^7.0.0 || ^8.0.0 but none is installed. You must install peer dependencies yourself.
// npm WARN mini-create-react-context@0.4.0 requires a peer of react@^0.14.0 || ^15.0.0 || ^16.0.0 but none is installed. You must install peer dependencies yourself.
// npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.2 (node_modules\@babel\cli\node_modules\fsevents):
// npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"ia32"})
// npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\fsevents):
// npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"ia32"})
// npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.1 (node_modules\nodemon\node_modules\fsevents):
// npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.1: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"ia32"})
