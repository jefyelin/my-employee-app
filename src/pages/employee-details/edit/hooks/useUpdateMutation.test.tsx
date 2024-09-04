import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useUpdateMutation } from "./useUpdateMutation";

import { employees } from "@/mocks/data";

vi.mock("../api", () => ({
  update: vi.fn(),
}));

interface WrapperProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useUpdateMutation", () => {
  it("should call update with success", async () => {
    const data = employees[0];

    const { result } = renderHook(() => useUpdateMutation(), {
      wrapper,
    });

    await waitFor(() => result.current.mutate(data));

    expect(result.current.isSuccess).toBeTruthy();
  });
});
