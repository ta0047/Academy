const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.creativeitinstitute.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.gettyimages.com",
      }

    ],
  },
};

export default nextConfig;