import { maxCartLines, maxQuantity } from "./catalog";

export type CheckoutItem = { id: string; quantity: number; unit_price_cents: number };

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function field(value: unknown, min: number, max: number) {
  if (typeof value !== "string") return null;
  const result = value.trim();
  return result.length >= min && result.length <= max ? result : null;
}

export function parseOrder(input: unknown) {
  if (!record(input)) return null;
  const requestId = field(input.requestId, 36, 36);
  const name = field(input.name, 2, 100);
  const phone = field(input.phone, 7, 32);
  const address = field(input.address, 8, 300);
  if (!requestId || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(requestId)
      || !name || !phone || !/^[+0-9(). -]+$/.test(phone)
      || phone.replace(/\D/g, "").length < 7 || !address
      || !Array.isArray(input.items) || input.items.length < 1 || input.items.length > maxCartLines) {
    return null;
  }

  const items: CheckoutItem[] = [];
  const ids = new Set<string>();
  for (const item of input.items) {
    if (!record(item)) return null;
    const { id, quantity, unit_price_cents } = item;
    if (typeof id !== "string" || id.length > 80 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)
        || ids.has(id) || typeof quantity !== "number" || !Number.isInteger(quantity)
        || quantity < 1 || quantity > maxQuantity || typeof unit_price_cents !== "number"
        || !Number.isInteger(unit_price_cents) || unit_price_cents < 1 || unit_price_cents > 100000) {
      return null;
    }
    ids.add(id);
    items.push({ id, quantity, unit_price_cents });
  }

  return {
    requestId, name, phone, address,
    items: items.sort((first, second) => first.id.localeCompare(second.id)),
  };
}
