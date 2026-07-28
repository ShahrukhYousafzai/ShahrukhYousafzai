import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import LenisScroller from '@/components/lenis-scroller';

export const metadata: Metadata = {
  title: {
    default: 'Shahrukh Yousafzai — Founder, AFS Creative Studio · Efface Studios · AFS Agentics',
    template: '%s · Shahrukh Yousafzai',
  },
  description:
    'Founder of a creative engineering operation based in Pakistan, shipping worldwide. 9+ years shipping production software. $150K+ earned. 1M+ app downloads on Google Play. 76+ verified client reviews. Web2, Web3, and AI specialist.',
  keywords: [
    'Shahrukh Yousafzai',
    'AFS Creative Studio',
    'Efface Studios',
    'AFS Agentics',
    'Game Developer',
    'AI Engineer',
    'Web3',
    'Unity',
    'Pakistan Software Agency',
    'Binational Engineering',
  ],
  authors: [{ name: 'Shahrukh Yousafzai', url: 'https://shahrukhyousafzai.pk' }],
  creator: 'Shahrukh Yousafzai',
  openGraph: {
    title: 'Shahrukh Yousafzai — Founder of AFS Creative Studio, Efface Studios & AFS Agentics',
    description:
      'Founder authority behind AFS Creative Studio (creative services), Efface Studios (games product house since 2017), and AFS Agentics (AI product studio). 9+ years. $150K+ earned. 1M+ downloads. 76+ verified reviews.',
    type: 'website',
    url: 'https://shahrukhyousafzai.pk',
    siteName: 'Shahrukh Yousafzai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shahrukh Yousafzai — Founder, AFS Creative Studio · Efface Studios · AFS Agentics',
    description:
      'Founder authority. Production-scale digital products. Web2 · Web3 · AI.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "bg-background font-body text-foreground antialiased",
          'selection:bg-primary selection:text-primary-foreground'
        )}
      >
        <LenisScroller>{children}</LenisScroller>
        <Toaster />
      </body>
    </html>
  );
}
