import axios, { AxiosResponse } from "axios";

import { EmployeeDetails } from "@/stores/useEmployeeDetailsStore";

export const employees = async (): Promise<EmployeeDetails[]> => {
  const response: AxiosResponse<EmployeeDetails[]> =
    await axios.get<EmployeeDetails[]>("/api/employees");

  return response.data;
};
