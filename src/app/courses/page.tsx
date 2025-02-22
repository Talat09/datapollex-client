"use client";
import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";

import AuthGuard from "@/utils/AuthGuard";
import Link from "next/link";

interface User {
  name: string;
  role: string;
}

interface Lecture {
  _id: string;
  title: string;
  videoUrl: string;
}

interface Module {
  _id: string;
  title: string;
  lectures: Lecture[];
}

interface Course {
  _id: string;
  title: string;
  price: number;
  description: string;
  thumbnailUrl: string;
  instructor: string;
  modules: Module[];
  category: string;
  enrollmentCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Retrieve user details from local storage
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://datapollex-backend.vercel.app/api/courses"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchCourses();
  }, []);

  return (
    <AuthGuard allowedRoles={user?.role === "admin" ? ["admin"] : undefined}>
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold mt-6">All Courses</h1>
        <hr />
        {user?.role === "admin" && (
          <Link href="/courses/create-course">
            <button className="bg-blue-500 text-white p-3 my-4">
              Create Course
            </button>
          </Link>
        )}

        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <div className="grid grid-cols-4 justify-items-center gap-6 mt-6">
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <p>No courses available</p>
            )}
          </div>
        )}
      </div>
    </AuthGuard>
  );
};

export default CoursesPage;
