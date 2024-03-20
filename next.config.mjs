/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tarjet.site'
            }
        ]
    }
};

export default nextConfig;
