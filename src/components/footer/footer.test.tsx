import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "./footer";

describe("Footer", () => {
  it("should render with the correct text", () => {
    render(<Footer />);

    expect(screen.getByText("Developed by")).toBeInTheDocument();
    expect(screen.getByText("Jean Arruda")).toBeInTheDocument();
  });
});
