import { format } from "date-fns";

interface EmployeeDateInfoProps {
  label: string;
  date: Date;
}

export const EmployeeDateInfo = ({ label, date }: EmployeeDateInfoProps) => (
  <div>
    <p className="font-semibold">{label}:</p>
    <p>{format(date, "MM/dd/yyyy")}</p>
  </div>
);
