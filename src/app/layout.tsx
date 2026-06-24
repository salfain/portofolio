import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { getSiteProfile } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteProfile();

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
    ),
    title: {
      default: `${site.fullName} - General IT Portfolio`,
      template: `%s - ${site.fullName}`,
    },
    description:
      "Portofolio bidang IT yang menampilkan project web development, IT support, network, server, database, dan technical documentation.",
    keywords: [
      "IT Portfolio",
      "Web Developer",
      "IT Support",
      "Network",
      "Server",
      "Next.js",
      site.fullName,
    ],
    authors: [{ name: site.fullName }],
    openGraph: {
      title: `${site.fullName} - General IT Portfolio`,
      description: site.tagline,
      type: "website",
      locale: "id_ID",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
