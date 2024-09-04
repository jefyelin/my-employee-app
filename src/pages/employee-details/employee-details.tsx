import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  EmployeeActionButtons,
  EmployeeAddresses,
  EmployeeAvatar,
  EmployeeDateInfo,
} from "./components";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useUserStore } from "@/stores";
import { useEmployeeDetailsStore } from "@/stores/useEmployeeDetailsStore";

export const EmployeeDetailsPage = () => {
  const { data, clearEmployeeDetails } = useEmployeeDetailsStore();
  const { clearUser } = useUserStore();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/employee-details/edit");
  };

  const handleLogout = () => {
    clearEmployeeDetails();
    clearUser();
    navigate("/");
  };

  const handleBackEmployeeList = () => {
    navigate("/employee-list");
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
      <div className="m-3 flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-white p-8 shadow-md dark:bg-zinc-900">
        <Header />
        <EmployeeAvatar
          firstName={data.firstName}
          jobTitle={data.jobTitle}
          lastName={data.lastName}
          photoURL={data.photoURL}
        />
        <div className="flex w-full flex-col gap-3">
          <EmployeeDateInfo date={data.birthdate} label="Birthdate" />
          <EmployeeDateInfo date={data.startDate} label="Start Date" />
          <EmployeeAddresses addresses={data.addresses} />
        </div>
        <EmployeeActionButtons
          handleBackEmployeeList={handleBackEmployeeList}
          handleEdit={handleEdit}
          handleLogout={handleLogout}
        />
      </div>
      <Footer />
    </div>
  );
};
