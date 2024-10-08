import { useMutation } from "@tanstack/react-query";

import { update } from "../api";

import { EmployeeDetails } from "@/stores/useEmployeeDetailsStore";

export const useUpdateMutation = () =>
  useMutation({
    mutationFn: async (employeeDetails: EmployeeDetails) =>
      await update(employeeDetails),
  });
