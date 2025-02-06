'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CheckoutButton from '../components/CheckoutButton/CheckoutButton';
import { toast } from 'react-toastify';

interface RateProp{
        rateId:string;
    shippingAmount:{
        amount:number;
    };
    serviceType:string;
    estimatedDeliveryDate:string;
}

// const countryCityMap: Record<string, Record<string, string>> = {
//     US: {
//         "New York": "NY",
//         "Los Angeles": "LA",
//         "Chicago": "CH",
//         "Houston": "HU",
//         "Phoenix": "PH",
//     },
//     CA: {
//         "Toronto": "TO",
//         "Vancouver": "VA",
//         "Montreal": "MO",
//         "Calgary": "CA",
//         "Ottawa": "OT",
//     },
//     UK: {
//         "London": "LN",
//         "Manchester": "MA",
//         "Birmingham": "BI",
//         "Liverpool": "LI",
//         "Glasgow": "GL",
//     },
//     IN: {
//         "Mumbai": "MU",
//         "Delhi": "DE",
//         "Bangalore": "BA",
//         "Hyderabad": "HY",
//         "Chennai": "CH",
//     },
//     AU: {
//         "Sydney": "SY",
//         "Melbourne": "ME",
//         "Brisbane": "BR",
//         "Perth": "PE",
//         "Adelaide": "AD",
//     },
// };
const pakistanCities: Record<string, string> = {
    "Karachi": "Sindh",
    "Lahore": "Punjab",
    "Islamabad": "Islamabad Capital Territory",
    "Rawalpindi": "Punjab",
    "Faisalabad": "Punjab",
    "Multan": "Punjab",
    "Peshawar": "Khyber Pakhtunkhwa",
    "Quetta": "Balochistan",
    "Hyderabad": "Sindh",
    "Gujranwala": "Punjab",
};

const Checkout = ({user,order,onSuccess}:{user:any,order:any,onSuccess: () => void;}) => {
    console.log(order,'order')

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state:"",
        country: "",
        postal: "",
    });

    const [rates, setRates] = useState<RateProp[]>([]);
    const [selectedRate, setSelectedRate] = useState('');
    const [cities, setCities] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "city") {
            // Update the city and state based on the selected city
            setFormData((prevData) => ({
                ...prevData,
                city: value, // Full city name (e.g., "Karachi")
                state: pakistanCities[value], // State code (e.g., "Sindh")
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const shipmentForm = async (formData) => {
            try {
                const response = await axios.post("/api/shipment", {
                    ...formData,
                    userId: "USER_ID", // Replace with actual user ID
                    orderId: "ORDER_ID", // Replace with actual order ID
                });
    
            } catch (error) {
                console.error("Error saving shipment:", error);
                toast.error("Failed to save shipment. Please try again.");
            }
        }
        shipmentForm(formData);
    }

    const fetchRates = async () => {
        try {
            const response = await axios.post("/api/get-rates", {
                shipToAddress: {
                    name: formData.name,
                    phone: formData.phone,
                    addressLine1: formData.address,
                    cityLocality: formData.city,
                    stateProvince: formData.state, // Assuming city and state are the same for simplicity
                    postalCode: formData.postal,
                    countryCode: formData.country,
                    addressResidentialIndicator: "no",
                },
                packages: [
                    { weight: { value: 5, unit: "ounce" }, dimensions: { height: 3, width: 15, length: 10, unit: "inch" } },
                ],
            });

            setRates(response.data.rates);      
        } catch (error) {
            console.error("Error fetching rates:", error);
            toast.error("Failed to fetch rates. Please check your details and try again.");
        }
    }
    const createLabel = async (rateId) => {
        try {
            const response = await axios.post("/api/shipment/create-label", {
                rateId: rateId,
                shipmentDetails: {
                    name: formData.name,
                    phone: formData.phone,
                    addressLine1: formData.address,
                    cityLocality: formData.city,
                    stateProvince: formData.city, // Assuming city and state are the same for simplicity
                    postalCode: formData.postal,
                    countryCode: formData.country,
                    addressResidentialIndicator: "no",
                },
                packages: [
                    { weight: { value: 5, unit: "ounce" }, dimensions: { height: 3, width: 15, length: 10, unit: "inch" } },
                ],
            });

            console.log("Label created:", response.data);
            toast.success("Label created successfully!");
        } catch (error) {
            console.error("Error creating label:", error);
            toast.error("Failed to create label. Please try again.");
        }
    }
   

    return (
        <section className="bg-white antialiased dark:bg-gray-900 ">
            <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0" onSubmit={handleSubmit}>
                <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Details</h2>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your name </label>
                                    <input type="text" id="name" name='name' value={formData.name} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                                </div>

                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your email* </label>
                                    <input type="email" id="email" name='email' value={formData.email} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="name@flowbite.com" required />
                                </div>

                                <div>
                                    <label htmlFor="postal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Postal Code </label>
                                    <input type="number" id="postal" name='postal' value={formData.postal} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                                </div>
                                <div>
                                    <label htmlFor="country" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Country*</label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value="Pakistan"
                                        readOnly
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                    />
                                </div>

                                {/* City Field */}
                                <div>
                                    <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">City*</label>
                                    <select
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        required
                                    >
                                        <option value="">Select a city</option>
                                        {Object.keys(pakistanCities).map((cityName) => (
                                            <option key={cityName} value={cityName}>
                                                {cityName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* State Field (Read-only, auto-filled based on city) */}
                                <div>
                                    <label htmlFor="state" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">State*</label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        readOnly
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                    />
                                </div>

                                {/* <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <label htmlFor="select-country-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> Country* </label>
                                    </div>
                                    <select id="country" name='country' onChange={handleChange} value={formData.country} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                        <option value="">Select a country</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="IN">India</option>
                                        <option value="AU">Australia</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">City*</label>
                                    <select
                                        id="city"
                                        name="city"
                                        value={formData.city} // Full city name (e.g., "Los Angeles")
                                        onChange={handleChange}
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        required
                                        disabled={!formData.country} // Disable if no country is selected
                                    >
                                        <option value="">Select a city</option>
                                        {Object.keys(cities).map((cityName) => (
                                            <option key={cityName} value={cityName}>
                                                {cityName}
                                            </option>
                                        ))}
                                    </select>
                                </div> */}

                                <div>
                                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number* </label>
                                    <div className="flex items-center">
                                        <div className="relative w-full">
                                            <input type="number" id="phone" name='phone' value={formData.phone} onChange={handleChange} className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Address </label>
                                    <input type="text" id="address" name='address' value={formData.address} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="House No. / Street No. / State" required />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Payment</h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label htmlFor="credit-card" className="font-medium leading-none text-gray-900 dark:text-white"> Credit Card </label>
                                            <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay with your credit card</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-2">
                                        <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Delete</button>

                                        <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

                                        <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Edit</button>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="pay-on-delivery" aria-describedby="pay-on-delivery-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label htmlFor="pay-on-delivery" className="font-medium leading-none text-gray-900 dark:text-white"> Payment on delivery </label>
                                            <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">+$15 payment processing fee</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-2">
                                        <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Delete</button>

                                        <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

                                        <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Edit</button>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="paypal-2" aria-describedby="paypal-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label htmlFor="paypal-2" className="font-medium leading-none text-gray-900 dark:text-white"> Paypal account </label>
                                            <p id="paypal-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Connect to your account</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-2">
                                        <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Delete</button>

                                        <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

                                        <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Shipping Rates</h3>

                            {rates.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {rates.map((rate:RateProp, index:any) => (
                                        <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                            <div className="flex items-start">
                                                <div className="flex h-5 items-center">
                                                    <input id={`rate-${index}`} aria-describedby={`rate-${index}-text`} type="radio" name="shipping-rate" value={rate.rateId} onChange={() => setSelectedRate(rate.rateId)} className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" required />
                                                </div>

                                                <div className="ms-4 text-sm">
                                                    <label htmlFor={`rate-${index}`} className="font-medium leading-none text-gray-900 dark:text-white">{rate.serviceType} - ${rate.shippingAmount.amount}</label>
                                                    <p id={`rate-${index}-text`} className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Estimated delivery: {rate.estimatedDeliveryDate?.slice(0,10)||'-'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3">
                            <button type="button" onClick={fetchRates} className="flex w-full items-center justify-center rounded-lg bg-blueCol px-5 py-2.5 text-sm montserrat-bold text-white hover:bg-blueHov disabled:bg-blue-300" disabled={!formData.name || !formData.phone || !formData.address || !formData.city || !formData.postal}>Fetch Rates</button>
                            {/* <button type="button" onClick={() => createLabel(selectedRate)} className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create Label</button>
                            <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Payment</button> */}
                        </div>
                            )}
                            <div className='w-full flex items-center justify-end py-10'>
                            <CheckoutButton
                                product={order}
                                user={user}
                                formData={formData}
                                selectedRate={selectedRate}
                                rates={rates}
                                onSuccess={onSuccess}
                            />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Checkout
// 'use client'
// import React, { useState } from 'react'
// import axios from 'axios'

// const CheckoutPage = () => {
    
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         address: "",
//         city: "",
//         country: "",
//         postal: "",
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         console.log("Form Submitted:", formData);
//         const shipmentForm = async (formData) => {
//             try {
//                 const response = await axios.post("/api/shipment", {
//                     ...formData,
//                     userId: "USER_ID", // Replace with actual user ID
//                     orderId: "ORDER_ID", // Replace with actual order ID
//                 });

//                 console.log("Shipment saved:", response.data);
//                 alert("Shipment saved successfully!");
//             } catch (error) {
//                 console.error("Error saving shipment:", error);
//                 alert("Failed to save shipment. Please try again.");
//             }
//         }
//         shipmentForm(formData);
//     }





//     const fetchRates = async () => {
//         try {
//             const response = await fetch("/api/shipment/get-rates", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     shipToAddress: {
//                         name: "Michael Smith",
//                         phone: "+1 555 987 6543",
//                         addressLine1: "456 Oak Avenue",
//                         addressLine2: "Suite 200",
//                         cityLocality: "Los Angeles",
//                         stateProvince: "CA",
//                         postalCode: "90001",
//                         countryCode: "US",
//                         addressResidentialIndicator: "no",
//                     },
//                     packages: [
//                         { weight: { value: 5, unit: "ounce" }, dimensions: { height: 3, width: 15, length: 10, unit: "inch" } },
//                     ],
//                 }),
//             });

//             const data = await response.json();
//             console.log(data, 'fetched rates');
//         } catch {
//             console.error("error fetching rating")
//         }
//     }

//     return (
//         <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
//             <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0" onSubmit={handleSubmit}>
//             <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
//                 <div className="min-w-0 flex-1 space-y-8">
//                     <div className="space-y-4">
//                         <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Details</h2>

//                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                             <div>
//                                 <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your name </label>
//                                 <input type="text" id="name" name='name' value={formData.name} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
//                             </div>

//                             <div>
//                                 <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your email* </label>
//                                 <input type="email" id="email" name='email' value={formData.email} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="name@flowbite.com" required />
//                             </div>


//                             <div>
//                                 <label htmlFor="postal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Postal Code </label>
//                                 <input type="number" id="postal" name='postal' value={formData.postal} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
//                             </div>

//                             <div>
//                                 <div className="mb-2 flex items-center gap-2">
//                                     <label htmlFor="select-country-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> Country* </label>
//                                 </div>
//                                 <select id="country" name='country' onChange={handleChange} value={formData.country} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
//                                     <option selected>United States</option>
//                                     <option value="AS">Australia</option>
//                                     <option value="FR">France</option>
//                                     <option value="ES">Spain</option>
//                                     <option value="UK">United Kingdom</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <div className="mb-2 flex items-center gap-2">
//                                     <label htmlFor="city" className="block text-sm font-medium text-gray-900 dark:text-white"> City* </label>
//                                 </div>
//                                 <select id="city" name='city' onChange={handleChange} value={formData.city} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
//                                     <option selected>San Francisco</option>
//                                     <option value="NY">New York</option>
//                                     <option value="LA">Los Angeles</option>
//                                     <option value="CH">Chicago</option>
//                                     <option value="HU">Houston</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number* </label>
//                                 <div className="flex items-center">

//                                     <div className="relative w-full">
//                                         <input type="number" id="phone" name='phone' value={formData.phone} onChange={handleChange} className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" />
//                                     </div>
//                                 </div>
//                             </div>

//                             <div>
//                                 <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Address </label>
//                                 <input type="text" id="address" name='address' value={formData.address} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="House No. / Street No. / State" required />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="space-y-4">
//                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Payment</h3>

//                         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                             <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
//                                 <div className="flex items-start">
//                                     <div className="flex h-5 items-center">
//                                         <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked />
//                                     </div>

//                                     <div className="ms-4 text-sm">
//                                         <label htmlFor="credit-card" className="font-medium leading-none text-gray-900 dark:text-white"> Credit Card </label>
//                                         <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay with your credit card</p>
//                                     </div>
//                                 </div>

//                                 <div className="mt-4 flex items-center gap-2">
//                                     <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Delete</button>

//                                     <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

//                                     <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Edit</button>
//                                 </div>
//                             </div>

//                             <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
//                                 <div className="flex items-start">
//                                     <div className="flex h-5 items-center">
//                                         <input id="pay-on-delivery" aria-describedby="pay-on-delivery-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
//                                     </div>

//                                     <div className="ms-4 text-sm">
//                                         <label htmlFor="pay-on-delivery" className="font-medium leading-none text-gray-900 dark:text-white"> Payment on delivery </label>
//                                         <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">+$15 payment processing fee</p>
//                                     </div>
//                                 </div>

//                                 <div className="mt-4 flex items-center gap-2">
//                                     <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Delete</button>

//                                     <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

//                                     <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Edit</button>
//                                 </div>
//                             </div>

//                             <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
//                                 <div className="flex items-start">
//                                     <div className="flex h-5 items-center">
//                                         <input id="paypal-2" aria-describedby="paypal-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
//                                     </div>

//                                     <div className="ms-4 text-sm">
//                                         <label htmlFor="paypal-2" className="font-medium leading-none text-gray-900 dark:text-white"> Paypal account </label>
//                                         <p id="paypal-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Connect to your account</p>
//                                     </div>
//                                 </div>

//                                 <div className="mt-4 flex items-center gap-2">
//                                     <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Delete</button>

//                                     <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

//                                     <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Edit</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="space-y-4">
//                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Methods</h3>

//                         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                             <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
//                                 <div className="flex items-start">
//                                     <div className="flex h-5 items-center">
//                                         <input id="dhl" aria-describedby="dhl-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked />
//                                     </div>

//                                     <div className="ms-4 text-sm">
//                                         <label htmlFor="dhl" className="font-medium leading-none text-gray-900 dark:text-white"> $15 - DHL Fast Delivery </label>
//                                         <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it by Tommorow</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
//                                 <div className="flex items-start">
//                                     <div className="flex h-5 items-center">
//                                         <input id="fedex" aria-describedby="fedex-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
//                                     </div>

//                                     <div className="ms-4 text-sm">
//                                         <label htmlFor="fedex" className="font-medium leading-none text-gray-900 dark:text-white"> Free Delivery - FedEx </label>
//                                         <p id="fedex-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it by Friday, 13 Dec 2023</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
//                                 <div className="flex items-start">
//                                     <div className="flex h-5 items-center">
//                                         <input id="express" aria-describedby="express-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
//                                     </div>

//                                     <div className="ms-4 text-sm">
//                                         <label htmlFor="express" className="font-medium leading-none text-gray-900 dark:text-white"> $49 - Express Delivery </label>
//                                         <p id="express-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it today</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="space-y-3">
//                         <button onClick={() => fetchRates()} className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">fetch rates</button>
//                         <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Payment</button>


//                     </div>

//                 </div>

//             </div>
//         </form>
            
//         </section>
//     )
// }

// export default CheckoutPage
