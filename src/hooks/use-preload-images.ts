import { useEffect, useMemo, useState } from "react";

function loadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

export interface UsePreloadImagesOptions {
  /** When false, ready stays false until enabled becomes true. */
  enabled?: boolean;
  /** After this, show the page even if some images failed (ms). */
  timeoutMs?: number;
}

/**
 * Preloads a list of image URLs in parallel. Uses browser cache so when the
 * page renders, images often resolve from cache immediately.
 */
export function usePreloadImages(
  urls: string[],
  options?: UsePreloadImagesOptions
): { ready: boolean } {
  const { enabled = true, timeoutMs = 15000 } = options ?? {};
  const [ready, setReady] = useState(false);

  const key = useMemo(() => {
    const unique = [...new Set(urls.filter((u) => typeof u === "string" && u.trim()))];
    unique.sort();
    return unique.join("\0");
  }, [urls]);

  useEffect(() => {
    if (!enabled) {
      setReady(false);
      return;
    }

    const list = key
      ? key.split("\0").filter(Boolean)
      : [];

    if (list.length === 0) {
      setReady(true);
      return;
    }

    setReady(false);

    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (!cancelled) setReady(true);
    }, timeoutMs);

    Promise.all(list.map(loadImage)).then(() => {
      if (!cancelled) {
        clearTimeout(timer);
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [enabled, key, timeoutMs]);

  return { ready };
}
