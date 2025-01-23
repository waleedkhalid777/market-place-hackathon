"use client"
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaCcVisa, FaPaypal } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null); 
  const [paymentSuccessful, setPaymentSuccessful] = useState(false); 

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

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccessful(true);
      setLoading(false);
    }, 2000);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = Object.values(formData).every((value) => value.trim() !== "");
    if (!isFormValid) {
      setError("Please fill in all the fields.");
      return;
    }

    setOrderPlaced(true);
    localStorage.removeItem("cart");
    setCartItems([]);
    setFormData({
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

    setTimeout(() => {
      setOrderPlaced(false);
    }, 3000);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-blue-500 font-semibold text-lg">Processing your payment...</p>
      </div>
    );

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
          <div className='flex'>
            <h2 className="text-xl font-bold text-black">Home </h2><MdKeyboardArrowRight className='text-2xl text-black text-center' /> <h2 className='text-xl font-bold text-black'>checkout</h2>
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
              ) : "Place Order"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            {cartItems.map((item) => (
              <div key={item.id || item.title} className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">x {item.quantity}</p>
                  </div>
                </div>
                <p>Rs. {(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>Rs. {calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>Rs. {calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!paymentSuccessful && (
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
                <FaCcVisa size={24} className="text-blue-500" />
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
                <FaPaypal size={24} className="text-blue-500" />
                <span>PayPal</span>
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 w-full py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Complete Payment
            </button>
          </form>
        </div>
      )}

      {paymentSuccessful && !orderPlaced && (
        <div className="mt-6 text-center text-green-600">
          <p>Payment successful! Now you can place your order.</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
