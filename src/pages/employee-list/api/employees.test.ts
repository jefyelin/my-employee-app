import axios from "axios";
import { describe, expect, it, vi } from "vitest";

import { employees as employeesApi } from "../api";

import { employees } from "@/mocks/data";

describe("/api/getEmployees", () => {
  it("should send a GET request and return the employees data", async () => {
    const axiosGetSpy = vi.spyOn(axios, "get");

    axiosGetSpy.mockResolvedValueOnce({ data: employees });

    const response = await employeesApi();

    expect(axiosGetSpy).toHaveBeenCalledWith("/api/employees");
    expect(response).toEqual(employees);

    axiosGetSpy.mockRestore();
  });
});
