import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import SiteHeader from '../components/site-header';
import SiteFooter from '../components/site-footer';
import ScrollReveal from '../components/scroll-reveal';
import Motion from '../components/motion';

// 1200×630 social preview (public/og-image.jpg); metadataBase makes the URL absolute.
const shareImage = { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Mohamed Amiin, Air Traffic Controller & Software Developer, beside an outdoor portrait in a dark suit' };

export const metadata: Metadata = {
  metadataBase: new URL('https://mohamedamiin.com'),
  title: 'Mohamed Amiin | Creator, Designer & Developer',
  description: 'Mohamed Amiin Abdirahman Hassan — software development, graphic design and practical business tools. Professional background in accounting and air traffic control.',
  openGraph: { title: 'Mohamed Amiin | Creator, Designer & Developer', description: 'I create, design and build: digital products, graphic design and practical business tools.', url: 'https://mohamedamiin.com/', siteName: 'Mohamed Amiin', locale: 'en_GB', type: 'website', images: [shareImage] },
  twitter: { card: 'summary_large_image', title: 'Mohamed Amiin | Creator, Designer & Developer', description: 'I create, design and build.', images: [shareImage] },
};

const FONTS = 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Amiri:wght@400;700&display=swap';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head>
    {/* Fonts load in parallel with the page CSS instead of from an @import inside it. */}
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
    <link rel="stylesheet" href={FONTS}/>
  </head><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader/><div id="main-content" tabIndex={-1}>{children}</div><SiteFooter/><ScrollReveal/><Motion/>
    {/* Cloudflare Web Analytics (DNS-only zone, so the beacon is installed manually) */}
    <Script src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "0c392b83026b4e0887c6f296eee02437"}' strategy="afterInteractive"/>
  </body></html>;
}
