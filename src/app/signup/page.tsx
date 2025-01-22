"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple signup simulation (just saving in localStorage)
    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/"); // Redirect to home page after successful signup
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignup} className="space-y-4 p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700">Sign Up</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded-md w-full"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded-md w-full"
          required
        />
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
