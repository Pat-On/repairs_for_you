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
  // REQUEST FOR QUOTE
  // make sure if the user has provided either of estimated man-hour or amount of money for a job
  //** NOTE: this feature has recieved negative feedback, so needs reviewing
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
  // HANDYMAN REGISTRATION
  // make sure the user has confirmed their email
  if (formId === "form-add-handyman") {
    // if subject form is RequrestFormQuoteForm, check man-hour and price values
    const emails = formFields.filter((field) => field.type === "email");
    if(emails[0].value !==emails[1].value)
    errors.push("The emails you entered do not match.");
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
export async function sendQuoteRequest(requestData) {
  const formData = requestData[2];
  // 1. First, attempt to send quote request to admin via email account
  // NOTE: THE OVERALL SUCCESS OR FAILURE OF THE QUOTE REQUESTING PROCESS DEPENDS PRIMARILY ON
  //       THE SUCCESS OR FAILURE OF THE EMAIL SERVICE. IF THE EMAIL SERVICE IS WORKING FINE
  //       ADMIN CAN ENTER USER DATA INTO THE DATABASE MANUALLY EVEN IF THE DATABASE SERVICE FAILS
  try {
    // const emailSendResponse = await sendEmailToAdmin(requestData);
    // if (emailSendResponse.status !== 200) {
    //   throw new Error(emailSendResponse.text); // if it's not successful, alert user failure of requet
    // }
    // if it's successful, attempt to add handyman to the database for ease of convenience(at least)
    const databaseResponse = await addQuoteRequestToDatabase(formData);
    // determine if a handyman with the same account exists or not
    // console.error(databaseResponse.status)
    if (databaseResponse.status === 400) {
      const result = await databaseResponse.json();
      alert(result.message);
      throw new Error(result.message);
    }
    alert(quoteRequestSuccessMessage);
    return true;
  } catch (err) {
    console.log(err);
  }
}

// SEND NEW HANDYMAN REGISTRATION REQUEST EMAIL TO ADMIN
export async function sendRegistrationRequest(requestData) {
  const formData = requestData[2];
  // 1. First, attempt to send registration request to admin via email account
  // NOTE: THE OVERALL SUCCESS OR FAILURE OF THE REGISTRATION PROCESS DEPENDS PRIMARILY ON
  //       THE SUCCESS OR FAILURE OF THE EMAIL SERVICE. IF THE EMAIL SERVICE IS WORKING FINE
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
  return await fetch(`/api/v1/handyman/handymannotprotected`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });
}

async function addQuoteRequestToDatabase(formData) {
  return await fetch(`/api/v1/quotes`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });
}