import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // NEXT_PUBLIC_BASE_PATH is injected by CI from the repo name (e.g. /teacher-copilot or /Teen-AI-Explorer-Kit)
  basePath: process.env.NODE_ENV === "production"
    ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "/teacher-copilot")
    : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
