import type { ApiOrderDetail, ApiOrderListItem } from "@/store/services/orderApi";

const LIST_KEY = "pursolina_orders_list_v1";
const DETAIL_PREFIX = "pursolina_order_detail_v1:";
/** Show cached list/detail while revalidating (repeat visits feel instant). */
const TTL_MS = 5 * 60 * 1000;

function isFresh(t: number): boolean {
  return Date.now() - t < TTL_MS;
}

export function readOrdersListCache(): ApiOrderListItem[] | null {
  try {
    const raw = sessionStorage.getItem(LIST_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { t: number; items: ApiOrderListItem[] };
    if (!parsed?.items || !isFresh(parsed.t)) return null;
    return parsed.items;
  } catch {
    return null;
  }
}

export function writeOrdersListCache(items: ApiOrderListItem[]) {
  try {
    sessionStorage.setItem(LIST_KEY, JSON.stringify({ t: Date.now(), items }));
  } catch {
    /* ignore quota / private mode */
  }
}

export function readOrderDetailCache(id: string): ApiOrderDetail | null {
  try {
    const raw = sessionStorage.getItem(DETAIL_PREFIX + id);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { t: number; data: ApiOrderDetail };
    if (!parsed?.data || !isFresh(parsed.t)) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

export function writeOrderDetailCache(id: string, data: ApiOrderDetail) {
  try {
    sessionStorage.setItem(DETAIL_PREFIX + id, JSON.stringify({ t: Date.now(), data }));
  } catch {
    /* ignore */
  }
}

/** Call after placing an order so the list refetches instead of showing stale cache. */
export function invalidateOrdersListCache() {
  try {
    sessionStorage.removeItem(LIST_KEY);
  } catch {
    /* ignore */
  }
}
