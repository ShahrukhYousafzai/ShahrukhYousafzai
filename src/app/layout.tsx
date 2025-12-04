import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import LenisScroller from '@/components/lenis-scroller';

export const metadata: Metadata = {
  title: 'Shahrukh Yousafzai Portfolio',
  description: "Shahrukh Yousafzai's Game Development Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("bg-background font-body text-foreground antialiased", 'selection:bg-primary/40 selection:text-primary-foreground')}>
        <LenisScroller>
          {children}
        </LenisScroller>
        <Toaster />
      </body>
    </html>
  );
}
