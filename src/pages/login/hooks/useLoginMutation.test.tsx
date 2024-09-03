import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useLoginMutation } from "./useLoginMutation";

vi.mock("../api", () => ({
  login: vi.fn(),
}));

interface WrapperProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useLoginMutation", () => {
  it("should call login with success", async () => {
    const credentials = { username: "user", password: "password" };

    const { result } = renderHook(() => useLoginMutation(), {
      wrapper,
    });

    await waitFor(() => result.current.mutate(credentials));

    expect(result.current.isSuccess).toBeTruthy();
  });
});
