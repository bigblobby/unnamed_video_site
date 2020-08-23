import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import LoginPage from "../../pages/LoginPage";

configure({adapter: new Adapter()});

describe("LoginPage component", () => {
    const wrapper = shallow(<LoginPage />);
    test("should match snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
});
