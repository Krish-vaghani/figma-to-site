import { useEffect, useRef, useState } from "react";

type Direction = "left" | "right";

interface Options {
  direction: Direction;
  /** Time (seconds) to travel one full "set" (1x items width). */
  speedSeconds: number;
  /** How many sets are rendered; designed for 3. */
  sets?: number;
  /** Pixels from edges before we wrap. */
  edgeThresholdPx?: number;
}

/**
 * Infinite horizontal marquee that supports:
 * - auto-scroll (via scrollLeft)
 * - drag / swipe manual scroll
 * - seamless wrap when reaching either end
 */
export function useInfiniteMarquee({
  direction,
  speedSeconds,
  sets = 3,
  edgeThresholdPx = 48,
}: Options) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const getSetWidth = () => {
    const el = wrapperRef.current;
    if (!el) return 0;
    return el.scrollWidth / sets;
  };

  const wrapIfNeeded = () => {
    const el = wrapperRef.current;
    if (!el) return;
    const setWidth = getSetWidth();
    if (!setWidth) return;

    // Keep the viewport inside the middle copy for stability.
    const min = setWidth - edgeThresholdPx;
    const max = setWidth * 2 + edgeThresholdPx;

    if (el.scrollLeft <= min) el.scrollLeft += setWidth;
    if (el.scrollLeft >= max) el.scrollLeft -= setWidth;
  };

  // Initialize scroll position into the middle set.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => {
      const setWidth = getSetWidth();
      if (setWidth) el.scrollLeft = setWidth;
    });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll using requestAnimationFrame so manual scroll + loop share the same mechanism.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);

      if (isPaused || isDragging) {
        last = now;
        return;
      }

      const dt = (now - last) / 1000;
      last = now;

      const setWidth = getSetWidth();
      if (!setWidth) return;

      const pxPerSec = setWidth / Math.max(1, speedSeconds);
      const delta = pxPerSec * dt;
      const sign = direction === "left" ? 1 : -1;
      el.scrollLeft += sign * delta;
      wrapIfNeeded();
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [direction, isDragging, isPaused, speedSeconds]);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = wrapperRef.current;
    if (!el) return;
    setIsDragging(true);
    setIsPaused(true);
    dragStart.current = {
      x: e.clientX,
      scrollLeft: el.scrollLeft,
    };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = wrapperRef.current;
    if (!isDragging || !el) return;
    e.preventDefault();
    const walk = (e.clientX - dragStart.current.x) * 1.25;
    el.scrollLeft = dragStart.current.scrollLeft - walk;
    wrapIfNeeded();
  };

  const endDrag = () => {
    setIsDragging(false);
    // small delay so it doesn't feel like it "fights" the user
    window.setTimeout(() => setIsPaused(false), 700);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const el = wrapperRef.current;
    if (!el) return;
    setIsDragging(true);
    setIsPaused(true);
    dragStart.current = {
      x: e.touches[0].clientX,
      scrollLeft: el.scrollLeft,
    };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const el = wrapperRef.current;
    if (!isDragging || !el) return;
    const walk = (e.touches[0].clientX - dragStart.current.x) * 1.25;
    el.scrollLeft = dragStart.current.scrollLeft - walk;
    wrapIfNeeded();
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    window.setTimeout(() => setIsPaused(false), 900);
  };

  const onScroll = () => {
    // If user uses trackpad/scrollbar, keep it looping too.
    wrapIfNeeded();
  };

  return {
    wrapperRef,
    isDragging,
    setIsPaused,
    handlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp: endDrag,
      onMouseLeave: endDrag,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onScroll,
    },
  };
}
