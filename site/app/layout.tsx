import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '../components/site-header';
import SiteFooter from '../components/site-footer';
import ScrollReveal from '../components/scroll-reveal';

// 1200×630 social preview (public/og-image.jpg); metadataBase makes the URL absolute.
const shareImage = { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Mohamed Amiin, Air Traffic Controller & Software Developer, beside an outdoor portrait in a dark suit' };

export const metadata: Metadata = {
  metadataBase: new URL('https://mohamedamiin.com'),
  title: 'Mohamed Amiin | Air Traffic Controller & Developer',
  description: 'Mohamed Amiin Abdirahman Hassan — air traffic controller, software developer and builder of aviation and business tools.',
  openGraph: { title: 'Mohamed Amiin | Air Traffic Controller & Software Developer', description: 'Calm in the tower, curious at the keyboard. Air traffic controller at Berbera International Airport and software developer.', url: 'https://mohamedamiin.com/', siteName: 'Mohamed Amiin', locale: 'en_GB', type: 'website', images: [shareImage] },
  twitter: { card: 'summary_large_image', title: 'Mohamed Amiin | Air Traffic Controller & Software Developer', description: 'Calm in the tower, curious at the keyboard.', images: [shareImage] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader/>{children}<SiteFooter/><ScrollReveal/></body></html>;
}
