import { parseOrder } from "@/lib/checkout";
import { isDemo, submitOrder } from "@/lib/store";

const conflicts: Record<string, string> = {
  item_unavailable: "An item is unavailable. Refresh the menu and review your bag.",
  price_changed: "A price changed. Refresh the menu and review your bag before trying again.",
  request_conflict: "This order attempt has already been used. Review your bag before trying again.",
};

export async function POST(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site"
      || !request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return Response.json({ error: "Send a same-site JSON request." }, { status: 415 });
  }
  const order = parseOrder(await request.json().catch(() => null));
  if (!order) {
    return Response.json({ error: "Check your contact details, address and bag quantities." }, { status: 400 });
  }

  try {
    return Response.json({ ...await submitOrder(order), demo: isDemo });
  } catch (error) {
    const code = error instanceof Error ? error.message : "";
    if (Object.hasOwn(conflicts, code)) return Response.json({ error: conflicts[code] }, { status: 409 });
    return Response.json({ error: "Ordering is temporarily unavailable. Your bag is saved. Try again shortly." }, { status: 503 });
  }
}
