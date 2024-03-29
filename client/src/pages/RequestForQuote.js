import RequestForQuoteForm from "../components/RequestForQuoteForm/RequestForQuoteForm";

const RequestForQuote = (props) => {  
  // EVENT HANDLERS
  const getRequestForQuoteData = async (fromData) => {
    const result = await sendRegistrationRequest(fromData); // <- from where it is coming from?  common/js/functions but why not imported?
    setMessage(result.message);
  };

  return <RequestForQuoteForm data={props} onSubmit={getRequestForQuoteData} />;
};

export default RequestForQuote;
