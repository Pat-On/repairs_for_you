import pool from "../db";

// QUERIES

const getAllQuotesQuery = `SELECT * FROM quotes`; //**WARN: NOT IMPLEMENTED YET**
const getQuoteByIdQuery = `SELECT * FROM handymen WHERE id = $1`; // **WARN: NOT IMPLEMENTED YET**
const addNewQuoteQuery = `
INSERT INTO quotes (client_name, client_email, job_description, job_start_date, price, handyman_id)
  VALUES($1, $2, $3, $4, $5, $6)`;

// FETCH DATA OF ALL QUOTES FROM DATABASE BY QUOTE ID (currently accessible only to admin)
function getAllQuotes() {
  return pool.query(getAllQuotesQuery);
}

// FETCH DATA OF ALL QUOTES FROM DATABASE BY QUOTE ID (currently accessible only to admin)
function getQuoteById(qId) {
  return pool.query(getQuoteByIdQuery, [qId]);
}

// STORE QUOTE DATA IN THE DATABASE (quotes table)
// Note: this is used only during the initial stage of quote process (accessible to anyone...
// ...who would like get quotes from a selected handyman on the site)
function addNewQuote(qData) {
  const {
    buyerName,
    buyerEmail,
    jobDescription,
    jobStartDate,
    estimatedManHours,
    handymanId,
  } = qData;

  return pool.query(addNewQuoteQuery, [
    buyerName,
    buyerEmail,
    jobDescription,
    jobStartDate,
    estimatedManHours,
    handymanId,
  ]);
}

module.exports = {
  getAllQuotes,
  getQuoteById,
  addNewQuote,
};
