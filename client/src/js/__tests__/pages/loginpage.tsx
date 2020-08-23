import React from "react";
import {render, screen} from "../test-utils";
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import LoginPage from "../../pages/LoginPage";
import Api from '../../services/ApiService';


describe("LoginPage component", () => {
    test("should match snapshot", () => {
        const { asFragment } = render(<LoginPage />)
        expect(asFragment()).toMatchSnapshot();
    });

    test("should have a username field", () => {
        render(<LoginPage />)
        expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    });

    test("should have a password field", () => {
        render(<LoginPage />)
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    });

    test("username insert text", () => {
        render(<LoginPage />)

        userEvent.type(screen.getByLabelText('Username:'), 'dave');
        expect(screen.getByLabelText('Username:')).toHaveValue('dave');
    });

    test("password insert text", () => {
        render(<LoginPage />)

        userEvent.type(screen.getByLabelText('Password:'), 'somepassword');
        expect(screen.getByLabelText('Password:')).toHaveValue('somepassword');
    });

    test("log user in successfully", (done) => {
        const fakeUserResponse = {
            message: 'success',
            token: 'fake_user_token',
            user: {}
        }

        // @ts-ignore
        jest.spyOn(Api, 'loginUser').mockImplementationOnce(() => {
            return Promise.resolve(fakeUserResponse)
        });

        render(<LoginPage />)

        userEvent.type(screen.getByLabelText('Username:'), 'dave');
        userEvent.type(screen.getByLabelText('Password:'), 'somepassword');
        userEvent.click(screen.getByText('submit'));

        setImmediate(() => {
            expect(window.localStorage.getItem('user_token')).toEqual(fakeUserResponse.token)
            done();
        });
    });
});
