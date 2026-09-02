import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://agrikakhatri.com"),
  title: {
    default: "Agrika Khatri | Mindset, Manifestation & Peak Performance",
    template: "%s | Agrika Khatri",
  },
  description:
    "Agrika Khatri is India's leading mindset and peak performance coach. Break behavioral loops, shift identity, and build the internal architecture that transforms ambition into reality.",
  keywords: [
    "mindset coach India",
    "manifestation coach",
    "peak performance coaching",
    "behavioral coaching",
    "identity transformation",
    "Agrika Khatri",
    "mindset training India",
  ],
  authors: [{ name: "Agrika Khatri" }],
  creator: "Agrika Khatri",
  publisher: "Agrika Khatri",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://agrikakhatri.com",
    siteName: "Agrika Khatri",
    title: "Agrika Khatri | Mindset, Manifestation & Peak Performance",
    description:
      "Break behavioral loops. Shift identity. Build the internal architecture that turns ambition into reality. India's most authoritative mindset and peak performance brand.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Agrika Khatri - Mindset, Manifestation & Peak Performance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agrika Khatri | Mindset, Manifestation & Peak Performance",
    description:
      "Break behavioral loops. Shift identity. Build the internal architecture that turns ambition into reality.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://agrikakhatri.com",
  },
  category: "coaching",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1C1A18" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Structured data — Person schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Agrika Khatri",
              jobTitle: "Mindset & Peak Performance Coach",
              description:
                "India's leading mindset and peak performance coach specializing in behavioral transformation and identity-level change.",
              url: "https://agrikakhatri.com",
              knowsAbout: [
                "Mindset Coaching",
                "Manifestation",
                "Peak Performance",
                "Behavioral Psychology",
                "Identity Transformation",
              ],
            }),
          }}
        />
      </head>
      <body>
        {/* Skip to main content - accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
