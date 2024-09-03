import { useMutation } from "@tanstack/react-query";
import { LoginSchema } from "../schemas";
import { login } from "../api";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (credentials: LoginSchema) => {
      await login(credentials);
    },
    onSuccess: (data) => {
      console.log("Login successful", data); // update state
    },
    onError: (error) => {
      console.error("Login failed", error); // show modal and clean form
    },
  });
