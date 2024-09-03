import { Button } from "@nextui-org/button";

interface SubmitButtonProps {
  label: string;
  isLoading?: boolean;
}

export const SubmitButton = ({ label, isLoading }: SubmitButtonProps) => {
  return (
    <Button type="submit" color="primary" isLoading={isLoading}>
      {isLoading ? "Loading" : label}
    </Button>
  );
};
