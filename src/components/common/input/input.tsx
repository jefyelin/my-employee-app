import { Input as InputNextUI } from "@nextui-org/input";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps {
  label: string;
  register: UseFormRegisterReturn;
  type?: string;
  errorMessage?: string;
}

export const Input = ({
  label,
  type = "text",
  errorMessage,
  register,
}: InputProps) => {
  return (
    <InputNextUI
      {...register}
      errorMessage={errorMessage}
      isInvalid={Boolean(errorMessage)}
      label={label}
      type={type}
      size="sm"
    />
  );
};
