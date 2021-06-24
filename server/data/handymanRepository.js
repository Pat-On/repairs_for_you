import handymen from "../../HandyPeopleTestData.json";

// get all handymen
function getAllHandymen() {
  return [...handymen];
}

// search/find a handyman from list by video id
function getHandymanById(hId) {
  return handymen.find((hMan) => hMan.id === hId);
}

function getHandymanByEmail(email) {
  return handymen.find((hMan) => hMan.email === email);
}

// add handyman to list
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
