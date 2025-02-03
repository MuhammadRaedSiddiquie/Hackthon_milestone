import { NextApiRequest, NextApiResponse } from 'next';

// Mock database (replace with your actual database logic)
const shipments: any[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { userId, orderId, ...shipmentDetails } = req.body;

        // Save shipment details to the database
        const shipment = {
            id: shipments.length + 1,
            userId,
            orderId,
            ...shipmentDetails,
            createdAt: new Date().toISOString(),
        };
        shipments.push(shipment);

        res.status(200).json({ message: 'Shipment saved successfully', shipment });
    } catch (error) {
        console.error('Error saving shipment:', error);
        res.status(500).json({ message: 'Failed to save shipment', error: error.message });
    }
}