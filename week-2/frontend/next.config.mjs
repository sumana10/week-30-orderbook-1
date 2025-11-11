/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        // This will proxy all Backpack API calls from frontend → real API
        source: "/api/backpack/:path*", 
        destination: "https://api.backpack.exchange/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
