"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev); // Toggle mobile menu visibility
  };

  return (
    <header className="relative flex justify-between items-center px-4 py-4 bg-white border-b shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2 text-xl font-sans font-bold text-gray-800">
        <img src="/logo.png" alt="Logo" className="w-12 h-12" />
        <span className="text-lg">Furniro</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-16 font-bold font-poppins">
        <Link href="/" className="text-gray-600 hover:text-blue-500">
          Home
        </Link>
        <Link href="/shop" className="text-gray-600 hover:text-blue-500">
          Shop
        </Link>
        <Link href="/blog" className="text-gray-600 hover:text-blue-500">
          Blog
        </Link>
        <Link href="/contact" className="text-gray-600 hover:text-blue-500">
          Contact
        </Link>
      </nav>

      {/* Icons */}
      <div className="flex space-x-6 text-lg text-gray-600 relative">
        {/* User Menu */}
        <div className="relative">
          <span
            className="cursor-pointer hover:text-gray-800 text-xl"
            onClick={toggleUserMenu}
          >
            <FiUser />
          </span>
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-30">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                  >
                    My Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                    onClick={() => {
                      localStorage.removeItem("isLoggedIn");
                      setIsLoggedIn(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <span className="cursor-pointer hover:text-gray-800 text-xl">
          <CiHeart />
        </span>
        <span className="cursor-pointer hover:text-gray-800 text-xl">
          <AiOutlineShoppingCart />
        </span>

        {!isSearchVisible && (
          <button onClick={toggleSearch} className="text-blue-500">
            <CiSearch size={24} />
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden text-2xl text-gray-600 hover:text-gray-800"
      >
        &#9776;
      </button>

      {/* Mobile Menu with Reduced Height */}
      <div
        className={`fixed top-0 right-0 h-[65vh] bg-white w-64 shadow-lg transform transition-transform duration-300 z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 text-2xl"
          onClick={toggleMobileMenu}
        >
          &times;
        </button>
        <ul className="flex flex-col mt-16 space-y-6 p-6 font-bold text-gray-600">
          <li>
            <Link
              href="/"
              className="hover:text-blue-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/shop"
              className="hover:text-blue-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="hover:text-blue-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-blue-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Search Bar */}
      {isSearchVisible && (
        <div className="absolute right-0 top-16 bg-white w-full max-w-md shadow-md p-4 border rounded-lg z-20">
          <form
            action={`/search?query=${searchQuery}`}
            method="get"
            className="flex space-x-2"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              name="query"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full"
              placeholder="Search products..."
            />
            <button type="submit" className="text-blue-500">
              <CiSearch size={24} />
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
