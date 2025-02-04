/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                port: "",
                pathname: "/a/**",
            },
            {
                protocol: "https",
                hostname: "cdn.sanity.io", // Correct hostname
                port: "",
                pathname: "/images/**",
                
            },
        ],
    },
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
      },
};


export default nextConfig;
