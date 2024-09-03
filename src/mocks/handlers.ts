import { http, HttpResponse, delay } from "msw";

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
  http.post("/api/login", async ({ request }) => {
    await delay(1000);

    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    if (username === "admin" && password === "admin123") {
      return HttpResponse.json(
        {
          user: {
            id: "1",
            type: "admin",
          },
        },
        { status: 200 }
      );
    }

    if (username === "employee" && password === "employee123") {
      return HttpResponse.json(
        {
          user: {
            id: "2",
            type: "employee",
          },
          employeeDetails: {
            firstName: "John",
            lastName: "Doe",
            birthdate: new Date("1990-01-01"),
            jobTitle: "Software Engineer",
            startDate: new Date("2022-01-01"),
            photoURL:
              "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg",
            addresses: [
              {
                id: "1",
                type: "home",
                address: "1234 Elm St.",
              },
              {
                id: "2",
                type: "mailing",
                address: "5678 Oak St.",
              },
              {
                id: "3",
                type: "custom",
                address: "91011 Pine St.",
              },
            ],
          },
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }),
];
