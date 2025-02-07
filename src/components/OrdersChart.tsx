"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";

// Dynamically import Bar chart to prevent SSR issues
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), { ssr: false });

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define TypeScript type for `items`
interface OrderItem {
  date: string;
  totalOrders: number;
}

export default function OrdersChart({ items }: { items: OrderItem[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="text-center p-6">Loading chart...</div>;

  const data: ChartData<"bar"> = {
    labels: items.map((item) => item.date),
    datasets: [
      {
        label: "Orders",
        data: items.map((item) => item.totalOrders || 0),
        backgroundColor: "rgba(0, 168, 255, 0.4)",
        borderColor: "rgba(0, 168, 255, 1)",
        borderWidth: 2,
        barThickness: 40,
        borderRadius: 8,
        hoverBackgroundColor: "rgba(0, 168, 255, 0.6)",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Orders Overview",
        font: {
          size: 20,
          weight: "bold",
        },
        color: "#333",
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0,0,0,0.1)" },
        ticks: { font: { size: 12 } },
      },
    },
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-cyan-400 p-6 rounded-2xl shadow-lg w-full h-[450px]">
      <Bar data={data} options={options} />
    </section>
  );
}
