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

    // 3)

    // !TODO: returning * is not best solution in my opinion / temporary - kick out password from input later
    const newUser = await pool.query(
      `INSERT INTO users (first_name, email, user_password) VALUES ($1, $2, $3) RETURNING * `,
      [name, email, encryptedPassword]
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
      if (!testBoolean) throw new Error("Incorrect email or password");

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
