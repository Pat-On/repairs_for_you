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
    emailConfirmation: {
      invalidInputInfo: "Enter valid email address",
      name: "E-mail Confirmation",
      placeholder: "example@email.com",
      value: "",

      validation: {
        required: true,
        isEmail: true,
        // !TODO: check if email is equal to confirmation
      },
      valid: false,
      touched: false,
    },
    password: {
      invalidInputInfo: "You have to input password",
      name: "Password",
      placeholder: "Password",
      value: "",
      objectConfig: { type: "password" },
      //!IMPORTANT detailed validation of password is not required now
      validation: {
        required: true,
        isPassword: true,
      },
      // valid: false,
      valid: true,
      touched: false,
    },
    passwordConfirmation: {
      invalidInputInfo: "You have to input password",
      name: "Password Confirmation",
      placeholder: "Password",
      value: "",
      objectConfig: { type: "password" },
      //!IMPORTANT detailed validation of password is not required now
      validation: {
        required: true,
        isPassword: true,
        // !TODO: check if password is equal to confirmation
      },
      // valid: false,
      valid: true,
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
          form={formElementKeyArray}
          formInputHandler={inputChangeHandler}
          next={nextFunction}
          // buttonDisable={!(signForm.name.valid && signForm.number.valid)}
          buttonDisable={false}
          nameOfTheForm="Sign-up"
          leftButtonName="Cancel"
          rightButtonName="Next"
        />
      );
      break;
    case SECOND_FORM_PAGE:
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
