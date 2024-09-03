import { LoginSchema } from "../schemas";

export const login = async (credentials: LoginSchema) =>
  await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
