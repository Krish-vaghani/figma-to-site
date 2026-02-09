import { useEffect } from "react";

const SITE_NAME = "Purse | Premium Designer Handbags";

export function useSeo(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (description && metaDesc) {
      metaDesc.setAttribute("content", description);
    }

    return () => {
      document.title = SITE_NAME;
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          "Discover thoughtfully crafted purses that blend timeless design with modern elegance. Shop tote bags, clutches, crossbody bags & more."
        );
      }
    };
  }, [title, description]);
}
