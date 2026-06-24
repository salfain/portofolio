/** @type {import('next').RemotePattern[]} */
const remotePatterns = [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
  },
  {
    protocol: "https",
    hostname: "*.r2.dev",
  },
  {
    protocol: "https",
    hostname: "*.r2.cloudflarestorage.com",
  },
];

if (process.env.NEXT_PUBLIC_R2_PUBLIC_URL) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_R2_PUBLIC_URL);
    remotePatterns.push({
      protocol: url.protocol.replace(":", ""),
      hostname: url.hostname,
    });
  } catch {
    // Ignore invalid env value and keep the default allowlist.
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prisma & bcryptjs harus berjalan di Node.js runtime, bukan di-bundle
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  images: {
    remotePatterns,
  },
};

export default nextConfig;
