// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () =>
    Promise.resolve([
      {
        source: '/',
        destination: '/goals-tracker',
        permanent: true,
      },
    ]),
};

export default nextConfig;
