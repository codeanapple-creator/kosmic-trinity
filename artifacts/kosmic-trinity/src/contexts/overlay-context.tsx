import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type OverlayName = "nav" | "chat";

interface OverlayContextValue {
  activeOverlay: OverlayName | null;
  /** Open a specific overlay (automatically closes the other one). */
  openOverlay: (name: OverlayName) => void;
  /** Close whatever overlay is currently open. */
  closeOverlay: () => void;
  /** Toggle a specific overlay (opens it, or closes if it is already active). */
  toggleOverlay: (name: OverlayName) => void;
}

const OverlayContext = createContext<OverlayContextValue | null>(null);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [activeOverlay, setActiveOverlay] = useState<OverlayName | null>(null);

  const openOverlay = useCallback((name: OverlayName) => {
    setActiveOverlay(name);
  }, []);

  const closeOverlay = useCallback(() => {
    setActiveOverlay(null);
  }, []);

  const toggleOverlay = useCallback((name: OverlayName) => {
    setActiveOverlay((prev) => (prev === name ? null : name));
  }, []);

  return (
    <OverlayContext.Provider value={{ activeOverlay, openOverlay, closeOverlay, toggleOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay(): OverlayContextValue {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("useOverlay must be used within <OverlayProvider>");
  return ctx;
}
