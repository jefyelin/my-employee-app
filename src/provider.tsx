import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={navigate}>{children}</NextUIProvider>
    </QueryClientProvider>
  );
}
