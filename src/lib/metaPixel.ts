const PIXEL_ID = "shashankpixel";

declare global {
    interface Window {
        fbq?: (...args: any[]) => void;
        _fbq?: any;
    }
}

const isBrowser = typeof window !== "undefined";

export function initMetaPixel() {
    if (!isBrowser) return;
    if (window.fbq) return; // already initialized

    (function (f: any, b: Document, e: string, v?: string) {
        if (f.fbq) return;

        const n: any = function (...args: any[]) {
            n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
        };

        if (!f._fbq) f._fbq = n;

        n.push = n;
        n.loaded = true;
        n.version = "2.0";
        n.queue = [];

        const t = b.createElement(e) as HTMLScriptElement;
        t.async = true;
        t.src = "https://connect.facebook.net/en_US/fbevents.js";

        const s = b.getElementsByTagName(e)[0];
        s.parentNode?.insertBefore(t, s);

        f.fbq = n;
    })(window, document, "script");

    // ✅ FIX: remove !
    window.fbq && window.fbq("init", PIXEL_ID);
}

export function trackPageView() {
    if (!isBrowser || !window.fbq) return;
    window.fbq("track", "PageView");
}

export function trackEvent(
    eventName: string,
    params?: Record<string, any>
) {
    if (!isBrowser || !window.fbq) return;
    window.fbq("track", eventName, params || {});
}

export function getPixelId() {
    return PIXEL_ID;
}