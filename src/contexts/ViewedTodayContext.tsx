import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

const STORAGE_KEY_PREFIX = "pursolina_today_viewed_";

function getTodayKey(): string {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${STORAGE_KEY_PREFIX}${y}-${m}-${d}`;
}

/** Stable random 200–500 for a product id + date (so each product has a different number, same per day). */
function stableRandomForProduct(productId: string, dateKey: string): number {
  let h = 0;
  const s = `${dateKey}-${productId}`;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  const t = Math.abs(h) % 301;
  return 200 + t;
}

function readAllCounts(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const key = getTodayKey();
    const raw = localStorage.getItem(key);
    if (raw === null) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: Record<string, number> = {};
    for (const [id, val] of Object.entries(parsed)) {
      if (typeof val === "number" && val >= 0) out[String(id)] = val;
    }
    return out;
  } catch {
    return {};
  }
}

function writeAllCounts(counts: Record<string, number>): void {
  try {
    localStorage.setItem(getTodayKey(), JSON.stringify(counts));
  } catch {}
}

interface ViewedTodayContextType {
  getCountForProduct: (productId: string | number) => number;
  incrementViewedToday: (productId: string | number) => void;
}

const ViewedTodayContext = createContext<ViewedTodayContextType | undefined>(undefined);

export function ViewedTodayProvider({ children }: { children: ReactNode }) {
  const [countsByProduct, setCountsByProduct] = useState<Record<string, number>>(readAllCounts);

  const getCountForProduct = useCallback((productId: string | number): number => {
    const id = String(productId);
    const stored = countsByProduct[id];
    if (typeof stored === "number") return stored;
    return stableRandomForProduct(id, getTodayKey());
  }, [countsByProduct]);

  const incrementViewedToday = useCallback((productId: string | number) => {
    const id = String(productId);
    setCountsByProduct((prev) => {
      const current = prev[id] ?? stableRandomForProduct(id, getTodayKey());
      const next = { ...prev, [id]: current + 1 };
      writeAllCounts(next);
      return next;
    });
  }, []);

  useEffect(() => {
    setCountsByProduct(readAllCounts());
  }, []);

  const value: ViewedTodayContextType = { getCountForProduct, incrementViewedToday };
  return (
    <ViewedTodayContext.Provider value={value}>
      {children}
    </ViewedTodayContext.Provider>
  );
}

export function useViewedToday(): ViewedTodayContextType {
  const ctx = useContext(ViewedTodayContext);
  if (ctx === undefined) {
    return {
      getCountForProduct: () => 0,
      incrementViewedToday: () => {},
    };
  }
  return ctx;
}
