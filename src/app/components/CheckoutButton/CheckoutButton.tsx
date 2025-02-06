"use client";

import { useState } from "react";

export default function CheckoutButton({
  product,
  user,
  formData,
  selectedRate,
  rates,
  onSuccess, 
}: {
  product: any;
  user: string;
  formData: any;
  selectedRate: string | null;
  rates: any[];
  onSuccess: () => void; 
}) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: product,
          userId: user,
          shippingDetails: formData,
          selectedRate: selectedRate,
          rates: rates,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
        onSuccess(); // Notify parent component of success
      } else {
        alert("Payment failed!");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={!selectedRate || loading}
      className="flex items-center justify-center rounded-lg disabled:bg-blue-300 bg-blueCol px-8 py-2 text-md uppercase montserrat-medium text-white"
    >
      {loading ? "Processing..." : "Place Order"}
    </button>
  );
}