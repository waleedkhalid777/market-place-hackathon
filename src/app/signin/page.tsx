"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple login simulation with localStorage
    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/"); // Redirect to home page after successful login
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="space-y-4 p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700">Login</h2>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
