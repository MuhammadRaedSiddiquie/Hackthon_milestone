/** @type {import('next').NextConfig} */
<<<<<<< HEAD
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
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

=======
const nextConfig = {};
>>>>>>> parent of 5f680c6 (debugging)

export default nextConfig;
