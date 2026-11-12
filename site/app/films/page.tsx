import type { Metadata } from 'next';
import FilmShelf from '../../components/film-shelf';
import { films } from '../../data/films';

export const metadata: Metadata = {
  title: 'My Films | Mohamed Amiin',
  description: `${films.length} films Mohamed Amiin recommends, from Inception and Interstellar to The Message and Spirited Away — filter by mood or let the page pick one for you.`,
};

// Film list lives in site/data/films.ts.
export default function Films() {
  return <main className="container detail-page films-page">
    <header className="fit-intro">
      <div>
        <p className="eyebrow">OFF DUTY · FILMS</p>
        <h1 className="detail-title">My <em>Films.</em></h1>
      </div>
      <p className="detail-lead">{films.length} films I recommend, from mind-bending sci-fi to quiet true stories. Choose by mood, or let the page pick one for tonight.</p>
    </header>
    <FilmShelf />
    <p className="fm-credit">Film posters from <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">The Movie Database (TMDB)</a>. This site is not endorsed or certified by TMDB.</p>
  </main>;
}
