import { useUserStore } from "@/stores";

export const EmployeeList = () => {
  const { type, id } = useUserStore();

  return (
    <div>
      type: {type} | id: {id}
    </div>
  );
};
