import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { LoginForm } from "./login-form";

describe("LoginForm", () => {
  it("should render correctly", () => {
    render(<LoginForm onSubmit={() => {}} />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("should call onSubmit when form is submitted with valid data", async () => {
    const onSubmit = vi.fn();

    render(<LoginForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText("Username"), "user");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(onSubmit).toHaveBeenCalled();
  });

  it("should not call onSubmit when form is submitted with invalid data", async () => {
    const onSubmit = vi.fn();

    render(<LoginForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show submit button loading state when isSubmitPending is true", () => {
    render(<LoginForm isSubmitPending onSubmit={() => {}} />);

    expect(
      screen.getByRole("button", { name: "Loading Loading" })
    ).toBeDisabled();
  });
});
