'use client'
import React, { useState } from 'react'
import axios from 'axios'

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        postal: "",

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        const shipmentForm = async (formData) => {
            try {
                const response = await axios.post("/api/shipment", {
                    ...formData,
                    userId: "USER_ID", // Replace with actual user ID
                    orderId: "ORDER_ID", // Replace with actual order ID
                });

                console.log("Shipment saved:", response.data);
                alert("Shipment saved successfully!");
            } catch (error) {
                console.error("Error saving shipment:", error);
                alert("Failed to save shipment. Please try again.");
            }
        }
        shipmentForm(formData);


    };
    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
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
                                    <div className="mb-2 flex items-center gap-2">
                                        <label htmlFor="select-country-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> Country* </label>
                                    </div>
                                    <select id="country" name='country' onChange={handleChange} value={formData.country} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                        <option selected>United States</option>
                                        <option value="AS">Australia</option>
                                        <option value="FR">France</option>
                                        <option value="ES">Spain</option>
                                        <option value="UK">United Kingdom</option>
                                    </select>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-900 dark:text-white"> City* </label>
                                    </div>
                                    <select id="city" name='city' onChange={handleChange} value={formData.city} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                        <option selected>San Francisco</option>
                                        <option value="NY">New York</option>
                                        <option value="LA">Los Angeles</option>
                                        <option value="CH">Chicago</option>
                                        <option value="HU">Houston</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number* </label>
                                    <div className="flex items-center">
                                        {/* <button id="dropdown-phone-button-3" data-dropdown-toggle="dropdown-phone-3" className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700" type="button">

                                            +1

                                        </button>
                                        <div id="dropdown-phone-3" className="z-10 hidden w-56 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700">
                                            <ul className="p-2 text-sm font-medium text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-phone-button-2">
                                                <li>
                                                    <button type="button" className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                                        <span className="inline-flex items-center">

                                                            United States (+1)
                                                        </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button type="button" className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                                        <span className="inline-flex items-center">

                                                            United Kingdom (+44)
                                                        </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button type="button" className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                                        <span className="inline-flex items-center">

                                                            Australia (+61)
                                                        </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button type="button" className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                                        <span className="inline-flex items-center">

                                                            Germany (+49)
                                                        </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button type="button" className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                                        <span className="inline-flex items-center">

                                                            France (+33)
                                                        </span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div> */}
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
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Methods</h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="dhl" aria-describedby="dhl-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label htmlFor="dhl" className="font-medium leading-none text-gray-900 dark:text-white"> $15 - DHL Fast Delivery </label>
                                            <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it by Tommorow</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="fedex" aria-describedby="fedex-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label htmlFor="fedex" className="font-medium leading-none text-gray-900 dark:text-white"> Free Delivery - FedEx </label>
                                            <p id="fedex-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it by Friday, 13 Dec 2023</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="express" aria-describedby="express-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label htmlFor="express" className="font-medium leading-none text-gray-900 dark:text-white"> $49 - Express Delivery </label>
                                            <p id="express-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it today</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Payment</button>


                        </div>

                    </div>

                </div>
            </form>
        </section>
    )
}

export default CheckoutPage
