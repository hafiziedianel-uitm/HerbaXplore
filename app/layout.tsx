import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { ThemeProvider } from '@/components/ThemeProvider';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'HerbaXplore UiTM',
  description: 'Fakulti Farmasi UiTM',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://3Dmol.org/build/3Dmol-min.js" strategy="beforeInteractive" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
