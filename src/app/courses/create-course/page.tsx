"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import AuthGuard from "@/utils/AuthGuard";
import Image from "next/image";

interface FormData {
  thumbnailUrl: string;
  title: string;
  price: string;
  description: string;
}

const CreateCourse = () => {
  const [formData, setFormData] = useState<FormData>({
    thumbnailUrl: "",
    title: "",
    price: "",
    description: "",
  });
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Handle change of text inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file upload to Cloudinary
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "estate"); // Replace with your actual preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/talatdev/image/upload", // Replace with your Cloudinary cloud name
        uploadData
      );

      if (response.data.secure_url) {
        setFormData((prevData) => ({
          ...prevData,
          thumbnailUrl: response.data.secure_url,
        }));
        setMessage({ text: "Image uploaded successfully!", type: "success" });
      } else {
        throw new Error("Failed to get uploaded image URL.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage({ text: "Failed to upload image.", type: "error" });
    } finally {
      setUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.thumbnailUrl) {
      setMessage({ text: "Please upload an image first.", type: "error" });
      return;
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price), // Ensure price is a number
      };

      await axios.post("http://localhost:5000/api/courses", payload);
      setMessage({ text: "Course created successfully!", type: "success" });

      // Reset form after submission
      setFormData({
        thumbnailUrl: "",
        title: "",
        price: "",
        description: "",
      });
    } catch (error) {
      setMessage({ text: "Failed to create course. Please try again.", type: "error" });
      console.error("Error creating course:", error);
    }
  };

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Create a New Course</h2>

        {/* Display message */}
        {message && (
          <p className={`text-center mb-4 ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Thumbnail Upload */}
          <div className="mb-4">
            <label htmlFor="thumbnail" className="block text-sm font-semibold mb-2">
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              onChange={handleFileUpload}
              className="w-full border border-gray-300 p-2 rounded-md"
              accept="image/*"
            />
            {uploading && <p className="text-blue-500">Uploading image...</p>}

            {/* Display Uploaded Image */}
            {formData.thumbnailUrl && (
              <div className="mt-2">
                <Image
                  src={formData.thumbnailUrl}
                  alt="Course Thumbnail"
                  width={200}
                  height={200}
                  className="rounded-md shadow-md"
                />
              </div>
            )}
          </div>

          {/* Course Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold mb-2">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
              min="0"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </AuthGuard>
  );
};

export default CreateCourse;
