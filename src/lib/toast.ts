import { toast as sonnerToast } from "sonner";

type ToastOptions = {
  title: string;
  description?: string;
  duration?: number;
};

/**
 * Professional toast notifications with consistent styling.
 * We explicitly clear ALL previous toasts before showing a new one,
 * so nothing older comes back after you close the current toast.
 */
function replaceToast(
  kind: "success" | "error" | "info" | "warning",
  { title, description, duration }: ToastOptions
) {
  // Remove every existing toast (also clears any queued ones)
  sonnerToast.dismiss();

  if (kind === "success") {
    return sonnerToast.success(title, { description, duration });
  }
  if (kind === "error") {
    return sonnerToast.error(title, { description, duration });
  }
  if (kind === "info") {
    return sonnerToast.info(title, { description, duration });
  }
  return sonnerToast.warning(title, { description, duration });
}

export const showToast = {
  success: (opts: ToastOptions) =>
    replaceToast("success", { ...opts, duration: opts.duration ?? 5000 }),

  error: (opts: ToastOptions) =>
    replaceToast("error", { ...opts, duration: opts.duration ?? 6000 }),

  info: (opts: ToastOptions) =>
    replaceToast("info", { ...opts, duration: opts.duration ?? 5000 }),

  warning: (opts: ToastOptions) =>
    replaceToast("warning", { ...opts, duration: opts.duration ?? 5000 }),
};

/**
 * Specialized toast helpers for common actions
 */
export const toast = {
  cart: {
    added: (productName: string, quantity: number = 1) => {
      return showToast.success({
        title: "Added to Cart",
        description: quantity > 1 
          ? `${quantity}x ${productName} added to your cart.`
          : `${productName} added to your cart.`,
        duration: 5000,
      });
    },
    updated: (productName: string, quantity: number) => {
      return showToast.success({
        title: "Cart Updated",
        description: `${productName} quantity updated to ${quantity}.`,
        duration: 5000,
      });
    },
    removed: (productName: string) => {
      return showToast.success({
        title: "Removed from Cart",
        description: `${productName} has been removed from your cart.`,
        duration: 5000,
      });
    },
    cleared: () => {
      return showToast.success({
        title: "Cart Cleared",
        description: "All items have been removed from your cart.",
        duration: 5000,
      });
    },
  },

  wishlist: {
    added: (productName?: string) => {
      return showToast.success({
        title: "Added to Wishlist",
        description: productName 
          ? `${productName} has been saved to your wishlist.`
          : "Item saved to your wishlist.",
        duration: 5000,
      });
    },
    removed: (productName?: string) => {
      return showToast.success({
        title: "Removed from Wishlist",
        description: productName 
          ? `${productName} has been removed from your wishlist.`
          : "Item removed from your wishlist.",
        duration: 5000,
      });
    },
  },

  auth: {
    otpSent: () => {
      return showToast.success({
        title: "OTP Sent",
        description: "Check your phone for the verification code.",
        duration: 5500,
      });
    },
    loginSuccess: () => {
      return showToast.success({
        title: "Login Successful",
        description: "Welcome back! Redirecting...",
        duration: 5000,
      });
    },
    otpError: (message?: string) => {
      return showToast.error({
        title: "Could Not Send OTP",
        description: message || "Failed to send OTP. Please try again.",
        duration: 5000,
      });
    },
    verifyError: (message?: string) => {
      return showToast.error({
        title: "Verification Failed",
        description: message || "Invalid or expired code. Please try again.",
        duration: 5000,
      });
    },
  },

  product: {
    loadError: () => {
      return showToast.error({
        title: "Could Not Load Products",
        description: "Please try again later.",
        duration: 5000,
      });
    },
  },

  share: {
    copied: () => {
      return showToast.success({
        title: "Link Copied",
        description: "Share it with friends.",
        duration: 5000,
      });
    },
    copyError: () => {
      return showToast.error({
        title: "Failed to Copy Link",
        description: "Please try again.",
        duration: 4000,
      });
    },
  },

  discount: {
    codeReceived: (code: string) => {
      return showToast.success({
        title: "Discount Code Received",
        description: `Your ${code} discount code is ready to use!`,
        duration: 5000,
      });
    },
  },
};
