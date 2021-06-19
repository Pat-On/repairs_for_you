import { useState } from "react";
import HandymanRegistrationForm from "../components/Handyman/RegistrationForm/HandymanRegistrationForm";

const RegistrationForm = ({ formId }) => {
  const [message, setMessage] = useState();
  // EVENT HANDLERS
  const getHandymanData = async (fromData) => {
    const result = await sendRegistrationRequest(fromData);
    setMessage(result.message);
  };

  return !formId ? (
    <h1>Hello, world!</h1>
  ) : formId === "handyman" ? (
    <HandymanRegistrationForm onAddHandyman={getHandymanData} />
  ) : (
    <h1>Another Form</h1>
  );
};

export default RegistrationForm;
