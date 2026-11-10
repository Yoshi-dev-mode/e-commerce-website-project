"use client";

import { useEffect, useId, useRef } from "react";
import { menuItemId, type Product } from "@/lib/catalog";

// Each path traces a visible layer in the original 239 × 228 menu photo.
const layers = [
  { name: "top-bun", outline: "M31 83C32 50 71 21 124 21c56-2 97 22 100 61l10 7-7 8-30-8-37-2-42 3-41 3-31 7-31 1-1-7z" },
  { name: "lettuce", outline: "M17 99l30-1 30-8 41-2 42-3 37 2 30 8 10 4 2 8-4 17-17-5-15-10-26-7-31 5-30 3-28-6-23 4-29 10-13-6z" },
  { name: "onions", outline: "M21 121l15-9 29-7 23-4 28 6 30-2 31-6 26 7 15 11 7 12-17 7-22-3-22-9-17 1-21 11-25 1-19-6-17 9-19 2-20-4z" },
  { name: "patty", outline: "M20 131l25 7 20-2 17-9 19 6 25-1 21-11 17-1 22 9 22 4 16-6 2 19-8 14-11 8-32 4-39-3-39-7-30 1-33 7-10-12z" },
  { name: "bottom-bun", outline: "M16 170l18-4 33-7 30-1 39 7 39 3 32-4 13-10 15 7 4 9-8 15-5 12-18 10-31 4-119-2-25-5-8-15-2-10z" },
];

export function BurgerAssembly({ burger }: { burger: Product }) {
  const scene = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const section = scene.current;
    const frame = stage.current;
    if (!section || !frame) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pending = 0;
    let previousSpread = -1;

    const update = () => {
      pending = 0;
      const bounds = section.getBoundingClientRect();
      const stickyTop = Number.parseFloat(window.getComputedStyle(frame).top);
      const travel = Math.max(1, bounds.height - frame.offsetHeight);
      const progress = Math.min(1, Math.max(0, (stickyTop - bounds.top) / (travel * 0.9)));
      const spread = 1 - progress * progress * (3 - 2 * progress);
      if (spread !== previousSpread) {
        section.style.setProperty("--burger-spread", String(spread));
        previousSpread = spread;
      }
    };

    function scheduleUpdate() {
      if (!pending) pending = window.requestAnimationFrame(update);
    }

    const syncMotionPreference = () => {
      window.cancelAnimationFrame(pending);
      pending = 0;
      previousSpread = -1;
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      section.toggleAttribute("data-scroll-active", !reducedMotion.matches);
      if (reducedMotion.matches) {
        section.style.removeProperty("--burger-spread");
      } else {
        update();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);
      }
    };

    syncMotionPreference();
    reducedMotion.addEventListener("change", syncMotionPreference);
    return () => {
      reducedMotion.removeEventListener("change", syncMotionPreference);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(pending);
    };
  }, []);

  return (
    <section ref={scene} className="burger-assembly" aria-labelledby={`${id}-title`} data-screen="free">
      <div ref={stage} className="wrap burger-assembly-stage">
        <div className="burger-assembly-copy">
          <h2 id={`${id}-title`}>The Yoshiya Burger</h2>
          <p>{burger.description}</p>
          <p className="burger-assembly-hint" aria-hidden="true">Scroll to stack the layers <span>↓</span></p>
          <a className="button" href={`#${menuItemId(burger.id)}`}>Find the burger</a>
        </div>
        <svg className="burger-assembly-art" viewBox="-18 -62 275 352" role="img"
          aria-label="Yoshiya burger with brioche, lettuce, onions, and a beef patty">
          <defs>
            <image id={`${id}-photo`} href={burger.image_path} width="239" height="228" />
            {layers.map(({ name, outline }) => (
              <clipPath key={name} id={`${id}-${name}`}><path d={outline} /></clipPath>
            ))}
          </defs>
          {[...layers].reverse().map(({ name }) => (
            <g className={`burger-layer burger-layer--${name}`} key={name}>
              <use href={`#${id}-photo`} clipPath={`url(#${id}-${name})`} />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
