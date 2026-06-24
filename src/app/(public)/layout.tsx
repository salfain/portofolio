import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { getSiteProfile } from "@/lib/site";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteProfile();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar site={site} />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer site={site} />
    </div>
  );
}
