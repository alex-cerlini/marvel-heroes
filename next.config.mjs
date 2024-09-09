/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MARVEL_PUBLIC_API_KEY: process.env.MARVEL_PUBLIC_API_KEY,
    MARVEL_PRIVATE_API_KEY: process.env.MARVEL_PRIVATE_API_KEY,
    MARVEL_BASE_URL: process.env.MARVEL_BASE_URL,
  },
};

export default nextConfig;
