import { delay, http, HttpResponse } from "msw";

import { employees } from "./data";

import { EmployeeDetails } from "@/stores/useEmployeeDetailsStore";

export const handlers = [
  http.get("/api/employees", async () => {
    await delay(1000);

    return HttpResponse.json(employees, { status: 200 });
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

    const employeePrefix = "employee";
    const expectedPassword = "employee123";
    const errorResponse = HttpResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );

    if (!username.includes(employeePrefix)) {
      return errorResponse;
    }

    const employeeNumber = parseInt(username.replace(employeePrefix, ""));
    const isEmployeeNumberValid = employeeNumber >= 1 && employeeNumber <= 20;

    if (!isEmployeeNumberValid || password !== expectedPassword) {
      return errorResponse;
    }

    return HttpResponse.json(
      {
        user: {
          id: employeeNumber.toString(),
          type: "employee",
        },
        employeeDetails: employees[employeeNumber - 1],
      },
      { status: 200 }
    );
  }),
  http.put("/api/employees/:id", async ({ params, request }) => {
    await delay(1000);

    const newEmployData = (await request.json()) as Omit<EmployeeDetails, "id">;

    const employee = employees.find((employee) => employee.id === params.id);

    if (!employee) {
      return HttpResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    employees[employees.indexOf(employee)] = {
      ...newEmployData,
      id: params.id as string,
    };

    return HttpResponse.json(
      { message: "Employee updated successfully" },
      { status: 200 }
    );
  }),
];
