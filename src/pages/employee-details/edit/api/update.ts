import axios, { AxiosResponse } from "axios";

import { EmployeeDetails } from "@/stores/useEmployeeDetailsStore";

export interface UpdateResponse {
  message: string;
}

export const update = async (
  employeeDetails: EmployeeDetails
): Promise<AxiosResponse<UpdateResponse>> => {
  const response: AxiosResponse<UpdateResponse> = await axios.put(
    `/api/employees/${employeeDetails.id}`,
    {
      ...employeeDetails,
    }
  );

  return response;
};
