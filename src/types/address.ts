/**
 * Types for Address API (add, list, update, delete).
 * Base URL: https://api.pursolina.com/api/v1
 */

/** Single address from list/API */
export interface ApiAddress {
  _id: string;
  user: string;
  address_type: string;
  full_name: string;
  mobile_number: string;
  email_address: string;
  address_line_1: string;
  address_line_2: string;
  pincode: string;
  city: string;
  state: string;
  landmark: string;
  is_default: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

/** Request body for POST /address/add */
export interface AddAddressRequest {
  address_type: string;
  full_name: string;
  mobile_number: string;
  email_address: string;
  address_line_1: string;
  address_line_2?: string;
  pincode: string;
  city: string;
  state: string;
  landmark?: string;
  is_default?: boolean;
}

/** Request body for PUT /address/update/:id (all optional) */
export interface UpdateAddressRequest {
  address_type?: string;
  full_name?: string;
  mobile_number?: string;
  email_address?: string;
  address_line_1?: string;
  address_line_2?: string;
  pincode?: string;
  city?: string;
  state?: string;
  landmark?: string;
  is_default?: boolean;
}

/** Response for GET /address/list */
export interface AddressListResponse {
  message: string;
  data: ApiAddress[];
  total: number;
  page: number;
  limit: number;
}

export interface AddAddressResponse {
  message: string;
  data?: ApiAddress;
}

export interface UpdateAddressResponse {
  message: string;
  data?: ApiAddress;
}

export interface DeleteAddressResponse {
  message: string;
}

/** App address shape (matches SavedAddress from AddressContext) */
export interface SavedAddressFromApi {
  id: string;
  label: string;
  isDefault: boolean;
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
}

/** Map API address to app SavedAddress shape (id, label, fullName, phone, etc.) */
export function apiAddressToSavedAddress(a: ApiAddress): SavedAddressFromApi {
  return {
    id: a._id,
    label: a.address_type || "Home",
    isDefault: a.is_default,
    fullName: a.full_name,
    phone: a.mobile_number,
    email: a.email_address,
    addressLine1: a.address_line_1,
    addressLine2: a.address_line_2 ?? "",
    city: a.city,
    state: a.state,
    pincode: a.pincode,
    landmark: a.landmark ?? "",
  };
}

/** Map form/context address to API add-address body */
export function toAddAddressRequest(
  address: {
    fullName: string;
    phone: string;
    email: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  },
  label: string,
  isDefault?: boolean
): AddAddressRequest {
  return {
    address_type: label,
    full_name: address.fullName,
    mobile_number: address.phone,
    email_address: address.email,
    address_line_1: address.addressLine1,
    address_line_2: address.addressLine2 ?? "",
    pincode: address.pincode,
    city: address.city,
    state: address.state,
    landmark: address.landmark ?? "",
    is_default: isDefault ?? false,
  };
}

/** Map form/context address to API update body (partial) */
export function toUpdateAddressRequest(
  address: Partial<{
    fullName: string;
    phone: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
    label: string;
    isDefault: boolean;
  }>
): UpdateAddressRequest {
  const body: UpdateAddressRequest = {};
  if (address.fullName != null) body.full_name = address.fullName;
  if (address.phone != null) body.mobile_number = address.phone;
  if (address.email != null) body.email_address = address.email;
  if (address.addressLine1 != null) body.address_line_1 = address.addressLine1;
  if (address.addressLine2 != null) body.address_line_2 = address.addressLine2;
  if (address.city != null) body.city = address.city;
  if (address.state != null) body.state = address.state;
  if (address.pincode != null) body.pincode = address.pincode;
  if (address.landmark != null) body.landmark = address.landmark;
  if (address.label != null) body.address_type = address.label;
  if (address.isDefault != null) body.is_default = address.isDefault;
  return body;
}
