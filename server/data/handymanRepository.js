import handymen from "../../HandyPeopleTestData.json"

// get all handymen
function getAllHandymen() {
  return [...handymen]
}

// search/find a handyman from list by video id
function getHandymanById(hId) {
  return handymen.find(hMan => hMan.id === hId);
}

module.exports = {
  getAllHandymen,
  getHandymanById,
};
