const repository = require("../data/handymanRepository");

/***************** THE FOLLOWING METHODS ARE ACCESSIBLE TO ALL PUBLIC ROUTES *******************/

// GET ALL HANDYMEN
async function getAllHandymen() {
  const result = await repository.getAllHandymen();
  return result.rows;
}

// SEARCH HANDYMAN FROM LIST BY HANDYMAN ID
async function getHandymanById(hId) {
  const result = await repository.getHandymanById(hId);
  return result.rows[0];
}

// POST A NEW HANDYMAN
async function addNewHandyman(hData) {
  const dataIsValid = validateNewHandymanData(hData);
  if (dataIsValid) {
    try {
      const handymanIsNew = await handymanDoesntExist(hData.email);
      if (handymanIsNew) {
        await repository.addNewHandyman(hData);
        return {
          status: "OK",
          message: "Handyman has been added successfully.",
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
    message: "Handyman could not be saved. Missing handyman information.",
  };
}

// WARN: THIS FUNCTION IS CURRENTLY NOT BEING USED. IT IS INCLUDED IN LIGHT OF PROBABLE FUTURE NEEDS
async function getReviewsByHandymanId(hId) {
  const result = await repository.getReviewsByHandymanId(hId);
  return result.rows;
}

// VALIDATE INCOMING HANDYMAN DATA
// Note: this is used only during the initial stage of handyman registration process (accessible to anyone...
// ...who would like to rgister as handyman on the site)
function validateNewHandymanData(hData) {
  // required handyman data fields
  try {
    const {
      firstName,
      lastName,
      address,
      postcode,
      email,
      phoneNumber,
      skills,
      bio,
    } = hData;
    // destructure address (={addressLineOne, addressLineTwo,city}) and access individual field values
    // city has default value of "Coventry", so no need to validate that
    const { addressLineOne, addressLineTwo } = address;
    
    const dataToValidate = [
      firstName,
      lastName,
      addressLineOne,
      addressLineTwo,
      postcode,
      email,
      phoneNumber,
      skills,
      bio,
    ];
   return dataToValidate.every((item) => item);
  } catch (err) {
    console.log(err);
  }
}

// CHECK IF A HANDYMAN WITH THE SAME EMAIL (CREDENTIALS) ALREADY EXISTS
// Note: this is used only during the initial stage of handyman registration process (accessible to anyone...
// ...who would like to rgister as handyman on the site)
async function handymanDoesntExist(hEmail) {
  try {
    const result = await repository.getHandymanByEmail(hEmail);
    return result.rowCount === 0;
  } catch (error) {
    console.log(error);
  }
}

async function getThreeRandomHandyman() {
  const result = await repository.getThreeRandomHandyman();
  return result.rows;
}

/******************************************************************************************************/

/***************** THE FOLLOWING METHODS ARE DEDICATED TO ADMIN-ACCESSIBLE ROUTES *******************/

// WARN: ANY REQUIRED AUTHORISATION LOGIC IS YET TO BE ADDED

// GET ALL HANDYMEN
async function getAllHandymenForAdmin() {
  const result = await repository.getAllHandymenForAdmin();
  return result.rows;
}

// SEARCH HANDYMAN FROM LIST BY HANDYMAN ID
async function getHandymanByIdForAdmin(hId) {
  const result = await repository.getHandymanByIdForAdmin(hId);
  return result.rows[0];
}

// UPDATE THE VISIBILITY STATUS (TRUE OR FALSE) OF A HANDYMAN
async function changeHandymanVisibilityByAdmin(hData) {
  const dataIsValid = validateUpdateData(hData);
  if (!dataIsValid) {
    return {
      status: "FAIL",
      message:
        "Handyman visibility could not updated. Missing or invalid information.",
    };
  }
  // if the provided information is valid, continue...
  try {
    // check if the requested handyman is found in the database
    const result = await repository.getHandymanByIdForAdmin(hData.id);
    if (result.rowCount===0) {
      return {
        status: "FAIL",
        message: `Sorry, but the handyman with id "${hData.id}" could not be found.`,
      };
    }
    await repository.changeHandymanVisibilityByAdmin(hData);
    return {
      status: "OK",
      message: "Handyman visibility has been updated successfully.",
    };
  } catch (error) {
    // if there is database connection issue
    return console.log(error);
  }
}

function validateUpdateData(hData) {
  const { visible, id } = hData;
  // make sure both new visible value ('true' or 'false') and handyman id has been supplied
  if (visible === undefined || id === undefined) return false;
  // if all informaiton has been provided, validate each data
  if (typeof visible !== "boolean") return false;
  if (isNaN(parseInt(id))) return false;
  // 
  return true;
}

module.exports = {
  getAllHandymen,
  getHandymanById,
  getAllHandymenForAdmin,
  getHandymanByIdForAdmin,
  changeHandymanVisibilityByAdmin,
  addNewHandyman,
  getReviewsByHandymanId,
  getThreeRandomHandyman
};
