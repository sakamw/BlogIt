import { jwtDecode } from "jwt-decode";

interface TokenPayLoad {
  id: string;
  username: string;
  email: string;
  expired: number;
}

export function getCurrentUser(): TokenPayLoad | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decode = jwtDecode<TokenPayLoad>(token);
    if (decode.expired * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return decode;
  } catch {
    localStorage.removeItem("token");
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/auth/login";
}
