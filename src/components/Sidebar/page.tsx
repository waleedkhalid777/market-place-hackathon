"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  FiHome,
  FiPackage,
  FiLayers,
  FiShoppingBag,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";

// Define the type for menu items
interface MenuItem {
  name: string;
  link: string;
  icon: React.ReactNode;
  isLogout?: boolean;
}

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuList: MenuItem[] = [
    { name: "Dashboard", link: "/Admin", icon: <FiHome className="icon" /> },
    { name: "Products", link: "/Admin/Products", icon: <FiPackage className="icon" /> },
    { name: "Categories", link: "/Admin/Categories", icon: <FiLayers className="icon" /> },
    { name: "Orders", link: "/Admin/Orders", icon: <FiShoppingBag className="icon" /> },
    { name: "Customers", link: "/Admin/Customers", icon: <FiUsers className="icon" /> },
    { name: "Logout", link: "", icon: <FiLogOut className="icon" />, isLogout: true },
  ];

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      router.replace("/login");
      window.location.reload(); // Force refresh after logout
    }
  };

  return (
    <aside className="w-64 md:w-72 h-screen bg-gradient-to-b from-[#2A254B] to-[#1A1936] text-white flex flex-col p-5 shadow-xl transition-all">
      <div className="flex justify-center py-4">
        <Link href="/">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo" className="w-12 h-12" />
            <h1 className="font-extrabold text-3xl md:text-4xl">Furniro</h1>
          </div>
        </Link>
      </div>
      <ul className="flex-1 space-y-4">
        {menuList.map((item, key) => (
          <Tab key={key} item={item} handleLogout={handleLogout} />
        ))}
      </ul>
    </aside>
  );
}

// Tab component
function Tab({ item, handleLogout }: { item: MenuItem; handleLogout: () => void }) {
  const pathname = usePathname();
  const isSelected = pathname === item.link;

  if (item.isLogout) {
    return (
      <button
        onClick={handleLogout}
        className="flex gap-2 items-center px-6 py-3 w-full text-left text-white hover:bg-[#3b3561] rounded-md transition-all"
        aria-label="Logout"
      >
        {item.icon} {item.name}
      </button>
    );
  }

  return (
    <Link href={item.link}>
      <li
        className={`flex items-center gap-3 px-6 py-3 rounded-md font-medium transition-all cursor-pointer ${
          isSelected ? "bg-white text-[#2A254B]" : "hover:bg-[#3b3561]"
        }`}
        aria-label={item.name}
      >
        {item.icon} {item.name}
      </li>
    </Link>
  );
}

// Tailwind animation styles
const styles = `
@keyframes colorLoop {
  0% { color: #ff7eb3; }
  25% { color: #ffbe76; }
  50% { color: #6c5ce7; }
  75% { color: #00cec9; }
  100% { color: #ff7eb3; }
}

.icon {
  animation: colorLoop 3s infinite;
  transition: color 0.3s ease-in-out;
}
`;

export const GlobalStyles = () => <style>{styles}</style>;
