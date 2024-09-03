import type { LoginSchema } from "./login-schema";

import { describe, it, expect } from "vitest";

import { loginSchema } from "./login-schema";
describe("loginSchema", () => {
  it("should validate a valid login schema", () => {
    const validLogin: LoginSchema = {
      username: "john",
      password: "password123",
    };

    const result = loginSchema.safeParse(validLogin);

    expect(result.success).toBeTruthy();
  });

  it.each([
    [
      "username",
      "joh",
      "password123",
      "Username must be at least 4 characters",
    ],
    ["password", "john", "pass", "Password must be at least 8 characters"],
  ])(
    "should not validate an invalid login schema with a short %s",
    (_, username, password, errorMessage) => {
      const invalidLogin: LoginSchema = {
        username,
        password,
      };

      const result = loginSchema.safeParse(invalidLogin);

      expect(result.success).toBeFalsy();
      expect(result?.error?.errors[0].message).toBe(errorMessage);
    }
  );
});
