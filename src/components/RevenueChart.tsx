"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// ✅ Corrected Type Definition
interface RevenueItem {
  date: string;
  data: {
    totalRevenue: number;
  };
}

// Define Props Interface
interface RevenueChartProps {
  items: RevenueItem[];
}

export default function RevenueChart({ items }: RevenueChartProps) {
  const data = {
    labels: items?.map((item) => item.date),
    datasets: [
      {
        label: "Revenue",
        data: items?.map((item) => item.data?.totalRevenue ?? 0), // ✅ No more errors!
        backgroundColor: "#879fff20",
        borderColor: "#879fff80",
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12, // Adjust legend box size
          padding: 15, // Space between legend and chart
        },
      },
      title: {
        display: true,
        text: "Revenue Line Chart",
        font: {
          size: 18,
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
          autoSkip: true,
          maxRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`, // Format Y-axis as currency
        },
      },
    },
  };

  return (
    <section className="bg-yellow-400 p-5 rounded-xl shadow-lg w-full h-[430px] sm:h-[500px] lg:h-[550px] max-w-full mx-auto">
      <Line data={data} options={options} />
    </section>
  );
}
