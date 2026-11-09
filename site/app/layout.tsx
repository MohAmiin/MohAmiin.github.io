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

const holdHero = "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('motion-pending');setTimeout(function(){d.classList.remove('motion-pending')},3000)}}catch(e){}";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head>
    {/* Hold the homepage hero for the GSAP intro (released after 3s if the scripts never arrive). */}
    <script dangerouslySetInnerHTML={{ __html: holdHero }}/>
  </head><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader/><div id="main-content" tabIndex={-1}>{children}</div><SiteFooter/><ScrollReveal/><Motion/>
    {/* Cloudflare Web Analytics (DNS-only zone, so the beacon is installed manually) */}
    <Script src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "0c392b83026b4e0887c6f296eee02437"}' strategy="afterInteractive"/>
  </body></html>;
}
