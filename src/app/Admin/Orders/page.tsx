"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface Order {
  _id: string;
  total: number;
  paymentMethod: string;
  customerName: string;
  customerEmail: string;
  products: { productTitle: string; price: number; quantity: number }[];
}

export default function ListView() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pageLimit, setPageLimit] = useState(10);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const query = `*[_type == "order"]{
          _id,
          total,
          paymentMethod,
          "customerName": customer->name,
          "customerEmail": customer->email,
          products[] {
            productTitle,
            price,
            quantity
          }
        } | order(_createdAt desc) [0...$pageLimit]`;

        const data: Order[] = await client.fetch(query, { pageLimit });
        setOrders(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [pageLimit]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-5 text-left">SN</th>
              <th className="py-3 px-5 text-left">Customer</th>
              <th className="py-3 px-5 text-left">Total Price</th>
              <th className="py-3 px-5 text-left">Payment Mode</th>
              <th className="py-3 px-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item, index) => (
              <Row key={item._id} index={index + 1} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-sm py-3">
        <label className="text-gray-700 font-medium">Items per page:</label>
        <select
          value={pageLimit}
          onChange={(e) => setPageLimit(Number(e.target.value))}
          className="px-4 py-2 border rounded-md bg-white shadow-md"
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={100}>100</option>
        </select>
      </div>
    </main>
  );
}

function Row({ item, index }: { item: Order; index: number }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100 transition">
      <td className="py-3 px-5 text-center font-medium text-gray-700">{index}</td>
      <td className="py-3 px-5">
        <div>
          <h1 className="font-semibold text-gray-800">{item.customerName}</h1>
          <h1 className="text-sm text-gray-600">{item.customerEmail}</h1>
        </div>
      </td>
      <td className="py-3 px-5 font-medium text-gray-900">&#163;{item.total}</td>
      <td className="py-3 px-5">
        <span className="bg-green-200 text-green-700 text-xs font-semibold px-3 py-1 rounded-md uppercase">
          {item.paymentMethod}
        </span>
      </td>
      <td className="py-3 px-5 text-center">
        <Link href={`/Admin/Orders/${item._id}`}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md shadow-md transition">
            View
          </button>
        </Link>
      </td>
    </tr>
  );
}
