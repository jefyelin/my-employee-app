import { DateValue } from "@internationalized/date";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { EditDetailsSchema, EmployeeForm } from "./components/employee-form";
import { useUpdateMutation } from "./hooks";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useEmployeeDetailsStore } from "@/stores/useEmployeeDetailsStore";

export const EmployeeDetailsPageEdit = () => {
  const { data, setEmployeeDetails } = useEmployeeDetailsStore();
  const navigate = useNavigate();

  const formatDateValueToDate = (dateValue?: DateValue) => {
    if (!dateValue) return;

    return new Date(dateValue.year, dateValue.month - 1, dateValue.day);
  };

  const { mutate } = useUpdateMutation();

  const onSubmit = (data: EditDetailsSchema) => {
    const updatedData = {
      ...data,
      birthdate: formatDateValueToDate(data.birthdate) as unknown as Date,
      startDate: formatDateValueToDate(data.startDate) as unknown as Date,
    };

    mutate(updatedData);
    setEmployeeDetails(updatedData);

    navigate("/employee-details");
  };

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="m-3 flex max-h-[710px] w-full max-w-lg flex-col gap-5 overflow-auto rounded-2xl bg-white p-8 shadow-md dark:bg-zinc-900">
        <Header />
        <h2 className="text-lg font-semibold">Edit Employee</h2>
        <EmployeeForm initialValues={data} onSubmit={onSubmit} />
      </div>
      <Footer />
    </div>
  );
};
