import { createHmac } from "crypto";
const bcrypt = require("bcryptjs");
import { pool } from "../db";

// !IMPORTANT: WHAT ABOUT SECURITY HOOKS IN postgres
exports.signUpUser = async (userObj) => {
  try {
    // 1) TO CHECK IF INPUT HAS WHAT WE NEED plus SANITIZATION
    const { name, email, password, passwordConfirm } = userObj;

    if (!name) throw new Error("You need to provide name");
    if (!email) throw new Error("You need to provide email address"); //!TODO: backend validation
    if (!(password === passwordConfirm))
      throw new Error("Password and password confirmation must be equal");

    // 2) run pool.query() - may give the error if mail is in use - return msg to front
    const encryptedPassword = await bcrypt.hash(password, 12); //.hash() is async
    const dataOfCreation = new Date();
    // 3)

    // !TODO: returning * is not best solution in my opinion / temporary - kick out password from input later
    const newUser = await pool.query(
      `INSERT INTO users (first_name, email, user_password, password_changed_at) VALUES ($1, $2, $3, $4) RETURNING * `,
      [name, email, encryptedPassword, dataOfCreation]
    );
    // 3) if success inform user
    return newUser;

    // !TODO: is it all?
  } catch (error) {
    throw error;
  }
};

exports.logInUser = async (userCredential) => {
  try {
    const { email, password } = userCredential;

    const newUserArray = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (newUserArray.rowCount === 0)
      throw new Error("Incorrect email or password");

    const newUser = newUserArray.rows[0];

    //return true if both password are the same
    const testBoolean = await bcrypt.compare(password, newUser.user_password);

    if (!testBoolean) throw new Error("Incorrect email or password");

    // 3) if success inform user
    return newUser;
  } catch (error) {
    throw error;
  }
};

exports.findUserByTokenDecoded = async (decoded) => {
  try {
    const newUserArray = await pool.query(
      `SELECT * FROM users WHERE user_id = $1`,
      [decoded.id]
    );

    if (newUserArray.rowCount === 0)
      throw new Error("The user related to this token does no longer exist.");

    const newUser = newUserArray.rows[0];

    const changedTimestamp = parseInt(newUser.password_changed_at.getTime() / 1000, 10);

    console.log("i am here");
    console.log(changedTimestamp, decoded.iat);
    if (decoded.iat < changedTimestamp) throw new Error("Not valid token");


    return newUser;
  } catch (error) {
    throw error;
  }
};
