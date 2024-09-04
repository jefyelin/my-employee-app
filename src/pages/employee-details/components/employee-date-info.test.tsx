import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { format } from "date-fns";
import { describe, expect, it } from "vitest";

import { EmployeeDateInfo } from "./employee-date-info";

describe("EmployeeDateInfo", () => {
  const label = faker.database.column();
  const date = faker.date.recent();

  it("renders the label and formatted date", () => {
    render(<EmployeeDateInfo date={date} label={label} />);

    const labelElement = screen.getByText(`${label}:`);
    const formattedDateElement = screen.getByText(format(date, "MM/dd/yyyy"));

    expect(labelElement).toBeInTheDocument();
    expect(formattedDateElement).toBeInTheDocument();
  });
});
