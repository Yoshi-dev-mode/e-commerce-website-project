"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { menuItemId, money, type Product } from "@/lib/catalog";
import { AddButton } from "./bag";
import { ProductPhoto } from "./product-photo";
import { useInteractionMotion } from "./use-interaction-motion";

const resultsMotion = [
  { opacity: 0.78, transform: "translateY(4px)" },
  { opacity: 1, transform: "translateY(0)" },
];

export function Menu({ products }: { products: Product[] }) {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [featuredId, setFeaturedId] = useState<string>();

  useEffect(() => {
    function followMenuLink() {
      const product = products.find(({ id }) => window.location.hash === `#${menuItemId(id)}`);
      setFeaturedId(product?.id);
      if (product) {
        setCategory("");
        setSearch("");
      }
    }

    followMenuLink();
    window.addEventListener("hashchange", followMenuLink);
    return () => window.removeEventListener("hashchange", followMenuLink);
  }, [products]);

  useEffect(() => {
    if (!featuredId) return;
    const card = document.getElementById(menuItemId(featuredId));
    card?.focus({ preventScroll: true });
    card?.scrollIntoView({ block: "nearest" });
  }, [featuredId]);

  function clearFeaturedItem() {
    if (!featuredId) return;
    setFeaturedId(undefined);
    window.history.replaceState(window.history.state, "", "#menu");
  }

  const categories = Array.from(new Set(products.map((product) => product.category)));
  const query = search.trim().toLowerCase();
  const matching = products.filter((product) =>
    (!category || product.category === category)
    && `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query),
  );
  const resultsRef = useInteractionMotion<HTMLDivElement>(
    matching.map(({ id }) => id).join(","),
    resultsMotion,
  );

  return (
    <section className="menu-section" id="menu" aria-labelledby="menu-heading" data-screen="free">
      <div className="wrap">
        <div className="section-heading">
          <h2 id="menu-heading">The menu</h2>
          <label className="search">
            <span className="sr-only">Search menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" />
            </svg>
            <input type="search" placeholder="Search the menu" value={search}
              onChange={(event) => {
                clearFeaturedItem();
                setSearch(event.target.value);
              }} />
          </label>
        </div>
        <div className="filters" role="group" aria-label="Menu categories">
          {[{ value: "", label: "All items" }, ...categories.map((value) => ({ value, label: value }))].map(({ value, label }) => (
            <button key={value} type="button" aria-pressed={category === value} onClick={() => {
              clearFeaturedItem();
              setCategory(value);
            }}>
              {label}
            </button>
          ))}
        </div>
        <p className="results-count" role="status">{matching.length} {matching.length === 1 ? "item" : "items"}</p>
        <div ref={resultsRef}>
          {matching.length ? (
            <ul className="product-grid">
              {matching.map((product) => (
                <li className="product-card" key={product.id} id={menuItemId(product.id)} tabIndex={-1}
                  aria-labelledby={`menu-name-${product.id}`} data-featured={featuredId === product.id || undefined}>
                  <Link className="product-link" href={`/menu/${product.id}`} prefetch={false}>
                    <div className="product-photo"><ProductPhoto product={product} decorative sizes="(max-width: 700px) 45vw, (max-width: 1000px) 30vw, 300px" /></div>
                    <h3 id={`menu-name-${product.id}`}>{product.name}</h3>
                  </Link>
                  <p className="product-description">{product.description}</p>
                  <div className="product-actions">
                    <span className="price">{money(product.price_cents)}</span>
                    <AddButton id={product.id} name={product.name} />
                  </div>
                </li>
              ))}
            </ul>
          ) : <p className="notice">{products.length ? "No items match your search. Try another word or category." : "The menu is empty right now. Please check back soon."}</p>}
        </div>
      </div>
    </section>
  );
}
