import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmployeeAvatar } from "./employee-avatar";

describe("EmployeeAvatar", () => {
  it("renders employee avatar with correct name and job title", () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const photoURL = faker.image.avatar();
    const jobTitle = faker.person.jobTitle();

    render(
      <EmployeeAvatar
        firstName={firstName}
        jobTitle={jobTitle}
        lastName={lastName}
        photoURL={photoURL}
      />
    );

    const avatarElement = screen.getByRole("img", {
      name: `${firstName}`,
    });
    const nameElement = screen.getByText(`${firstName} ${lastName}`);
    const jobTitleElement = screen.getByText(jobTitle);

    expect(avatarElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(jobTitleElement).toBeInTheDocument();
  });
});
