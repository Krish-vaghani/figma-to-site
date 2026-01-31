import { useCallback, useEffect, useRef, useState } from "react";

type Direction = "left" | "right";

interface Options {
  direction: Direction;
  /** Time (seconds) to travel one full "set" (1x items width). */
  speedSeconds: number;
  /** How many sets are rendered; designed for 3. */
  sets?: number;
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
}: Options) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Use refs so the animation loop doesn't need to restart on state changes
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const directionRef = useRef(direction);
  const speedRef = useRef(speedSeconds);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  // Keep refs in sync
  directionRef.current = direction;
  speedRef.current = speedSeconds;
  isDraggingRef.current = isDragging;

  const getSetWidth = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return 0;
    return el.scrollWidth / sets;
  }, [sets]);

  const wrapIfNeeded = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const setWidth = getSetWidth();
    if (!setWidth) return;

    // Keep the viewport inside the middle copy for stability.
    // We wrap when we're about to leave the middle set
    if (el.scrollLeft < setWidth * 0.5) {
      el.scrollLeft += setWidth;
    } else if (el.scrollLeft > setWidth * 1.5) {
      el.scrollLeft -= setWidth;
    }
  }, [getSetWidth]);

  // Initialize scroll position into the middle set.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    
    // Wait for content to render
    const timer = setTimeout(() => {
      const setWidth = getSetWidth();
      if (setWidth) {
        el.scrollLeft = setWidth;
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, [getSetWidth]);

  // Auto-scroll using requestAnimationFrame - runs continuously without restart
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let raf = 0;
    let lastTime = 0;

    const tick = (timestamp: number) => {
      raf = requestAnimationFrame(tick);

      // Skip if paused or dragging
      if (isPausedRef.current || isDraggingRef.current) {
        lastTime = timestamp;
        return;
      }

      // Calculate delta time, cap at 100ms to prevent large jumps
      const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.1) : 0;
      lastTime = timestamp;

      if (dt === 0) return;

      const setWidth = getSetWidth();
      if (!setWidth) return;

      // Calculate smooth movement
      const pxPerSec = setWidth / Math.max(1, speedRef.current);
      const delta = pxPerSec * dt;
      const sign = directionRef.current === "left" ? 1 : -1;

      el.scrollLeft += sign * delta;
      wrapIfNeeded();
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [getSetWidth, wrapIfNeeded]);

  const setPaused = useCallback((paused: boolean) => {
    isPausedRef.current = paused;
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = wrapperRef.current;
    if (!el) return;
    setIsDragging(true);
    isPausedRef.current = true;
    dragStart.current = {
      x: e.clientX,
      scrollLeft: el.scrollLeft,
    };
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = wrapperRef.current;
    if (!isDraggingRef.current || !el) return;
    e.preventDefault();
    const walk = (e.clientX - dragStart.current.x) * 1.25;
    el.scrollLeft = dragStart.current.scrollLeft - walk;
    wrapIfNeeded();
  }, [wrapIfNeeded]);

  const endDrag = useCallback(() => {
    setIsDragging(false);
    // Small delay so it doesn't feel like it "fights" the user
    window.setTimeout(() => {
      isPausedRef.current = false;
    }, 500);
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const el = wrapperRef.current;
    if (!el) return;
    setIsDragging(true);
    isPausedRef.current = true;
    dragStart.current = {
      x: e.touches[0].clientX,
      scrollLeft: el.scrollLeft,
    };
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const el = wrapperRef.current;
    if (!isDraggingRef.current || !el) return;
    const walk = (e.touches[0].clientX - dragStart.current.x) * 1.25;
    el.scrollLeft = dragStart.current.scrollLeft - walk;
    wrapIfNeeded();
  }, [wrapIfNeeded]);

  const onTouchEnd = useCallback(() => {
    setIsDragging(false);
    window.setTimeout(() => {
      isPausedRef.current = false;
    }, 600);
  }, []);

  const onScroll = useCallback(() => {
    // If user uses trackpad/scrollbar, keep it looping too.
    wrapIfNeeded();
  }, [wrapIfNeeded]);

  return {
    wrapperRef,
    isDragging,
    setPaused,
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
