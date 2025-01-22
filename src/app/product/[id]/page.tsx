// src/app/product/[id]/page.tsx
import React from "react";
import Client from "@/sanity/lib/sanityclient";
import Image from "next/image";

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

async function fetchProduct(id: string): Promise<Product | null> {
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
      }[0]`,
      { id }
    );

    return data ? { id, ...data } : null;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const product = await fetchProduct(params.id);

  if (!product) {
    return <p className="text-center mt-20">Product not found.</p>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="w-full max-w-sm h-auto object-cover rounded-md shadow-md"
              unoptimized
            />
          ) : (
            <Image
              src="/images/placeholder.png"
              alt="Placeholder"
              width={400}
              height={400}
              className="w-full max-w-sm h-auto object-cover rounded-md shadow-md"
            />
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">{product.title}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <p className="mt-4 text-xl font-bold text-green-600">Rp {product.price.toLocaleString()}</p>

          {/* Badges */}
          {product.isNew && (
            <span className="inline-block mt-2 px-4 py-1 text-sm text-white bg-blue-500 rounded-full">
              New Arrival
            </span>
          )}
          {product.discountPercentage && (
            <span className="inline-block mt-2 ml-4 px-4 py-1 text-sm text-white bg-red-500 rounded-full">
              {product.discountPercentage}% Off
            </span>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block text-sm text-white bg-gray-800 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
