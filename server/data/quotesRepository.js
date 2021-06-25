const quotes = [];

// FETCH DATA OF ALL QUOTES FROM DATABASE BY QUOTE ID (currently accessible only to admin)
// WARN: NOT CONNECTED TO DATABASE YET!
function getAllQuotes() {
  return [...quotes];
}

// FETCH DATA OF ALL QUOTES FROM DATABASE BY QUOTE ID (currently accessible only to admin)
// WARN: NOT CONNECTED TO DATABASE YET!
function getQuoteById(qId) {
  return quotes.find((quote) => quote.id === qId);
}

// STORE QUOTE DATA IN THE DATABASE (quotes table)
// WARN: NOT CONNECTED TO DATABASE YET!
// Note: this is used only during the initial stage of quote process (accessible to anyone... 
// ...who would like get quotes from a selected handyman on the site)
function addNewQuote(qData) {
  const {
    buyerName,
    buyerEmail,
    buyerPhoneNumber,
    jobDescription,
    jobStartDate,
    estimatedManHours,
    handymanId,
  } = qData;

  return quotes.push({
    buyerName,
    buyerEmail,
    buyerPhoneNumber,
    jobDescription,
    jobStartDate,
    estimatedManHours,
    handymanId,
  });
}

module.exports = {
  getAllQuotes,
  getQuoteById,
  addNewQuote,
};
