"use client"
import { useState, useEffect, ChangeEvent } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");

  useEffect(() => {
    const adminSession = sessionStorage.getItem("isAdmin");
    if (adminSession === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "admin123") {
      sessionStorage.setItem("isAdmin", "true");
      setIsLoggedIn(true); // Update login state
      window.location.href = "/admin"; // Redirect to admin dashboard
    } else {
      setError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    window.location.href = "/login"; // Redirect to login page
  };

  const handlePasswordUpdate = (newPassword: string) => {
    // Placeholder for password update logic (e.g., API call to backend)
    if (newPassword) {
      alert("Password updated successfully!");
      // You can also implement a password change form here.
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded mb-4"
          >
            Logout
          </button>
          <div>
            <h3 className="text-lg font-semibold">Change Password</h3>
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 border rounded mb-4"
              onChange={(e) => handlePasswordUpdate(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
