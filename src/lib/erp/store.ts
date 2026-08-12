import { useCallback, useEffect, useState } from "react";

export type Row = Record<string, any> & { id: string };

const PREFIX = "suryax-erp:";

export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

/** Collection persisted to localStorage, seeded with mock data on first run. */
export function useCollection<T extends Row>(key: string, seed: T[]) {
  const [rows, setRows] = useState<T[]>(seed);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setRows(readStore<T[]>(key, seed));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const persist = useCallback(
    (next: T[]) => {
      setRows(next);
      writeStore(key, next);
    },
    [key],
  );

  const create = useCallback(
    (row: Omit<T, "id"> & { id?: string }) =>
      persist([{ ...row, id: row.id ?? `${Date.now()}` } as T, ...rows]),
    [persist, rows],
  );

  const update = useCallback(
    (id: string, patch: Partial<T>) =>
      persist(rows.map((r) => (r.id === id ? { ...r, ...patch } : r))),
    [persist, rows],
  );

  const remove = useCallback(
    (id: string) => persist(rows.filter((r) => r.id !== id)),
    [persist, rows],
  );

  const reset = useCallback(() => persist(seed), [persist, seed]);

  return { rows, hydrated, create, update, remove, reset, setAll: persist };
}

export function exportCsv(filename: string, rows: Row[], columns: { key: string; label: string }[]) {
  const head = columns.map((c) => `"${c.label}"`).join(",");
  const body = rows
    .map((r) => columns.map((c) => `"${String(r[c.key] ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([`${head}\n${body}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
