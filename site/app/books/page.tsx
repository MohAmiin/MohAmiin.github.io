import type { Metadata } from 'next';
import BookShelf, { type Book } from '../../components/book-shelf';

export const metadata: Metadata = { title: 'Books I recommend | Mohamed Amiin', description: 'The books Mohamed Amiin recommends, starting with the Holy Qur\'an: Islamic classics, building, mindset, money, thinking and free public-domain classics.' };

// Only public-domain books carry a PDF. Modern titles link out to find the book, never to a copy.
const books: Book[] = [
  { title: 'Riyad as-Salihin', cover: '/images/books/riyad-as-salihin.webp', author: 'Imam an-Nawawi', group: 'islam', label: 'Islamic', bg: '#0E3B2E', ink: '#E3C373', about: 'Hadith for daily life, gathered and arranged by topic.' },
  { title: 'The Forty Hadith', cover: '/images/books/forty-hadith.webp', author: 'Imam an-Nawawi', group: 'islam', label: 'Islamic', bg: '#E9E1CC', ink: '#0E3B2E', about: 'Forty short hadith that hold the core teachings of Islam.' },
  { title: 'Nahj al-Balagha', cover: '/images/books/nahj-al-balagha.webp', author: 'Imam Ali ibn Abi Talib · compiled by al-Sharif al-Radi', group: 'islam', label: 'Islamic', bg: '#14213D', ink: '#E3C373', about: 'Sermons, letters and sayings of Imam Ali on God, justice, leadership and the soul.', read: 'https://al-islam.org/nahjul-balagha-part-1-sermons' },
  { title: 'The Sealed Nectar', cover: '/images/books/sealed-nectar.webp', author: 'Safiur-Rahman al-Mubarakpuri', group: 'islam', label: 'Islamic', bg: '#5A2E1F', ink: '#F2DDB0', about: 'The life of the Prophet ﷺ, told clearly from beginning to end.' },
  { title: 'Fortress of the Muslim', cover: '/images/books/fortress-of-the-muslim.webp', author: 'Sa’id al-Qahtani', group: 'islam', label: 'Islamic', bg: '#1F4E5F', ink: '#F4EFE3', about: 'Daily supplications from the Qur’an and Sunnah, in one small book.' },
  { title: 'Don’t Be Sad', cover: '/images/books/dont-be-sad.webp', author: 'Aaidh al-Qarni', group: 'islam', label: 'Islamic', bg: '#F2D9A6', ink: '#3A2A10', about: 'Hope, patience and gratitude when life feels heavy.' },
  { title: 'Purification of the Heart', cover: '/images/books/purification-of-the-heart.webp', author: 'Hamza Yusuf', group: 'islam', label: 'Islamic', bg: '#2B2D42', ink: '#C9B37E', about: 'On the diseases of the heart and how to heal them.' },
  { title: 'Zero to One', cover: '/images/books/zero-to-one.webp', author: 'Peter Thiel', group: 'build', label: 'Building', bg: '#1F3A5F', ink: '#F2EDD8', about: 'How to build something genuinely new instead of copying what exists.' },
  { title: 'The Lean Startup', cover: '/images/books/lean-startup.webp', author: 'Eric Ries', group: 'build', label: 'Building', bg: '#E8E1CF', ink: '#1E2433', about: 'Test ideas with real people before building too much.' },
  { title: 'The Design of Everyday Things', cover: '/images/books/design-of-everyday-things.webp', author: 'Don Norman', group: 'build', label: 'Building', bg: '#C84B31', ink: '#FFF6E6', about: 'Why good design puts people first, and how bad design fails them.' },
  { title: 'Atomic Habits', cover: '/images/books/atomic-habits.webp', author: 'James Clear', group: 'mind', label: 'Mindset', bg: '#F2EDD8', ink: '#141A2B', about: 'Small daily systems that add up to big change.' },
  { title: 'Deep Work', cover: '/images/books/deep-work.webp', author: 'Cal Newport', group: 'mind', label: 'Mindset', bg: '#2E2A24', ink: '#E3A93A', about: 'Focus as the skill that makes every other skill grow.' },
  { title: 'Man’s Search for Meaning', cover: '/images/books/mans-search-for-meaning.webp', author: 'Viktor E. Frankl', group: 'mind', label: 'Mindset', bg: '#5B6B7A', ink: '#F4EFE3', about: 'Finding purpose in the hardest circumstances.' },
  { title: 'The Psychology of Money', cover: '/images/books/psychology-of-money.webp', author: 'Morgan Housel', group: 'money', label: 'Money', bg: '#3E6B4E', ink: '#F4EFE3', about: 'How behaviour, not maths, decides what happens with money.' },
  { title: 'Rich Dad Poor Dad', cover: '/images/books/rich-dad-poor-dad.webp', author: 'Robert T. Kiyosaki', group: 'money', label: 'Money', bg: '#6B3FA0', ink: '#F7D774', about: 'A simple way to think about assets, income and financial freedom.' },
  { title: 'Thinking, Fast and Slow', cover: '/images/books/thinking-fast-and-slow.webp', author: 'Daniel Kahneman', group: 'think', label: 'Thinking', bg: '#EDEAE2', ink: '#1F4E8C', about: 'How we decide, and when instinct needs a second look.' },
  { title: 'Sapiens', cover: '/images/books/sapiens.webp', author: 'Yuval Noah Harari', group: 'think', label: 'Thinking', bg: '#B8862E', ink: '#141A2B', about: 'A brief history of humankind, from the first humans to today.' },
  { title: 'Meditations', author: 'Marcus Aurelius · translated by Jeremy Collier (1887)', group: 'free', label: 'Free classic', bg: '#1B2236', ink: '#E3A93A', about: 'A Roman emperor’s private notes on calm, duty and self-control.', cover: '/images/books/meditations.webp', pdf: '/books/meditations-marcus-aurelius-1887.pdf' },
  { title: 'The Art of War', cover: '/images/books/art-of-war.webp', author: 'Sun Tzu', group: 'free', label: 'Free classic', bg: '#8E2C23', ink: '#F4EFE3', about: 'The classic on strategy, preparation and knowing when to act.' },
  { title: 'The Autobiography of Benjamin Franklin', cover: '/images/books/benjamin-franklin.webp', author: 'Benjamin Franklin', group: 'free', label: 'Free classic', bg: '#D9CBA8', ink: '#2A2418', about: 'The life of a self-taught printer, writer and inventor.' },
  { title: 'As a Man Thinketh', cover: '/images/books/as-a-man-thinketh.webp', author: 'James Allen', group: 'free', label: 'Free classic', bg: '#0F3D3E', ink: '#F2EDD8', about: 'A short classic on how thoughts shape character and life.' },
];

const holy = <section className="bk-holy" aria-labelledby="quran-title">
  <div className="bk-stand"><div className="bk-cover bk-cover-img bk-cover-quran"><img src="/images/books/quran.webp" alt="Cover of the Holy Qur'an: black, with gold Islamic ornament and the calligraphy al-Qur'an al-Karim" width={518} height={760} /></div></div>
  <div>
    <p className="bk-basmala" lang="ar" dir="rtl">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
    <span className="bk-cat">First, always · The Holy Book</span>
    <h2 id="quran-title">The Holy Qur’an</h2>
    <p className="bk-about">The word of Allah, and the first book on this shelf.</p>
    <a className="bk-act bk-dl" href="https://quran.com" target="_blank" rel="noopener noreferrer">Read on Quran.com ↗<span className="sr-only"> (opens in a new tab)</span></a>
  </div>
</section>;

export default function Books() {
  return <main className="container detail-page books-page">
    <p className="eyebrow">OFF DUTY · READING</p>
    <h1 className="detail-title">Books I <em>recommend.</em></h1>
    <p className="detail-lead">The books that shaped how I build, think and work, starting with the Holy Qur’an.</p>
    <BookShelf books={books} holy={holy} />
    <p className="bk-legal">Free downloads are offered only for public-domain classics. Other books link out so you can find a copy.</p>
  </main>;
}
