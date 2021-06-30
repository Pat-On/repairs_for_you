const repository = require("../data/buyerRepository");

/***
 * 
 * WARN: THIS FILE IS CURRENTLY NOT BEING USED. IT IS PREPARED IN LIGHT OF PROBABLE FUTURE NEED.
 * 
 */ 

/***************** THE FOLLOWING METHODS ARE ACCESSIBLE TO ALL PUBLIC ROUTES *******************/

// GET ALL BUYERS
async function getAllBuyers() {
  const result = await repository.getAllBuyers();
  return result.rows;
}

// SEARCH BUYER FROM LIST BY BUYER ID
async function getBuyerById(bId) {
  const result = repository.getBuyerById(bId);
  return result.rows[0];
}

// POST A NEW BUYER
async function addNewBuyer(bData) {
  // console.log(bData)
  const dataIsValid = validateNewBuyerData(bData);
  if (dataIsValid) {
    try {
      const buyerIsNew = await buyerDoesntExist(bData.email);
      if (buyerIsNew) {
        await repository.addNewBuyer(bData);
        return {
          status: "OK",
          message: "Buyer has been added successfully.",
        };
      }
      return {
        status: "FAIL",
        message:
          "Sorry, but we could not send your request. A user with the same email already exists.",
      };
    } catch (error) {
      // if there is database connection issue
      return console.log(error);
    }
  }
  return {
    status: "FAIL",
    message: "Buyer could not be saved. Missing buyer information.",
  };
}

// VALIDATE INCOMING BUYER DATA
// Note: this is used only during the initial stage of quote requesting process (accessible to anyone...
// ...who would like to send quote reqeust to a handyman on the site)
function validateNewBuyerData(bData) {
  // required buyer data fields
  try {
    const {
      buyerName,
      buyerEmail,
    } = bData;

    const dataToValidate = [
      buyerName,
      buyerEmail,
    ];
    return dataToValidate.every((item) => item);
  } catch (err) {
    console.log(err);
  }
}

// CHECK IF A BUYER WITH THE SAME EMAIL (CREDENTIALS) ALREADY EXISTS
// Note: this is used only during the initial stage of quote requesting process (accessible to anyone...
// ...who would like to send quote reqeust to a handyman on the site)
async function buyerDoesntExist(bEmail) {
  try {
    const result = await repository.getBuyerByEmail(bEmail);
    return result.rowCount === 0;
  } catch (error) {
    console.log(error);
  }
}

/******************************************************************************************************/

/***************** THE FOLLOWING METHODS ARE DEDICATED TO ADMIN-ACCESSIBLE ROUTES *******************/

// WARN: ANY REQUIRED AUTHORISATION LOGIC IS YET TO BE ADDED

// GET ALL BUYERS
async function getAllBuyersForAdmin() {
  const result = await repository.getAllBuyersForAdmin();
  console.log(result.rows);
  return result.rows;
}

// SEARCH BUYER FROM LIST BY BUYER ID
async function getBuyerByIdForAdmin(bId) {
  const result = await repository.getBuyerByIdForAdmin(bId);
  return result.rows[0];
}

module.exports = {
  getAllBuyers,
  getBuyerById,
  addNewBuyer,
  getAllBuyersForAdmin,
  getBuyerByIdForAdmin,
};
