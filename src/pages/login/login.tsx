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
import { LoginLayout } from "./layouts/login-layout";
import { LoginSchema } from "./schemas";

import loginBackground from "@/assets/login-background.jpg";

export const LoginPage = () => {
  const { mutate, isPending, data: response, isError } = useLoginMutation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useValidateLogin(response);

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };

  useEffect(() => {
    if (isError) {
      onOpen();
    }
  }, [isError]);

  return (
    <LoginLayout>
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
    </LoginLayout>
  );
};
