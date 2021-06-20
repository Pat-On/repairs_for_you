import { useState } from "react";
import RequestForQuoteForm from "../components/Handyman/RequestForQuoteForm/RequestForQuoteForm";

const RequestForQuote = (props) => {
  const [message, setMessage] = useState();
  console.log(props)
  // EVENT HANDLERS
  const getRequestForQuoteData = async (fromData) => {
    const result = await sendRegistrationRequest(fromData);
    setMessage(result.message);
  };

  return <RequestForQuoteForm data={props} onSubmit={getRequestForQuoteData} />;
};

export default RequestForQuote;
