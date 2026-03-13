const CACHE_KEY = "pursolina_product_images";

type ImageMap = Record<string, string>;

function loadCache(): ImageMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ImageMap;
  } catch {
    return {};
  }
}

function saveCache(map: ImageMap) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(map));
  } catch {
    // ignore storage errors
  }
}

let memoryCache: ImageMap | null = null;

function getCache(): ImageMap {
  if (!memoryCache) {
    memoryCache = loadCache();
  }
  return memoryCache;
}

export function cacheProductImage(productId: string | number, imageUrl: string) {
  if (!imageUrl) return;
  const key = String(productId);
  const cache = getCache();
  if (cache[key] === imageUrl) return;
  cache[key] = imageUrl;
  saveCache(cache);
}

export function getCachedProductImage(productId: string | number): string | undefined {
  const key = String(productId);
  const cache = getCache();
  return cache[key];
}

