"use client";

export default function StoreError({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="wrap inner-page">
      <h1>The store is temporarily unavailable</h1>
      <p>Please try again in a moment. Your bag is saved on this device.</p>
      <button className="button" onClick={reset}>Try again</button>
    </main>
  );
}
