/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },
  experimental: {},
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
