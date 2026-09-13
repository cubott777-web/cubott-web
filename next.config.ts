import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/products", destination: "/work", permanent: false },
      { source: "/solutions", destination: "/work", permanent: false },
    ]
  },
};

export default nextConfig;
