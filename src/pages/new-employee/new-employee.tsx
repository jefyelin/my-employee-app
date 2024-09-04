import { DateValue } from "@internationalized/date";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { NewEmployeeForm } from "./components";
import { NewUserSchema } from "./components/new-employee-form";
import { useCreateEmployee } from "./hooks/useCreateEmployee";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useUserStore } from "@/stores";
import { useEmployeeDetailsStore } from "@/stores/useEmployeeDetailsStore";

export const NewEmployeePage = () => {
  const { type: userType } = useUserStore();
  const { setEmployeeDetails } = useEmployeeDetailsStore();
  const { mutate } = useCreateEmployee();
  const navigate = useNavigate();

  const formatDateValueToDate = (dateValue?: DateValue) => {
    if (!dateValue) return;

    return new Date(dateValue.year, dateValue.month - 1, dateValue.day);
  };

  const onSubmit = (data: NewUserSchema) => {
    const newUserData = {
      ...data,
      birthdate: formatDateValueToDate(data.birthdate) as unknown as Date,
      startDate: formatDateValueToDate(data.startDate) as unknown as Date,
    };

    mutate(newUserData);
    setEmployeeDetails(newUserData);

    navigate("/employee-details");
  };

  useEffect(() => {
    if (userType !== "admin") {
      navigate("/");
    }
  }, [userType]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="m-3 flex max-h-[710px] w-full max-w-lg flex-col gap-5 overflow-auto rounded-2xl bg-white p-8 shadow-md dark:bg-zinc-900">
        <Header />
        <h2 className="text-lg font-semibold">Add New Employee</h2>
        <NewEmployeeForm onSubmit={onSubmit} />
      </div>
      <Footer />
    </div>
  );
};
