/***
 *
 * WARN: THIS FILE IS CURRENTLY NOT BEING USED. IT IS PREPARED IN LIGHT OF PROBABLE FUTURE NEED.
 *
 */

import { pool } from "../db";

// QUERIES
// 1. DEDITCATED TO ADMIN
const getAllBuyersAdminQuery = `SELECT * FROM buyers ORDER BY id`;
const getBuyerByIdAdminQuery = `SELECT * FROM buyers WHERE id = $1`; // used mainly to check if buyer exists

// 2. ALL SITE VISITORS
const getBuyerByIdQuery = `SELECT * FROM buyers WHERE id = $1`; // used mainly to check if buyer exists
const getBuyerByEmailQuery = `SELECT * FROM buyers WHERE email = $1`; // used mainly to check if buyer exists
const addNewBuyerQuery = `INSERT INTO buyers (customer_name, email, phone_number) VALUES ($1, $2, $3)`; // used to add a new buyer when they request for quote

// METHODS

/***************** THE FOLLOWING METHODS ARE ACCESSIBLE TO ALL PUBLIC ROUTES *******************/

// FETCH DATA OF A BUYER FROM DATABASE BY BUYER ID (accessible to anyone visiting the site)
function getBuyerById(bId) {
  return pool.query(getBuyerByIdQuery, [bId]);
}

// FETCH DATA OF ALL BUYER FROM DATABASE BY BUYER EMAIL
// Note: this is used only during the initial stage of quote requesting process (accessible to anyone...
// ...who would like to send quote reqeust to a handyman on the site)
function getBuyerByEmail(bEmail) {
  return pool.query(getBuyerByEmailQuery, [bEmail]);
}

// STORE BUYER DATA IN THE DATABASE (buyers table)
// Note: this is used only during the initial stage of quote requesting process (accessible to anyone...
// ...who would like to send quote reqeust to a handyman on the site)
function addNewBuyer(bData) {
  console.log(bData);
  const { buyerName, buyerEmail, buyerPhoneNumber } = bData;

  return pool.query(addNewBuyerQuery, [
    buyerName,
    buyerEmail,
    buyerPhoneNumber,
  ]);
}
/******************************************************************************************************/

/***************** THE FOLLOWING METHODS ARE DEDICATED TO ADMIN-ACCESSIBLE ROUTES *******************/
// WARN: ANY REQUIRED AUTHORISATION LOGIC IS YET TO BE ADDED

// FETCH DATA OF ALL BUYER FROM DATABASE (accessible to admin only)
function getAllBuyersForAdmin() {
  return pool.query(getAllBuyersAdminQuery);
}

// FETCH DATA OF A BUYER FROM DATABASE BY BUYER ID (accessible to admin only)
function getBuyerByIdForAdmin(bId) {
  return pool.query(getBuyerByIdAdminQuery, [bId]);
}

module.exports = {
  getBuyerById,
  getBuyerByEmail,
  addNewBuyer,
  getAllBuyersForAdmin,
  getBuyerByIdForAdmin,
};
