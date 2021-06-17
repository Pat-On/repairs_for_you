import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import SignUpForm from "./SignUpForm";
import Button from "../UI/button/Button";
import Input from "../UI/input/Input";

configure({ adapter: new Adapter() });

const formElementKeyArrayOne = [
  {
    id: "name",
    config: {
      name: "Name",
      placeholder: "Name",
      value: "Patryk",

      validation: {
        required: true,
        isName: true,
      },
      valid: false,
      touched: false,
    },
  },
];

const formElementKeyArrayTwo = [
  {
    id: "name",
    config: {
      name: "Name",
      placeholder: "Name",
      value: "Patryk",

      validation: {
        required: true,
        isName: true,
      },
      valid: false,
      touched: false,
    },
  },
  {
    id: "Phone Number",
    config: {
      name: "Phone Number",
      placeholder: "01234567890",
      value: "01234567890",

      validation: {
        required: true,
        isTelNumber: true,
      },
      valid: false,
      touched: false,
    },
  },
];

describe("<ConfirmationFormPage/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignUpForm form={formElementKeyArrayOne} />);
  });

  it("should render one <Button> item when props.back is sent", () => {
    wrapper.setProps({ back: true });
    expect(wrapper.find(Button)).toHaveLength(1);
  });
  it("should render one <Button> item when props.next is sent", () => {
    wrapper.setProps({ next: true });
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it("should render one <Input> item when there is one item in sent form array", () => {
    expect(wrapper.find(Input)).toHaveLength(1);
  });

  it("should render two <Input> item when there is two item in sent form array", () => {
    wrapper = shallow(<SignUpForm form={formElementKeyArrayTwo} />);
    expect(wrapper.find(Input)).toHaveLength(2);
  });
});
