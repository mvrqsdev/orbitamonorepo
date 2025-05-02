/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@orbita/ui',
    '@orbita/prisma',
    '@orbita/trpc',
    '@orbita/auth',
  ],
}

export default nextConfig
