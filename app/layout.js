import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "RG Tech Engineering | CNC Fiber Laser Cutting Specialist Chennai",
    template: "%s | RG Tech Engineering",
  },
  description: "Tamil Nadu's premier CNC Fiber Laser Cutting & Metal Fabrication partner. Specializing in MS, SS, Aluminum laser cutting, steel gates, and decorative panels.",
  metadataBase: new URL("https://www.rgtechengineeringworks.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RG Tech Engineering | Industrial Precision Specialists",
    description: "Leading CNC Fiber Laser Cutting and Architectural Metal Fabrication in Chennai.",
    url: "https://www.rgtechengineeringworks.com",
    siteName: "RG Tech Engineering Works",
    images: [
      {
        url: "/gallery/Sheet Metal Laser Cutting/sm_12.jpg",
        width: 1200,
        height: 630,
        alt: "RG Tech Engineering Showcase",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
