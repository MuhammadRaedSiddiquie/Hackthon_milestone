// // File: app/api/get-rates/route.ts
// import { NextResponse } from 'next/server';
// import axios from 'axios';

// const SHIPENGINE_API_KEY = process.env.SHIPENGINE_API_KEY; // Store your ShipEngine API key in environment variables

// export async function POST(request: Request) {
//   try {
//     const { shipToAddress, packages } = await request.json();

//     // Add ship_from address (or warehouse_id) and rate_options
//     const shipFromAddress = {
//       name: "Your Warehouse Name",
//       phone: "+1 555 123 4567",
//       address_line1: "123 Warehouse St",
//       city_locality: "San Francisco",
//       state_province: "CA",
//       postal_code: "94107",
//       country_code: "US",
//       address_residential_indicator: "no",
//     };

//     const response = await axios.post(
//       'https://api.shipengine.com/v1/rates',
//       {
//         shipment: {
//           ship_from: shipFromAddress, // Required field
//           ship_to: shipToAddress, // Required field
//           packages: packages, // Required field
//         },
//         rate_options: {
//           carrier_ids: [
//             process.env.SHIPENGINE_FIRST_COURIER || "",
//             process.env.SHIPENGINE_SECOND_COURIER || "",
//             process.env.SHIPENGINE_THIRD_COURIER || "",
//             process.env.SHIPENGINE_FOURTH_COURIER || "",
//           ].filter(Boolean), // Add carrier IDs or leave empty for all carriers
//         },

//       },
//       {
//         headers: {
//           'API-Key': SHIPENGINE_API_KEY,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     return NextResponse.json({ rates: response.data.rate_response.rates }, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching rates:', error.response?.data || error.message);
//     return NextResponse.json(
//       { message: 'Failed to fetch shipping rates', error: error.response?.data || error.message },
//       { status: 500 }
//     );
//   }
// }

import { shipEngine } from "@/lib/shipEngine";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { shipToAddress, packages } = await req.json();
  
  try {
    const shipmentDetails = await shipEngine.getRatesWithShipmentDetails({
      shipment: {
        shipTo: shipToAddress,
        shipFrom: {
          name: "John Doe",
          phone: "+1 555 123 4567",
          addressLine1: "742 Evergreen Terrace",
          addressLine2: "Apt 101",
          cityLocality: "Springfield",
          stateProvince: "IL",
          postalCode: "62701",
          countryCode: "US",
          addressResidentialIndicator: "no",
        },
        packages: packages,
      },
      rateOptions: {
        carrierIds: [
          process.env.SHIPENGINE_FIRST_COURIER || "",
          process.env.SHIPENGINE_SECOND_COURIER || "",
          process.env.SHIPENGINE_THIRD_COURIER || "",
          process.env.SHIPENGINE_FOURTH_COURIER || "",
        ].filter(Boolean),
      },
    });

    return new Response(JSON.stringify({ rates: shipmentDetails.rateResponse.rates }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}