import emailValidator from "email-validator";
import { send } from "emailjs-com";

export function validateForm(form) {
  const id = form.id;
  const fields = getFormFields(id);
  const errors = getFormErrors(fields, id);
  return errors.length > 0 ? errors : [];
}

function getFormFields(formId) {
  return [...document.getElementById(formId).querySelectorAll("input")].map(
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
export function sendRegistrationRequest(requestData) {
  const [service, template, formData, user] = requestData;
  sendEmailToAdmin([service, template, formData, user]);
}

// THIS IS WHERE EMAILS ARE SENT FROM
function sendEmailToAdmin([...args]) {
  const [service, template, formDataEntries, user] = args;
  
  send(service, template, formDataEntries, user)
    .then((response) => {
      alert(
        "Thank you for choosing us! Your request has been sent. We will get back to you soon."
      );
      console.log("SUCCESS!", response.status, response.text);
    })
    .catch((err) => {
      console.log("FAILED...", err);
    });
}