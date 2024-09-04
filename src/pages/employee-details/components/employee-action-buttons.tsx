import { Button } from "@nextui-org/button";
import { ArrowLeft, LogOut, UserRoundPen } from "lucide-react";

import { useUserStore } from "@/stores";

interface EmployeeActionButtonsProps {
  handleBackEmployeeList: () => void;
  handleLogout: () => void;
  handleEdit: () => void;
}

export const EmployeeActionButtons = ({
  handleBackEmployeeList,
  handleLogout,
  handleEdit,
}: EmployeeActionButtonsProps) => {
  const { type: userType } = useUserStore();

  return (
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
  );
};
