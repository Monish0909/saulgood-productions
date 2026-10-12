import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/dev/ThemeProvider";
import { ThemeToggle } from "@/components/dev/ThemeToggle";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAULGOOD PRODUCTIONS | Hospitality Visual Production Studio",
  description:
    "Premium Photography · Cinematic Videography · Aerial Visuals for luxury hotels, resorts, and villas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${cormorant.variable} ${hanken.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const params = new URLSearchParams(window.location.search);
                const q = params.get('theme');
                if (q === 'light' || q === 'dark') {
                  document.documentElement.setAttribute('data-theme', q);
                } else {
                  const stored = localStorage.getItem('sgp-theme');
                  if (stored === 'light' || stored === 'dark') {
                    document.documentElement.setAttribute('data-theme', stored);
                  }
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-theme-bg text-theme-ink">
        <ThemeProvider>
          <SmoothScrollProvider>
            <Nav />
            {children}
            <Footer />
            <ThemeToggle />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
