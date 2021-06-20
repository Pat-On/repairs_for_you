import emailValidator from "email-validator"

export function createVideoData(form) {
  return {
    title: form.querySelector("#title").value,
    url: form.querySelector("#url").value,
    datePosted: new Date().toLocaleDateString(),
  };
}

export function validateForm(form) {
  const id = form.id;
  const fields = flatMap(new FormData(form).entries());
  const errors = getFormErrors(fields,id);
  return errors.length > 0 ? errors : [];
}

function getFormErrors(formFields,id) {
  let errors = checkEmptyFormFields(formFields);
  if (errors.length > 0) {
    return errors;
  } else {
    const emailField=formFields.find(field=>field.type==="email")
    return vaidateEmail(emailField);
  }
}

function checkEmptyFormFields(formData) {
  return formData
    .filter((field) => field.value === "")
    .map((field) => `Error: ${field.id} cannot be empty.`);
}

function vaidateEmail(email) {
  return emailValidator.validate(email)
    ? []
    : [`Error: invalid email format. Please enter a valid email.`];
}