"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Client from "@/sanity/lib/sanityclient";
import Link from "next/link";


type Product = {
  id: string;
  title: string;
  description: string;
  image?: string;
  price: number;
  tags?: string[];
  discountPercentage?: number;
  isNew?: boolean;
  quantity?: number;
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || ""; 
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const fetchProducts = async () => {
      try {
        const querySanity = `*[_type == "product" && title match "${query}*"] {
          _id,
          title,
          description,
          "image": productImage.asset->url,
          price,
          tags,
          discountPercentage,
          isNew
        }`;
        const data = await Client.fetch(querySanity);
        setProducts(
          data.map((product: any) => ({
            ...product,
            id: product._id,
          }))
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again later.");
      }
    };

    if (query.trim()) fetchProducts();
    else setError("Please enter a search term.");
  }, [query]);

  const addToCart = (product: Product) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    showNotification(`${product.title} added to cart successfully!`);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    const removedProduct = cart.find((item) => item.id === productId);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    if (removedProduct) {
      showNotification(`${removedProduct.title} removed from cart!`);
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-10 px-4">
      {notification && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {notification}
        </div>
      )}
      <h1 className="text-black font-poppins text-2xl text-center py-10">
        Search Results for "{query}"
      </h1>

      {/* Cart Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2 overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 p-4 text-left">Product</th>
                    <th className="border border-gray-200 p-4 text-right">Price</th>
                    <th className="border border-gray-200 p-4 text-center">Quantity</th>
                    <th className="border border-gray-200 p-4 text-right">Subtotal</th>
                    <th className="border border-gray-200 p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-200 p-4 flex items-center gap-4">
                        <img
                          src={item.image || "placeholder-image-url"}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <span>{item.title}</span>
                      </td>
                      <td className="border border-gray-200 p-4 text-right">Rp {item.price}</td>
                      <td className="border border-gray-200 p-4 text-center">{item.quantity}</td>
                      <td className="border border-gray-200 p-4 text-right">
                        Rp {(item.price * (item.quantity || 1)).toLocaleString()}
                      </td>
                      <td className="border border-gray-200 p-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-span-1 bg-gray-50 p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Cart Totals</h3>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span>Subtotal:</span>
                <span>
                  Rp{" "}
                  {cart
                    .reduce(
                      (total, item) => total + item.price * (item.quantity || 1),
                      0
                    )
                    .toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => (window.location.href = "/checkout")}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-gray-600">Your cart is empty.</p>
        )}
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="relative text-center group max-w-full">
              <div className="w-full h-72 overflow-hidden bg-gray-100 relative">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300">
                  <button
                    className="text-red-600 font-bold px-4 py-2 bg-white hover:bg-gray-200"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="bg-gray-200 w-full text-left p-4">
                <h3 className="text-lg text-gray-800 font-bold">{product.title}</h3>
                <p className="text-sm text-gray-600">
                  {product.description.length > 100
                    ? product.description.slice(0, 100) + "..."
                    : product.description}
                </p>
                <h3 className="text-lg font-medium text-red-600">Rp {product.price}</h3>
                {product.isNew && (
                  <span className="text-xs text-green-500 font-semibold">New Arrival</span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs text-blue-500 font-semibold">
                    {product.discountPercentage}% Off
                  </span>
                )}
                <Link href={`/product/${product.id}`} passHref>
                  <button className="mt-4 text-blue-600 hover:text-blue-800">View Details</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
