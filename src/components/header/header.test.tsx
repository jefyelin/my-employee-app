import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header } from "./header";

describe("Header", () => {
  it("should render with theme switch and the correct title", () => {
    render(<Header />);

    expect(
      screen.getByRole("heading", {
        name: "| MyEmployee |",
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });
});
