import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SubmitButton } from "./submit-button";

describe("SubmitButton", () => {
  it("should render the button with the provided label", () => {
    const label = "Submit";

    render(<SubmitButton label={label} />);

    const button = screen.getByRole("button", { name: label });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should render the button with the loading state", () => {
    render(<SubmitButton isLoading={true} label="Submit" />);

    const loadingButton = screen.getByRole("button", {
      name: "Loading Loading",
    });

    expect(loadingButton).toBeInTheDocument();
    expect(loadingButton).toBeDisabled();
  });

  it("should render the button without the loading state", () => {
    const label = "Submit";

    render(<SubmitButton isLoading={false} label={label} />);

    const button = screen.getByRole("button", { name: label });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });
});
