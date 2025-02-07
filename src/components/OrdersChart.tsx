"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define TypeScript type for `items`
interface OrderItem {
  date: string;
  totalOrders: number;
}

export default function OrdersChart({ items }: { items: OrderItem[] }) {
  const data = {
    labels: items.map((item) => item.date), // ✅ Ensures labels are correctly mapped
    datasets: [
      {
        label: "Orders",
        data: items.map((item) => item.totalOrders || 0), // ✅ Handles potential undefined values
        backgroundColor: "rgba(0, 168, 255, 0.4)", // Light blue color
        borderColor: "rgba(0, 168, 255, 1)", // Darker blue color
        borderWidth: 2,
        barThickness: 40, // Slightly thicker bars
        borderRadius: 8, // Rounded bar corners
        hoverBackgroundColor: "rgba(0, 168, 255, 0.6)", // Hover effect
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "Arial, sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: "Total Orders Overview",
        font: {
          size: 20,
          family: "Arial, sans-serif",
          weight: "bold",
        },
        color: "#333",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "Arial, sans-serif",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0,0,0,0.1)",
        },
        ticks: {
          font: {
            size: 12,
            family: "Arial, sans-serif",
          },
        },
      },
    },
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-cyan-400 p-6 rounded-2xl shadow-lg w-full h-[450px]">
      <Bar data={data} options={options} />
    </section>
  );
}
