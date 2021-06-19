import { useState } from "react";
import RequestForQuoteForm from "../components/RequestForQuoteForm/RequestForQuoteForm";

const RequestForQuote = () => {
  const [message, setMessage] = useState();
  // EVENT HANDLERS
  const getRequestForQuoteData = async (fromData) => {
    const result = await sendRegistrationRequest(fromData);
    setMessage(result.message);
  };

  return <RequestForQuoteForm onAddHandyman={getRequestForQuoteData} />;
};

export default RequestForQuote;
