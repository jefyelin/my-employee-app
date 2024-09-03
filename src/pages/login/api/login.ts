import axios, { AxiosResponse } from "axios";

import { LoginSchema } from "../schemas";

import { EmployeeDetails } from "@/stores/useEmployeeDetailsStore";

export interface LoginResponse {
  user: {
    id: string;
    type: string;
  };
  employeeDetails: EmployeeDetails;
}

export const login = async (
  credentials: LoginSchema
): Promise<AxiosResponse<LoginResponse>> => {
  const response: AxiosResponse<LoginResponse> = await axios.post(
    "/api/login",
    {
      ...credentials,
    }
  );

  return response;
};
