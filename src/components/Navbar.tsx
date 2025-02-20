"use client"; // Required for using useEffect & localStorage

import { useState, useEffect } from "react";
import Link from "next/link";

interface User {
  name: string;
  // Add other properties if needed
}

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsAuthenticated(true);
      setUser(JSON.parse(user));
    }
  }, []);
  const { name } = user || {};
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center container mx-auto">
        <h1 className="text-white text-xl font-bold">LMS System</h1>
        <ul className="flex gap-4">
          <li>
            <Link href="/" className="text-white">
              Home
            </Link>
          </li>
          {/* Show "Courses" only if user is logged in */}
          {isAuthenticated && (
            <li>
              <Link href="/courses" className="text-white">
                Courses
              </Link>
            </li>
          )}

          {user && <li className="text-white">{name}</li>}
          {user ? (
            <li onClick={logout}>
              <Link href="/" className="text-white">
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/signin" className="text-white">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
