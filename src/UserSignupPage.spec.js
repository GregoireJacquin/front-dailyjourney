import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom';
import UserSignupPage from "./UserSignupPage";


beforeEach(cleanup);

describe('UserSignupPage', () => {
    describe('Layout', () => {
        it('has header of sign up', () => {
            render(<UserSignupPage />);
            const header = screen.getByRole('heading');
            expect(header).toHaveTextContent('Sign up');
        })
        it('has input for display name', () => {
            render(<UserSignupPage />);
            const displayNameInput = screen.getByPlaceholderText('Your display name');
            expect(displayNameInput).toBeInTheDocument();
        })
        it('has input for username', () => {
            render(<UserSignupPage />);
            const usernameInput = screen.getByPlaceholderText('Your username');
            expect(usernameInput).toBeInTheDocument();
        })
        it('has input for password', () => {
            render(<UserSignupPage />);
            const passwordInput = screen.getByPlaceholderText('Your password');
            expect(passwordInput).toBeInTheDocument();
        })
        it('has password type for password input', () => {
            render(<UserSignupPage />);
            const passwordInput = screen.getByPlaceholderText('Your password');
            expect(passwordInput.type).toBe("password");
        })
        it('has repeat input for password', () => {
            render(<UserSignupPage />);
            const repeatPasswordInput = screen.getByPlaceholderText('Repeat your password');
            expect(repeatPasswordInput).toBeInTheDocument();
        })
        it('has repeat password type for password input', () => {
            render(<UserSignupPage />);
            const repeatPasswordInput = screen.getByPlaceholderText('Repeat your password');
            expect(repeatPasswordInput.type).toBe("password");
        })
        it('has submit button', () => {
            render(<UserSignupPage />);
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument();
        })
    })
    describe("Interaction", () => {
        const changeEvent = (content) => {
            return {
                target: {
                    value: content
                }
            }
        };
        let button,displayNameInput,displayUsernameInput,passwordInput,repeatPasswordInput;
        const setupFormSubmit = (actions) => {
            render(<UserSignupPage actions={actions} />)
            displayNameInput = screen.getByPlaceholderText('Your display name');
            displayUsernameInput = screen.getByPlaceholderText('Your username');
            passwordInput = screen.getByPlaceholderText('Your password');
            repeatPasswordInput = screen.getByPlaceholderText('Repeat your password');

            fireEvent.change(displayNameInput, changeEvent("my-display-name"));
            fireEvent.change(displayUsernameInput, changeEvent("my-user-name"));
            fireEvent.change(passwordInput, changeEvent("P4ssword"));
            fireEvent.change(repeatPasswordInput, changeEvent("P4ssword"));
            button = screen.getByRole('button')
        }
        it('sets the displayname value into state', () => {
            render(<UserSignupPage />);
            const displayNameInput = screen.getByPlaceholderText('Your display name');
            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            expect(displayNameInput).toHaveValue('my-display-name');
        })
        it('sets the username value into state', () => {
            render(<UserSignupPage />);
            const displayUsernameInput = screen.getByPlaceholderText('Your username');
            fireEvent.change(displayUsernameInput, changeEvent('my-username'));
            expect(displayUsernameInput).toHaveValue('my-username');
        })
        it('sets the password value into state', () => {
            render(<UserSignupPage />);
            const passwordInput = screen.getByPlaceholderText('Your password');
            fireEvent.change(passwordInput, changeEvent('P4ssword'));
            expect(passwordInput).toHaveValue('P4ssword');
        })
        it('sets the repeat password value into state', () => {
            render(<UserSignupPage />);
            const repeatPasswordInput = screen.getByPlaceholderText('Repeat your password');
            fireEvent.change(repeatPasswordInput, changeEvent('P4ssword'));
            expect(repeatPasswordInput).toHaveValue('P4ssword');
        })
        it('calls postSignup when the fields is valid and the action are provided in props', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }
            setupFormSubmit(actions);        
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        })
        it('does not throw exception when clicking the button Signup', () => {            
            setupFormSubmit();
            expect(() => fireEvent.click(button)).not.toThrow();
        })
        it('calls post with user body when fields are valid', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }
            setupFormSubmit(actions);        
            fireEvent.click(button);
            const expectedUserObject = {
                username: 'my-user-name',
                displayname: 'my-display-name',
                password: 'P4ssword'
            }
            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
        })
    })
})