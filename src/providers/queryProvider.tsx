import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryclient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
  );
}
