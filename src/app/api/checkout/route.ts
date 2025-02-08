import { sanityClient } from "@/lib/sanity.client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
console.log(stripe)

export async function POST(req: Request) {
  try {
    const { products, userId, shippingDetails, selectedRate, rates } = await req.json();

   

    // Validate inputs
    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: "Invalid products format" }, { status: 400 });
    }

    if (!selectedRate || !rates || !Array.isArray(rates)) {
      return NextResponse.json({ error: "Invalid shipping rate selection" }, { status: 400 });
    }

    // Find the selected shipping rate
    const selectedShippingRate = rates.find((rate: any) => rate.rateId === selectedRate);
    if (!selectedShippingRate) {
      return NextResponse.json({ error: "Selected shipping rate not found" }, { status: 400 });
    }

    // Create line items for products
    const productLineItems = products.map((product: any) => ({
      price_data: {
        currency: "usd",
        unit_amount: Math.round(Number(product.price) * 100), // Convert to cents
        product_data: {
          name: product.product.title || "Unnamed Product",
          images: product.product.images.asset.url && typeof product.product.images.asset.url === "string" ? [product.product.images.asset.url] : [],
        },
      },
      quantity: product.quantity > 0 ? product.quantity : 1,
    }));

    // Add shipping rate as a line item
    const shippingLineItem = {
      price_data: {
        currency: "usd",
        unit_amount: Math.round(Number(selectedShippingRate.shippingAmount.amount) * 100), // Convert to cents
        product_data: {
          name: `Shipping: ${selectedShippingRate.serviceType}`,
          description: `Estimated delivery: ${selectedShippingRate.estimatedDeliveryDate?.slice(0, 10) || '-'}`,
        },
      },
      quantity: 1,
    };

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [...productLineItems, shippingLineItem], // Include products and shipping
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    // Save order details to Sanity (if needed)
     const order = {
      _type: "order",
      userId: userId,
      orderId: session.id,
      products: products.map((product: any) => ({
        product: {
          _type: "reference",
          _ref: product.product._id, // Reference the product document
        },
        quantity: product.quantity,
        price: product.price,
      })),
      shippingDetails: shippingDetails,
      shippingRate: selectedShippingRate,
      paymentDetails: {
        paymentMethod: "card",
        amount: session.amount_total ? session.amount_total / 100 : 0,
        transactionId: session.payment_intent as string,
      },
    };

     await sanityClient.create(order);
    
      
      

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
  }
}