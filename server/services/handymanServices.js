const repository = require("../data/handymanRepository");

// GET ALL HANDYMEN
async function getAllHandymen() {
  return repository.getAllHandymen();
}

// SEARCH HANDYMAN FROM LIST BY HANDYMAN ID
async function getHandymanById(hId) {
  const result = repository.getHandymanById(hId);
  return result;
}

// POST A NEW HANDYMAN
async function addNewHandyman(hData) {
  const dataIsValid = validateHandymanData(hData);
  if (dataIsValid) {
    try {
      const handymanIsNew = await handymanDoesntExist(hData.email);
      if (handymanIsNew) {
        await repository.addNewHandyman(hData);
        return {
          status: "OK",
          message: "User has been added successfully.",
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

// VALIDATE INCOMING HANDYMAN DATA
// Note: this is used only during the initial stage of handyman registration process (accessible to anyone...
// ...who would like to rgister as handyman on the site)
function validateHandymanData(hData) {
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

    const dataToValidate = {
      firstName,
      lastName,
      addressLineOne,
      addressLineTwo,
      postcode,
      email,
      phoneNumber,
      skills,
      bio,
    };

    return Object.values(dataToValidate).every((item) => item);
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
    return result === undefined;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllHandymen,
  getHandymanById,
  addNewHandyman,
};
