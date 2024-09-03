import { Avatar } from "@nextui-org/avatar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@nextui-org/button";
import { LogOut, UserRoundPen } from "lucide-react";
import { Chip } from "@nextui-org/chip";

import { useUserStore } from "@/stores";
import { Navbar } from "@/components/navbar";
import { useEmployeeDetailsStore } from "@/stores/useEmployeeDetailsStore";

export const EmployeeDetails = () => {
  const { data, clearEmployeeDetails } = useEmployeeDetailsStore();
  const { clearUser } = useUserStore();
  const navigate = useNavigate();

  const getChipColor = (type: "home" | "mailing" | "custom") => {
    switch (type) {
      case "home":
        return "primary";
      case "mailing":
        return "success";
      case "custom":
        return "warning";
      default:
        return "default";
    }
  };

  const handleEdit = () => {
    navigate("/employee-details/edit");
  };

  const handleLogout = () => {
    clearEmployeeDetails();
    clearUser();
    navigate("/");
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
    <div className="w-full h-screen flex justify-center items-center">
      <Navbar />
      <div className="w-full m-3 max-w-sm flex flex-col p-8 gap-5 rounded-2xl bg-white dark:bg-zinc-900 shadow-md">
        <h1 className="text-lg font-bold pb-5 text-start">| MyEmployee |</h1>
        <div className="w-full flex gap-5">
          <Avatar
            className="w-28 h-28 text-large"
            name={data.firstName}
            src={data?.photoURL}
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-semibold">
              {data.firstName} {data.lastName}
            </h1>
            <h2 className="text-lg font-medium">{data.jobTitle}</h2>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div>
            <p className="font-semibold">Birthdate:</p>
            <p>{format(data.birthdate, "MM/dd/yyyy")}</p>
          </div>
          <div>
            <p className="font-semibold">Start Date:</p>
            <p>{format(data.startDate, "MM/dd/yyyy")}</p>
          </div>
          <ul className="flex flex-col gap-2">
            <p className="font-semibold">Addresses:</p>
            {data.addresses.map((address) => (
              <li key={address.id} className="flex w-full gap-2 align-middle">
                <Chip color={getChipColor(address.type)} size="sm">
                  {address.type}
                </Chip>
                <span>|</span>
                <p className="items-center flex">{address.address}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex gap-2">
          <Button
            className="w-full"
            color="secondary"
            type="button"
            onClick={handleEdit}
          >
            <UserRoundPen size={16} />
            Edit Details
          </Button>
          <Button
            className="w-full"
            color="secondary"
            type="button"
            variant="bordered"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
