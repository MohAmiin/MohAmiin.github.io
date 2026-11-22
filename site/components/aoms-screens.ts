import type { Screenshot } from './screenshot-gallery';

// Approved AOMS screenshots only: taken from a labelled demo environment with synthetic flight
// and movement data, stored in /public/images/aoms-demo/ (2000×837 WebP, browser chrome cropped off).
// Never use screenshots of the live system: they hold real flights and staff names. Leave entries out
// until approved; the pages then show labelled "demo screenshot pending" frames instead.
export const aomsDashboard: Screenshot | null = {
  src: '/images/aoms-demo/dashboard.webp', title: 'Tower dashboard', width: 2000, height: 837,
  alt: 'AOMS tower dashboard for Hargeisa Tower: arrivals, departures, aircraft on ground and night-stop counts, expected traffic and aircraft on ground',
  caption: 'Tower dashboard: today’s arrivals and departures, aircraft on ground and night stops, expected traffic and aircraft waiting to depart.',
};
// e.g. { src: '/images/aoms-demo/dashboard.webp', title: 'Tower dashboard', alt: '…', caption: '…', width: 2047, height: 1115 }

// Tower board and logbook: development build (NON-PRODUCTION), synthetic aircraft such as STG501.
// Registers and statistics: the real AOMS screens (Sept 2026 code) rendered with made-up traffic
// (DEMO/STG/TST callsigns, 6O-DMx/STx/TCx registrations, Demo Air, Sample Aviation, Test Cargo).
export const aomsWorkflows: Screenshot[] = [
  { src: '/images/aoms-demo/tower-board.webp', title: 'Tower board', width: 2000, height: 837,
    alt: 'AOMS live tower board: expected arrivals, arrivals, departures, aircraft on ground, night stops and completed movements, with expected and on-ground lists',
    caption: 'One live board for the whole position: expected, actual, grounded and completed traffic, with local and UTC time side by side.' },
  { src: '/images/aoms-demo/logbook.webp', title: 'Tower logbook', width: 2000, height: 837,
    alt: 'AOMS tower logbook: the confirmed active runway, search and filters, and a log entry recording the runway confirmation',
    caption: 'A digital tower logbook: the active runway is confirmed for the duty session and logged automatically, and entries filter by shift, activity, category and priority.' },
  { src: '/images/aoms-demo/arrival-register.webp', title: 'Arrival register', width: 2000, height: 837,
    alt: 'AOMS arrival register: made-up arrivals with strip and movement numbers, callsign, registration, operator, aircraft, origin, ATA in Zulu, POB, endurance, runway and status',
    caption: 'Every arrival gets a strip and movement number from the database, with the actual time of arrival in Zulu, people on board, endurance, runway and a live status such as on ground or night stop.' },
  { src: '/images/aoms-demo/departure-register.webp', title: 'Departure register', width: 2000, height: 837,
    alt: 'AOMS departure register: made-up departures with strip, callsign, aircraft, destination, runway, ATD in Zulu, endurance and status',
    caption: 'Departures carry their own strip numbers and filter by status, flight rules, destination and date; a departure stays incomplete until its actual time is recorded.' },
  { src: '/images/aoms-demo/statistics.webp', title: 'Traffic statistics', width: 2000, height: 837,
    alt: 'AOMS statistics for a reporting period: total movements, arrivals, departures and people on board, with a daily breakdown and CSV exports',
    caption: 'Totals of movements, arrivals, departures and people on board for any period, broken down by day, operator and aircraft type, with CSV exports.' },
];

// Views the gallery is designed around, shown as pending frames until screenshots are approved.
export const aomsPlannedWorkflows = ['Tower board', 'Tower logbook', 'Arrival register', 'Departure register', 'Traffic statistics'];

// Workflow captions, describing what each demo screenshot is expected to show.
export const aomsWorkflowCaptions: Record<string, string> = {
  'Arrival register': 'Each arrival is recorded with its callsign, registration, route and actual time of arrival in Zulu, and receives a strip reference from the database. The entry form also captures the active runway, remaining endurance and people on board.',
  'Departure register': 'A departure can be prefilled from an aircraft already on the ground, including night stops, or recorded manually. The register filters by status, flight rules, destination and date range, and searches by callsign, registration or strip number.',
  'Traffic statistics': 'Totals of movements, arrivals, departures and people on board for a chosen period, with daily movements split into arrivals and departures and a breakdown by operator.',
};
