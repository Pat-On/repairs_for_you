import { createHmac } from "crypto";
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
import userModel from "../model/userModel";

const secret = "abcdefg";
const hash = createHmac("sha256", secret)
  .update("I love cupcakes")
  .digest("hex");

exports.signup = async (req, res, next) => {
  try {
    const newUser = await userModel.signUpQuery(req.body);

    console.log(newUser)

    res.status(201).json({
      status: "success",
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






//   npm install jsonwebtoken
// npm WARN acorn-jsx@5.3.1 requires a peer of acorn@^6.0.0 || ^7.0.0 || ^8.0.0 but none is installed. You must install peer dependencies yourself.
// npm WARN mini-create-react-context@0.4.0 requires a peer of react@^0.14.0 || ^15.0.0 || ^16.0.0 but none is installed. You must install peer dependencies yourself.
// npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.2 (node_modules\@babel\cli\node_modules\fsevents):
// npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"ia32"})
// npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\fsevents):
// npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"ia32"})
// npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.1 (node_modules\nodemon\node_modules\fsevents):
// npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.1: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"ia32"})
