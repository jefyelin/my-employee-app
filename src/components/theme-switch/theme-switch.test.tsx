import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ThemeSwitch } from "./theme-switch";

describe("ThemeSwitch", () => {
  it("should render ThemeSwitch component", () => {
    render(<ThemeSwitch />);
    const switchElement = screen.getByRole("switch");

    expect(switchElement).toBeInTheDocument();
  });

  it("should toggle theme when clicked", async () => {
    render(<ThemeSwitch />);
    const switchElement = screen.getByRole("switch");

    expect(screen.getByTestId("theme-moon")).toBeInTheDocument();

    await userEvent.click(switchElement);

    expect(screen.getByTestId("theme-sun")).toBeInTheDocument();
  });
});
