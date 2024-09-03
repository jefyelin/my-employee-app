import { useMutation } from "@tanstack/react-query";

import { LoginSchema } from "../schemas";
import { login } from "../api";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (credentials: LoginSchema) => await login(credentials),
  });
