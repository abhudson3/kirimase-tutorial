/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  images: {
    domains: [
      'download.logo.wine',
      'images.unsplash.com',
      'blog.hubspot.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'download.logo.wine',
        port: '',
        pathname: '/logo/CGI_Inc./CGI_Inc.-Logo.wine.png',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/photo-1586282391129-76a6df230234?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        protocol: 'https',
        hostname: 'blog.hubspot.com',
        port: '',
        pathname: '/hs-fs/hubfs/Cover-Letter-Templates.jpg?width=595&height=400&name=Cover-Letter-Templates.jpg'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    ]
  }
};


export default nextConfig;



// https://blog.hubspot.com/hs-fs/hubfs/Cover-Letter-Templates.jpg?width=595&height=400&name=Cover-Letter-Templates.jpg
// https://