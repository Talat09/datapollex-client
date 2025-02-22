/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      "https://datapollex-backend.vercel.app/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, userEmail, password }),
      }
    );

    const data = await response.json();
    if (data.token) {
      // Handle successful login (store token, redirect, etc.)
    } else {
      // Handle login error
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md mt-6 md:mt-20">
      <form onSubmit={handleLogin}>
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Sign Up
        </button>
      </form>
      <div>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link href="/signin" className="text-blue-600">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
