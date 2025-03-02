"use client"
import React, { useEffect, useState } from 'react';
import Client from '@/sanity/lib/sanityclient';
import { useParams } from 'next/navigation';

type Product = {
  id: string;
  title: string;
  description: string;
  image?: string;
  price: number;
  tags?: string[];
  discountPercentage?: number;
  isNew?: boolean;
};

type CartItem = Product & {
  quantity: number;
  subtotal: number;
};

const fetchProductData = async (id: string) => {
  try {
    const data = await Client.fetch(
      `*[_type == "product" && _id == $id] {
        _id,
        title,
        description,
        "image": productImage.asset->url,
        price,
        tags,
        discountPercentage,
        isNew
      }`,
      { id }
    );

    if (data.length === 0) {
      return null;
    }
    return data[0];
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
  }
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartMessage, setCartMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof id === 'string') {
      fetchProductData(id).then(setProduct);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      updatedCart[existingProductIndex].subtotal = updatedCart[existingProductIndex].quantity * product.price;
      setCart(updatedCart);
    } else {
      const newCartItem: CartItem = {
        ...product,
        quantity: 1,
        subtotal: product.price,
      };
      setCart((prevCart) => [...prevCart, newCartItem]);
    }

    setCartMessage(`${product.title} has been added to the cart.`);
    setTimeout(() => setCartMessage(null), 3000);
  };

  const handleRemoveFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const handleIncreaseQuantity = (id: string) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      updatedCart[itemIndex].quantity += 1;
      updatedCart[itemIndex].subtotal = updatedCart[itemIndex].quantity * updatedCart[itemIndex].price;
      setCart(updatedCart);
    }
  };

  const handleDecreaseQuantity = (id: string) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.id === id);
    if (itemIndex !== -1 && updatedCart[itemIndex].quantity > 1) {
      updatedCart[itemIndex].quantity -= 1;
      updatedCart[itemIndex].subtotal = updatedCart[itemIndex].quantity * updatedCart[itemIndex].price;
      setCart(updatedCart);
    }
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + item.subtotal, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Store cart data in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to the checkout page
    window.location.href = "/checkout";
  };

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Images */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="w-full max-w-sm">
            <img
              src={product.image || '/placeholder-image-url'}
              alt={product.title}
              className="w-full h-auto object-cover rounded-md shadow-md"
            />
          </div>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map((_, idx) => (
              <img
                key={idx}
                src={product.image || '/placeholder-image-url'}
                alt={`Thumbnail ${idx}`}
                className="w-16 h-16 object-cover rounded-md border border-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <div className="mt-4">
            <p className="text-3xl font-bold text-green-600">Rp {product.price}</p>
          </div>

          <div className="mt-4 flex items-center gap-4">
            {product.isNew && (
              <span className="px-4 py-1 text-sm text-white bg-blue-500 rounded-full">
                New Arrival
              </span>
            )}
            {product.discountPercentage && (
              <span className="px-4 py-1 text-sm text-white bg-red-500 rounded-full">
                {product.discountPercentage}% Off
              </span>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700">Size:</h3>
            <div className="flex gap-2 mt-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700">Color:</h3>
            <div className="flex gap-2 mt-2">
              {["#000", "#FFF", "#FFD700", "#8B4513"].map((color) => (
                <span
                  key={color}
                  className="w-8 h-8 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Add To Cart
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-100">
              Compare
            </button>
          </div>

          {cartMessage && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
              {cartMessage}
            </div>
          )}

          <div className="mt-10">
            <p className="text-sm text-gray-500">SKU: SS001</p>
            <p className="text-sm text-gray-500">Category: Sofas</p>
            <p className="text-sm text-gray-500">
              Tags: {product.tags?.join(", ") || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Your Cart</h2>
        <div className="mt-4">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              <ul>
                {cart.map((item, index) => (
                  <li key={index} className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image || '/placeholder-image-url'}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-bold">{item.title}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold">Rp {item.subtotal}</p>
                      <button onClick={() => handleIncreaseQuantity(item.id)} className="px-2 py-1 bg-gray-200 rounded-md">+</button>
                      <button onClick={() => handleDecreaseQuantity(item.id)} className="px-2 py-1 bg-gray-200 rounded-md">-</button>
                      <button onClick={() => handleRemoveFromCart(item.id)} className="px-2 py-1 bg-red-500 text-white rounded-md">
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between">
                <p className="text-lg font-semibold">Cart Total: Rp {calculateCartTotal()}</p>
                <button onClick={handleCheckout} className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
