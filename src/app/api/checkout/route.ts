import { sanityClient } from "@/lib/sanity.client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { products , userId, shippingDetails} = await req.json();
    

    console.log("Received products:", products); // Debugging log
    console.log("Received user:", userId);
    console.log("Received form:", shippingDetails);
    if (!products || !Array.isArray(products)) {
      return NextResponse.json({ error: "Invalid products format" }, { status: 400 });
    }


    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: products.map((product) => {
        console.log("Processing product:", product.product.images.asset.url,typeof(product.product.images.asset.url)); // Debugging log

        return {
          price_data: {
            currency: "usd", // Ensure it's a valid currency code
            unit_amount: Math.round(Number(product.price) * 100), // Convert to cents
            product_data: {
              name: product.product.title || "Unnamed Product", // Ensure name is valid
              images: product.product.images.asset.url && typeof product.product.images.asset.url=== "string" ? [product.product.images.asset.url] : [], // Ensure image is a valid URL
            },
          },
          quantity: product.quantity > 0 ? product.quantity : 1, // Prevent invalid quantity
        };
      }),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });
    const order = {
      _type: 'order',
      userId: userId,
      orderId: session.id,
      products: products.map(product => ({
        productId: product.product.id,
        quantity: product.quantity,
        price: product.price,
      })),
      shippingDetails: shippingDetails,
      paymentDetails: {
        paymentMethod: 'card',
        amount: session.amount_total ? session.amount_total / 100 : 0,
        transactionId: session.payment_intent as string,
      },
    };

    await sanityClient.create(order);


    console.log("Stripe session created:", session.url); // Debugging log

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
