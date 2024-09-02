import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Button } from "@/components/button";

describe("Button", () => {
  it("should render button with text", () => {
    render(<Button text="Click me" onClick={() => {}} />);
  });

  it("should call onClick when clicked", () => {
    const onClick = vi.fn();

    render(<Button text="Click me" onClick={onClick} />);

    screen.getByRole("button").click();

    expect(onClick).toHaveBeenCalled();
  });
});
