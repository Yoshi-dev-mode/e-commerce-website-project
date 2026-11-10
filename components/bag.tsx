"use client";

import Link from "next/link";
import { createContext, useContext, useSyncExternalStore } from "react";
import { maxCartLines, maxQuantity } from "@/lib/catalog";
import { useInteractionMotion } from "./use-interaction-motion";

type Bag = Record<string, number>;
const key = "yoshiya-bag-v1";
const emptyBag: Bag = {};
const serverBag: Bag = {};
let lastSaved: string | null | undefined;
let bag = emptyBag;
const listeners = new Set<() => void>();
const countMotion = [{ transform: "scale(.85)" }, { transform: "scale(1)" }];
const notify = () => listeners.forEach((listener) => listener());

function snapshot(): Bag {
  try {
    const saved = localStorage.getItem(key);
    if (saved === lastSaved) return bag;
    lastSaved = saved;
    const parsed = JSON.parse(saved ?? "{}");
    bag = Object.fromEntries(Object.entries(parsed ?? {}).filter((entry): entry is [string, number] => {
      const [id, quantity] = entry;
      return (
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) && typeof quantity === "number"
        && Number.isInteger(quantity) && quantity > 0 && quantity <= maxQuantity
      );
    }).slice(0, maxCartLines));
  } catch {
    return bag;
  }
  return bag;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function save(next: Bag) {
  bag = next;
  try {
    const saved = JSON.stringify(next);
    localStorage.setItem(key, saved);
    lastSaved = saved;
  } catch {
    // Keep the bag usable for this visit when browser storage is disabled.
  }
  notify();
}

function setQuantity(id: string, quantity: number) {
  const current = snapshot();
  if (quantity > 0 && !Object.hasOwn(current, id) && Object.keys(current).length >= maxCartLines) return;
  const next = { ...current };
  if (quantity <= 0) delete next[id];
  else next[id] = Math.min(quantity, maxQuantity);
  save(next);
}

const BagContext = createContext(emptyBag);

export function BagProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, snapshot, () => serverBag);
  return <BagContext.Provider value={items}>{children}</BagContext.Provider>;
}

export function useBag() {
  return { items: useContext(BagContext), setQuantity, clear: () => save({}) };
}

export function BagLink() {
  const { items } = useBag();
  const count = Object.values(items).reduce((sum, quantity) => sum + quantity, 0);
  const countRef = useInteractionMotion<HTMLSpanElement>(items === serverBag ? null : count, countMotion);
  return (
    <Link className="bag-link" href="/cart" prefetch={false} aria-label={`Bag, ${count} items`}>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M4 8h16l1 13H3L4 8Z" /><path d="M8 10V6a4 4 0 0 1 8 0v4" />
      </svg>
      Bag <span className="bag-count" ref={countRef} aria-hidden="true">{count}</span>
    </Link>
  );
}

export function AddButton({ id, name }: { id: string; name: string }) {
  const { items } = useBag();
  const quantity = items[id] ?? 0;
  const full = quantity >= maxQuantity || (!quantity && Object.keys(items).length >= maxCartLines);
  return (
    <button className="button button-small" type="button" disabled={full}
      onClick={() => setQuantity(id, (snapshot()[id] ?? 0) + 1)}
      aria-label={`Add ${name} to bag`}>
      {full ? "Bag limit" : quantity ? `Add more · ${quantity}` : "Add to bag"}
    </button>
  );
}
