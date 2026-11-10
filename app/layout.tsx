import type { Metadata } from "next";
import Link from "next/link";
import { BagLink, BagProvider } from "@/components/bag";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Yoshiya | Food & Drinks", template: "%s | Yoshiya" },
  description: "Browse Yoshiya's menu of burgers, fried chicken, sides and cold drinks.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-type="product" data-radius="soft">
      <head><meta name="page-type" content="product" /><meta name="site-kind" content="other" /></head>
      <body>
        <BagProvider>
          <header className="site-header nav">
            <div className="wrap header-inner">
              <a className="skip-link" href="#main-content">Skip to content</a>
              <Link className="wordmark nav__logo" href="/" prefetch={false}>Yoshiya<span aria-hidden="true">.</span></Link>
              <nav className="nav__actions" aria-label="Main navigation">
                <Link className="nav-link" href="/#menu" prefetch={false}>Menu</Link>
                <BagLink />
              </nav>
            </div>
          </header>
          {children}
          <footer className="site-footer">
            <div className="wrap footer-inner">
              <Link className="wordmark" href="/" prefetch={false}>Yoshiya<span aria-hidden="true">.</span></Link>
              <div><Link className="nav-link" href="/#menu" prefetch={false}>Browse the menu</Link></div>
              <p>Food & drinks</p>
            </div>
          </footer>
        </BagProvider>
      </body>
    </html>
  );
}
