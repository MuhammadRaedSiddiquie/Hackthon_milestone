"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import useAuthStore from "@/app/stores/useAuthStore";
  

const AuthStateInitializer = () => {
  const { user } = useUser();
  const { setUser, isLoaded } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false); // ✅ Track if component is mounted

  useEffect(() => {
    setIsMounted(true); // ✅ Ensures client-only rendering
  }, []);

  useEffect(() => {
    if (isMounted && !isLoaded && user) {
      setUser(user);
    }
  }, [isMounted, user, isLoaded, setUser]);

  if (!isMounted) return null; // ✅ Prevents SSR mismatch

  return null;
};

export default AuthStateInitializer;
