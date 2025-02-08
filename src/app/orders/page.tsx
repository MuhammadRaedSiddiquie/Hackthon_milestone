'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sanityClient } from "@/lib/sanity.client";


const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = typeof window !== "undefined" ? useRouter() : null; 


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const query = `*[_type == "order"] | order(_createdAt desc) {
          _id,
          orderId,
          userId,
          orderStatus,
          _createdAt,
          shippingDetails {
            name,
            city
          },
          paymentDetails {
            amount
          }
        }`;
        const orders = await sanityClient.fetch(query);
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-500"; // Yellow for pending
      case "shipped":
        return "text-blue-500"; // Blue for shipped
      case "delivered":
        return "text-green-500"; // Green for delivered
      case "canceled":
        return "text-red-500"; // Red for canceled orders
      default:
        return "text-gray-500"; // Default gray
    }
  }

  if (loading) {
    return <div>Loading orders...</div>;
  }


  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {orders.length > 0 ? (
          <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order._id}
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => router?.push(`/orders/${order._id}`)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Order ID: {order.orderId}</p>
                  <p className="text-gray-600">Customer: {order.shippingDetails.name}</p>
                  <p className="text-gray-600">City: {order.shippingDetails.city}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Amount: ${order.paymentDetails.amount}</p>
                  <p className="text-gray-600">
                    Date: {new Date(order._createdAt).toLocaleDateString()}
                  </p>
                  <p className={`text-sm font-semibold mt-2 ${getOrderStatusColor(order.orderStatus)}`}>
                    Status: {order.orderStatus}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;