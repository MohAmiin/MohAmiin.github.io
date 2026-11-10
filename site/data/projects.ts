// ─────────────────────────────────────────────────────────────────────────────
//  PROJECTS: the one place to add or edit a project.
//  The homepage list and the Projects page both read from this file.
//
//  • Order here is the order on the site.
//  • Leave a field empty ('' or []) to hide it. Never put a link you don't want public.
//  • image: put the file in site/public/images/projects/ and write '/images/projects/name.webp'.
//    Without an image the card shows a designed cover instead.
//  • featured: true shows that project as the large case study at the top of the Projects page.
// ─────────────────────────────────────────────────────────────────────────────

export type Category = 'Software' | 'Design' | 'Finance';
/** done = finished or in use · active = being built · early = prototype or in preparation */
export type Tone = 'done' | 'active' | 'early';

export type Project = {
  slug: string;
  name: string;
  /** Small uppercase label above the name, e.g. 'MOBILE APP'. */
  type: string;
  category: Category;
  /** One line, used on the homepage. */
  summary: string;
  /** Two or three lines, used on the Projects page. */
  description: string;
  status: { label: string; tone: Tone };
  /** Tools and technologies, shown as tags. */
  stack: string[];
  image?: { src: string; alt: string; width: number; height: number };
  links: { caseStudy?: string; live?: string; github?: string };
  featured?: boolean;
  /** Key features, shown on the featured case study. */
  highlights?: string[];
};

export const projects: Project[] = [
  {
    slug: 'aoms',
    name: 'Airport Operations Management System',
    type: 'DIGITAL PRODUCT',
    category: 'Software',
    summary: 'A web platform that replaces paper tower logbooks and movement registers with one accountable, real-time record.',
    description: 'A web platform for the control tower that replaces paper logbooks and movement registers with one accountable, real-time record of tower operations.',
    status: { label: 'Development complete for current scope', tone: 'done' },
    stack: ['Next.js', 'Supabase', 'Vercel'],
    links: { caseStudy: '/projects/aoms' },
    featured: true,
    highlights: ['Arrival & departure registers', 'Digital tower logbook', 'Aircraft on ground', 'Live tower board', 'Verified controller attribution'],
  },
  {
    slug: 'jareeye',
    name: 'Jareeye Moto Delivery',
    type: 'MOBILE APP',
    category: 'Software',
    summary: 'A delivery platform prototype connecting customers with local motorcycle riders.',
    description: 'A delivery-app prototype connecting customers with local riders. Market validation is in progress.',
    status: { label: 'Prototype · market validation', tone: 'early' },
    stack: [],
    links: { caseStudy: '/projects/jareeye' },
  },
  {
    slug: 'websites',
    name: 'Websites for businesses',
    type: 'WEB DEVELOPMENT',
    category: 'Software',
    summary: 'Practical, responsive digital experiences for businesses and organisations.',
    description: 'Practical digital services, responsive sites and workflow tools for organisations.',
    status: { label: 'Selected work', tone: 'done' },
    stack: [],
    links: {},
  },
  {
    slug: 'excel-tools',
    name: 'Excel tools & templates',
    type: 'BUSINESS & FINANCE',
    category: 'Finance',
    summary: 'Custom accounting and budget spreadsheets, with free templates in preparation.',
    description: 'Custom accounting and budget spreadsheets, with reusable free templates being prepared for download.',
    status: { label: 'Free templates in preparation', tone: 'early' },
    stack: ['Advanced Excel'],
    links: { caseStudy: '/about#finance' },
  },
  {
    slug: 'graphic-design',
    name: 'Graphic design & visual work',
    type: 'GRAPHIC DESIGN',
    category: 'Design',
    summary: 'Graphic design and visual communication. Portfolio selection in progress.',
    description: 'Graphic design and visual communication. Selected work is being prepared for this portfolio.',
    status: { label: 'Portfolio selection in progress', tone: 'early' },
    stack: ['Photoshop', 'Illustrator', 'Figma', 'Canva'],
    links: { caseStudy: '/about#design' },
  },
];

/** The project's main link: its case study, else its live site, else its code. */
export const mainLink = (p: Project) => p.links.caseStudy || p.links.live || p.links.github || '';
