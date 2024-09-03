import type { LoginResponse } from "../api";

import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

import { useUserStore } from "@/stores";
import { useEmployeeDetailsStore } from "@/stores/useEmployeeDetailsStore";

export const useValidateLogin = (response?: AxiosResponse<LoginResponse>) => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { setEmployeeDetails } = useEmployeeDetailsStore();

  useEffect(() => {
    const success = response?.status === 200;

    if (success && response.data.user.type === "admin") {
      setUser({ ...response.data.user });

      navigate("/employee-list");
    }

    if (success && response.data.user.type === "employee") {
      setUser({ ...response.data.user });
      setEmployeeDetails({ ...response.data.employeeDetails });

      navigate("/employee-details");
    }
  }, [response]);
};
