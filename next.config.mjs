/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    reactStrictMode: true,
};

export default nextConfig;
