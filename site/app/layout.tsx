import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import SiteHeader from '../components/site-header';
import SiteFooter from '../components/site-footer';
import ScrollReveal from '../components/scroll-reveal';

// 1200×630 social preview (public/og-image.jpg); metadataBase makes the URL absolute.
const shareImage = { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Mohamed Amiin, Air Traffic Controller & Software Developer, beside an outdoor portrait in a dark suit' };

export const metadata: Metadata = {
  metadataBase: new URL('https://mohamedamiin.com'),
  title: 'Mohamed Amiin | Developer, Designer & Creator',
  description: 'Mohamed Amiin Abdirahman Hassan — software development, graphic design and practical business tools. Professional background in accounting and air traffic control.',
  openGraph: { title: 'Mohamed Amiin | Developer, Designer & Creator', description: 'I create, design and build: digital products, graphic design and practical business tools.', url: 'https://mohamedamiin.com/', siteName: 'Mohamed Amiin', locale: 'en_GB', type: 'website', images: [shareImage] },
  twitter: { card: 'summary_large_image', title: 'Mohamed Amiin | Developer, Designer & Creator', description: 'I create, design and build.', images: [shareImage] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader/>{children}<SiteFooter/><ScrollReveal/>
    {/* Cloudflare Web Analytics (DNS-only zone, so the beacon is installed manually) */}
    <Script src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "0c392b83026b4e0887c6f296eee02437"}' strategy="afterInteractive"/>
  </body></html>;
}
