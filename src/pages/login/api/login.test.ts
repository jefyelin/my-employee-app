import { describe, expect, it, vi } from "vitest";
import axios from "axios";

import { login } from "../api/login";
import { LoginSchema } from "../schemas";

describe("/api/login", () => {
  it("should send a POST request with the provided credentials", async () => {
    const credentials: LoginSchema = {
      username: "john",
      password: "password123",
    };

    const axiosPostSpy = vi.spyOn(axios, "post");

    axiosPostSpy.mockResolvedValueOnce({});

    await login(credentials);

    expect(axiosPostSpy).toHaveBeenCalledWith("/api/login", credentials);

    axiosPostSpy.mockRestore();
  });
});
