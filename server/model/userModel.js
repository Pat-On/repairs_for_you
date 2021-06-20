import {
    createHmac
} from "crypto";
const bcrypt = require("bcryptjs");
import {
    pool
} from "../db";

exports.signUpQuery = async (userObj) => {
    try {
        // 1) TO CHECK IF INPUT HAS WHAT WE NEED plus SANITIZATION
        const {
            name,
            email,
            password,
            passwordConfirm
        } = userObj;

        if (!name) throw new Error("You need to provide name");
        if (!email) throw new Error("You need to provide email address");
        if (!(password === passwordConfirm))
            throw new Error("Password and password confirmation must be equal");

        // 2) run pool.query() - may give the error if mail is in use - return msg to front

        // !TODO: returning * is not best solution in my opinion / temporary
        const newUser = pool.query(
            `INSERT INTO users (first_name, email, user_password, user_password_confirm) VALUES ($1, $2, $3, $4) RETURNING * `,
            [name, email, password, passwordConfirm]
        );
        // 3) if success inform user
        return newUser;

        // !TODO: is it all?
    } catch (error) {
        throw error
    }
};