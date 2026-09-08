/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*(Pramit-Shrivastav-Resume.pdf|resume.pdf)',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="Pramit-Shrivastav-Resume.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
