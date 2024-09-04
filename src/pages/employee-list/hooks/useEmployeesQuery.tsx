import { useQuery } from "@tanstack/react-query";

import { employees } from "../api/employees";

export const useEmployeesQuery = () =>
  useQuery({
    queryKey: ["employees"],
    queryFn: employees,
  });
