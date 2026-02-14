import { createContext, useContext, useState, ReactNode } from "react";

type Mode = "b2c" | "b2b";

type ModeContextType = {
  mode: Mode;
  setMode: (mode: Mode) => void;
  isB2B: boolean;
  isB2C: boolean;
};

const ModeContext = createContext<ModeContextType | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("b2c");

  return (
    <ModeContext.Provider
      value={{ mode, setMode, isB2B: mode === "b2b", isB2C: mode === "b2c" }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
