import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useEmployeesQuery } from "./useEmployeesQuery";

vi.mock("../api", () => ({
  employees: vi.fn(() => Promise.resolve([])),
}));

interface WrapperProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useEmployeesQuery", () => {
  it("should call query with success", async () => {
    const { result } = renderHook(() => useEmployeesQuery(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBeTruthy();
  });
});
