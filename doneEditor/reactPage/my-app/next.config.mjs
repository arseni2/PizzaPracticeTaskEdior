/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@react-page', 'react-dnd'],
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve = {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    'react/jsx-runtime.js': 'react/jsx-runtime',
                    'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
                },
            };
        }
        return config;
    },
};

export default nextConfig;