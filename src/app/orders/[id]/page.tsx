'use client'
import { sanityClient } from "@/lib/sanity.client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const OrderDetailsPage = () => {
  const { id } = useParams(); // ✅ Use useParams() instead of router.query
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchOrderDetails(id as string);
    }
  }, [id]);

  const fetchOrderDetails = async (orderId: string) => {
    try {
      const query = `*[_type == "order" && _id == $orderId][0] {
        _id,
        orderId,
        userId,
        orderStatus, // ✅ Fetch order status
        products[] {
          productId,
          quantity,
          price,
          product-> {
            title,
            images[0]{ asset->{url} }
          }
        },
        shippingDetails {
          name,
          email,
          phone,
          address,
          city,
          state,
          postal,
          country
        },
        shippingRate {
          serviceType,
          shippingAmount {
            amount
          }
        },
        paymentDetails {
          paymentMethod,
          amount,
          transactionId
        },
        _createdAt
      }`;
      const order = await sanityClient.fetch(query, { orderId });
      setOrder(order);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading order details...</div>;
  if (!order) return <div>Order not found.</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>

      {/* Order Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Order ID:</p>
            <p className="font-medium">{order.orderId}</p>
          </div>
          <div>
            <p className="text-gray-600">Order Date:</p>
            <p className="font-medium">{new Date(order._createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Order Status:</p>
            <p className={`font-medium ${getOrderStatusColor(order.orderStatus)}`}>
              {order.orderStatus}
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
              <img
                src={product.product?.images?.asset?.url}
                alt={product.product.title}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{product.product.title}</p>
              <p className="text-gray-600">Quantity: {product.quantity}</p>
            </div>
            <div>
              <p className="font-medium">${(product.price * product.quantity).toFixed(2)}</p>
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
            <p className="font-medium">{order.shippingDetails.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Email:</p>
            <p className="font-medium">{order.shippingDetails.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone:</p>
            <p className="font-medium">{order.shippingDetails.phone}</p>
          </div>
          <div>
            <p className="text-gray-600">Address:</p>
            <p className="font-medium">{order.shippingDetails.address}</p>
          </div>
          <div>
            <p className="text-gray-600">City:</p>
            <p className="font-medium">{order.shippingDetails.city}</p>
          </div>
          <div>
            <p className="text-gray-600">Postal Code:</p>
            <p className="font-medium">{order.shippingDetails.postal}</p>
          </div>
          <div>
            <p className="text-gray-600">Country:</p>
            <p className="font-medium">{order.shippingDetails.country}</p>
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
              {order.products.reduce((acc: number, product: any) => acc + product.price * product.quantity, 0).toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping:</p>
            <p className="font-medium">${order.shippingRate.shippingAmount.amount}</p>
          </div>
          <div className="flex justify-between border-t pt-2">
            <p className="text-gray-600 font-semibold">Total:</p>
            <p className="font-bold text-xl">
              $
              {(
                order.products.reduce((acc: number, product: any) => acc + product.price * product.quantity, 0) +
                order.shippingRate.shippingAmount.amount
              ).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to add color to order status
const getOrderStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "text-yellow-500"; // Yellow for pending
    case "shipped":
      return "text-blue-500"; // Blue for shipped
    case "delivered":
      return "text-green-500"; // Green for delivered
    case "canceled":
      return "text-red-500"; // Red for canceled
    default:
      return "text-gray-500"; // Default gray
  }
};

export default OrderDetailsPage;
