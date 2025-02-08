'use client';

import axios from "axios";
import { toast } from "react-toastify";

import { useEffect, Suspense } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter, useSearchParams } from "next/navigation";
import useCartStore from "@/app/stores/useCartStore";

function SuccessContent() {
  const { user } = useUser();
  const userId = user?.sub;
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const clearCarts = async (userId: string | undefined) => {
    useCartStore.getState().clearCart();
    try {
      const response = await axios.delete('/api/cart/clear', { data: { userId } });
      if (response.status === 200) {
        toast.success("Cart cleared successfully!");
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error("Failed to clear cart. Please try again.");
    }
  };

  useEffect(() => {
    if (sessionId) {
      // Redirect to billing page after 3 seconds
      const timer = setTimeout(() => {
        router.push(`/Order?session_id=${sessionId}`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [sessionId, router]);

  useEffect(() => {
    if (userId) {
      clearCarts(userId);
    }
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <p>Please wait while redirecting ... </p>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
