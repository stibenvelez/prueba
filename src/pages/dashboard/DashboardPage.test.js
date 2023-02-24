import React from "react";
import { prettyDOM, render, screen, waitFor } from "@testing-library/react";
import DashboardPage from "./DashboardPage";
import { BrowserRouter as Router } from "react-router-dom";
import { reports, employees } from "./utils/data";
import userEvent from "@testing-library/user-event";
import { Provider, useSelector, useDispatch } from "react-redux";
import * as reactRedux from 'react-redux'

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => { }),
}));


describe("test DashboardPage", () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

    beforeEach(async () => {
        const dispatch = jest.fn();
        useDispatch.mockReturnValue(dispatch);
        /********* */
        useSelector.mockImplementation((callback) => callback(
            reports
        ));
        useSelectorMock.mockReturnValue(employees)

        useSelector.mockClear();
        useSelectorMock.mockClear();
        render(
            <Router>
                <DashboardPage />
            </Router>
        );
    });

    it("should have a title Dashboard", () => {
        const title = screen.getByText(/Dashboard/i);
        expect(title).toBeInTheDocument();

    });

    it("should have indicators cards", async () => {
        await waitFor(() => {

            //expect(screen.getByText(/Ingresos totales/i)).toBeInTheDocument();
            //expect(screen.getByText(/Ventas realizadas/i)).toBeInTheDocument();
            //expect(screen.getByText(/Gastos totales/i)).toBeInTheDocument();
            //expect(screen.getByText(/Comisiones pagadas/i)).toBeInTheDocument();
        });

    })

    it("should haver a filter button", async () => {
        const button = screen.getByText(/Filtros/i);
        expect(button).toBeInTheDocument();

        await userEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Desde')).toBeInTheDocument();
            expect(screen.getByText('Hasta')).toBeInTheDocument();
            expect(screen.getByText('Categoría')).toBeInTheDocument();
            expect(screen.getByText('Empleados')).toBeInTheDocument();
        });

        const buttoClose = screen.getByRole("button");
        await userEvent.click(buttoClose);
        expect(screen.getByText(/Filtros/i)).toBeInTheDocument();

    })

});
