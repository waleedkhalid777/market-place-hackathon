"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface OrderItem {
  date: string;
  totalOrders: number;
}

export default function OrdersChart({ items }: { items: OrderItem[] }) {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-cyan-400 p-6 rounded-2xl shadow-lg w-full h-[450px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={items} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis dataKey="date" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <Bar dataKey="totalOrders" fill="rgba(0, 168, 255, 0.8)" barSize={40} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
