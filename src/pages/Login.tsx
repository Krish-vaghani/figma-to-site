import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { toast } from "@/lib/toast";
import { useSeo } from "@/hooks/useSeo";
import { useRegisterOrLoginMutation, useLoginMutation } from "@/store/services/authApi";
import { useAuth } from "@/contexts/AuthContext";
import type { LoginCartItem } from "@/types/auth";
import { shopBackground } from "@/lib/assetUrls";

// CDN image URLs (no local static assets)
const LOGIN_ILLUSTRATION_URL =
  "https://vedify-backend-dev.s3.eu-north-1.amazonaws.com/uploads/uploads/1773644772525_login-illustration.png";
const OTP_ILLUSTRATION_URL =
  "https://vedify-backend-dev.s3.eu-north-1.amazonaws.com/uploads/uploads/1773644781018_otp-illustration.png";
const LOGIN_CARD_BG_URL =
  "https://vedify-backend-dev.s3.eu-north-1.amazonaws.com/uploads/uploads/1773644761338_login-card-bg.png";

const OTP_LENGTH = 6;

const GUEST_WISHLIST_KEY = "wishlist";
const GUEST_CART_KEY = "cart";

function getGuestWishlist(): string[] {
  try {
    const raw = localStorage.getItem(GUEST_WISHLIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((id: unknown) => String(id)) : [];
  } catch {
    return [];
  }
}

function getGuestCartItems(): LoginCartItem[] {
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item: { id?: unknown; quantity?: unknown }) => ({
      productId: String(item.id ?? ""),
      quantity: typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1,
    })).filter((c: LoginCartItem) => c.productId);
  } catch {
    return [];
  }
}

const registerOrLoginSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(1, "Phone is required").max(15),
});

const loginSchema = z.object({
  phone: z.string().trim().min(1, "Phone is required"),
  otp: z.string().length(OTP_LENGTH, "Enter 6-digit OTP").regex(/^\d+$/, "OTP must be digits only"),
});

/** Allow only same-origin path (starts with /, not //) to prevent open redirect. */
function getSafeRedirectPath(path: string | undefined, fallback: string): string {
  if (typeof path !== "string" || !path.trim()) return fallback;
  const trimmed = path.trim();
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return trimmed;
  return fallback;
}

const Login = () => {
  useSeo("Login", "Sign in to manage your orders, wishlist, and account details.");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [registerOrLogin, { isLoading: isSendingOtp }] = useRegisterOrLoginMutation();
  const [login, { isLoading: isVerifying }] = useLoginMutation();

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const otpAutofillInputRef = useRef<HTMLInputElement | null>(null);

  // Redirect if already logged in
  if (auth.isLoggedIn) {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
    const safePath = getSafeRedirectPath(from, "/profile");
    return <Navigate to={safePath} replace />;
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = registerOrLoginSchema.safeParse({
      name: fullName.trim(),
      phone: mobile.trim(),
    });
    if (!parsed.success) {
      const msg = parsed.error.errors[0]?.message ?? "Invalid input";
      toast.auth.otpError(msg);
      return;
    }
    try {
      await registerOrLogin({ name: parsed.data.name, phone: parsed.data.phone }).unwrap();
      toast.auth.otpSent();
      setStep("otp");
      // Start Web OTP listener in next tick so it runs soon after user gesture (Chrome requirement)
      setTimeout(() => {
        if (!("OTPCredential" in window)) return;
        const ab = new AbortController();
        const timeout = window.setTimeout(() => ab.abort(), 5 * 60 * 1000);
        navigator.credentials
          .get({
            otp: { transport: ["sms"] },
            signal: ab.signal,
          } as CredentialRequestOptions)
          .then((cred) => {
            if (cred && "code" in cred && typeof (cred as { code: string }).code === "string") {
              const raw = (cred as { code: string }).code;
              // Extract first 6-digit sequence (handles "#123456", "123456 is your...", etc.)
              const digitsOnly = raw.replace(/\D/g, "");
              const sixDigits = digitsOnly.match(/\d{6}/)?.[0] ?? digitsOnly.slice(0, OTP_LENGTH);
              if (sixDigits.length >= OTP_LENGTH) {
                const digits = sixDigits.slice(0, OTP_LENGTH).split("");
                setOtp(digits);
                doVerify(digits);
              }
            }
          })
          .catch(() => {});
      }, 100);
    } catch (err: unknown) {
      const msg = (err as { data?: { message?: string } })?.data?.message;
      toast.auth.otpError(msg);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, "").slice(0, OTP_LENGTH);
      const newOtp = [...otp];
      digits.split("").forEach((d, i) => {
        if (index + i < OTP_LENGTH) newOtp[index + i] = d;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
      otpRefs.current[nextIndex]?.focus();
      if (newOtp.every(Boolean)) doVerify(newOtp);
      return;
    }

    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    } else if (value && index === OTP_LENGTH - 1 && newOtp.every(Boolean)) {
      doVerify(newOtp);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const doVerify = async (otpDigits: string[]) => {
    if (otpDigits.some((d) => !d)) return;
    const otpString = otpDigits.join("");
    const parsed = loginSchema.safeParse({ phone: mobile, otp: otpString });
    if (!parsed.success) {
      const msg = parsed.error.errors[0]?.message ?? "Invalid OTP";
      toast.auth.verifyError(msg);
      return;
    }
    try {
      const wishlist = getGuestWishlist();
      const cartItems = getGuestCartItems();
      const result = await login({
        phone: parsed.data.phone,
        otp: parsed.data.otp,
        name: fullName.trim(),
        cartItems,
        wishlist,
      }).unwrap();
      auth.login(result.data.token, { name: fullName.trim(), phone: mobile.trim() });
      toast.auth.loginSuccess();
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
      const safePath = getSafeRedirectPath(from, "/");
      navigate(safePath, { replace: true });
    } catch (err: unknown) {
      const msg = (err as { data?: { message?: string } })?.data?.message;
      toast.auth.verifyError(msg);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    doVerify(otp);
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />

      {/* Header with background */}
      <div
        className="relative overflow-hidden bg-cover bg-right sm:bg-top"
        style={{ backgroundImage: `url(${shopBackground})` }}
      >
        <div className="absolute inset-0 bg-background/50" aria-hidden="true" />
        <div className="relative z-10">
          <Navbar className="bg-transparent" />
          {/* Page Title */}
          <div className="py-12 sm:py-20 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3">
              Login
            </h1>
            <nav className="text-muted-foreground text-sm">
              <Link to="/" className="hover:text-coral transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Login</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 -mt-4 sm:-mt-6 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-coral/20 overflow-hidden bg-background shadow-lg"
        >
          {/* Subtle background image */}
          <img
            src={LOGIN_CARD_BG_URL}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Form: on mobile show after image (order-2), on desktop first (order-1) */}
            <div className="order-2 md:order-1 p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {step === "phone" ? (
                  <motion.form
                    key="phone-step"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSendOtp}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                        Welcome <span className="text-coral">Back</span>
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Sign In To Manage Your Orders, Wishlist, And Account Details.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Username & Email Address
                        </label>
                        <Input
                          placeholder="Enter Username"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="rounded-xl h-12 bg-background/80 border-border"
                          required
                          maxLength={100}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Mobile Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="Enter Mobile Number"
                          value={mobile}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^\d+\-\s()]/g, "");
                            if (val.length <= 15) setMobile(val);
                          }}
                          className="rounded-xl h-12 bg-background/80 border-border"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSendingOtp || !fullName.trim() || !mobile.trim()}
                      className="w-full h-12 rounded-full bg-foreground text-background hover:bg-coral text-base font-semibold transition-colors"
                    >
                      {isSendingOtp ? "Sending OTP..." : "Login"}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="otp-step"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleVerify}
                    className="space-y-6"
                  >
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setStep("phone");
                          setOtp(Array(OTP_LENGTH).fill(""));
                        }}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-coral transition-colors mb-4"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                        Secure Login <span className="text-coral">Verification</span>
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Enter the 6-digit verification code sent to your registered mobile number.
                      </p>
                    </div>

                    {/* Hidden input: sole target for autocomplete="one-time-code" (iOS/Safari and some Android) */}
                    <input
                      ref={otpAutofillInputRef}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={OTP_LENGTH}
                      aria-label="One-time code"
                      className="absolute opacity-0 w-0 h-0 pointer-events-none"
                      tabIndex={-1}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH);
                        if (raw.length >= OTP_LENGTH) {
                          const digits = raw.split("");
                          setOtp(digits);
                          e.target.value = "";
                          doVerify(digits);
                        }
                      }}
                    />
                    {/* OTP Inputs - first has one-time-code so browser/SMS can autofill into it */}
                    <div className="flex gap-2 sm:gap-3 relative">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => { otpRefs.current[i] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={i === 0 ? OTP_LENGTH : 1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          onPaste={(e) => {
                            e.preventDefault();
                            const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
                            handleOtpChange(i, pasted);
                          }}
                          autoComplete={i === 0 ? "one-time-code" : "off"}
                          className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-lg font-semibold rounded-xl border transition-all duration-200 bg-background/80 focus:outline-none focus:ring-2 focus:ring-coral/50 ${
                            digit ? "border-foreground" : "border-border"
                          }`}
                          aria-label={`Digit ${i + 1}`}
                        />
                      ))}
                    </div>

                    <Button
                      type="submit"
                      disabled={isVerifying || otp.some((d) => !d)}
                      className="w-full h-12 rounded-full bg-foreground text-background hover:bg-coral text-base font-semibold transition-colors"
                    >
                      {isVerifying ? "Verifying..." : "Verify"}
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      Didn't receive the code?{" "}
                      <button
                        type="button"
                        className="text-coral font-medium hover:underline"
                        onClick={async () => {
                          setOtp(Array(OTP_LENGTH).fill(""));
                          try {
                            await registerOrLogin({ name: fullName.trim(), phone: mobile.trim() }).unwrap();
                            toast.auth.otpSent();
                          } catch {
                            toast.auth.otpError("Failed to resend OTP. Please try again.");
                          }
                        }}
                        disabled={isSendingOtp}
                      >
                        Resend
                      </button>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Illustration (desktop only) */}
            <div className="hidden md:flex order-2 items-end justify-center p-6 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={step}
                  src={step === "phone" ? LOGIN_ILLUSTRATION_URL : OTP_ILLUSTRATION_URL}
                  alt="Login illustration"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="max-h-[400px] w-auto object-contain"
                />
              </AnimatePresence>
            </div>

            {/* Mobile: illustration first (left/top), left-aligned */}
            <div className="md:hidden flex order-1 justify-start px-6 pt-6 pb-2">
              <img
                src={step === "phone" ? LOGIN_ILLUSTRATION_URL : OTP_ILLUSTRATION_URL}
                alt="Login illustration"
                className="max-h-[250px] w-auto object-contain"
              />
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
