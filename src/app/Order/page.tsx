'use client';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const BillingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails(sessionId);
    }
  }, [sessionId]);

  const fetchOrderDetails = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/get-order?sessionId=${sessionId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }
      const data = await response.json();
      console.log(data)
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!sessionId) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Order Summary</h1>

      {/* Order Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Order ID:</p>
            <p className="font-medium">{order.orderId}</p>
          </div>
          <div>
            <p className="text-gray-600">Order Date:</p>
            <p className="font-medium">
              {new Date(order._createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Payment Status:</p>
            <p className="font-medium text-green-600">Paid</p>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        {order.products.map((product: any, index: number) => (
          <div key={index} className="flex items-center border-b py-4">
            <div className="w-20 h-20 relative mr-4">
              <Image
                src={product?.product?.images?.asset?.url}
                alt={product?.product?.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{product?.product?.title}</p>
              <p className="text-gray-600">Quantity: {product?.quantity}</p>
            </div>
            <div>
              <p className="font-medium">
                ${(product?.price * product?.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Name:</p>
            <p className="font-medium">{order?.shippingDetails?.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Address:</p>
            <p className="font-medium">{order?.shippingDetails?.address}</p>
          </div>
          <div>
            <p className="text-gray-600">City:</p>
            <p className="font-medium">{order?.shippingDetails?.city}</p>
          </div>
          <div>
            <p className="text-gray-600">Postal Code:</p>
            <p className="font-medium">{order?.shippingDetails?.postal}</p>
          </div>
          <div>
            <p className="text-gray-600">Shipping Method:</p>
            <p className="font-medium">{order?.shippingRate?.serviceType}</p>
          </div>
        </div>
      </div>

      {/* Total Amount */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Total Amount</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal:</p>
            <p className="font-medium">
              $
              {order.products
                .reduce((acc: number, product: any) => acc + product?.price * product?.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping:</p>
            <p className="font-medium">${order?.shippingRate?.shippingAmount?.amount}</p>
          </div>
          <div className="flex justify-between border-t pt-2">
            <p className="text-gray-600 font-semibold">Total:</p>
            <p className="font-bold text-xl">
              $
              {(
                order.products.reduce(
                  (acc: number, product: any) => acc + product?.price * product?.quantity,
                  0
                ) + order?.shippingRate?.shippingAmount?.amount
              ).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;