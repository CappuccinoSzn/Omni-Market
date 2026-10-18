"use client";

import { useCallback, useSyncExternalStore } from "react";

type Listener = () => void;

type Slot = {
  key: string;
  decode: (raw: string | null) => unknown;
  raw: string | null | undefined;
  value: unknown;
  listeners: Set<Listener>;
};

const slots = new Map<string, Slot>();
const EMPTY: never[] = [];

function slotFor(key: string, decode: (raw: string | null) => unknown): Slot {
  let slot = slots.get(key);

  if (!slot) {
    slot = { key, decode, raw: undefined, value: undefined, listeners: new Set() };
    slots.set(key, slot);
  }

  return slot;
}

// Reading back the same raw string must return the same array reference,
// otherwise useSyncExternalStore treats every render as a new snapshot.
function readSlot<T>(slot: Slot): T[] {
  if (slot.raw === undefined) {
    slot.raw = localStorage.getItem(slot.key);
    slot.value = slot.decode(slot.raw);
  }

  return slot.value as T[];
}

export function useBrowserList<T>(
  key: string,
  decode: (raw: string | null) => T[]
): T[] {
  const subscribe = useCallback(
    (listener: Listener) => {
      const slot = slotFor(key, decode);
      slot.listeners.add(listener);

      return () => slot.listeners.delete(listener);
    },
    [key, decode]
  );

  const getSnapshot = useCallback(() => readSlot<T>(slotFor(key, decode)), [key, decode]);

  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

export function readBrowserList<T>(
  key: string,
  decode: (raw: string | null) => T[]
): T[] {
  const slot = slotFor(key, decode);
  slot.raw = undefined;

  return readSlot<T>(slot);
}

export function writeBrowserList<T>(key: string, items: T[]) {
  localStorage.setItem(key, JSON.stringify(items));

  const slot = slots.get(key);
  if (!slot) return;

  slot.raw = undefined;
  slot.listeners.forEach((listener) => listener());
}
