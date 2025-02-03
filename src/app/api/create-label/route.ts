import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(req: Request) {
  try {
    const { rateId, shipmentDetails, userId, orderId } = await req.json();

    // Save shipping details to Sanity
    const shipping = {
      _type: 'shipping',
      userId: userId,
      orderId: orderId,
      rateId: rateId,
      shipmentDetails: shipmentDetails,
    };

    await client.create(shipping);

    return NextResponse.json({ message: 'Label created successfully!' });
  } catch (error) {
    console.error("Error creating label:", error);
    return NextResponse.json({ error: "Failed to create label. Please try again." }, { status: 500 });
  }
}