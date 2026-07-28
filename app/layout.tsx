import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Inter, Poppins } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "AYVO — Timeless Luxury Essentials | 260 GSM Streetwear",
    template: "%s | AYVO Luxury Fashion",
  },
  description:
    "AYVO offers premium 260 GSM heavyweight combed cotton minimal luxury fashion essentials with signature 3D raised gold monogram branding.",
  keywords: [
    "AYVO",
    "ayvo_official110",
    "luxury t-shirts pakistan",
    "260 gsm tees",
    "minimal streetwear",
    "karachi fashion",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    url: "https://ayvo.vercel.app",
    siteName: "AYVO",
    images: [{ url: "/logo.png", width: 800, height: 800, alt: "AYVO Gold Monogram" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable} ${poppins.variable}`}
    >
      <body className="bg-luxury-black text-luxury-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
