"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
const CourseDetail = () => {
  const params = useParams();
  const [modules, setModules] = useState<Module[]>([]);
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(
          "https://datapollex-backend.vercel.app/api/modules"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setModules(data);
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      }
    };

    fetchModules();
  }, []);
  console.log("params:", params);
  console.log("modules:", modules);
  return (
    <div className="container mx-auto py-16">
      <h1>Course Detail</h1>
      <p>Modules: {modules.length}</p>
      {modules.map((module) => (
        <div
          key={module._id}
          className="border p-4 rounded-lg shadow-md hover:shadow-lg my-6 w-1/2"
        >
          <h3>{module.title}</h3>
          <Link
            href={`/courses/${params.id}/lecture`}
            className="bg-blue-600 px-4 py-1 my-3 rounded text-white"
          >
            view
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CourseDetail;
