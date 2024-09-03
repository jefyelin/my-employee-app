import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
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
          label="Username"
          register={register("username")}
          errorMessage={errors.username?.message}
        />
        <Input
          label="Password"
          type="password"
          register={register("password")}
          errorMessage={errors.password?.message}
        />
      </div>
      <SubmitButton label="Login" isLoading={isSubmitPending} />
    </form>
  );
};
