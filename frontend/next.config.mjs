/** @type {import('next').NextConfig} */
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const { hostname, protocol } = new URL(apiUrl);

const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,

  images: {
    remotePatterns: [
      {
        protocol: protocol.replace(":", ""), // "https:"
        hostname: hostname, // "example.com"
        pathname: "/**", // İsteğe göre özelleştirilebilir
      },
    ],
  },
};

export default nextConfig;
