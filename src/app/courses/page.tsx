"use client";
import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import { Course } from "@/types/Course";
import AuthGuard from "@/utils/AuthGuard";
import Link from "next/link";

interface User {
  name: string;
  role: string;
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve user details from local storage
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  console.log("user from course page:", user?.role);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <AuthGuard allowedRoles={user?.role === "admin" ? ["admin"] : undefined}>
      <div className="container  mx-auto">
        <h1 className="text-4xl font-semibold mt-6">All Courses</h1>
        <hr />
        {user?.role === "admin" && (
          <Link href="/courses/create-course">
            <button className="bg-blue-500 text-white p-3 my-4">
              {" "}
              Create Course
            </button>
          </Link>
        )}

        <div className="grid grid-cols-4 justify-items-center gap-6 mt-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default CoursesPage;
