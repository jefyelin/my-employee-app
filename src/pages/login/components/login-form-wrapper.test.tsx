import { describe, it, expect } from "vitest";
import { LoginFormWrapper } from "./login-form-wrapper";
import { render, screen } from "@testing-library/react";

describe("LoginFormWrapper", () => {
  it("should render the children and the title with welcome message", () => {
    render(<LoginFormWrapper>Children Test</LoginFormWrapper>);

    expect(screen.getByText("Children Test")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "MyEmployee" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Nice to see you again" })
    ).toBeInTheDocument();
  });
});
