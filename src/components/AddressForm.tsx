import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Phone, Mail, Home, MapPin, Landmark, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DeliveryAddress } from "@/contexts/OrderContext";

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
];

export const ADDRESS_LABELS = ["Home", "Office", "Other"];

export const addressSchema = z.object({
  label: z.string().min(1, "Select a label"),
  fullName: z.string().trim().min(2, "At least 2 characters").max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Valid 10-digit mobile required"),
  email: z.string().trim().email("Valid email required").max(255),
  addressLine1: z.string().trim().min(5, "At least 5 characters").max(200),
  addressLine2: z.string().trim().max(200).optional().transform((v) => v ?? ""),
  city: z.string().trim().min(2, "Enter a valid city").max(100),
  state: z.string().trim().min(2, "Select a state"),
  pincode: z.string().trim().regex(/^\d{6}$/, "Valid 6-digit pincode required"),
  landmark: z.string().trim().max(100).optional().transform((v) => v ?? ""),
});

export type AddressFormData = z.infer<typeof addressSchema>;

// ── Pincode lookup via India Post public API ──────────────────────────────────
type PincodeStatus = "idle" | "loading" | "success" | "error";

// Normalize state name from API to one of our INDIAN_STATES list
const normalizeState = (raw: string): string => {
  const lower = raw.toLowerCase().trim();
  return INDIAN_STATES.find((s) => s.toLowerCase() === lower) ?? raw;
};

async function lookupPincode(pin: string): Promise<{ city: string; state: string } | null> {
  const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
  if (!res.ok) return null;
  const json = await res.json();
  const record = json?.[0];
  if (record?.Status !== "Success" || !record?.PostOffice?.length) return null;
  const po = record.PostOffice[0];
  // Prefer District as city; fall back to Name
  const city = po.District || po.Name || "";
  const state = normalizeState(po.State || "");
  return { city, state };
}
// ─────────────────────────────────────────────────────────────────────────────

interface AddressFormProps {
  defaultValues?: Partial<AddressFormData>;
  onSubmit: (data: AddressFormData) => void;
  submitLabel?: string;
  loading?: boolean;
}

const AddressForm = ({ defaultValues, onSubmit, submitLabel = "Save Address", loading }: AddressFormProps) => {
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: "Home",
      fullName: "", phone: "", email: "",
      addressLine1: "", addressLine2: "",
      city: "", state: "", pincode: "", landmark: "",
      ...defaultValues,
    },
  });

  const [pincodeStatus, setPincodeStatus] = useState<PincodeStatus>("idle");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset when defaultValues change (edit mode)
  useEffect(() => {
    if (defaultValues) form.reset({ label: "Home", ...defaultValues });
  }, [JSON.stringify(defaultValues)]);

  // Watch pincode field and trigger auto-fill
  const pincodeValue = form.watch("pincode");
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!/^\d{6}$/.test(pincodeValue)) {
      setPincodeStatus("idle");
      return;
    }
    setPincodeStatus("loading");
    debounceRef.current = setTimeout(async () => {
      try {
        const result = await lookupPincode(pincodeValue);
        if (result) {
          form.setValue("city", result.city, { shouldValidate: true });
          form.setValue("state", result.state, { shouldValidate: true });
          setPincodeStatus("success");
        } else {
          setPincodeStatus("error");
        }
      } catch {
        setPincodeStatus("error");
      }
    }, 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [pincodeValue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Label selector */}
        <FormField control={form.control} name="label" render={({ field }) => (
          <FormItem>
            <FormLabel>Address Type *</FormLabel>
            <div className="flex gap-2">
              {ADDRESS_LABELS.map((l) => (
                <button
                  key={l} type="button"
                  onClick={() => field.onChange(l)}
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${
                    field.value === l
                      ? "border-coral bg-coral/10 text-coral"
                      : "border-border text-muted-foreground hover:border-coral/50"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="fullName" render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Priya Sharma" className="pl-9" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="9876543210" maxLength={10} className="pl-9" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="priya@example.com" type="email" className="pl-9" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="addressLine1" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Address Line 1 *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="House No., Street, Area" className="pl-9" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="addressLine2" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Address Line 2 <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
              <FormControl>
                <Input placeholder="Apartment, Floor, Building" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* ── Pincode with auto-fill indicator ── */}
          <FormField control={form.control} name="pincode" render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode *</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="400001"
                    maxLength={6}
                    className="pl-9 pr-9"
                    {...field}
                  />
                  {/* Status icon */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {pincodeStatus === "loading" && (
                      <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                    )}
                    {pincodeStatus === "success" && (
                      <CheckCircle2 className="h-4 w-4 text-[hsl(var(--toast-success))]" />
                    )}
                    {pincodeStatus === "error" && (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                </div>
              </FormControl>
              {/* Inline status message */}
              {pincodeStatus === "success" && (
                <p className="text-xs text-[hsl(var(--toast-success))] flex items-center gap-1 mt-1">
                  <CheckCircle2 className="h-3 w-3" /> City &amp; State auto-filled
                </p>
              )}
              {pincodeStatus === "error" && (
                <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" /> Pincode not found — please fill manually
                </p>
              )}
              <FormMessage />
            </FormItem>
          )} />

          {/* City — may be auto-filled */}
          <FormField control={form.control} name="city" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5">
                City *
                {pincodeStatus === "success" && (
                  <span className="text-[10px] font-normal bg-[hsl(var(--toast-success))]/10 text-[hsl(var(--toast-success))] px-1.5 py-0.5 rounded-full">
                    Auto-filled
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <Input placeholder="Mumbai" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* State — auto-filled & highlighted */}
          <FormField control={form.control} name="state" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5">
                State *
                {pincodeStatus === "success" && (
                  <span className="text-[10px] font-normal bg-[hsl(var(--toast-success))]/10 text-[hsl(var(--toast-success))] px-1.5 py-0.5 rounded-full">
                    Auto-filled
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <select
                  {...field}
                  className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground transition-colors ${
                    pincodeStatus === "success"
                      ? "border-[hsl(var(--toast-success))]"
                      : "border-input"
                  }`}
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="landmark" render={({ field }) => (
            <FormItem>
              <FormLabel>Landmark <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
              <FormControl>
                <div className="relative">
                  <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Near metro station" className="pl-9" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-coral text-white font-semibold py-3 rounded-full hover:bg-coral/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : null}
          {submitLabel}
        </button>
      </form>
    </Form>
  );
};

export default AddressForm;
