"use client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiHeart, CiSearch } from "react-icons/ci";
import { FiUser, FiMenu, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth"; // Importing Firebase auth and signOut
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqbH2kKYUommsLaWdIxPvM5qjulunp_3w",
  authDomain: "ecommerce-website-45ad0.firebaseapp.com",
  projectId: "ecommerce-website-45ad0",
  storageBucket: "ecommerce-website-45ad0.appspot.com",
  messagingSenderId: "112491678765",
  appId: "1:112491678765:web:1dfa731562c2450fb83ca4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query state
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Search bar visibility
  const [suggestions, setSuggestions] = useState<string[]>([]); // Search suggestions state
  const [user, setUser] = useState<any>(null); // Track user state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown menu state

  useEffect(() => {
    // Set up Firebase authentication state listener
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    
    const allProducts = ["Sofa", "Dining Table", "Coffee Table", "Chair", "Bookshelf", "Lamp", "Cushion", "Bed", "Wardrobe", "Dresser"];
    setSuggestions(allProducts.filter((product) => product.toLowerCase().includes(query.toLowerCase())));
  };

  const toggleSearch = () => setIsSearchVisible((prev) => !prev);
  const toggleMobileMenu = () => setIsMenuOpen((prev) => !prev); // Toggle mobile menu visibility

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/signin"; // Redirect to sign-in page after logout
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred while logging out.");
    }
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
        <Link href="/" className="text-gray-600 hover:text-blue-500">Home</Link>
        <Link href="/shop" className="text-gray-600 hover:text-blue-500">Shop</Link>
        <Link href="/blog" className="text-gray-600 hover:text-blue-500">Blog</Link>
        <Link href="/contact" className="text-gray-600 hover:text-blue-500">Contact</Link>
      </nav>

      {/* Desktop Actions */}
      <div className="flex space-x-6 text-lg text-gray-600 relative">
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen((prev) => !prev)} 
              className="cursor-pointer hover:text-gray-800 text-xl"
            >
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt={user.displayName}
                className="w-8 h-8 rounded-full"
              />
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50">
                <Link href="/profile" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  <FiLogOut size={18} className="mr-2 inline" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/signin" className="cursor-pointer hover:text-gray-800 text-xl">
            <FiUser />
          </Link>
        )}
        <span className="cursor-pointer hover:text-gray-800 text-xl"><CiHeart /></span>
        <span className="cursor-pointer hover:text-gray-800 text-xl"><AiOutlineShoppingCart /></span>
        <button onClick={toggleSearch} className="text-black"><CiSearch size={24} /></button>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-gray-600" onClick={toggleMobileMenu}>
        <FiMenu size={24} />
      </button>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`absolute top-16 left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out z-50 ${isMenuOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"}`}
      >
        <nav className="flex flex-col space-y-4 py-4">
          <Link href="/" className="text-gray-600 hover:text-blue-500 px-4">Home</Link>
          <Link href="/shop" className="text-gray-600 hover:text-blue-500 px-4">Shop</Link>
          <Link href="/blog" className="text-gray-600 hover:text-blue-500 px-4">Blog</Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-500 px-4">Contact</Link>
        </nav>
      </div>

      {/* Search Bar */}
      {isSearchVisible && (
        <div className="absolute right-0 top-16 bg-white w-full max-w-md shadow-md p-4 border rounded-lg z-20">
          <form action={`/search?query=${searchQuery}`} method="get" className="flex space-x-2">
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
          {suggestions.length > 0 && (
            <ul className="mt-2 bg-white border rounded-lg shadow-md max-h-48 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
