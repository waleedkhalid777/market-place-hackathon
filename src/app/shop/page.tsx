"use client"
import React, { useEffect, useState } from "react";
import Client from "@/sanity/lib/sanityclient";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";


type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  discountPercentage?: number; 
};


type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  discountPercentage?: number; 
};

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"] {
          _id,
          title,
          description,
          "image": productImage.asset->url,
          price,
          discountPercentage
        }`;
        const data = await Client.fetch(query);
        setProducts(
          data.map((product: any) => ({
            ...product,
            id: product._id, 
          }))
        );
      } catch (error) {
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove item from cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  
  const truncateDescription = (description: string, maxLength: number = 100) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-80 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/shop.jpg" 
            alt="Shop Hero Background"
            layout="fill"
            objectFit="cover"
            priority={true}
            className="z-0 blur-[3px]" 
          />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-black">Shop</h1>
          <div className="flex justify-center mt-2">
            <h2 className="text-xl font-bold text-black">Home</h2>
            <MdKeyboardArrowRight className="text-2xl text-black mx-2" />
            <h2 className="text-xl font-bold text-black">Shop</h2>
          </div>
        </div>
      </div>

      {/* Product Listing Section */}
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-black font-poppins text-2xl text-center py-10">
          All Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const discountedPrice = product.discountPercentage
              ? product.price - (product.price * (product.discountPercentage / 100))
              : product.price;
              
            return (
              <div key={product.id} className="relative text-center group max-w-full">
                <div className="w-full h-72 overflow-hidden bg-gray-100 relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300">
                    <button
                      onClick={() => addToCart(product)}
                      className="text-red-600 font-bold px-4 py-2 bg-white hover:bg-gray-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="bg-gray-200 w-full text-left p-4">
                  <h3 className="text-lg text-gray-800 font-bold">{product.title}</h3>
                  <p className="text-sm text-gray-600">{truncateDescription(product.description)}</p>
                  <div className="flex items-center justify-between">
                    {product.discountPercentage && (
                      <span className="text-sm text-red-500 line-through">
                        Rp {product.price.toLocaleString()}
                      </span>
                    )}
                    <h3 className="text-lg font-medium text-red-600">
                      Rp {discountedPrice.toLocaleString()}
                    </h3>
                  </div>
                  <Link href={`/product/${product.id}`} passHref>
                    <button className="mt-4 text-blue-600 hover:text-blue-800">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
                  {cart.map((item) => {
                    const discountedPrice = item.discountPercentage
                      ? item.price - (item.price * (item.discountPercentage / 100))
                      : item.price;

                    return (
                      <tr key={item.id}>
                        <td className="border border-gray-200 p-4 flex items-center gap-4">
                          <img
                            src={item.image || "placeholder-image-url"}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <span>{item.title}</span>
                        </td>
                        <td className="border border-gray-200 p-4 text-right">
                          Rp {discountedPrice.toLocaleString()}
                        </td>
                        <td className="border border-gray-200 p-4 text-center">{item.quantity}</td>
                        <td className="border border-gray-200 p-4 text-right">
                          Rp {(discountedPrice * item.quantity).toLocaleString()}
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
                    );
                  })}
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
                      (total, item) => total + (item.discountPercentage
                        ? item.price - (item.price * (item.discountPercentage / 100))
                        : item.price) * (item.quantity || 1),
                      0
                    )
                    .toLocaleString()}
                </span>
              </div>
              <Link href="/checkout">
                <button
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-gray-600">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
