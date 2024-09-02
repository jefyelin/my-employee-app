import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/employees", () => {
    return HttpResponse.json(
      [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          jobTitle: "Software Engineer",
          startDate: "2022-01-01",
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          jobTitle: "Product Manager",
          startDate: "2021-06-15",
        },
      ],
      { status: 200 }
    );
  }),
];
