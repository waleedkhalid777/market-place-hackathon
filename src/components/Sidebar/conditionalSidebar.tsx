"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SideBar from "@/components/Sidebar/page";
import Header from "@/components/Headersss";

const ConditionalSideBar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Close sidebar on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Hide sidebar on Login & Home page
  if (pathname === "/Login" || pathname === "/") {
    return <div className="flex-1 min-h-screen">{children}</div>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar for large screens */}
      <aside className="hidden md:flex w-[260px] h-screen bg-white border-r shadow-lg">
        <SideBar />
      </aside>

      {/* Sidebar for mobile screens */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 md:hidden w-[260px] h-full bg-white border-r shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header toggleSidebar={() => setIsOpen(!isOpen)} />
        
        {/* Ensuring responsiveness and scrollability */}
        <main className="flex-1 p-4 overflow-auto flex justify-center items-start">
          <div className="w-full max-w-6xl px-4">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default ConditionalSideBar;
