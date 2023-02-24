import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import FormLogin from "./FormLogin";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { LoginFormMock, LoginFormMockEmpty, LoginFormMockError } from "./utils/FormLogin";
import userEvent from "@testing-library/user-event";
import auth from "../../redux/auth/auth.slice";
import axios from "axios";
import { getEnvVariables } from "../../helpers/getEnvVariables";
const { VITE_API_URL } = getEnvVariables();

jest.mock("axios");
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
}));
const initialState = {
    reducer: {
        auth,
    },
};

describe("test FormLogin", () => {
    beforeEach(async () => {
        const store = configureStore(initialState);
        useSelector.mockImplementation((callback) => {
            return callback({
                auth: {
                    auth: false,
                    user: {},
                    loading: true,
                    loadingLogin: false,
                    error: false,
                },
            });
        });
        useSelector.mockClear();
        axios.post.mockResolvedValue({ data: LoginFormMock });
        render(
            <Provider store={store}>
                <FormLogin />
            </Provider>
        );
    }),
        it("should two input exists at the screen", async () => {
            const userNameInput = screen.getByRole("textbox", {
                name: /Usuario/i,
            });
            const passwordNameInput = screen.getByLabelText(/Contraseña/i);

            expect(userNameInput).toBeInTheDocument();
            expect(passwordNameInput).toBeInTheDocument();

            expect(userNameInput).toHaveAttribute("type", "text");
            expect(passwordNameInput).toHaveAttribute("type", "password");

            expect(userNameInput).toHaveValue("");
            expect(passwordNameInput).toHaveValue("");

            await userEvent.type(userNameInput, LoginFormMock.user);
            await userEvent.type(passwordNameInput, LoginFormMock.password);

            await waitFor(() => {
                expect(userNameInput).toHaveValue(LoginFormMock.user);
                expect(passwordNameInput).toHaveValue(LoginFormMock.password);
            });

            await userEvent.type(userNameInput, LoginFormMock.user);
            await userEvent.type(passwordNameInput, LoginFormMock.password);
        });

    it("should enable the submit button if the form values are valid", async () => {
        const userNameInput = screen.getByRole("textbox", {
            name: /Usuario/i,
        });
        const passwordNameInput = screen.getByLabelText(/Contraseña/i);
        const submitButton = screen.getByRole("button", { name: /Ingresar/i });

        expect(submitButton).toBeDisabled();

        await userEvent.type(userNameInput, LoginFormMock.user);
        await userEvent.type(passwordNameInput, LoginFormMock.password);
        await waitFor(() => {
            expect(userNameInput).toHaveValue(LoginFormMock.user);
            expect(passwordNameInput).toHaveValue(LoginFormMock.password);
        });

        expect(submitButton).not.toBeDisabled();
    });
    it("should disable the submit button if the inputs are empty", async () => {
        const userNameInput = screen.getByText(/Usuario/i);
        const passwordNameInput = screen.getByText('Contraseña');
        const submitButton = screen.getByRole("button", { name: /Ingresar/i });

        await userEvent.type(userNameInput, LoginFormMock.user);

        await waitFor(() => {
            expect(submitButton).toBeDisabled();
        });
    });

    it("should disable the submit button if the form values are invalid", async () => {

        const userNameInput = screen.getByText(/Usuario/i);
        const passwordNameInput = screen.getByText('Contraseña');
        const submitButton = screen.getByRole("button", { name: /Ingresar/i });
        expect(submitButton).toBeDisabled();



        await userEvent.type(userNameInput, LoginFormMock.user);
        await userEvent.type(passwordNameInput, LoginFormMockError.password);
        await userEvent.click(submitButton);


        await waitFor(() => {
            expect(submitButton).not.toBeDisabled();
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    });


});
