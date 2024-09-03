import { describe, expect, it, vi } from "vitest";
import { login } from "../api/login";
import { LoginSchema } from "../schemas";

describe("/api/login", () => {
  it("should send a POST request with the provided credentials", async () => {
    const credentials: LoginSchema = {
      username: "john",
      password: "password123",
    };

    const fetchSpy = vi.spyOn(window, "fetch");
    fetchSpy.mockResolvedValueOnce(new Response());

    await login(credentials);

    expect(fetchSpy).toHaveBeenCalledWith("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    fetchSpy.mockRestore();
  });
});
