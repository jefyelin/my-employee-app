import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";

import { loginSchema, LoginSchema } from "../schemas";

import { Input } from "@/components/common/input";
import { SubmitButton } from "@/components/common/submit-button";

interface LoginFormProps {
  isSubmitPending?: boolean;
  onSubmit: (data: LoginSchema) => void;
}

export const LoginForm = ({ isSubmitPending, onSubmit }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <Input
          errorMessage={errors.username?.message}
          label="Username"
          register={register("username")}
        />
        <Input
          errorMessage={errors.password?.message}
          label="Password"
          register={register("password")}
          type="password"
        />
      </div>
      <SubmitButton
        icon={<LogIn size={16} />}
        isLoading={isSubmitPending}
        label="Login"
      />
    </form>
  );
};
