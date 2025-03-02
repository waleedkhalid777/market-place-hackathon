import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ConditionalSideBar from "@/components/Sidebar/conditionalSidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ecommerce Website",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        <div className="flex h-screen w-full">
          {/* Sidebar (Left Side) */}
          <ConditionalSideBar>{children}</ConditionalSideBar>

          {/* Main Content (Right Side) */}
          <div className="flex-1 flex flex-col h-screen overflow-auto">
            
            <main className="flex-1 p-6">{children}</main>
            
          </div>
        </div>

      </body>
    </html>
  );
}
