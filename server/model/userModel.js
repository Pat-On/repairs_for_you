import {
    createHmac
} from "crypto";
const bcrypt = require("bcryptjs");
import {
    pool
} from "../db";

// !IMPORTANT: WHAT ABOUT SECURITY HOOKS IN postgres
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
        if (!email) throw new Error("You need to provide email address"); //!TODO: backend validation
        if (!(password === passwordConfirm))
            throw new Error("Password and password confirmation must be equal");

        // 2) run pool.query() - may give the error if mail is in use - return msg to front
        const encryptedPassword = await bcrypt.hash(password, 12) //.hash() is async 

        // 3)


        // !TODO: returning * is not best solution in my opinion / temporary
        const newUser = pool.query(
            `INSERT INTO users (first_name, email, user_password) VALUES ($1, $2, $3) RETURNING * `,
            [name, email, encryptedPassword]
        );
        // 3) if success inform user
        return newUser;

        // !TODO: is it all?
    } catch (error) {
        throw error
    }
};