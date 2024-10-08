import type { InputProps } from "./input";

import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";

import { Input } from "./input";

const CustomInputRender = (props: Omit<InputProps, "register">) => {
  const { register } = useForm({ mode: "onChange" });

  return <Input {...props} register={register("input-test")} />;
};

describe("Input", () => {
  it("should render with a custom label and default text type", () => {
    render(<CustomInputRender label="Username" />);

    const input = screen.getByLabelText("Username");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("should render with custom password type", () => {
    render(<CustomInputRender label="Password" type="password" />);

    const input = screen.getByLabelText("Password");

    expect(input).toHaveAttribute("type", "password");
  });

  it("should render with an error message", () => {
    render(<CustomInputRender errorMessage="Invalid email" label="Email" />);

    const errorMessage = screen.getByText("Invalid email");

    expect(errorMessage).toBeInTheDocument();
  });

  it("should type a text", async () => {
    render(<CustomInputRender label="Username" />);

    const input = screen.getByLabelText("Username");

    const expectedValue = faker.name.firstName();

    await userEvent.type(input, expectedValue);

    expect(input).toHaveValue(expectedValue);
  });
});
