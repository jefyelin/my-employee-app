import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format } from "date-fns";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { EmployeeDetailsPage } from "./employee-details";

import { employees } from "@/mocks/data";
import { EmployeeDetails } from "@/stores/useEmployeeDetailsStore";

const clearEmployeeDetails = vi.fn();
const clearUser = vi.fn();
const navigate = vi.fn();

let employeeData = employees[0];

vi.mock("@/stores/useEmployeeDetailsStore", () => {
  const actual = vi.importActual("@/stores/useEmployeeDetailsStore");

  return {
    ...actual,
    useEmployeeDetailsStore: () => ({
      data: employeeData,
      clearEmployeeDetails,
    }),
  };
});

let userType = "employee";

vi.mock("@/stores/useUserStore", () => {
  const actual = vi.importActual("@/stores/useUserStore");

  return {
    ...actual,
    useUserStore: () => ({
      type: userType,
      clearUser,
    }),
  };
});

vi.mock("react-router-dom", () => {
  const actual = vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("EmployeeDetailsPage", () => {
  beforeEach(() => {
    employeeData = employees[0];
  });

  it("renders employee details correctly", () => {
    render(<EmployeeDetailsPage />);

    const employeeName = `${employeeData.firstName} ${employeeData.lastName}`;

    expect(
      screen.getByRole("heading", { name: "| MyEmployee |" })
    ).toBeInTheDocument();
    expect(screen.getByText(employeeName)).toBeInTheDocument();
    expect(screen.getByText(employeeData.jobTitle)).toBeInTheDocument();
    expect(screen.getByText("Birthdate:")).toBeInTheDocument();
    expect(
      screen.getByText(format(employeeData.birthdate, "MM/dd/yyyy"))
    ).toBeInTheDocument();
    expect(screen.getByText("Start Date:")).toBeInTheDocument();
    expect(
      screen.getByText(format(employeeData.startDate, "MM/dd/yyyy"))
    ).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Edit Details" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
    expect(screen.getByText("Developed by")).toBeInTheDocument();
    expect(screen.getByText("Jean Arruda")).toBeInTheDocument();
  });

  it("should navigate to login page if no employee data is available", () => {
    employeeData = null as unknown as EmployeeDetails;

    render(<EmployeeDetailsPage />);

    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("should clear employee details and user data when logout button is clicked", async () => {
    render(<EmployeeDetailsPage />);

    await userEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(clearEmployeeDetails).toHaveBeenCalled();
    expect(clearUser).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("should navigate to edit page when edit button is clicked", async () => {
    render(<EmployeeDetailsPage />);

    await userEvent.click(screen.getByRole("button", { name: "Edit Details" }));

    expect(navigate).toHaveBeenCalledWith("/employee-details/edit");
  });

  it("should navigate to employee list page when back button is clicked", async () => {
    userType = "admin";

    render(<EmployeeDetailsPage />);

    const backButton = screen.getByRole("button", {
      name: "Employee List",
    });

    expect(backButton).toBeInTheDocument();

    await userEvent.click(backButton);

    expect(navigate).toHaveBeenCalledWith("/employee-list");
  });
});
