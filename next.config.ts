import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
};

export default nextConfig;
