// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       'media.istockphoto.com',
//       'localhost',
//       '127.0.0.1',
//       'images.unsplash.com',
//       'img.freepik.com',
//       'm.media-amazon.com',
//       'cdn.pixabay.com',
//       'media.istockphoto.com',
//       'static.toiimg.com',
//       'via.placeholder.com',
//       'rentx-backend.onrender.com',
//     ],
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.toiimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rentx-backend.onrender.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
