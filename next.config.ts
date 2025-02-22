import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com", "miro.medium.com"], // Add Cloudinary domain here
  },
};

export default nextConfig;
