/** Request body for register-or-login */
export interface RegisterOrLoginRequest {
  name: string;
  phone: string;
}

/** Response data from register-or-login */
export interface RegisterOrLoginData {
  phone: string;
  isNewUser: boolean;
  otp: string;
  expiresInMinutes: number;
}

/** Full API response for register-or-login */
export interface RegisterOrLoginResponse {
  message: string;
  data: RegisterOrLoginData;
}

/** Cart item shape sent to login API for merging guest cart */
export interface LoginCartItem {
  productId: string;
  quantity: number;
}

/** Request body for login (verify OTP). Backend may accept wishlist and cartItems to merge guest data. */
export interface LoginRequest {
  phone: string;
  otp: string;
  name?: string;
  cartItems?: LoginCartItem[];
  wishlist?: string[];
}

/** Response data from login */
export interface LoginData {
  token: string;
  cartItems: unknown[];
  wishlist: unknown[];
}

/** Full API response for login */
export interface LoginResponse {
  message: string;
  data: LoginData;
}
