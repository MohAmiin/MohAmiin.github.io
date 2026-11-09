import type { Metadata } from 'next';
// Old address: send visitors to the renamed page.
export const metadata: Metadata = { title: 'My Library | Mohamed Amiin', robots: { index: false }};
export default function BooksRedirect() {
  return <main className="container detail-page"><p>This page has moved to <a href="/library/">My Library ↗</a>.</p><meta httpEquiv="refresh" content="0; url=/library/" /></main>;
}
