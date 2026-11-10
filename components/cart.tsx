"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { useBag } from "./bag";
import { ProductPhoto } from "./product-photo";
import { maxQuantity, money, type Product } from "@/lib/catalog";

type Receipt = { order_id: string; total_cents: number; demo: boolean };

export function Cart({ products, demo }: { products: Product[]; demo: boolean }) {
  const { items, setQuantity, clear } = useBag();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<Receipt>();
  const request = useRef<{ key: string; body: string }>(null);
  const submitting = useRef(false);
  const lines = Object.entries(items).map(([id, quantity]) => ({
    id, quantity, product: products.find((product) => product.id === id),
  }));
  const unavailable = lines.some(({ product }) => !product);
  const total = lines.reduce((sum, { product, quantity }) => sum + (product?.price_cents ?? 0) * quantity, 0);

  async function checkout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || unavailable || !lines.length) return;
    submitting.current = true;
    setBusy(true);
    setError("");

    try {
      const fields = new FormData(event.currentTarget);
      const details = {
        name: fields.get("name"),
        phone: fields.get("phone"),
        address: fields.get("address"),
        items: lines.map(({ id, quantity, product }) => ({ id, quantity, unit_price_cents: product?.price_cents })),
      };
      const body = JSON.stringify(details);
      if (request.current?.body !== body) request.current = { body, key: crypto.randomUUID() };
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details, requestId: request.current.key }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error ?? "Your order could not be submitted. Try again.");
        return;
      }
      clear();
      setReceipt(result);
    } catch {
      setError("We couldn’t confirm your order. Try again with the same details.");
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  return (
    <main id="main-content" className="wrap inner-page">
      <Link className="back-link" href="/#menu">← Back to menu</Link>
      {receipt ? (
        <section className="confirmation confirmation-enter" role="status">
          <svg className="confirmation-mark" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
            <circle cx="20" cy="20" r="19" />
            <path d="m12 20 5 5 11-11" pathLength="1" />
          </svg>
          <h1>{receipt.demo ? "Demo order complete" : "Order request received"}</h1>
          <p>{receipt.demo ? "This sample order was simulated and won’t be fulfilled." : "Keep this reference for your records. Payment can be arranged when the store confirms your order."}</p>
          <dl>
            <div><dt>Order reference</dt><dd>{receipt.order_id}</dd></div>
            <div><dt>Item total</dt><dd>{money(receipt.total_cents)}</dd></div>
          </dl>
          <Link className="button" href="/#menu">Browse the menu</Link>
        </section>
      ) : (
        <>
          <h1>Your bag</h1>
          {!lines.length ? (
            <div className="notice">
              <p>Your bag is empty.</p>
              <Link className="button" href="/#menu">Browse the menu</Link>
            </div>
          ) : (
            <div className="cart-layout">
              <section aria-labelledby="cart-items">
                <h2 id="cart-items">Items</h2>
                <ul className="cart-lines">
                  {lines.map(({ id, quantity, product }) => (
                    <li className="cart-line" key={id}>
                      {product && <div className="cart-photo"><ProductPhoto product={product} sizes="86px" /></div>}
                      <div className="cart-item">
                        <h3>{product?.name ?? "Unavailable item"}</h3>
                        {product && <p>{money(product.price_cents)} each</p>}
                        <div className="cart-controls">
                          {product && <div className="stepper">
                            <button type="button" aria-label={`Decrease ${product.name} quantity`} disabled={busy || quantity <= 1}
                              onClick={() => setQuantity(id, quantity - 1)}>−</button>
                            <span aria-label={`Quantity: ${quantity}`}>{quantity}</span>
                            <button type="button" aria-label={`Increase ${product.name} quantity`} disabled={busy || quantity >= maxQuantity}
                              onClick={() => setQuantity(id, quantity + 1)}>+</button>
                          </div>}
                          <button className="text-button" type="button" disabled={busy} onClick={() => setQuantity(id, 0)}
                            aria-label={`Remove ${product?.name ?? "unavailable item"}`}>Remove</button>
                        </div>
                      </div>
                      {product && <strong className="line-total">{money(product.price_cents * quantity)}</strong>}
                    </li>
                  ))}
                </ul>
              </section>
              <form className="checkout" onSubmit={checkout}>
                <h2>Delivery details</h2>
                <p>{demo ? "Demo mode. Use sample contact details to try checkout." : "Send your order request. Payment is arranged after confirmation."}</p>
                <fieldset disabled={busy}>
                  <label>Full name <input name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
                  <label>Phone <input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={32} /></label>
                  <label>Delivery address <textarea name="address" autoComplete="street-address" required minLength={8} maxLength={300} rows={2} /></label>
                </fieldset>
                <div className="checkout-total"><span>Item total</span><strong>{money(total)}</strong></div>
                {unavailable && <p role="status">Remove unavailable items before checking out.</p>}
                {error && <p className="form-error" role="alert">{error}</p>}
                <button className="button" type="submit" disabled={busy || unavailable}>
                  {busy ? "Submitting…" : demo ? "Place demo order" : "Send order request"}
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </main>
  );
}
