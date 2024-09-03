import { LoginSchema } from "./schemas";
import { LoginLayout } from "./layouts/login-layout";
import { LoginForm } from "./components/login-form";
import { Image } from "@nextui-org/image";
import loginBackground from "@/assets/login-background.jpg";
import { LoginFormWrapper } from "./components";
import { useLoginMutation } from "./hooks/useLoginMutation";

export const LoginPage = () => {
  const { mutate, isPending } = useLoginMutation();

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };

  return (
    <LoginLayout>
      <div className="w-full grid grid-flow-col">
        <Image src={loginBackground} className="rounded-l-2xl rounded-r-none" />
        <LoginFormWrapper>
          <LoginForm onSubmit={onSubmit} isSubmitPending={isPending} />
        </LoginFormWrapper>
      </div>
    </LoginLayout>
  );
};
