import { DateValue } from "@internationalized/date";
import { DateInput as DateInputNextUI } from "@nextui-org/date-input";
import { Control, Controller } from "react-hook-form";

export interface DateInputProps {
  label: string;
  control: Control<any>;
  name: string;
  maxValue: DateValue;
}

export const DateInput = ({
  label,
  control,
  name,
  maxValue,
}: DateInputProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <DateInputNextUI {...field} label={label} maxValue={maxValue} size="sm" />
    )}
  />
);
