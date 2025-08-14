/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**', // Allow all paths under this hostname
      },{
        protocol: 'https',
        hostname: '**',
        pathname: '/**', // Allow all paths under this hostname
      }
    ],
  },
}

export default nextConfig