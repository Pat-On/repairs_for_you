import pool from "../db";

// QUERIES
// 1. DEDITCATED TO ADMIN
const getAllHandymenAdminQuery = `SELECT * FROM handyman WHERE id > 0 ORDER BY id`;
const getHandymanByIdAdminQuery = `SELECT * FROM handyman WHERE id = $1`; // used mainly to check if handyman exists
const changeHandymanVisibilityByIdAdminQuery = `UPDATE handyman SET visible = $1 WHERE id = $2`;
const editHandymanDetailsByIdAdminQuery = `UPDATE handyman
                              SET first_name = $1,
                                  last_name= $2,
                                  address=$3,
                                  postcode=$4,
                                  email=$5,
                                  phone_number=$6,
                                  skills=$7,
                                  bio=$8
                              WHERE id=$9`;
const deleteHandymanByIdAdminQuery=`DELETE FROM handyman WHERE id=$1`;

// 2. ALL SITE VISITORS
const getAllHandymenQuery = `
  SELECT id,first_name,last_name,img,address,postcode,email,phone_number,skills,bio
    FROM handyman
      WHERE visible = true
          ORDER BY id`;

const getHandymanByIdQuery = `SELECT * FROM handyman WHERE id = $1`; // used mainly to check if handyman exists

const getHandymanByEmailQuery = `SELECT * FROM handyman WHERE email = $1`; // used mainly to check if handyman exists

const addNewHandymanQuery = `
      INSERT INTO handyman (first_name, last_name, img, address, postcode, email, phone_number, skills, bio)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;


// WARN: THIS QUERY IS CURRENTLY NOT BEING USED. IT IS INCLUDED IN LIGHT OF PROBABLE FUTURE NEEDS      
const getReviewsByHandymanIdQuery = `
  SELECT r.review_body, r.rating
    FROM reviews AS r
      INNER JOIN handyman as h ON h.id=r.handyman_id	  
        WHERE r.handyman_id=$1`;

const threeRandomHandymanQuery = `SELECT *FROM handyman 
                                where visible = 'true'
                                ORDER BY random()
                                LIMIT 3`;

// METHODS

/***************** THE FOLLOWING METHODS ARE ACCESSIBLE TO ALL PUBLIC ROUTES *******************/

// FETCH DATA OF ALL HANDYMEN FROM DATABASE (accessible to anyone visiting the site)
function getAllHandymen() {
  return pool.query(getAllHandymenQuery);
}

// FETCH DATA OF A HANDYMEN FROM DATABASE BY HANDYMAN ID (accessible to anyone visiting the site)
function getHandymanById(hId) {
  return pool.query(getHandymanByIdQuery, [hId]);
}

// FETCH DATA OF ALL HANDYMEN FROM DATABASE BY HANDYMAN EMAIL
// Note: this is used only during the initial stage of handyman registration process (accessible to anyone...
// ...who would like to register as handyman on the site)
function getHandymanByEmail(hEmail) {
  return pool.query(getHandymanByEmailQuery, [hEmail]);
}

// STORE HANDYMAN DATA IN THE DATABASE (handypeople table)
// Note: this is used only during the initial stage of handyman registration process (accessible to anyone...
// ...who would like to register as handyman on the site)
function addNewHandyman(hData) {
  const {
    firstName,
    lastName,
    img,
    address,
    postcode,
    email,
    phoneNumber,
    skills,
    bio,
  } = hData;
  return pool.query(addNewHandymanQuery, [
    firstName,
    lastName,
    img,
    JSON.stringify(address),
    postcode,
    email,
    phoneNumber,
    skills,
    bio,
  ]);
}

// WARN: THIS FUNCTION IS CURRENTLY NOT BEING USED. IT IS INCLUDED IN LIGHT OF PROBABLE FUTURE NEEDS
function getReviewsByHandymanId(hId) {
  return pool.query(getReviewsByHandymanIdQuery, [hId]);
}

function getThreeRandomHandyman() {
  return pool.query(threeRandomHandymanQuery);
}
// edit handyman details
function editHandymanDetailsByIdAdmin(hData) {
  const {
    firstName,
    lastName,
    //img,
    address,
    postcode,
    email,
    phoneNumber,
    skills,
    bio,
    id,
  } = hData;

  return pool.query(editHandymanDetailsByIdAdminQuery, [
    firstName,
    lastName,
    //img,
    address,
    postcode,
    email,
    phoneNumber,
    skills,
    bio,
    id,
  ]);
}

function deleteHandymanByIdAdmin(hId){
  return pool.query(deleteHandymanByIdAdminQuery,[hId]);
}
/******************************************************************************************************/

/***************** THE FOLLOWING METHODS ARE DEDICATED TO ADMIN-ACCESSIBLE ROUTES *******************/
// WARN: ANY REQUIRED AUTHORIZATION LOGIC IS YET TO BE ADDED

// FETCH DATA OF ALL HANDYMEN FROM DATABASE (accessible to admin only)
function getAllHandymenForAdmin() {
  return pool.query(getAllHandymenAdminQuery);
}

// FETCH DATA OF A HANDYMEN FROM DATABASE BY HANDYMAN ID (accessible to admin only)
function getHandymanByIdForAdmin(hId) {
  return pool.query(getHandymanByIdAdminQuery, [hId]);
}

function changeHandymanVisibilityByAdmin({ visible, id }) {
  return pool.query(changeHandymanVisibilityByIdAdminQuery, [visible, id]);
}

module.exports = {
  getAllHandymen,
  getHandymanById,
  getAllHandymenForAdmin,
  getHandymanByIdForAdmin,
  changeHandymanVisibilityByAdmin,
  getHandymanByEmail,
  addNewHandyman,
  getReviewsByHandymanId,
  getThreeRandomHandyman,
  editHandymanDetailsByIdAdmin,
  deleteHandymanByIdAdmin,
};
