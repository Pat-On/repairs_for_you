import handymen from "../../HandyPeopleTestData.json";

// FETCH DATA OF ALL HANDYMEN FROM DATABASE (accessible to anyone visiting the site)
// WARN: NOT CONNECTED TO DATABASE YET!
function getAllHandymen() {
  return [...handymen];
}

// FETCH DATA OF A HANDYMEN FROM DATABASE BY HANDYMAN ID (accessible to anyone visiting the site)
// WARN: NOT CONNECTED TO DATABASE YET!
function getHandymanById(hId) {
  return handymen.find((hMan) => hMan.id === hId);
}

// FETCH DATA OF ALL HANDYMEN FROM DATABASE BY HANDYMAN EMAIL
// WARN: NOT CONNECTED TO DATABASE YET!
// Note: this is used only during the initial stage of handyman registration process (accessible to anyone... 
// ...who would like to rgister as handyman on the site)
function getHandymanByEmail(email) {
  return handymen.find((hMan) => hMan.email === email);
}

// STORE HANDYMAN DATA IN THE DATABASE (handypeople table)
// WARN: NOT CONNECTED TO DATABASE YET!
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

  return handymen.push({
    firstName,
    lastName,
    img,
    address,
    postcode,
    email,
    phoneNumber,
    skills,
    bio,
  });
}

module.exports = {
  getAllHandymen,
  getHandymanById,
  getHandymanByEmail,
  addNewHandyman,
};
