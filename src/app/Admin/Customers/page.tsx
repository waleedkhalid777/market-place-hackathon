"use client";

import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export default function ListView() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const GetCustomers = async () => {
      try {
        const query = `*[_type == "customer"]{ 
          _id,
          name,
          email,
          phone
        }`;
        const data = await client.fetch(query);
        setCustomers(data);
      } catch (error) {
        setError(error as Error);
      }
    };
    GetCustomers();
  }, []);

  if (error) return <div className="text-red-500 font-medium">{error.message}</div>;

  return (
    <main className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-5 text-left">SN</th>
              <th className="py-3 px-5 text-left">Name</th>
              <th className="py-3 px-5 text-left">Email</th>
              <th className="py-3 px-5 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((item, index) => (
              <Row index={index} item={item} key={item._id} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Row({ item, index }: { item: Customer; index: number }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100 transition">
      <td className="py-3 px-5 text-center font-medium text-gray-700">{index + 1}</td>
      <td className="py-3 px-5 font-semibold text-gray-800">{item?.name}</td>
      <td className="py-3 px-5 text-gray-700">{item?.email}</td>
      <td className="py-3 px-5 text-gray-700 text-center">{item?.phone || "N/A"}</td>
    </tr>
  );
}