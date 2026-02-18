import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Phone, Mail, Home, MapPin, Landmark } from "lucide-react";
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

  // Reset when defaultValues change (edit mode)
  useEffect(() => {
    if (defaultValues) form.reset({ label: "Home", ...defaultValues });
  }, [JSON.stringify(defaultValues)]);

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

          <FormField control={form.control} name="pincode" render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode *</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="400001" maxLength={6} className="pl-9" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="city" render={({ field }) => (
            <FormItem>
              <FormLabel>City *</FormLabel>
              <FormControl>
                <Input placeholder="Mumbai" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="state" render={({ field }) => (
            <FormItem>
              <FormLabel>State *</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground"
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
