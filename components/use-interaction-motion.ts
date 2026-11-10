"use client";

import { useEffect, useRef } from "react";

export function useInteractionMotion<T extends HTMLElement>(
  value: string | number | null,
  keyframes: Keyframe[],
) {
  const target = useRef<T>(null);
  const previous = useRef(value);

  useEffect(() => {
    const before = previous.current;
    previous.current = value;
    if (before === null || value === null || before === value) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !target.current?.animate) return;

    const animation = target.current.animate(keyframes, {
      duration: 180,
      easing: "cubic-bezier(.2,.8,.2,1)",
    });
    const stop = () => animation.cancel();
    reducedMotion.addEventListener("change", stop);
    return () => {
      reducedMotion.removeEventListener("change", stop);
      stop();
    };
  }, [keyframes, value]);

  return target;
}
