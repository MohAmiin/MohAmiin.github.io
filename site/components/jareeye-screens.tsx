// Real Jareeye screens from the development preview (made-up sample data, no real accounts) and the
// admin dashboard on staging with a test account. Each screen has a light and a dark version; the
// one matching the site's theme is shown (both are lazy, so only the visible one downloads).
type Shot = { key: string; title: string; caption: string; light: string; dark?: string };

const groups: { label: string; shots: Shot[] }[] = [
  { label: 'Customer', shots: [
    { key: 'home', title: 'Home', caption: 'Map first: nearby riders, then one button to request a moto.', light: 'customer-home-light', dark: 'customer-home-dark' },
    { key: 'tracker', title: 'Open request', caption: 'The request tracker sits over the map: sent, accepted, picked up, delivered.', light: 'tracker-light', dark: 'tracker-dark' },
  ] },
  { label: 'Rider', shots: [
    { key: 'online', title: 'Online', caption: 'Available: nearby customers can see the rider and call.', light: 'rider-online-light', dark: 'rider-online-dark' },
    { key: 'busy', title: 'Busy', caption: 'On a delivery, with the time until the rider shows as available again.', light: 'rider-busy-light' },
    { key: 'offline', title: 'Offline', caption: 'Hidden from customers until the rider goes online.', light: 'rider-offline-light', dark: 'rider-offline-dark' },
  ] },
  { label: 'Admin', shots: [
    { key: 'admin', title: 'Dashboard', caption: 'Riders online, deliveries, customers, approvals and requests at a glance.', light: 'admin-light', dark: 'admin-dark' },
  ] },
];

export default function JareeyeScreens() {
  return <div className="jx-groups">
    {groups.map(g => <div className="jx-group" key={g.label}>
      <p className="section-tag">{g.label}</p>
      <div className="jx-row">
        {g.shots.map(s => <figure className="jx-shot" key={s.key}>
          <div className="jx-phone">
            <img className={s.dark ? 'jx-light' : undefined} src={`/images/jareeye/${s.light}.webp`} alt={`Jareeye ${g.label.toLowerCase()} app: ${s.title} screen`} width={780} height={1688} loading="lazy" decoding="async" />
            {s.dark && <img className="jx-dark" src={`/images/jareeye/${s.dark}.webp`} alt={`Jareeye ${g.label.toLowerCase()} app: ${s.title} screen`} width={780} height={1688} loading="lazy" decoding="async" />}
          </div>
          <figcaption><b>{s.title}</b>{s.caption}</figcaption>
        </figure>)}
      </div>
    </div>)}
  </div>;
}
