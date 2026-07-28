import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { WhatsAppButton } from "@/components/store/WhatsAppButton";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-luxury-black text-luxury-white flex flex-col justify-between selection:bg-luxury-gold selection:text-luxury-black">
      <div>
        <AnnouncementBar />
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
