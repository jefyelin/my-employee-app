import { Image } from "@nextui-org/image";

import { LoginSchema } from "./schemas";
import { LoginLayout } from "./layouts/login-layout";
import { LoginForm } from "./components/login-form";
import { LoginFormWrapper } from "./components";
import { useLoginMutation } from "./hooks";
import { useValidateLogin } from "./hooks/useValidateLogin";

import loginBackground from "@/assets/login-background.jpg";

export const LoginPage = () => {
  const { mutate, isPending, data: response } = useLoginMutation();

  useValidateLogin(response);

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };

  return (
    <LoginLayout>
      <div className="w-full px-2 md:px-0 md:grid md:grid-flow-col">
        <Image
          alt="Group of diverse colleagues in a meeting, smiling and shaking hands."
          className="hidden rounded-l-2xl rounded-r-none md:flex"
          src={loginBackground}
        />
        <LoginFormWrapper>
          <LoginForm isSubmitPending={isPending} onSubmit={onSubmit} />
        </LoginFormWrapper>
      </div>
    </LoginLayout>
  );
};
