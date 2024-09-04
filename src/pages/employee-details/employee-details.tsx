import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { format } from "date-fns";
import { ArrowLeft, LogOut, UserRoundPen } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useUserStore } from "@/stores";
import { useEmployeeDetailsStore } from "@/stores/useEmployeeDetailsStore";

export const EmployeeDetailsPage = () => {
  const { type: userType } = useUserStore();
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
        <div className="flex w-full items-center gap-3">
          <Avatar
            className="h-28 w-28 min-w-28 text-large"
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
        <div className="flex w-full flex-col gap-3">
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
                <Chip
                  className="min-w-[55px] text-center"
                  color={getChipColor(address.type)}
                  size="sm"
                >
                  {address.type}
                </Chip>
                <span>|</span>
                <p className="flex items-center">{address.address}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full gap-2">
          {userType === "admin" ? (
            <Button
              className="w-full"
              color="secondary"
              type="button"
              variant="bordered"
              onClick={handleBackEmployeeList}
            >
              <ArrowLeft size={16} />
              Employee List
            </Button>
          ) : (
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
          )}
          <Button
            className="w-full"
            color="secondary"
            type="button"
            onClick={handleEdit}
          >
            <UserRoundPen size={16} />
            Edit Details
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
