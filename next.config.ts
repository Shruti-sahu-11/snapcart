import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {hostname:"lh3.googleusercontent.com"},
      {hostname:"plus.unsplash.com"},
      {hostname:"media.istockphoto.com"},
      {hostname:"images.unsplash.com"}
    ]
  }
  /* config options here */
};

export default nextConfig;
