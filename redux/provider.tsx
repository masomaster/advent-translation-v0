"use client";

import { makeStore } from "./store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={makeStore}>{children}</Provider>;
}
