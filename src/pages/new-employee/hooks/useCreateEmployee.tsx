import { useMutation } from "@tanstack/react-query";

import { create } from "../api/create";

import { EmployeeDetails } from "@/stores/useEmployeeDetailsStore";

export const useCreateEmployee = () =>
  useMutation({
    mutationFn: async (employeeDetails: EmployeeDetails) =>
      await create(employeeDetails),
  });
