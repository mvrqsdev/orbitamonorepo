/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@orbita/ui',
    '@orbita/features',
    '@orbita/prisma',
    '@orbita/trpc',
    '@orbita/auth',
  ],
}

export default nextConfig
