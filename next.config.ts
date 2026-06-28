import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dqnxlhsgmg1ih.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;