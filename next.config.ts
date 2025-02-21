import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // webpack: (
  //   config,
  //   { dev }
  // ) => {
  //   if (config.cache && !dev) {
  //     config.cache = Object.freeze({
  //       type: 'memory',
  //     })
  //   }
  //   return config;
  // }
  outputFileTracingExcludes: {
    '**/*': [
      '.next/cache/webpack/**', 
    ],
  }
};

export default nextConfig;
