
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Parse the incoming JSON body
        const body = await req.json();
        const { name, address, city, postal, country, phone, userId, orderId } = body;
console.log(name,
    address,
    city,
    postal,
    country,
    phone,
    userId,
    orderId,)
        if (!name || !address || !city || !postal || !country || !phone || !userId || !orderId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Here you would typically call your database or shipping service API
        // Simulate shipment creation
        const shipment = {
            id: `SHIP_${Date.now()}`,
            name,
            address,
            city,
            postal,
            country,
            phone,
            userId,
            orderId,
            createdAt: new Date().toISOString(),
        };

        // Respond with the created shipment
        return NextResponse.json({ success: true, shipment }, { status: 201 });
    } catch (error) {
        console.error("Error creating shipment:", error);
        return NextResponse.json(
            { error: "Failed to create shipment" },
            { status: 500 }
        );
    }
}
