import pool from "../db";

// QUERIES
// 1. DEDITCATED TO ADMIN
const getAllHandymenAdminQuery = `
  SELECT h.id,first_name,last_name,img,address,p.postcode,p.area_code AS area,email,phone_number,skills,bio,visible
    FROM handyman AS h
      INNER JOIN postcodes AS p ON p.postcode=h.postcode
        INNER JOIN areas ON areas.code=p.area_code
              ORDER BY h.id`;

const getHandymanByIdAdminQuery = `SELECT * FROM handyman WHERE id = $1`; // used mainly to check if handyman exists
const changeHandymanVisibilityByIdAdminQuery = `UPDATE handyman SET visible = $1 WHERE id = $2`;

// 2. ALL SITE VISITORS
const getAllHandymenQuery = `
  SELECT h.id,first_name,last_name,img,address,p.postcode,p.area_code AS area,email,phone_number,skills,bio
	  FROM handyman AS h
	    INNER JOIN postcodes AS p ON p.postcode=h.postcode
	      INNER JOIN areas ON areas.code=p.area_code
	          WHERE h.visible = true
                ORDER BY h.id`;

const getHandymanByIdQuery = `SELECT * FROM handyman WHERE id = $1`; // used mainly to check if handyman exists

const getHandymanByEmailQuery = `SELECT * FROM handyman WHERE email = $1`; // used mainly to check if handyman exists

const addNewHandymanQuery = `
      INSERT INTO handyman (first_name, last_name, img, address, postcode, email, phone_number, skills, bio)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
      
const getReviewsByHandymanIdQuery = `
  SELECT r.review_body, r.rating
    FROM reviews AS r
      INNER JOIN handyman as h ON h.id=r.handyman_id	  
        WHERE r.handyman_id=$1`;
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
// ...who would like to rgister as handyman on the site)
function getHandymanByEmail(hEmail) {
  return pool.query(getHandymanByEmailQuery, [hEmail]);
}

// STORE HANDYMAN DATA IN THE DATABASE (handypeople table)
// Note: this is used only during the initial stage of handyman registration process (accessible to anyone...
// ...who would like to rgister as handyman on the site)
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

function getReviewsByHandymanId(hId) {
  return pool.query(getReviewsByHandymanIdQuery,[hId]);
}
/******************************************************************************************************/

/***************** THE FOLLOWING METHODS ARE DEDICATED TO ADMIN-ACCESSIBLE ROUTES *******************/
// WARN: ANY REQUIRED AUTHORISATION LOGIC IS YET TO BE ADDED

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
};
