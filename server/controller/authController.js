import { createHmac } from "crypto";
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
import userModel from "../model/userModel";

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
    res.status(200).json({
      status: "success",
      msg: passwordResetToken,
    });

    // send back as a email
  } catch (error) {
    res.status(404).json({
      status: "fail",
      msg: error.message,
    });
  }
};
exports.resetPassword = (req, res, next) => {};

//   npm install jsonwebtoken
// npm WARN acorn-jsx@5.3.1 requires a peer of acorn@^6.0.0 || ^7.0.0 || ^8.0.0 but none is installed. You must install peer dependencies yourself.
// npm WARN mini-create-react-context@0.4.0 requires a peer of react@^0.14.0 || ^15.0.0 || ^16.0.0 but none is installed. You must install peer dependencies yourself.
// npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.2 (node_modules\@babel\cli\node_modules\fsevents):
// npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"ia32"})
// npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\fsevents):
// npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"ia32"})
// npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.1 (node_modules\nodemon\node_modules\fsevents):
// npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.1: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"ia32"})