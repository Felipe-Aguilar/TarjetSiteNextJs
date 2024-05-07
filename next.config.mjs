/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        minimumCacheTTL: 1,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tarjet.site'
            },
            {
                protocol: 'https',
                hostname: 'souvenir-site.com'
            }
        ]
    }
};

export default nextConfig;
