import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io"], // Corrected key name and syntax
  },
};

export default nextConfig;
