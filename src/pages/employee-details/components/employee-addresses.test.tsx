import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmployeeAddresses } from "@/pages/employee-details/components/employee-addresses";
import { EmployeeDetails } from "@/stores/useEmployeeDetailsStore";

describe("EmployeeAddresses", () => {
  const addresses: EmployeeDetails["addresses"] = [
    {
      id: faker.string.uuid(),
      type: "home",
      address: faker.location.streetAddress(),
    },
    {
      id: faker.string.uuid(),
      type: "mailing",
      address: faker.location.streetAddress(),
    },
    {
      id: faker.string.uuid(),
      type: "custom",
      address: faker.location.streetAddress(),
    },
  ];

  it("renders the addresses correctly", () => {
    render(<EmployeeAddresses addresses={addresses} />);

    const addressElements = screen.getAllByRole("listitem");

    expect(addressElements).toHaveLength(addresses.length);

    addresses.forEach((address) => {
      const chipElement = screen.getByText(address.type);
      const addressElement = screen.getByText(address.address);

      expect(chipElement).toBeInTheDocument();
      expect(addressElement).toBeInTheDocument();
    });
  });
});
