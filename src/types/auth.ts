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

/** Request body for login (verify OTP) */
export interface LoginRequest {
  phone: string;
  otp: string;
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
