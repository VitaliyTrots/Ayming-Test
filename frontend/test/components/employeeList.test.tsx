import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import EmployeeList from "../../src/EmployeeList";

const server = setupServer(
  rest.get(
    "http://localhost:3000/api/employee",
    (req, res, ctx) => {
      return res(ctx.json({ data: [
        { id: 1, name: "First name", salary: 10, total: 5 },
        { id: 2, name: "Second name", salary: 15, total: 3 },
        { id: 3, name: "Third name", salary: 20, total: 1 }
      ] }));
    }
  )
);

describe("EmployeeList component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render the form with empty list", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path = "*" element={<EmployeeList />} />
        </Routes>
      </BrowserRouter>
    );

    const label = screen.getByText("Employee list");
    const employeeList = screen.getByRole("list");
    const noEmployeesText = screen.getByText("There is no employees.");
  });

  it("should render the form with list of employees after fetching data", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path = "*" element={<EmployeeList />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/First name/)).toBeInTheDocument();
      expect(screen.getByText(/Second name/)).toBeInTheDocument();
      expect(screen.getByText(/Third name/)).toBeInTheDocument();
    });
  });
});
