const repository = require("../data/quotesRepository");
import { getBuyerByEmail, addNewBuyer } from "../data/buyerRepository";

/***************** THE FOLLOWING METHODS ARE DEDICATED TO ADMIN-ACCESSIBLE ROUTES *******************/

// WARN: ANY REQUIRED AUTHORISATION LOGIC IS YET TO BE ADDED

// GET ALL QUOTES (currently accessible only to admin)
async function getAllQuotes() {
  return await repository.getAllQuotes();
}

// SEARCH QUOTE FROM LIST BY QUOTE ID (currently accessible only to admin)
async function getQuoteById(qId) {
  const result = await repository.getQuoteById(qId);
  return result;
}

// POST A NEW QUOTE (currently accessible to all site visitors)
async function addNewQuote(qData) {
  const dataIsValid = validateQuoteData(qData);
  if (dataIsValid) {
    try {
      // check if buyer is new to the site, and if they are, attempt to add their basic data to database
      // const result = await getBuyerByEmail(qData.buyerEmail); WARN: LINE COMMENTED OUT AS FEATURE IS CURRENTLY NOT IMPLEMENTED
      // if (result.rowCount === 0) await addNewBuyer(qData); WARN: LINE COMMENTED OUT AS FEATURE IS CURRENTLY NOT IMPLEMENTED
      // continue attempt to add new quote request data to database
      await repository.addNewQuote(qData);
      return {
        status: "OK",
        message: "Quote has been added successfully.",
      };
    } catch (error) {
      // if there is database connection issue
      return console.log(error);
    }
  }
  return {
    status: "FAIL",
    message: "Quote could not be saved. Missing quote information.",
  };
}

// validate incoming quote data
function validateQuoteData(qData) {
  // required quote data fields
  try {
    const { buyerName, buyerEmail, jobDescription, jobStartDate, handymanId } =
      qData;

    const dataToValidate = {
      buyerName,
      buyerEmail,
      jobDescription,
      jobStartDate,
      handymanId,
    };

    return Object.values(dataToValidate).every((item) => item);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllQuotes,
  getQuoteById,
  addNewQuote,
};
