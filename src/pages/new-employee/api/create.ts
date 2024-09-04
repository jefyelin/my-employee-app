import axios from "axios";

import { EmployeeDetails } from "@/stores/useEmployeeDetailsStore";

export const create = async (employeeDetials: EmployeeDetails) => {
  const response = await axios.post("/api/employees", employeeDetials);

  return response.data;
};
