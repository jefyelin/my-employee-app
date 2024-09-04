import axios from "axios";
import { describe, expect, it, vi } from "vitest";

import { update } from "../api";

import { employees } from "@/mocks/data";
import { EmployeeDetails } from "@/stores/useEmployeeDetailsStore";

describe("/api/update", () => {
  it("should send a PUT request with the provided data", async () => {
    const data: EmployeeDetails = employees[0];

    const axiosPutSpy = vi.spyOn(axios, "put");

    axiosPutSpy.mockResolvedValueOnce({});

    await update(data);

    expect(axiosPutSpy).toHaveBeenCalledWith(`/api/employees/${data.id}`, data);

    axiosPutSpy.mockRestore();
  });
});
