import { useQuery } from "@tanstack/react-query";

import { employees } from "../api";

export const useEmployeesQuery = () =>
  useQuery({
    queryKey: ["employees"],
    queryFn: employees,
  });
