"use client";
import React, { useEffect, useState } from "react";

interface Lecture {
  _id: string;
  title: string;
  videoUrl: string;
}

const LectureCard = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await fetch(
          "https://datapollex-backend.vercel.app/api/lectures"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Lecture[] = await response.json();
        setLectures(data);
      } catch (error) {
        console.error("Failed to fetch lectures:", error);
      }
    };

    fetchLectures();
  }, []);

  console.log("lectures:", lectures);

  return (
    <div>
      <h1>Lecture Card</h1>
      {lectures.map((lecture) => (
        <div
          key={lecture._id}
          className="border p-4 rounded-lg shadow-md hover:shadow-lg my-6 w-1/2"
        >
          <Video src={lecture.videoUrl} />
          <h3 className="text-2xl font-semibold mt-4">{lecture.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default LectureCard;

interface VideoProps {
  src: string;
}

export function Video({ src }: VideoProps) {
  // Convert standard YouTube URLs to embed format
  const getEmbedUrl = (url: string) => {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <iframe
      width="560"
      height="315"
      src={getEmbedUrl(src)}
      title="Lecture Video"
      allow="autoplay; encrypted-media"
      allowFullScreen
      className="w-full h-64 rounded-lg"
    ></iframe>
  );
}
