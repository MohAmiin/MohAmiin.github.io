import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '../components/site-header';
import SiteFooter from '../components/site-footer';
import ScrollReveal from '../components/scroll-reveal';

export const metadata: Metadata = {
  metadataBase: new URL('https://mohamedamiin.com'),
  title: 'Mohamed Amiin | Air Traffic Controller & Developer',
  description: 'Mohamed Amiin Abdirahman Hassan — air traffic controller, software developer and builder of aviation and business tools.',
  openGraph: { title: 'Mohamed Amiin | Aviation × Technology', description: 'Calm in the tower, curious at the keyboard.', url: 'https://mohamedamiin.com', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader/>{children}<SiteFooter/><ScrollReveal/></body></html>;
}
