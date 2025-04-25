import { useEffect, useState } from "react";
import { authService } from "../auth/authServices";


export function useCurrentUser() {
  const [user, setUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setUser(detail ?? authService.getCurrentUser());
    };
    window.addEventListener("userUpdated", handler);
    return () => window.removeEventListener("userUpdated", handler);
  }, []);

  return user;
}