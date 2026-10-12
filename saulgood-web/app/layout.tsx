import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { PageTransitionProvider } from "@/components/layout/PageTransition";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F6F2EA",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SAULGOOD PRODUCTIONS | Hospitality Visual Production Studio",
  description:
    "Specialist hospitality visual production studio in India. Premium Photography, Cinematic Videography, and Aerial Visuals for luxury hotels, resorts, and villas.",
  keywords: [
    "Hospitality Photography",
    "Luxury Resort Videography",
    "Hotel Drone Cinematography",
    "Villa Visual Production",
    "Hospitality Studio India",
    "SaulGood Productions",
  ],
  authors: [{ name: "SaulGood Productions LLP" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "SaulGood Productions",
    title: "SAULGOOD PRODUCTIONS | Hospitality Visual Production Studio",
    description:
      "Hospitality, elevated through visuals. Premium photography, cinematic videography, and aerial visuals for luxury properties.",
    images: [
      {
        url: "/media/placeholder/resort.jpg",
        width: 1600,
        height: 1067,
        alt: "SaulGood Productions Hospitality Imagery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAULGOOD PRODUCTIONS | Hospitality Visual Production Studio",
    description:
      "Hospitality, elevated through visuals. Premium photography, cinematic videography, and aerial visuals.",
    images: ["/media/placeholder/resort.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SaulGood Productions LLP",
  alternateName: "SaulGood Productions",
  url: siteUrl,
  description:
    "Specialist hospitality visual production studio focused on premium photography, cinematic videography, and aerial visuals for luxury hotels, resorts, and villas.",
  email: "saulgoodproductions@gmail.com",
  areaServed: [
    {
      "@type": "Country",
      name: "India",
    },
    {
      "@type": "AdministrativeArea",
      name: "International",
    },
  ],
  knowsAbout: [
    "Hospitality Photography",
    "Cinematic Videography",
    "Aerial Drone Cinematography",
    "Architectural Photography",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-theme-bg text-theme-ink overflow-x-clip selection:bg-theme-accent selection:text-theme-bg">
        {/* Accessible skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-theme-ink focus:text-theme-bg focus:border focus:border-theme-line"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <PageTransitionProvider>
          <Nav />
          <main id="main-content" className="flex-1 w-full">
            {children}
          </main>
          <Footer />
          </PageTransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
