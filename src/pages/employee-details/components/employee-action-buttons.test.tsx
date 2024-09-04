import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EmployeeActionButtons } from "./employee-action-buttons";

const handleBackEmployeeList = vi.fn();
const handleLogout = vi.fn();
const handleEdit = vi.fn();

let userTypeMock = "admin";

vi.mock("@/stores", () => ({
  useUserStore: () => ({ type: userTypeMock }),
}));

describe("EmployeeActionButtons", () => {
  it("should render the correct buttons for admin user and call correct functions", async () => {
    render(
      <EmployeeActionButtons
        handleBackEmployeeList={handleBackEmployeeList}
        handleEdit={handleEdit}
        handleLogout={handleLogout}
      />
    );

    const employeeListButton = screen.getByRole("button", {
      name: "Employee List",
    });
    const editDetailsButton = screen.getByRole("button", {
      name: "Edit Details",
    });
    const logoutButton = screen.queryByRole("button", { name: "Logout" });

    expect(employeeListButton).toBeInTheDocument();
    expect(editDetailsButton).toBeInTheDocument();
    expect(logoutButton).not.toBeInTheDocument();

    await userEvent.click(employeeListButton);
    await userEvent.click(editDetailsButton);

    expect(handleBackEmployeeList).toHaveBeenCalled();
    expect(handleEdit).toHaveBeenCalled();
  });

  it("should render the correct buttons for user user and call correct functions", async () => {
    userTypeMock = "employee";

    render(
      <EmployeeActionButtons
        handleBackEmployeeList={handleBackEmployeeList}
        handleEdit={handleEdit}
        handleLogout={handleLogout}
      />
    );

    const logoutButton = screen.getByRole("button", { name: "Logout" });
    const editDetailsButton = screen.getByRole("button", {
      name: "Edit Details",
    });
    const employeeListButton = screen.queryByRole("button", {
      name: "Employee List",
    });

    expect(editDetailsButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(employeeListButton).not.toBeInTheDocument();

    await userEvent.click(logoutButton);
    await userEvent.click(editDetailsButton);

    expect(handleLogout).toHaveBeenCalled();
    expect(handleEdit).toHaveBeenCalled();
  });
});
