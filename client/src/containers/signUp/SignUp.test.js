import React from "react";

import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import SignUp from "./SignUp";

configure({ adapter: new Adapter() });

describe("<SignUp />", () => {
  let wrapper;
  const setPageControl = jest.fn();

  beforeEach(() => {
    wrapper = mount(<SignUp setPageControl={setPageControl} />);
  });

  it("renders", () => {
    expect(wrapper).not.toBeNull();
  });

  it("Shows my default Sign-Up page (home in that case)", () => {
    expect(wrapper.find(".nextButton")).toHaveLength(1);
    expect(wrapper.find(".backButton")).toHaveLength(0);

    expect(wrapper.find("p.inputFieldName")).toHaveLength(2);
  });

  it("correctly page changed to next pages (2nd Sign-up page and Confirmation Page)", async () => {
    let input0 = wrapper.find("input#input0");
    let input1 = wrapper.find("input#input1");

    input0.simulate("change", { target: { value: "NameTest" } });
    input1.simulate("change", { target: { value: "00000000000" } });
    expect(wrapper.find("input#input0")).toHaveLength(1);
    expect(wrapper.find("input#input1")).toHaveLength(1);

    let buttonNext = wrapper.find("button.nextButton");
    buttonNext.simulate("click");

    expect(wrapper.find(".nextButton")).toHaveLength(1);
    expect(wrapper.find(".backButton")).toHaveLength(1);

    input0 = wrapper.find("input#input0");
    input1 = wrapper.find("input#input1");

    input0.simulate("change", { target: { value: "test@test.com" } });
    input1.simulate("change", { target: { value: "01/01/2000" } });
    expect(wrapper.find("input#input0")).toHaveLength(1);
    expect(wrapper.find("input#input1")).toHaveLength(1);

    buttonNext = wrapper.find("button.nextButton");
    buttonNext.simulate("click");

    expect(wrapper.find("h1").text()).toEqual("Confirmation");
  });
});
