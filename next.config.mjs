/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/table.json',
        destination: 'http://127.0.0.1/api/table.json',
      },
      {
        source: '/api/getsensordetail.json',
        destination: 'http://127.0.0.1/api/getsensordetail.json',
      },
      {
        source: '/api/historicdata.csv',
        destination: 'http://127.0.0.1/api/historicdata.csv',
      },
    ];
  },
};

export default nextConfig;
