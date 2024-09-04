import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { LoginPage } from "./login";

const mutate = vi.fn();
const useNavigate = vi.fn();

vi.mock("react-router-dom", () => {
  const actual = vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => useNavigate,
  };
});

vi.mock("./hooks", () => {
  const actual = vi.importActual("./hooks");

  return {
    ...actual,
    useLoginMutation: () => ({
      mutate,
      isPending: false,
    }),
  };
});

describe("LoginPage", () => {
  it("should render with the image and form items", () => {
    render(<LoginPage />);

    expect(
      screen.getByRole("img", {
        name: /group of diverse colleagues in a meeting, smiling and shaking hands/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "| MyEmployee |" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Nice to see you again" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByText("Developed by")).toBeInTheDocument();
    expect(screen.getByText("Jean Arruda")).toBeInTheDocument();
  });

  it("should submit the form", async () => {
    render(<LoginPage />);

    await userEvent.type(screen.getByLabelText("Username"), "user");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(mutate).toHaveBeenCalledWith({
      username: "user",
      password: "password",
    });
  });
});
