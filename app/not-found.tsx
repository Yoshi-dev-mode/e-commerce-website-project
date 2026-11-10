import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="wrap inner-page">
      <h1>Page unavailable</h1>
      <p>Check the menu for the items available today.</p>
      <Link className="button" href="/#menu">Browse the menu</Link>
    </main>
  );
}
