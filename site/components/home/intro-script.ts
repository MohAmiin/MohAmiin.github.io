// Runs inline before first paint (see app/page.tsx): shows the boarding-pass intro once per
// visit, never for visitors who prefer reduced motion. Kept out of the 'use client' file so the
// server component receives the real string.
export const introScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&sessionStorage.getItem('ma-intro')!=='1'){document.documentElement.classList.add('h4-intro')}}catch(e){}`;
