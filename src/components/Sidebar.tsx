import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <ul>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/dashboard/courses">Courses</Link>
        </li>
        <li>
          <Link href="/user">My Courses</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
