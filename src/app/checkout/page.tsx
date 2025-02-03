"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { GiScooter } from "react-icons/gi"; 
import 'animate.css';

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

type FormData = {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
};

type PaymentDetails = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  paypalEmail: string;
};

type PaymentResponse = {
  success: boolean;
  message: string;
};

type OrderResponse = {
  success: boolean;
  message: string;
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
  });
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paypalEmail: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
  const [orderMessage, setOrderMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const fakePaymentAPI = async (paymentDetails: any): Promise<PaymentResponse> => {
    try {
      const response = { success: true, message: "Payment successful!" };
      return response;
    } catch (error: unknown) {
      throw new Error("Payment processing failed.");
    }
  };

  const mockOrderAPI = async (orderDetails: FormData & { cartItems: CartItem[] }): Promise<OrderResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Order successfully placed!" });
      }, 2000);
    });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fakePaymentAPI({
        paymentMethod,
        ...paymentDetails,
      });

      if (response.success) {
        setPaymentSuccessful(true);
        setPaymentMessage(response.message);
      } else {
        setError(response.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Payment processing failed.");
      } else {
        setError("Unknown error occurred during payment.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!paymentSuccessful) {
      setError("Please complete payment before placing the order.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderResponse = await mockOrderAPI({
        ...formData,
        cartItems,
      });

      if (orderResponse.success) {
        setOrderPlaced(true);
        setOrderMessage(orderResponse.message);
      } else {
        setError(orderResponse.message);
      }
    } catch (err: unknown) {
      setError("Error placing the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-blue-500 font-semibold text-lg">Processing your payment...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="relative h-80 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/shop.jpg"
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            priority={true}
            className="z-0 blur-[3px]"
          />
        </div>
        <div className="relative z-10 text-center ">
          <h1 className="text-4xl font-bold text-black">Checkout</h1>
          <div className="flex">
            <h2 className="text-xl font-bold text-black">Home </h2>
            <MdKeyboardArrowRight className="text-2xl text-black text-center" />{" "}
            <h2 className="text-xl font-bold text-black">Checkout</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-lg font-semibold mb-6">Billing Details</h2>
          <form className="space-y-4" onSubmit={handleOrderSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="border rounded-lg p-2 w-full"
                value={formData.firstName}
                onChange={handleFormChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border rounded-lg p-2 w-full"
                value={formData.lastName}
                onChange={handleFormChange}
              />
            </div>
            <input
              type="text"
              name="company"
              placeholder="Company Name (Optional)"
              className="border rounded-lg p-2 w-full"
              value={formData.company}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country/Region"
              className="border rounded-lg p-2 w-full"
              value={formData.country}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              className="border rounded-lg p-2 w-full"
              value={formData.address}
              onChange={handleFormChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="Town/City"
                className="border rounded-lg p-2 w-full"
                value={formData.city}
                onChange={handleFormChange}
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                className="border rounded-lg p-2 w-full"
                value={formData.postalCode}
                onChange={handleFormChange}
              />
            </div>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="border rounded-lg p-2 w-full"
              value={formData.phone}
              onChange={handleFormChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="border rounded-lg p-2 w-full"
              value={formData.email}
              onChange={handleFormChange}
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="mt-6 w-full py-2 bg-black text-white rounded hover:bg-gray-800"
              disabled={!paymentSuccessful}
            >
              {orderPlaced ? (
                <span className="flex items-center justify-center">
                  <FaCheckCircle className="mr-2 text-green-500" /> Order Placed!
                </span>
              ) : (
                "Place Order"
              )}
            </button>
            {orderMessage && (
              <p className="mt-4 text-green-500 animate__animated animate__fadeIn">
                {orderMessage}
              </p>
            )}
          </form>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            {cartItems.map((item) => (
              <div key={item.id || item.title} className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Image src={item.image || "/placeholder.jpg"} alt={item.title} width={50} height={50} className="mr-4" />
                  <span>{item.title}</span>
                </div>
                <span>{item.quantity} x ${item.price}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 mt-4 pt-4 text-xl font-semibold">
              <span>Total:</span>
              <span className="ml-4">${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Section */}
      {orderPlaced && (
        <div className="relative w-full h-24 flex justify-center items-center mt-10">
          <div className="absolute left-0 animate__animated animate__fadeInRight animate__delay-2s">
            <GiScooter size={40} className="text-yellow-500" />
          </div>
          <div className="absolute right-0 animate__animated animate__fadeInLeft animate__delay-2s">
            <FaCheckCircle size={40} className="text-green-500" />
          </div>
        </div>
      )}

      {/* Payment Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-6">Payment Method</h2>
        <form onSubmit={handlePaymentSubmit}>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                value="Credit Card"
                checked={paymentMethod === "Credit Card"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <span>Credit Card</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="radio"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <span>PayPal</span>
            </label>
          </div>

          {paymentMethod === "Credit Card" && (
            <div className="space-y-4">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                className="border rounded-lg p-2 w-full"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentDetailsChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="Expiry Date (MM/YY)"
                  className="border rounded-lg p-2 w-full"
                  value={paymentDetails.expiryDate}
                  onChange={handlePaymentDetailsChange}
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  className="border rounded-lg p-2 w-full"
                  value={paymentDetails.cvv}
                  onChange={handlePaymentDetailsChange}
                />
              </div>
            </div>
          )}

          {paymentMethod === "PayPal" && (
            <div>
              <input
                type="email"
                name="paypalEmail"
                placeholder="PayPal Email"
                className="border rounded-lg p-2 w-full"
                value={paymentDetails.paypalEmail}
                onChange={handlePaymentDetailsChange}
              />
            </div>
          )}

          {error && <p className="text-red-500">{error}</p>}
          {paymentMessage && <p className="mt-4 text-green-500">{paymentMessage}</p>}

          <button type="submit" className="mt-6 w-full py-2 bg-black text-white rounded hover:bg-gray-800">
            Complete Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
