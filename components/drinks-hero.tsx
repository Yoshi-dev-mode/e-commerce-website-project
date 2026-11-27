"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./drinks-hero.module.css";

const drinks = [
  { name: "Dragon Fruit", image: "dragon-fruit", color: "#e9a4ba", width: 352 },
  { name: "Kiwi Lime", image: "kiwi-lime", color: "#bfdb8f", width: 312 },
  { name: "Pineapple", image: "pineapple", color: "#f4cd76", width: 308 },
  { name: "Blue Citrus", image: "blue-citrus", color: "#9cd5ed", width: 260 },
];

export function DrinksHero({ demo }: { demo: boolean }) {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number>();
  const [direction, setDirection] = useState(1);
  const scene = useRef<HTMLElement>(null);
  const active = useRef(0);
  const gesture = useRef<{ x: number; y: number } | null>(null);

  function select(next: number) {
    const section = scene.current;
    if (!section) return;
    const frame = section.firstElementChild;
    if (!frame) return;
    const step = (section.getBoundingClientRect().height - frame.clientHeight) / (drinks.length - 1);
    window.scrollBy(0, section.getBoundingClientRect().top - parseFloat(getComputedStyle(section).scrollMarginTop) + next * step + 1);
  }

  function advance(step: number) {
    select(Math.max(0, Math.min(drinks.length - 1, index + step)));
  }

  useEffect(() => {
    const section = scene.current;
    const frame = section?.firstElementChild;
    if (!section || !frame) return;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let transition = 0;

    function update() {
      if (!section || !frame) return;
      const bounds = section.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(section).scrollMarginTop);
      const step = Math.max(1, (bounds.height - frame.clientHeight) / (drinks.length - 1));
      const next = Math.min(drinks.length - 1, Math.max(0, Math.round((top - bounds.top) / step)));
      if (!transition && next !== active.current) {
        const stepDirection = next > active.current ? 1 : -1;
        const animate = !reduced.matches && bounds.bottom > top;
        setDirection(stepDirection);
        setPrevious(animate ? active.current : undefined);
        active.current = animate ? active.current + stepDirection : next;
        setIndex(active.current);
        if (animate) {
          transition = window.setTimeout(() => {
            transition = 0;
            setPrevious(undefined);
            update();
          }, 1000);
        }
      }
      const color = bounds.bottom > top ? drinks[active.current].color : "var(--paper)";
      if (root.style.getPropertyValue("--hero-nav-color") !== color) {
        root.style.setProperty("--hero-nav-color", color);
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.clearTimeout(transition);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      root.style.removeProperty("--hero-nav-color");
    };
  }, []);

  return (
    <section ref={scene} className={styles.scene} aria-label="Yoshiya drinks showcase" data-drinks-hero
      data-direction={direction}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();

        advance(event.key === "ArrowLeft" ? -1 : 1);
      }}>
      <div className={styles.hero}>
      <h1 className="sr-only">Yoshiya food and drinks</h1>
      <div className={styles.stage}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          gesture.current = { x: event.clientX, y: event.clientY };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerCancel={() => { gesture.current = null; }}
        onPointerUp={(event) => {
          const start = gesture.current;
          gesture.current = null;
          if (!start) return;
          const x = event.clientX - start.x;
          if (Math.abs(x) > 45 && Math.abs(x) > Math.abs(event.clientY - start.y)) {

            advance(x < 0 ? 1 : -1);
          }
        }}>
        {drinks.map((drink, slide) => (
          <div key={drink.image} className={styles.slide}
            data-state={slide === previous ? "leaving" : slide === index ? previous === undefined ? "current" : "entering" : "hidden"}
            aria-hidden="true">
            <span className={styles.word}>{drink.image === "kiwi-lime" ? "Kiwi" : drink.name}</span>
            <div className={styles.fruit} style={{ backgroundImage: `url(/assets/hero-fruit-${drink.image}${drink.image === "dragon-fruit" ? "-clean" : ""}.webp)` }}>
              {Array.from({ length: 6 }, (_, piece) => <span key={piece} />)}
            </div>
            <Image className={styles.drink} src={`/assets/hero-${drink.image}-sharp${drink.image === "dragon-fruit" ? "-clean" : ""}.webp`}
              alt="" width={drink.width * 2} height={1280} unoptimized loading="eager" draggable={false} />
          </div>
        ))}
      </div>
      <div className={styles.top}>
        {demo && <span className={styles.demo}>Demo storefront</span>}
        <div className={styles.flavours} role="group" aria-label="Drink flavours">
          {drinks.map((drink, slide) => (
            <button key={drink.image} type="button" aria-pressed={slide === index}
              onClick={() => select(slide)}>{drink.name}</button>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{drinks[index].name}</p>
      <div className={styles.controls}>
        <button type="button" aria-label="Previous flavour" onClick={() => advance(-1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H4m7-7-7 7 7 7" /></svg>
        </button>
        <div className={styles.actions}>
          <a href="#menu">Shop the menu</a>
          <span className={styles.hint}>Scroll to explore flavours</span>
        </div>
        <button type="button" aria-label="Next flavour" onClick={() => advance(1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7" /></svg>
        </button>
      </div>
      </div>
    </section>
  );
}
