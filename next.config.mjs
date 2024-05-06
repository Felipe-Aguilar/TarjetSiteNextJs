/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        minimumCacheTTL: 1,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tarjet.site'
            }
        ]
    }
};

export default nextConfig;
