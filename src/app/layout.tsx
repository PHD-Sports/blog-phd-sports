import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://noticias.academiaphdsports.com.br'),
  title: {
    default: "Ph.D Sports | Blog de Notícias e Empreendedorismo Fitness",
    template: "%s | Ph.D Sports Blog"
  },
  description: "Descubra as últimas novidades do mundo fitness, dicas de empreendedorismo e oportunidades de franquia com a Ph.D Sports - a maior rede de academias do Brasil com mais de 130 unidades.",
  keywords: [
    "Ph.D Sports", "academia", "franquia fitness", "empreendedorismo", 
    "negócios fitness", "academia franquia", "investimento academia",
    "mercado fitness", "tendências fitness", "notícias academia",
    "franquia academia", "Ph.D Sports franquia", "academia Brasil"
  ],
  authors: [{ name: "Ph.D Sports", url: "https://www.academiaphdsports.com.br" }],
  creator: "Ph.D Sports",
  publisher: "Ph.D Sports",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://noticias.academiaphdsports.com.br',
    siteName: 'Ph.D Sports Blog',
    title: "Ph.D Sports | Blog de Notícias e Empreendedorismo Fitness",
    description: "Notícias, tendências e oportunidades de negócio no mercado fitness brasileiro. Conheça a Ph.D Sports.",
    images: [
      {
        url: 'https://www.academiaphdsports.com.br/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ph.D Sports - Muito Além do Treino',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ph.D Sports | Blog de Notícias Fitness",
    description: "Notícias e tendências do mercado fitness brasileiro",
    images: ['https://www.academiaphdsports.com.br/og-image.png'],
    creator: '@phdsports',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: { google: 'CÓDIGO_AQUI' }, // Adicionar quando registrar no Google Search Console
  category: 'fitness',
};

// Schema.org JSON-LD para SEO estruturado
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.academiaphdsports.com.br/#organization',
      name: 'Ph.D Sports',
      url: 'https://www.academiaphdsports.com.br',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.academiaphdsports.com.br/logo-phd-sports.png',
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://www.instagram.com/ph.dsports',
        'https://www.facebook.com/academiaphdsports',
        'https://www.youtube.com/@ph.dsports',
        'https://www.linkedin.com/company/academia-ph.d-sports/',
        'https://www.tiktok.com/@ph.dsports'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+55-41-99131-8016',
        contactType: 'customer service',
        areaServed: 'BR',
        availableLanguage: 'Portuguese'
      }
    },
    {
      '@type': 'WebSite',
      '@id': 'https://noticias.academiaphdsports.com.br/#website',
      url: 'https://noticias.academiaphdsports.com.br',
      name: 'Ph.D Sports Blog',
      description: 'Blog de notícias e empreendedorismo fitness da Ph.D Sports',
      publisher: {
        '@id': 'https://www.academiaphdsports.com.br/#organization'
      },
      inLanguage: 'pt-BR',
    },
    {
      '@type': 'Blog',
      '@id': 'https://noticias.academiaphdsports.com.br/#blog',
      name: 'Ph.D Sports Blog',
      description: 'Notícias, tendências e oportunidades de negócio no mercado fitness',
      url: 'https://noticias.academiaphdsports.com.br',
      publisher: {
        '@id': 'https://www.academiaphdsports.com.br/#organization'
      },
      inLanguage: 'pt-BR',
      about: {
        '@type': 'Thing',
        name: 'Fitness e Empreendedorismo'
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#131d2f" />
        <meta name="geo.region" content="BR" />
        <meta name="geo.placename" content="Brasil" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P7KRQD9L');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P7KRQD9L"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
