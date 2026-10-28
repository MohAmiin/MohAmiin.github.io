import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mohamedamiin.com'),
  title: 'Mohamed Amiin | Air Traffic Controller & Developer',
  description: 'Mohamed Amiin Abdirahman Hassan — air traffic controller, software developer and builder of aviation and business tools.',
  openGraph: { title: 'Mohamed Amiin | Aviation × Technology', description: 'Calm in the tower, curious at the keyboard.', url: 'https://mohamedamiin.com', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
