import { Image } from "@nextui-org/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useEffect } from "react";

import { LoginFormWrapper } from "./components";
import { LoginForm } from "./components/login-form";
import { useLoginMutation } from "./hooks";
import { useValidateLogin } from "./hooks/useValidateLogin";
import { LoginSchema } from "./schemas";

import loginBackground from "@/assets/login-background.jpg";
import { Footer } from "@/components/footer";

export const LoginPage = () => {
  const { mutate, isPending, data: response, isError } = useLoginMutation();
  const { isOpen, onOpenChange } = useDisclosure();

  useValidateLogin(response);

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };

  useEffect(() => {
    if (isError) {
      onOpenChange();
    }
  }, [isError]);

  return (
    <div className="relative flex h-screen flex-col justify-center align-middle">
      <main className="max-w-8xl container mx-auto">
        <div className="w-full px-2 md:grid md:grid-flow-col md:px-0">
          <Image
            alt="Group of diverse colleagues in a meeting, smiling and shaking hands."
            className="hidden rounded-l-2xl rounded-r-none md:flex"
            src={loginBackground}
          />
          <LoginFormWrapper>
            <LoginForm isSubmitPending={isPending} onSubmit={onSubmit} />
          </LoginFormWrapper>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader>Login Error</ModalHeader>
            <ModalBody>
              <p className="py-4">Invalid username or password</p>
            </ModalBody>
          </ModalContent>
        </Modal>
      </main>
      <Footer />
    </div>
  );
};
