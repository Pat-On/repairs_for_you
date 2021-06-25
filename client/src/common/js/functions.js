import emailValidator from "email-validator";
import { send } from "emailjs-com";

const registrationRequestSuccessMessage = `
Thank you for registering with us! Your request has been sent, and we will get back to you soon.
`;

const quoteRequestSuccessMessage = `
Thank you for choosing us! Your request has been sent, and we will get back to you soon.
`;

const failureMessage = `
Sorry, but we could not send your request at the moment. Please try again later.
`;

export function validateForm(form,formId) {
  const fields = getFormFields(form);
  const errors = getFormErrors(fields, formId);
  return errors.length > 0 ? errors : [];
}

function getFormFields(form) {
  return [...form.querySelectorAll("input")].map(
    (input) => ({ name: input.name, value: input.value, type: input.type })
  );
}

function getFormErrors(formFields, formId) {
  const errors = [];
  const emailField = formFields.find((field) => field.type === "email").value;
  const phoneNumber = formFields.find((field) => field.type === "tel").value;

  if (!emailIsValid(emailField))
    errors.push("Error: invalid email format. Please enter a valid email.");
  if (phoneNumber !== "" && !phoneNumberIsValid(phoneNumber))
    errors.push(
      "Error: invalid phone format. Please enter a valid phone number."
    );
  if (formId === "form-send-quote") {
    // if subject form is RequrestFormQuoteForm, check man-hour and price values
    const manHours = formFields.find((field) => field.name === "man-hours");
    const price = formFields.find((field) => field.name === "price");
    const noManHourOrPriceProvided = [manHours, price].every(
      (item) => item.value === ""
    );
    if (noManHourOrPriceProvided)
      errors.push("Please enter your estimated man-hour or  is required.");
  }
  return errors;
}

function emailIsValid(email) {
  return emailValidator.validate(email);
}

function phoneNumberIsValid(phoneNumber) {
  // Remove the first character from phoneNumber in case it contains the "+" sign
  phoneNumber = phoneNumber.substring(1);
  // If the phone number includes white space, remove it
  phoneNumber = phoneNumber.split(" ");
  // Finish by checking if every element in the split phoneNumber is a number or not, then return
  return phoneNumber.every((num) => Number(num));
}

// SEND QUOTE REQUEST EMAIL TO ADMIN
export function sendQuoteRequest(requestData) {
  const [service, template, formData, user] = requestData;
  sendEmailToAdmin([service, template, formData, user]);
}

// SEND NEW HANDYMAN REGISTRATION REQUEST EMAIL TO ADMIN
export async function sendRegistrationRequest(requestData) {
  const formData = requestData[2];
  // 1. First, attempt to send registration request to admin via email account
  // NOTE: THE OVERALL SUCCESS OR FAILUR OF THE REGISTRATION PROCESS DEPENDS PRIMARILY ON
  //       THE SUCCESS OR FAILURE OF THE EMAIL SERVICE BECAUSE. IF THE EMAIL SERVICE IS WORKING FINE
  //       ADMIN CAN ENTER USER DATA INTO THE DATABASE MANUALLY EVEN IF THE DATABASE SERVICE FAILS
  try {
    // ********************************************************************************
    // COMMENTED OUT BECAUSE WE REACHED LIMIT OF EMAILS
    
    // const emailSendResponse = await sendEmailToAdmin(requestData);
    // if (emailSendResponse.status !== 200) {
    //   throw new Error(emailSendResponse.text); // if it's not successful, alert user failur of requet
    // }
    // if it's successful, attempt to add handyman to the database for ease of convenience(at least)
    const databaseResponse = await addHandymanToDatabase(formData);
    // determine if a handyman with the same account exists or not
    // console.error(databaseResponse.status)
    if (databaseResponse.status === 400) {
      const result = await databaseResponse.json();
      alert(result.message)
      throw new Error(result.message);
    }
    alert(registrationRequestSuccessMessage);
    return true;
  } catch(err) {
    console.log(err);
  }
}

// THIS IS WHERE EMAILS ARE SENT FROM
async function sendEmailToAdmin([...args]) {
  const [service, template, formDataEntries, user] = args;
  return await send(service, template, formDataEntries, user);
}

async function addHandymanToDatabase(formData) {
  return await fetch(`/api/users/handyman`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });
}