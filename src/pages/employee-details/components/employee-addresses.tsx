import { Chip } from "@nextui-org/chip";

import { EmployeeDetails } from "@/stores/useEmployeeDetailsStore";

interface EmployeeAddressesProps {
  addresses: EmployeeDetails["addresses"];
}

export const EmployeeAddresses = ({ addresses }: EmployeeAddressesProps) => {
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

  return (
    <ul className="flex flex-col gap-2">
      <p className="font-semibold">Addresses:</p>
      {addresses.map((address) => (
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
  );
};
