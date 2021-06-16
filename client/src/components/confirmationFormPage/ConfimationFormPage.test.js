import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import ConfirmationFormPage from "./ConfirmationFormPage";
import Button from "../UI/button/Button";

configure({ adapter: new Adapter() });

describe("<ConfirmationFormPage/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ConfirmationFormPage />);
  });

  it("should render one <Button> item when props.back is sent", () => {
    wrapper.setProps({ back: true });
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it("should render one <Button> item when props.next is sent", () => {
    wrapper.setProps({ next: true });
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it("should render two <Button>s item when props.next and props.back are sent", () => {
    wrapper.setProps({ next: true, back: true });
    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it("should render zero <Button> item when props.back or props.next are not sent", () => {
    expect(wrapper.find(Button)).toHaveLength(0);
  });
});
