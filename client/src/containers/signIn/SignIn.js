import React, { useState, useContext } from "react";
import SignUpForm from "../../components/signUpForm/SignUpForm";
import { checkValidity } from "../../utility/utility";

import AuthContext from "../../store/authContext";

const SignIn = (props) => {
  const authCtx = useContext(AuthContext);

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
      value: "handyman1@p.com",

      validation: {
        required: true,
        isEmail: true,
      },
      //TODO: change valid in production for false
      valid: true,
      // valid: false,
      touched: false,
      incorrect: false,
    },
    password: {
      invalidInputInfo: "You have to input password",
      name: "Password",
      placeholder: "Password",
      value: "password",
      objectConfig: { type: "password" },
      //!IMPORTANT detailed validation of password is not required now
      validation: {
        required: true,
        //TODO: important in production to turn on validation password in utility.js
        // isPassword: true,
      },
      //TODO: change valid in production for false
      // valid: false,
      valid: true,
      touched: false,
      incorrect: false,
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
    props.history.push("/");
  };

  /**
   * @description Changing the page of form displayed in Browser
   * Going to next page
   * Function is changing the page by changing the state of loadingControl by setLoadingControl
   * @input no input
   * @return nothing
   */
  const nextFunction = async () => {
    try {
      setLoadingControl(true);

      const data = {
        email: signForm.email.value,
        password: signForm.password.value,
      };

      const response = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseJsoned = await response.json();
      console.log(responseJsoned);
      if (responseJsoned.token) {
        setLoadingControl(false);
        authCtx.login(responseJsoned.token, responseJsoned.expirationTime);
        props.history.push("/");
      }
      if (responseJsoned.status === "fail") {
        setLoadingControl(false);
        //TODO: automate process of updating the object of the state
        setSignForm((prevState) => {
          return {
            ...prevState,
            email: {
              ...prevState.email,
              incorrect: true,
            },
            password: {
              ...prevState.password,
              incorrect: true,
            },
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
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
	setSignForm((prevState) => {
		return {
		  ...prevState,
		  email: {
			...prevState.email,
			incorrect: false,
		  },
		  password: {
			...prevState.password,
			incorrect: false,
		  },
		};
	  });
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

  const form = (
    <SignUpForm
      form={formElementKeyArray}
      formInputHandler={inputChangeHandler}
      next={nextFunction}
      back={backFunction}
      buttonDisable={!(signForm.password.valid && signForm.email.valid)}
      nameOfTheForm="Sign-In"
      leftButtonName="Cancel"
      rightButtonName="Log In"
      wrongPasswordEmail={
        signForm.password.incorrect && signForm.email.incorrect
      }
      loading={loadingControl}
    />
  );

  return <div>{form}</div>;
};

export default SignIn;
