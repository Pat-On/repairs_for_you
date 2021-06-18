import React, { useState } from "react";

import SignUpForm from "../../components/signUpForm/SignUpForm";
import ConfirmationFormPage from "../../components/confirmationFormPage/ConfirmationFormPage";
import CompletionFormScreen from "../../components/completionFormScreen/CompletionFormScreen";

import { checkValidity } from "../../utility/utility";

const FIRST_FORM_PAGE = 0;
const SECOND_FORM_PAGE = 1;
const THIRD_FORM_PAGE = 2;
const LAST_FORM_PAGE = 3;
const NAME_AND_PHONE_NUMBER_SLICE_INDEX = [0, 2];
const EMAIL_AND_DATE_OF_BIRTH_SLICE_INDEX = [2, 4];

const SignUp = () => {
  /**
   * State: pageControl and setPageControl are used to managing the displayed page of form
   */
  const [pageControl, setPageControl] = useState(FIRST_FORM_PAGE);

  /**
   * State: responsible for controlling the process of displaying the http req in UI
   */
  const [loadingControl, setLoadingControl] = useState(false);

  /**
   * State: signForm and setSignForm are used to provide:
   *  -information about requirements of validation
   *  -storing the input from user
   */
  const [signForm, setSignForm] = useState({
    name: {
      invalidInputInfo: "Have to contains only letters",
      name: "Name",
      placeholder: "Name",
      value: "",

      validation: {
        required: true,
        isName: true,
      },
      valid: false,
      touched: false,
    },
    number: {
      invalidInputInfo: "UK phone number - 11 digits",
      name: "Phone Number",
      placeholder: "01234567890",
      value: "",

      validation: {
        required: true,
        isTelNumber: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      invalidInputInfo: "Enter valid email address",
      name: "E-mail",
      placeholder: "example@email.com",
      value: "",

      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    dateOfBirth: {
      invalidInputInfo: "You must be 18+. DD/MM/YYYY",
      name: "Date of birth",
      placeholder: "dd/mm/yyyy",
      value: "",

      validation: {
        required: true,
        isDOB: true,
        isEighteen: true,
      },
      valid: false,
      touched: false,
    },
  });

  /**
   * @description Changing the page of form displayed in Browser
   * Returning to previous one page
   * Function is changing the page by changing the state of loadingControl by setLoadingControl
   * @input no input
   * @return nothing
   */
  const backFunction = () => {
    setPageControl(() => {
      if (pageControl === FIRST_FORM_PAGE) return FIRST_FORM_PAGE;
      const page = pageControl;
      return page - 1;
    });
  };

  /**
   * @description Changing the page of form displayed in Browser
   * Going to next page
   * Function is changing the page by changing the state of loadingControl by setLoadingControl
   * @input no input
   * @return nothing
   */
  const nextFunction = () => {
    setPageControl(() => {
      if (pageControl === LAST_FORM_PAGE) return LAST_FORM_PAGE;
      const page = pageControl;
      return page + 1;
    });
  };

  /**
   * @Description Function showing to user that data is sending to the server
   * FUNCTION IN THAT FORM FAKING SENDING DATA by using setTimeout()
   *
   * After setTimeout() passed function is triggering rendering the LAST_FORM_PAGE
   * @input no input
   * @return nothing
   */
  const confirmation = () => {
    setLoadingControl(true);
    setTimeout(() => {
      setPageControl(LAST_FORM_PAGE);
      setLoadingControl(false);
    }, 800);
  };

  /**
   * @Description  Function returning to main page, in that case to FIRST_FORM_PAGE of form
   * Function is changing the page by changing the state of loadingControl by setLoadingControl
   *
   * Function is cleaning previously provided by user data stored in APP
   * @input no input
   * @return nothing
   */

  const returnToMain = () => {
    setPageControl(FIRST_FORM_PAGE);
    let newState = { ...signForm };
    for (let key of Object.keys(signForm)) {
      newState = {
        ...newState,
        [key]: {
          ...newState[key],
          value: "",
          touched: false,
          valid: false,
        },
      };
    }
    setSignForm(newState);
  };

  /**
   * @DescriptionFunction is changing the value, touched and valid stored inside the signForm
   * function is using the helper function checkValidity(), which is evaluating upcoming input
   * @param {Object} e [e - event object triggered by input provided by user]
   * @param {String} formName [Is a name of the input's field in form, used to identify what should be updated]
   */
  const inputChangeHandler = (e, formName) => {
    const updatedForm = {
      ...signForm,
      [formName]: {
        ...signForm[formName],
        value: e.target.value,
        touched: true,
        valid: checkValidity(e.target.value, signForm[formName].validation),
      },
    };
    setSignForm(updatedForm);
  };

  /**
   * For Loop which is creating the array of the object containing the id and needed information
   * in a process of rendering the form's pages within switch statement
   */
  const formElementKeyArray = [];
  for (let key in signForm) {
    formElementKeyArray.push({
      id: key,
      config: signForm[key],
    });
  }

  let form = "";
  /**
   *  Switch statement which base on pageControl value rendering different pages of the form
   */
  switch (pageControl) {
    case FIRST_FORM_PAGE:
      form = (
        <SignUpForm
          form={formElementKeyArray.slice(...NAME_AND_PHONE_NUMBER_SLICE_INDEX)}
          formInputHandler={inputChangeHandler}
          next={nextFunction}
          buttonDisable={!(signForm.name.valid && signForm.number.valid)}
        />
      );
      break;
    case SECOND_FORM_PAGE:
      form = (
        <SignUpForm
          form={formElementKeyArray.slice(
            ...EMAIL_AND_DATE_OF_BIRTH_SLICE_INDEX
          )}
          formInputHandler={inputChangeHandler}
          back={backFunction}
          next={nextFunction}
          buttonDisable={!(signForm.email.valid && signForm.dateOfBirth.valid)}
        />
      );
      break;
    case THIRD_FORM_PAGE:
      form = (
        <ConfirmationFormPage
          loadingControl={loadingControl}
          back={backFunction}
          next={confirmation}
          formValues={signForm}
        />
      );
      break;
    case LAST_FORM_PAGE:
      form = <CompletionFormScreen back={returnToMain} />;
      break;
    default:
      console.log("You should never see that");
      break;
  }

  return <div>{form}</div>;
};

export default SignUp;
