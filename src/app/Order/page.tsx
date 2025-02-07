"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const BillingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BillingContent />
    </Suspense>
  );
};

const BillingContent = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails(sessionId);
    }
  }, [sessionId]);

  const fetchOrderDetails = async (sessionId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/get-order?sessionId=${sessionId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!sessionId) return <div>Loading...</div>;
  if (loading) return <div>Loading order details...</div>;
  if (!order) return <div>Order not found.</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Order Summary</h1>

      {/* Order Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Order ID:</p>
            <p className="font-medium">{order?.orderId || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-600">Order Date:</p>
            <p className="font-medium">
              {order?._createdAt ? new Date(order._createdAt).toLocaleDateString() : "N/A"}
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
        {order?.products?.map((product: any, index: number) => (
          <div key={index} className="flex items-center border-b py-4">
            <div className="w-20 h-20 relative mr-4">
              {product?.product?.images?.asset?.url && (
                <Image
                  src={product.product.images.asset.url}
                  alt={product?.product?.title || "Product Image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium">{product?.product?.title || "Unnamed Product"}</p>
              <p className="text-gray-600">Quantity: {product?.quantity || 1}</p>
            </div>
            <div>
              <p className="font-medium">
                ${((product?.price || 0) * (product?.quantity || 1)).toFixed(2)}
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
            <p className="font-medium">{order?.shippingDetails?.name || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-600">Address:</p>
            <p className="font-medium">{order?.shippingDetails?.address || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-600">City:</p>
            <p className="font-medium">{order?.shippingDetails?.city || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-600">Postal Code:</p>
            <p className="font-medium">{order?.shippingDetails?.postal || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-600">Shipping Method:</p>
            <p className="font-medium">{order?.shippingRate?.serviceType || "Standard"}</p>
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
              {order?.products
                ?.reduce((acc: number, product: any) => acc + (product?.price || 0) * (product?.quantity || 1), 0)
                .toFixed(2) || "0.00"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping:</p>
            <p className="font-medium">
              ${order?.shippingRate?.shippingAmount?.amount?.toFixed(2) || "0.00"}
            </p>
          </div>
          <div className="flex justify-between border-t pt-2">
            <p className="text-gray-600 font-semibold">Total:</p>
            <p className="font-bold text-xl">
              $
              {(
                (order?.products?.reduce(
                  (acc: number, product: any) => acc + (product?.price || 0) * (product?.quantity || 1),
                  0
                ) || 0) + (order?.shippingRate?.shippingAmount?.amount || 0)
              ).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
