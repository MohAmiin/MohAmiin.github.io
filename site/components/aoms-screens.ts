import type { Screenshot } from './screenshot-gallery';

// Approved AOMS screenshots only: taken from a labelled demo environment with synthetic flight
// and movement data, stored in /public/images/aoms-demo/ (2047×1115 WebP). Leave entries out
// until approved; the pages then show labelled "demo screenshot pending" frames instead.
export const aomsDashboard: Screenshot | null = null;
// e.g. { src: '/images/aoms-demo/dashboard.webp', title: 'Tower dashboard', alt: '…', caption: '…', width: 2047, height: 1115 }

export const aomsWorkflows: Screenshot[] = [];

// Views the gallery is designed around, shown as pending frames until screenshots are approved.
export const aomsPlannedWorkflows = ['Arrival register', 'Departure register', 'Traffic statistics'];

// Workflow captions, describing what each demo screenshot is expected to show.
export const aomsWorkflowCaptions: Record<string, string> = {
  'Arrival register': 'Each arrival is recorded with its callsign, registration, route and actual time of arrival in Zulu, and receives a strip reference from the database. The entry form also captures the active runway, remaining endurance and people on board.',
  'Departure register': 'A departure can be prefilled from an aircraft already on the ground, including night stops, or recorded manually. The register filters by status, flight rules, destination and date range, and searches by callsign, registration or strip number.',
  'Traffic statistics': 'Totals of movements, arrivals, departures and people on board for a chosen period, with daily movements split into arrivals and departures and a breakdown by operator.',
};
