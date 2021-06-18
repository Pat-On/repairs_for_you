const repository = require("../data/handymanRepository");

// get all handymen
async function getAllHandymen() {
  return repository.getAllHandymen();
}

// search/find a handyman from list
async function getHandymanById(hId) {
  const result = repository.getHandymanById(hId);
  return result;
}

module.exports = {
  getAllHandymen,
  getHandymanById,
};
