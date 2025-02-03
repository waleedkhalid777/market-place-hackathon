"use client";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { redirect } from "next/navigation";  // Using Next.js redirect

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();

    // Check for authentication state change
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          imageUrl: currentUser.photoURL,
        });
      } else {
        // Redirect to home page if not logged in
        redirect('/'); // Redirect using Next.js redirect
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      {user ? (
        <div className="bg-white w-full max-w-4xl p-8 rounded-2xl shadow-lg transform transition-all hover:scale-105 duration-300 ease-in-out">
          {/* Profile Header */}
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Thank you for joining us!</h2>
            <p className="text-gray-600 text-lg md:text-xl">Welcome to our Furniture E-commerce platform. We're thrilled to have you!</p>
          </div>

          {/* Profile Image and Information */}
          <div className="flex flex-col items-center space-y-6 md:flex-row md:space-x-8 md:space-y-0 justify-center">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={user.imageUrl || "/default-profile.png"}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            {/* Profile Information */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
              <p className="text-gray-600 text-lg">{user.email}</p>
            </div>
          </div>

          {/* Account Overview Section */}
          <div className="w-full mt-8 rounded-lg shadow-lg p-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
            <h2 className="text-2xl font-semibold text-white mb-4">Account Overview</h2>
            <p className="text-white text-lg">
              You are an active user of our platform! Stay connected and explore all the amazing furniture we have to offer.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          {/* Loading Animation with Blue Color */}
          <div className="p-4 bg-transparent animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100" fill="none" stroke="#3B82F6">
              <circle cx="32" cy="32" r="30" stroke-width="4" stroke="#3B82F6" fill="none" />
              <circle cx="32" cy="32" r="10" fill="#3B82F6" />
              <path d="M15 38s2 3 5 4 5-2 6-4-1-6-4-5c0 0 1 5-2 7s-7 2-8 1z" fill="#3B82F6" />
              <path d="M47 38s-2 3-5 4-5-2-6-4 1-6 4-5c0 0-1 5 2 7s7 2 8 1z" fill="#3B82F6" />
              <path d="M23 44c1.5 0 3-1.5 3-3s-1.5-3-3-3-3 1.5-3 3 1.5 3 3 3z" fill="#3B82F6" />
              <path d="M41 44c1.5 0 3-1.5 3-3s-1.5-3-3-3-3 1.5-3 3 1.5 3 3 3z" fill="#3B82F6" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
