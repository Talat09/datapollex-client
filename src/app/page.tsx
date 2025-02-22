import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">
        Welcome to the Learning Management System
      </h1>
      <p className="my-8">
        This is a platform to manage courses, modules, and lectures.
      </p>
      <Link
        href="/courses"
        className="bg-blue-600 px-3 py-2 my-12 rounded text-white"
      >
        Click Here See Courses
      </Link>
    </div>
  );
}
