// "use client"
// import { GetServerSideProps } from 'next';
// import Client from '@/sanity/lib/sanityclient';
// import React, { useState } from 'react';
// import Link from 'next/link';

// type Product = {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   price: number;
//   tags: string[];
//   discountPercentage?: number;
//   isNew: boolean;
//   quantity?: number;
// };

// type SearchPageProps = {
//   products: Product[];
//   query: string;
// };

// const SearchPage = ({ products, query }: SearchPageProps) => {
//   const [cart, setCart] = useState<Product[]>([]);
//   const [notification, setNotification] = useState<string | null>(null);

//   const addToCart = (product: Product) => {
//     const updatedCart = [...cart];
//     const existingProduct = updatedCart.find((item) => item.id === product.id);
//     if (existingProduct) {
//       existingProduct.quantity = (existingProduct.quantity || 1) + 1;
//     } else {
//       updatedCart.push({ ...product, quantity: 1 });
//     }

//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     showNotification(`${product.title} added to cart successfully!`);
//   };

//   const showNotification = (message: string) => {
//     setNotification(message);
//     setTimeout(() => {
//       setNotification(null);
//     }, 3000);
//   };

//   return (
//     <div className="container mx-auto py-10 px-4 flex flex-col min-h-screen">
//       {notification && (
//         <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
//           {notification}
//         </div>
//       )}
//       <h1 className="text-black font-poppins text-2xl text-center py-10">
//         Search Results for "{query}"
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div key={product.id} className="relative text-center group max-w-full">
//               <div className="w-full h-72 overflow-hidden bg-gray-100 relative">
//                 {product.image ? (
//                   <img
//                     src={product.image}
//                     alt={product.title}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                     <span className="text-gray-500">No Image</span>
//                   </div>
//                 )}
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300">
//                   <button
//                     className="text-red-600 font-bold px-4 py-2 bg-white hover:bg-gray-200"
//                     onClick={() => addToCart(product)} // Call addToCart here
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//               <div className="bg-gray-200 w-full text-left p-4">
//                 <h3 className="text-lg text-gray-800 font-bold">{product.title}</h3>
//                 <p className="text-sm text-gray-600">
//                   {product.description.length > 100
//                     ? product.description.slice(0, 100) + '...'
//                     : product.description}
//                 </p>
//                 <h3 className="text-lg font-medium text-red-600">Rp {product.price}</h3>
//                 {product.isNew && (
//                   <span className="text-xs text-green-500 font-semibold">New Arrival</span>
//                 )}
//                 {product.discountPercentage && (
//                   <span className="text-xs text-blue-500 font-semibold">
//                     {product.discountPercentage}% Off
//                   </span>
//                 )}
//                 <Link href={`/product/${product.id}`} passHref>
//                   <button className="mt-4 text-blue-600 hover:text-blue-800">View Details</button>
//                 </Link>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const query = context.query.query || '';
//   const querySanity = `*[_type == "product" && title match "${query}*"] {
//     _id,
//     title,
//     description,
//     "image": productImage.asset->url,
//     price,
//     tags,
//     discountPercentage,
//     isNew
//   }`;

//   try {
//     const products = await Client.fetch(querySanity);

//     return {
//       props: {
//         products: products.map((product: any) => ({
//           ...product,
//           id: product._id,
//         })),
//         query,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return {
//       props: {
//         products: [],
//         query,
//       },
//     };
//   }
// };

// export default SearchPage;
