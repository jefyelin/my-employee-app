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
        { message: "Login successful" },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }),
];
