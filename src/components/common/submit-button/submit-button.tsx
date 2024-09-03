import { Button } from "@nextui-org/button";

interface SubmitButtonProps {
  label: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const SubmitButton = ({ label, icon, isLoading }: SubmitButtonProps) => {
  return (
    <Button color="primary" isLoading={isLoading} type="submit">
      {!isLoading && icon}
      {isLoading ? "Loading" : label}
    </Button>
  );
};
