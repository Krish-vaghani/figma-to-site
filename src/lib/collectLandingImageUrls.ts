import {
  avatar,
  avatarFemale,
  avatarMale,
  elevate1,
  elevate2,
  elevate3,
  elevate4,
  logo,
} from "@/lib/assetUrls";
import type { LandingPageData } from "@/types/landing";
import { getHeroDisplay, landingItemToProduct } from "@/types/landing";

/** Hero header background used on the home page (must match Index). */
export const INDEX_HERO_BG =
  "https://vedify-backend-dev.s3.eu-north-1.amazonaws.com/uploads/uploads/1770632691901_Frame_2147225909.png";

function addUrl(set: Set<string>, url: string | undefined | null) {
  if (typeof url === "string") {
    const t = url.trim();
    if (t) set.add(t);
  }
}

/**
 * URLs for images that appear above the fold or in the first screenful on the
 * landing page — used to preload before showing the page on slow devices.
 */
export function collectLandingCriticalImageUrls(
  data: LandingPageData | undefined
): string[] {
  const set = new Set<string>();

  addUrl(set, INDEX_HERO_BG);
  addUrl(set, logo);
  [elevate1, elevate2, elevate3, elevate4].forEach((u) => addUrl(set, u));
  addUrl(set, avatar);
  addUrl(set, avatarMale);
  addUrl(set, avatarFemale);

  if (!data) {
    return [...set];
  }

  const hero = data.hero;
  if (hero) {
    const display = getHeroDisplay(hero);
    addUrl(set, display?.image);
    hero.images?.forEach((u) => addUrl(set, u));
  }

  data.best_collections?.forEach((item) => {
    addUrl(set, landingItemToProduct(item).image);
  });

  data.fresh_styles?.forEach((item) => {
    addUrl(set, landingItemToProduct(item).image);
  });

  return [...set];
}
