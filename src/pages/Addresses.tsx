import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, MapPin, Pencil, Trash2, Star, Home, Briefcase, MoreHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AddressForm, { AddressFormData } from "@/components/AddressForm";
import { useAddresses, SavedAddress } from "@/contexts/AddressContext";
import { shopBackground } from "@/lib/assetUrls";
import { showToast } from "@/lib/toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const LABEL_ICONS: Record<string, React.ElementType> = {
  Home: Home,
  Office: Briefcase,
  Other: MoreHorizontal,
};

const AddressCard = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: {
  address: SavedAddress;
  onEdit: (a: SavedAddress) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}) => {
  const LabelIcon = LABEL_ICONS[address.label] ?? MapPin;
  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.landmark,
    address.city,
    address.state,
    address.pincode,
  ].filter(Boolean);

  return (
    <div
      className={`relative bg-card border-2 rounded-2xl p-5 transition-all ${
        address.isDefault ? "border-coral" : "border-border"
      }`}
    >
      {/* Default badge */}
      {address.isDefault && (
        <span className="absolute top-3 right-3 bg-coral/10 text-coral text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Star className="h-3 w-3 fill-coral" /> Default
        </span>
      )}

      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <LabelIcon className="h-4 w-4 text-foreground" />
        </div>
        <span className="font-semibold text-foreground">{address.label}</span>
      </div>

      {/* Details */}
      <p className="text-sm font-medium text-foreground">{address.fullName}</p>
      <p className="text-sm text-muted-foreground mt-0.5">{parts.join(", ")}</p>
      <p className="text-sm text-muted-foreground mt-0.5">📞 {address.phone}</p>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
        {!address.isDefault && (
          <button
            onClick={() => onSetDefault(address.id)}
            className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1.5 hover:border-coral hover:text-coral transition-colors flex items-center gap-1"
          >
            <Star className="h-3 w-3" /> Set Default
          </button>
        )}
        <button
          onClick={() => onEdit(address)}
          className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1.5 hover:border-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          <Pencil className="h-3 w-3" /> Edit
        </button>
        <button
          onClick={() => onDelete(address.id)}
          className="text-xs text-destructive border border-border rounded-full px-3 py-1.5 hover:border-destructive transition-colors flex items-center gap-1 ml-auto"
        >
          <Trash2 className="h-3 w-3" /> Delete
        </button>
      </div>
    </div>
  );
};

const Addresses = () => {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefault } = useAddresses();
  const [addOpen, setAddOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<SavedAddress | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = (data: AddressFormData) => {
    const { label, ...rest } = data;
    addAddress(rest as import("@/contexts/OrderContext").DeliveryAddress, label);
    setAddOpen(false);
    showToast.success({ title: "Address saved", description: `${label} address has been added.` });
  };

  const handleEdit = (data: AddressFormData) => {
    if (!editAddress) return;
    const { label, ...rest } = data;
    updateAddress(editAddress.id, rest as import("@/contexts/OrderContext").DeliveryAddress, label);
    setEditAddress(null);
    showToast.success({ title: "Address updated" });
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteAddress(deleteId);
    setDeleteId(null);
    showToast.success({ title: "Address removed" });
  };

  const handleSetDefault = (id: string) => {
    setDefault(id);
    showToast.success({ title: "Default address updated" });
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />

      {/* Header */}
      <div
        className="relative w-full py-8 md:py-10 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${shopBackground})`, backgroundSize: "cover", backgroundPosition: "top left" }}
      >
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair text-foreground">My Addresses</h1>
          <p className="text-muted-foreground text-sm mt-1">
            <Link to="/" className="hover:text-coral transition-colors">Home</Link>
            {" / "}
            <span className="text-foreground">Addresses</span>
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground text-sm">
            {addresses.length} saved address{addresses.length !== 1 ? "es" : ""}
          </p>
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 bg-coral text-white font-medium px-5 py-2.5 rounded-full hover:bg-coral/90 transition-colors text-sm"
          >
            <Plus className="h-4 w-4" /> Add New Address
          </button>
        </div>

        {/* Empty state */}
        {addresses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center">
              <MapPin className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-foreground font-semibold text-lg">No saved addresses</p>
            <p className="text-muted-foreground text-sm max-w-xs">
              Add your delivery address to make checkout faster.
            </p>
            <button
              onClick={() => setAddOpen(true)}
              className="mt-2 flex items-center gap-2 bg-coral text-white font-medium px-6 py-3 rounded-full hover:bg-coral/90 transition-colors"
            >
              <Plus className="h-4 w-4" /> Add Address
            </button>
          </div>
        )}

        {/* Address grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              onEdit={setEditAddress}
              onDelete={setDeleteId}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      </div>

      {/* Add Address Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-coral" /> Add New Address
            </DialogTitle>
          </DialogHeader>
          <AddressForm onSubmit={handleAdd} submitLabel="Save Address" />
        </DialogContent>
      </Dialog>

      {/* Edit Address Dialog */}
      <Dialog open={!!editAddress} onOpenChange={(open) => !open && setEditAddress(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="h-5 w-5 text-coral" /> Edit Address
            </DialogTitle>
          </DialogHeader>
          {editAddress && (
            <AddressForm
              defaultValues={{ ...editAddress }}
              onSubmit={handleEdit}
              submitLabel="Update Address"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this address?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The address will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default Addresses;
