import { useState, useEffect } from 'react';

type PageId = 'acasa' | 'camere' | 'facilitati' | 'zona' | 'recenzii' | 'contact';

interface RetreatPanel {
  id: string;
  name: string;
  tag: string;
  detail: string;
  capacity: string;
  summary: string;
  baseGradient: string;
  textColor: string;
  mutedColor: string;
  accentLine: string;
  filterId: string;
  contourPath: string;
  cornerIconPath: string;
}

const PANELS: RetreatPanel[] = [
  {
    id: 'camere',
    name: 'Camere & Balcon',
    tag: '6 duble · 1 triplă',
    detail: 'Baie proprie, balcon și vedere spre Pietrosul Rodnei',
    capacity: '15 locuri în 7 camere',
    summary: 'Camere luminoase de 16–24 mp cu pat matrimonial, balcon și priveliște spre munte',
    baseGradient: 'linear-gradient(155deg, #FBF9F4 0%, #EFE9DC 55%, #E2D9C6 100%)',
    textColor: '#171C18',
    mutedColor: '#4E564F',
    accentLine: '#7A5C43',
    filterId: 'grain-linen',
    contourPath: 'M -10 70 Q 90 40, 180 110 T 320 150 M -10 210 Q 110 175, 220 240 T 320 280',
    cornerIconPath: 'M 3 19 L 11 7 L 19 19 Z M 8 19 L 14 11 L 20 19',
  },
  {
    id: 'ciubar',
    name: 'Ciubăr & Foișor',
    tag: 'Apă caldă · 6–8 locuri',
    detail: 'Ciubăr în aer liber, foișor cu grătar, ceaun și cuptor pizza',
    capacity: 'Curte mare, livadă & hamace',
    summary: 'Relaxare în ciubăr sub cerul liber și seri la foișor cu grătar, ceaun și cuptor',
    baseGradient: 'linear-gradient(160deg, #212922 0%, #171D18 60%, #101411 100%)',
    textColor: '#F4F1EA',
    mutedColor: '#A3ACA4',
    accentLine: '#C4A47C',
    filterId: 'grain-spruce',
    contourPath: 'M 0 90 C 90 120, 190 60, 300 100 M 0 230 C 100 260, 200 190, 300 235',
    cornerIconPath: 'M 4 15 Q 11 10, 18 15 M 4 19 Q 11 14, 18 19 M 8 8 Q 9 5, 8 3 M 14 8 Q 15 5, 14 3',
  },
  {
    id: 'bucate',
    name: 'Bucate de Casă',
    tag: 'Tradițional Maramureș',
    detail: 'Mic dejun cu ouă de casă, caș proaspăt și bucătărie utilată',
    capacity: 'Salon de mese & bucătărie',
    summary: 'Mic dejun cu produse locale proaspete sau acces la bucătăria complet utilată',
    baseGradient: 'linear-gradient(165deg, #E8DFCE 0%, #D8CBB4 55%, #C8B89D 100%)',
    textColor: '#171C18',
    mutedColor: '#52493E',
    accentLine: '#7A5C43',
    filterId: 'grain-cedar',
    contourPath: 'M 0 80 Q 140 55, 300 95 M 0 185 Q 150 205, 300 175 M 0 280 Q 140 260, 300 290',
    cornerIconPath: 'M 5 12 A 6 6 0 0 0 17 12 Z M 3 18 L 19 18',
  },
  {
    id: 'munte',
    name: 'Munții Rodnei',
    tag: 'Drumeții & Off-road',
    detail: 'Trasee spre Pietrosul Rodnei, Mănăstirea Moisei și Mocănița',
    capacity: 'Str. Izvorul Negru 257B, Moisei',
    summary: 'La poalele Vârfului Pietrosul Rodnei, aproape de Mocănița Vișeu și pârtiile Borșa',
    baseGradient: 'linear-gradient(150deg, #E7ECE4 0%, #D5DDD1 50%, #C2CCBD 100%)',
    textColor: '#171C18',
    mutedColor: '#485249',
    accentLine: '#3A4D3E',
    filterId: 'grain-alpine',
    contourPath: 'M -20 140 L 85 55 L 175 130 L 245 75 L 320 145 M -10 260 Q 150 220, 310 265',
    cornerIconPath: 'M 2 18 L 9 7 L 15 14 L 18 10 L 21 18 Z',
  },
];

const HIGHLIGHTS = [
  {
    title: 'Camere cu balcon spre Pietrosul Rodnei',
    detail: '6 camere duble (16 mp) și 1 cameră triplă (24 mp), fiecare cu baie proprie și balcon.',
  },
  {
    title: 'Ciubăr în aer liber și foișor cu grătar',
    detail: 'Ciubăr cu apă caldă (6–8 locuri), foișor din lemn cu grătar, ceaun și cuptor de pizza.',
  },
  {
    title: 'Livadă cu hamace și loc de joacă',
    detail: 'Curte verde spațioasă, terasă însorită, hamace în livadă și spațiu sigur pentru copii.',
  },
  {
    title: 'Drumeții și ture off-road în munți',
    detail: 'Trasee în Parcul Național Munții Rodnei și experiențe off-road organizate de gazde.',
  },
];

const ROOMS = [
  {
    name: 'Cameră Dublă Matrimonială',
    count: '6 camere disponibile',
    size: '16 mp · 2 adulți',
    spec: 'Pat matrimonial, balcon cu vedere spre munte sau grădină, baie privată cu duș, TV și Wi-Fi.',
    panel: PANELS[0],
  },
  {
    name: 'Cameră Triplă de Familie',
    count: '1 cameră disponibilă',
    size: '24 mp · 3 persoane',
    spec: 'Pat matrimonial + pat single, balcon panoramic spre Pietrosul Rodnei, baie privată cu duș.',
    panel: PANELS[2],
  },
  {
    name: 'Închiriere Integrală (Grupuri)',
    count: 'Toată pensiunea · 7 camere',
    size: '15 locuri · Acces exclusiv',
    spec: 'Living spațios, sală de mese, bucătărie utilată, foișor cu grătar și ciubăr în curte.',
    panel: PANELS[1],
  },
];

const FACILITY_SKETCHES = [
  {
    id: 'ciubar',
    name: 'Ciubăr 6–8 locuri',
    spec: 'Cadă din lemn cu apă caldă în aer liber, disponibilă vara și iarna.',
    svgPath: 'M 45 75 L 195 75 L 182 135 L 58 135 Z M 52 95 L 188 95 M 90 55 Q 96 40, 90 28 M 120 55 Q 126 40, 120 28 M 150 55 Q 156 40, 150 28',
  },
  {
    id: 'foisor',
    name: 'Foișor & Grătar',
    spec: 'Foișor acoperit din lemn masiv cu grătar, ceaun și cuptor pentru pizza.',
    svgPath: 'M 35 80 L 120 35 L 205 80 Z M 55 80 L 55 140 M 185 80 L 185 140 M 35 140 L 205 140 M 105 140 L 105 100 L 135 100 L 135 140',
  },
  {
    id: 'livada',
    name: 'Livadă cu hamace',
    spec: 'Zonă de relaxare cu hamace în livadă, curte verde și loc de joacă.',
    svgPath: 'M 40 45 L 40 140 M 200 45 L 200 140 M 40 85 Q 120 135, 200 85 M 40 85 Q 120 112, 200 85',
  },
  {
    id: 'bucatarie',
    name: 'Bucătărie & Salon',
    spec: 'Bucătărie complet utilată pentru oaspeți, sală de mese și mic dejun de casă.',
    svgPath: 'M 35 110 L 205 110 M 55 110 L 55 145 M 185 110 L 185 145 M 85 110 L 95 82 L 145 82 L 155 110',
  },
];

const LANDMARKS = [
  {
    title: 'Vârful Pietrosul Rodnei (2303 m)',
    distance: 'La poalele masivului · Moisei',
    panel: PANELS[3],
    sketch: 'M 20 165 L 95 65 L 155 125 L 205 80 L 255 165 Z',
  },
  {
    title: 'Mănăstirea Moisei & Monumentul Martirilor',
    distance: '2–3 km · Str. Izvorul Negru',
    panel: PANELS[0],
    sketch: 'M 85 165 L 85 95 L 120 40 L 155 95 L 155 165 M 120 22 L 120 40 M 112 30 L 128 30',
  },
  {
    title: 'Mocănița de pe Valea Vaserului',
    distance: '13 km · Vișeu de Sus',
    panel: PANELS[2],
    sketch: 'M 35 135 L 220 135 M 55 135 L 55 95 L 135 95 L 135 135 M 155 135 L 155 75 L 185 75 L 185 135 M 75 145 A 10 10 0 1 0 75 144.9 M 165 145 A 10 10 0 1 0 165 144.9',
  },
  {
    title: 'Telegondola Borșa & Cascada Cailor',
    distance: '12–15 km · Stațiunea Borșa',
    panel: PANELS[1],
    sketch: 'M 30 55 L 230 125 M 130 90 L 130 115 M 110 115 L 150 115 L 150 145 L 110 145 Z',
  },
];

const REVIEWS = [
  {
    author: 'Bumbas Costin',
    date: 'Martie 2026 · Nota 10/10',
    quote:
      'Pensiunea este spațioasă, camerele sunt foarte curate, iar curtea oferă mult loc pentru relaxare. Ciubărul și foișorul au fost un mare plus. Micul dejun gustos și gazde foarte ospitaliere.',
  },
  {
    author: 'Patricia',
    date: 'Iulie 2025 · Nota 10/10',
    quote:
      'Ne-am răsfățat cu mic dejun cu ouă de casă și caș proaspăt, iar ciubărul din curte a fost o adevărată relaxare. Camera triplă e perfectă pentru familii, iar curtea și locul de joacă i-au încântat pe cei mici.',
  },
  {
    author: 'Corina Petrache',
    date: 'Verificat TuristInfo · Nota 10/10',
    quote:
      'Am descoperit un loc în care liniștea și natura îți dau o stare de bine de la primul pas. Experiența off-road organizată de gazdă a fost una dintre cele mai tari aventuri trăite împreună.',
  },
  {
    author: 'Maria & Costin',
    date: 'Iulie 2025 · Nota 10/10',
    quote:
      'Bucatele sunt delicioase, camerele impecabile, iar priveliștea spre Vârful Pietrosul Rodnei îți taie răsuflarea. Gazda primitoare ne-a făcut să ne simțim ca acasă.',
  },
];

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'acasa', label: 'Acasă' },
  { id: 'camere', label: 'Camere' },
  { id: 'facilitati', label: 'Facilități' },
  { id: 'zona', label: 'Zonă & Trasee' },
  { id: 'recenzii', label: 'Recenzii' },
  { id: 'contact', label: 'Contact' },
];

/** Subtle topographic ridge lines of Pietrosul Rodnei */
function CarpathianContours() {
  return (
    <svg
      viewBox="0 0 1200 600"
      fill="none"
      className="absolute inset-0 w-full h-full pointer-events-none select-none animate-contour-breath"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path
        d="M 0 420 C 220 340, 390 210, 580 120 C 740 45, 920 190, 1200 290"
        stroke="#7A5C43"
        strokeWidth="1.1"
      />
      <path
        d="M 0 490 C 250 410, 420 280, 600 185 C 770 110, 950 250, 1200 350"
        stroke="#171C18"
        strokeWidth="0.7"
      />
      <path
        d="M 0 550 C 280 470, 460 350, 620 255 C 800 180, 980 310, 1200 410"
        stroke="#7A5C43"
        strokeWidth="0.6"
        strokeDasharray="6 6"
      />
    </svg>
  );
}

export function App() {
  const [page, setPage] = useState<PageId>('acasa');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeFacility, setActiveFacility] = useState<number>(0);

  // Auto-cycle hero panels
  useEffect(() => {
    if (isPaused || page !== 'acasa') return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PANELS.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [isPaused, activeIndex, page]);

  // Escape closes mobile menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navigate = (next: PageId) => {
    setPage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activePanel = PANELS[activeIndex];
  const currentFacility = FACILITY_SKETCHES[activeFacility];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F4F1EA] text-[#171C18]">
      {/* Hidden SVG Organic Filters for Linen, Spruce, Cedar & Alpine grain */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id="grain-linen" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04 0.12" numOctaves="3" seed="5" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.92  0 1 0 0 0.89  0 0 1 0 0.84  0 0 0 0.18 0"
            />
          </filter>
          <filter id="grain-spruce" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="3" seed="9" />
            <feColorMatrix
              type="matrix"
              values="0.2 0 0 0 0.10  0 0.25 0 0 0.13  0 0 0.2 0 0.10  0 0 0 0.28 0"
            />
          </filter>
          <filter id="grain-cedar" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="turbulence" baseFrequency="0.008 0.085" numOctaves="3" seed="12" />
            <feColorMatrix
              type="matrix"
              values="0.8 0 0 0 0.76  0 0.72 0 0 0.68  0 0 0.62 0 0.58  0 0 0 0.22 0"
            />
          </filter>
          <filter id="grain-alpine" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.04" numOctaves="4" seed="18" />
            <feColorMatrix
              type="matrix"
              values="0.85 0 0 0 0.82  0 0.90 0 0 0.86  0 0 0.85 0 0.80  0 0 0 0.22 0"
            />
          </filter>
        </defs>
      </svg>

      {/* ─── Header (Desktop: Nav Bar Only | Mobile: Burger Only) ─── */}
      <header className="sticky top-0 z-50 bg-[#F4F1EA]/95 backdrop-blur-sm border-b border-[#D8D2C5] px-5 sm:px-12 py-3.5 sm:py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('acasa')}
            className="font-display text-2xl sm:text-3xl font-normal tracking-normal text-[#171C18] cursor-pointer"
          >
            Pensiunea Simi
          </button>

          {/* Desktop Only: Nav Links + Phone CTA */}
          <div className="hidden md:flex items-center gap-7 text-sm text-[#4E564F]">
            <nav className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={`cursor-pointer transition-colors ${
                    page === item.id
                      ? 'text-[#171C18] font-medium underline underline-offset-8 decoration-[#7A5C43]'
                      : 'hover:text-[#171C18]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <a
              href="tel:+40740981839"
              className="px-4 py-2 bg-[#171C18] text-[#F4F1EA] text-sm font-medium hover:bg-[#28312A] transition-colors"
            >
              0740 981 839
            </a>
          </div>

          {/* Mobile Only: Clean Light-Theme Burger Icon */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'}
            className="flex md:hidden w-9 h-9 flex-col items-end justify-center gap-1.5 text-[#171C18] cursor-pointer"
          >
            <span
              className={`block h-[1.5px] bg-[#171C18] transition-all duration-300 ${
                menuOpen ? 'w-6 translate-y-[3.75px] rotate-45' : 'w-6'
              }`}
            />
            <span
              className={`block h-[1.5px] bg-[#171C18] transition-all duration-300 ${
                menuOpen ? 'w-6 -translate-y-[3.75px] -rotate-45' : 'w-4'
              }`}
            />
          </button>
        </div>
      </header>

      {/* ─── Light-Theme Mobile Burger Menu (Aligned Directly Under Header) ─── */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Meniu"
          className="fixed inset-x-0 top-[57px] bottom-0 z-40 md:hidden bg-[#F4F1EA] text-[#171C18] px-5 pt-2 pb-8 flex flex-col justify-between overflow-y-auto"
        >
          <CarpathianContours />

          <nav className="relative z-10 divide-y divide-[#D8D2C5] border-b border-[#D8D2C5]">
            {NAV_ITEMS.map((item) => {
              const isActive = page === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer group"
                >
                  <span
                    className={`font-display text-3xl transition-colors ${
                      isActive ? 'text-[#171C18] font-medium' : 'text-[#4E564F] group-hover:text-[#171C18]'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`text-xs ${
                      isActive ? 'text-[#7A5C43] font-medium' : 'text-[#7A5C43]/60'
                    }`}
                  >
                    {isActive ? '•' : '→'}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="relative z-10 space-y-3 pt-6">
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:+40740981839"
                className="py-3.5 bg-[#171C18] text-[#F4F1EA] text-xs font-medium text-center"
              >
                Sună: 0740 981 839
              </a>
              <a
                href="https://wa.me/40740981839?text=Bun%C4%83%20ziua%2C%20doresc%20s%C4%83%20verific%20disponibilitatea%20la%20Pensiunea%20Simi%20din%20Moisei."
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 border border-[#171C18] bg-[#F4F1EA] text-[#171C18] text-xs font-medium text-center"
              >
                WhatsApp
              </a>
            </div>
            <p className="text-xs text-[#4E564F] text-center">
              Str. Izvorul Negru nr. 257B, Moisei, Maramureș
            </p>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* =========================================================
            1. ACASĂ (Mobile-First Zero-Scroll Viewport + Full-Size Retreat Panels)
           ========================================================= */}
        {page === 'acasa' && (
          <>
            <section className="relative px-5 sm:px-12 pt-4 pb-6 sm:py-20 border-b border-[#D8D2C5] overflow-hidden">
              <CarpathianContours />

              <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center">
                {/* Left Column: Mobile-First Statement & Clean Call to Action */}
                <div className="lg:col-span-6 space-y-3 sm:space-y-6 animate-card-1">
                  <h1 className="font-display text-[33px] sm:text-6xl lg:text-[64px] font-normal leading-[1.05] text-[#171C18]">
                    Liniște și aer de munte la poalele Pietrosului Rodnei.
                  </h1>

                  <p className="text-sm sm:text-lg text-[#4E564F] leading-snug sm:leading-relaxed max-w-lg">
                    7 camere cu balcon, ciubăr cu apă caldă, foișor cu grătar și bucate tradiționale de casă în Moisei, Maramureș.
                  </p>

                  {/* Clean Hero Call to Action (Side-by-side on mobile, inline on desktop) */}
                  <div className="pt-1 sm:pt-2 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3.5">
                    <a
                      href="tel:+40740981839"
                      className="px-4 sm:px-7 py-3 sm:py-4 bg-[#171C18] text-[#F4F1EA] text-xs sm:text-sm font-medium text-center transition-all shadow-[0_10px_28px_-10px_rgba(23,28,24,0.45)] hover:bg-[#28312A]"
                    >
                      Sună: 0740 981 839
                    </a>

                    <button
                      type="button"
                      onClick={() => navigate('camere')}
                      className="px-4 sm:px-7 py-3 sm:py-4 border border-[#171C18] bg-[#F4F1EA] text-[#171C18] text-xs sm:text-sm font-medium text-center hover:bg-[#E7E0D2] transition-colors cursor-pointer"
                    >
                      Vezi camerele
                    </button>
                  </div>
                </div>

                {/* Right Column: Full-Size Kinetic Carpathian Retreat Panels */}
                <div
                  className="lg:col-span-6"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="flex gap-2 sm:gap-3 h-76 sm:h-96">
                    {PANELS.map((panel, idx) => {
                      const isActive = idx === activeIndex;
                      const riseClass =
                        idx === 0
                          ? 'animate-card-1'
                          : idx === 1
                          ? 'animate-card-2'
                          : idx === 2
                          ? 'animate-card-3'
                          : 'animate-card-4';

                      return (
                        <button
                          key={panel.id}
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          style={{
                            background: panel.baseGradient,
                            color: panel.textColor,
                          }}
                          className={`panel-transition ${riseClass} relative overflow-hidden text-left p-4 sm:p-5 flex flex-col justify-between cursor-pointer border ${
                            isActive
                              ? 'flex-[2.7] border-[#171C18] shadow-[0_20px_45px_-18px_rgba(23,28,24,0.35)]'
                              : 'flex-1 border-[#D8D2C5] opacity-80 hover:opacity-100'
                          }`}
                        >
                          {/* Organic Surface Filter */}
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            aria-hidden="true"
                          >
                            <rect width="100%" height="100%" filter={`url(#${panel.filterId})`} />
                          </svg>

                          {/* Fine Topographic & Timber Contour Geometry */}
                          <svg
                            viewBox="0 0 300 380"
                            fill="none"
                            preserveAspectRatio="none"
                            className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
                            aria-hidden="true"
                          >
                            <path
                              d={panel.contourPath}
                              stroke={panel.accentLine}
                              strokeWidth="1.2"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>

                          {/* Morning Sunlight Sweep on Active Panel */}
                          {isActive && (
                            <div
                              className="animate-morning-light absolute inset-y-0 -left-1/4 w-1/2 pointer-events-none"
                              style={{
                                background:
                                  panel.id === 'ciubar'
                                    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)'
                                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
                              }}
                            />
                          )}

                          {/* Top Tag & Animated Corner Motif */}
                          <div className="relative z-10 flex items-center justify-between gap-2">
                            <span
                              className="text-xs tracking-wide transition-opacity duration-300 truncate"
                              style={{
                                color: panel.mutedColor,
                                opacity: isActive ? 1 : 0,
                              }}
                            >
                              {panel.tag}
                            </span>

                            {isActive && (
                              <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                className="shrink-0"
                                aria-hidden="true"
                              >
                                <path
                                  d={panel.cornerIconPath}
                                  stroke={panel.accentLine}
                                  strokeWidth="1.2"
                                  className="animate-draw-contour"
                                />
                              </svg>
                            )}
                          </div>

                          {/* Bottom Title & Detail */}
                          <div className="relative z-10 space-y-1">
                            <span className="font-display text-xl sm:text-2xl font-normal block leading-tight">
                              {panel.name}
                            </span>

                            {isActive && (
                              <p
                                className="text-xs leading-snug line-clamp-2"
                                style={{ color: panel.mutedColor }}
                              >
                                {panel.detail}
                              </p>
                            )}
                          </div>

                          {/* Bottom Cedar Progress Hairline */}
                          {isActive && !isPaused && (
                            <span
                              key={`progress-${activeIndex}`}
                              className="animate-panel-progress absolute bottom-0 left-0 right-0 h-[2px]"
                              style={{ backgroundColor: panel.accentLine }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Panel Caption Bar */}
                  <div className="mt-3 sm:mt-4 pt-3 border-t border-[#D8D2C5] flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 text-xs sm:text-sm">
                    <div className="truncate">
                      <span className="font-medium text-[#171C18]">{activePanel.name}</span>
                      <span className="text-[#4E564F]"> — {activePanel.summary}</span>
                    </div>
                    <span className="text-xs font-medium text-[#7A5C43] shrink-0">
                      {activePanel.capacity}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Ospitalitate în Moisei (Quiet Ledger) ─── */}
            <section className="px-5 sm:px-12 py-16 sm:py-20 border-b border-[#D8D2C5]">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-baseline justify-between mb-10">
                  <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#171C18]">
                    Ospitalitate în Maramureș
                  </h2>
                  <button
                    type="button"
                    onClick={() => navigate('facilitati')}
                    className="text-sm text-[#7A5C43] hover:text-[#171C18] transition-colors cursor-pointer"
                  >
                    Toate facilitățile →
                  </button>
                </div>

                <div className="divide-y divide-[#D8D2C5] border-t border-b border-[#D8D2C5]">
                  {HIGHLIGHTS.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => navigate('camere')}
                      className="w-full text-left group py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 transition-colors hover:bg-[#E7E0D2]/50 px-2 -mx-2 cursor-pointer"
                    >
                      <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#171C18] group-hover:translate-x-1 transition-transform duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#4E564F] max-w-md">
                        {item.detail}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* =========================================================
            2. CAMERE (7 Camere · 15 Locuri · Balcon & Baie Proprie)
           ========================================================= */}
        {page === 'camere' && (
          <section className="relative px-5 sm:px-12 py-14 sm:py-20 border-b border-[#D8D2C5] overflow-hidden">
            <CarpathianContours />
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#7A5C43] mb-2">
                    Cazare · 7 Camere · 15 Locuri
                  </p>
                  <h1 className="font-display text-4xl sm:text-5xl font-normal text-[#171C18]">
                    Camere cu balcon spre munte
                  </h1>
                </div>
                <p className="text-sm text-[#4E564F]">
                  Acceptăm plata cu tichete și carduri de vacanță.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {ROOMS.map((room, idx) => (
                  <div
                    key={room.name}
                    className={`border border-[#D8D2C5] bg-[#F4F1EA] flex flex-col justify-between animate-card-${idx + 1}`}
                  >
                    <div
                      style={{
                        background: room.panel.baseGradient,
                        color: room.panel.textColor,
                      }}
                      className="relative h-52 p-5 flex flex-col justify-between overflow-hidden"
                    >
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                        <rect width="100%" height="100%" filter={`url(#${room.panel.filterId})`} />
                      </svg>
                      <svg
                        viewBox="0 0 300 380"
                        fill="none"
                        preserveAspectRatio="none"
                        className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
                        aria-hidden="true"
                      >
                        <path
                          d={room.panel.contourPath}
                          stroke={room.panel.accentLine}
                          strokeWidth="1.2"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>

                      <div className="relative z-10 flex items-center justify-between text-xs">
                        <span style={{ color: room.panel.mutedColor }}>{room.count}</span>
                        <span
                          className="px-2 py-0.5 border text-[11px]"
                          style={{
                            borderColor: room.panel.accentLine,
                            color: room.panel.textColor,
                          }}
                        >
                          {room.size}
                        </span>
                      </div>

                      <h2 className="relative z-10 font-display text-3xl font-normal leading-tight">
                        {room.name}
                      </h2>
                    </div>

                    <div className="p-5 space-y-4 bg-[#F4F1EA]">
                      <p className="text-sm text-[#4E564F] leading-snug">{room.spec}</p>
                      <a
                        href="tel:+40740981839"
                        className="inline-block text-xs font-medium text-[#7A5C43] hover:text-[#171C18] underline underline-offset-4"
                      >
                        Verifică disponibilitatea: 0740 981 839 →
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-[#D8D2C5] flex flex-wrap items-center justify-between gap-4 text-sm text-[#4E564F]">
                <span>Check-in: 13:00 – 15:00 &nbsp;·&nbsp; Check-out: până la 12:00</span>
                <span>Parcare privată gratuită &nbsp;·&nbsp; Wi-Fi gratuit</span>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            3. FACILITĂȚI (Ciubăr, Foișor, Livadă & Bucate de Casă)
           ========================================================= */}
        {page === 'facilitati' && (
          <section className="relative px-5 sm:px-12 py-14 sm:py-20 border-b border-[#D8D2C5] overflow-hidden">
            <CarpathianContours />
            <div className="relative z-10 max-w-6xl mx-auto space-y-16">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#7A5C43] mb-2">
                  Curte & Relaxare
                </p>
                <h1 className="font-display text-4xl sm:text-5xl font-normal text-[#171C18]">
                  Totul pregătit pentru odihnă.
                </h1>
              </div>

              <div className="divide-y divide-[#D8D2C5] border-y border-[#D8D2C5]">
                {[
                  {
                    num: '01',
                    title: 'Ciubăr cu apă caldă în aer liber',
                    desc: 'Capacitate de 6–8 persoane, ideal pentru relaxare cu vedere spre munte.',
                  },
                  {
                    num: '02',
                    title: 'Foișor din lemn cu grătar, ceaun și cuptor',
                    desc: 'Zonă acoperită de luat masa în aer liber, dotată cu grătar, ceaun și cuptor de pizza.',
                  },
                  {
                    num: '03',
                    title: 'Livadă cu hamace și loc de joacă',
                    desc: 'Curte verde generoasă, terasă la soare, hamace în livadă și spațiu pentru copii.',
                  },
                  {
                    num: '04',
                    title: 'Mic dejun de casă și bucătărie utilată',
                    desc: 'Ouă de casă, caș proaspăt, clătite calde sau acces la bucătăria complet echipată.',
                  },
                ].map((f) => (
                  <div
                    key={f.num}
                    className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-medium text-[#7A5C43]">{f.num}</span>
                      <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#171C18]">
                        {f.title}
                      </h2>
                    </div>
                    <p className="text-sm sm:text-base text-[#4E564F] max-w-md">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* Minimal Claude-Style Vector Sketch Switcher */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
                <div className="lg:col-span-6 space-y-4">
                  <p className="text-xs uppercase tracking-widest text-[#7A5C43]">
                    Amenajare exterioară & interioară
                  </p>
                  <h2 className="font-display text-3xl font-normal text-[#171C18]">
                    Spații dedicate grupurilor și familiilor
                  </h2>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {FACILITY_SKETCHES.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveFacility(idx)}
                        className={`px-4 py-2 text-xs font-medium border transition-colors cursor-pointer ${
                          activeFacility === idx
                            ? 'bg-[#171C18] text-[#F4F1EA] border-[#171C18]'
                            : 'bg-transparent text-[#171C18] border-[#D8D2C5] hover:border-[#171C18]'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-[#4E564F] pt-1">{currentFacility.spec}</p>
                </div>

                <div className="lg:col-span-6 border border-[#D8D2C5] bg-[#E7E0D2]/60 p-6 flex items-center justify-between">
                  <svg
                    key={currentFacility.id}
                    viewBox="0 0 240 165"
                    fill="none"
                    className="w-full h-36"
                    aria-label={currentFacility.name}
                  >
                    <path
                      d={currentFacility.svgPath}
                      stroke="#171C18"
                      strokeWidth="1.6"
                      className="animate-draw-contour"
                    />
                    <circle cx="120" cy="75" r="3" fill="#7A5C43" />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            4. ZONĂ & TRASEE (Atracții reale în jurul comunei Moisei)
           ========================================================= */}
        {page === 'zona' && (
          <section className="relative px-5 sm:px-12 py-14 sm:py-20 border-b border-[#D8D2C5] overflow-hidden">
            <CarpathianContours />
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="mb-12">
                <p className="text-xs uppercase tracking-widest text-[#7A5C43] mb-2">
                  Moisei · Maramureș
                </p>
                <h1 className="font-display text-4xl sm:text-5xl font-normal text-[#171C18]">
                  Trasee și obiective în apropiere
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {LANDMARKS.map((item, idx) => (
                  <div
                    key={item.title}
                    className={`border border-[#D8D2C5] animate-card-${idx + 1}`}
                  >
                    <div
                      style={{
                        background: item.panel.baseGradient,
                        color: item.panel.textColor,
                      }}
                      className="relative h-56 p-6 flex flex-col justify-between overflow-hidden"
                    >
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                        <rect width="100%" height="100%" filter={`url(#${item.panel.filterId})`} />
                      </svg>
                      <svg
                        viewBox="0 0 300 380"
                        fill="none"
                        preserveAspectRatio="none"
                        className="absolute inset-0 w-full h-full pointer-events-none opacity-35"
                        aria-hidden="true"
                      >
                        <path
                          d={item.panel.contourPath}
                          stroke={item.panel.accentLine}
                          strokeWidth="1.2"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>

                      <svg
                        viewBox="0 0 270 190"
                        fill="none"
                        className="relative z-10 w-44 h-32 self-end opacity-85"
                        aria-hidden="true"
                      >
                        <path
                          d={item.sketch}
                          stroke={item.panel.accentLine}
                          strokeWidth="1.5"
                          className="animate-draw-contour"
                        />
                      </svg>

                      <div className="relative z-10 flex items-baseline justify-between gap-4">
                        <h2 className="font-display text-2xl sm:text-3xl font-normal">
                          {item.title}
                        </h2>
                        <span className="text-xs shrink-0" style={{ color: item.panel.mutedColor }}>
                          {item.distance}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            5. RECENZII (Nota 10 / 10 Verificată pe TuristInfo)
           ========================================================= */}
        {page === 'recenzii' && (
          <section className="relative px-5 sm:px-12 py-16 sm:py-24 border-b border-[#D8D2C5] overflow-hidden">
            <CarpathianContours />
            <div className="relative z-10 max-w-6xl mx-auto space-y-12">
              <div className="max-w-2xl space-y-4">
                <p className="text-xs uppercase tracking-widest text-[#7A5C43]">
                  Oaspeți verificați · Nota 10 / 10
                </p>
                <h1 className="font-display text-4xl sm:text-6xl font-normal leading-[1.06] text-[#171C18]">
                  Impresii din Moisei.
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {REVIEWS.map((rev, idx) => (
                  <div
                    key={rev.author}
                    className={`p-6 border border-[#D8D2C5] bg-[#E7E0D2]/45 flex flex-col justify-between gap-5 animate-card-${idx + 1}`}
                  >
                    <p className="font-display text-xl sm:text-2xl text-[#171C18] leading-snug">
                      „{rev.quote}”
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#4E564F] border-t border-[#D8D2C5] pt-3">
                      <span className="font-medium text-[#171C18]">{rev.author}</span>
                      <span className="text-[#7A5C43]">{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#D8D2C5]">
                <div>
                  <span className="font-display text-4xl text-[#171C18] block">10 / 10</span>
                  <span className="text-sm text-[#4E564F]">Scor verificat pe TuristInfo.ro</span>
                </div>
                <div>
                  <span className="font-display text-4xl text-[#171C18] block">7 camere</span>
                  <span className="text-sm text-[#4E564F]">Capacitate de până la 15 persoane</span>
                </div>
                <div>
                  <span className="font-display text-4xl text-[#171C18] block">Tichete</span>
                  <span className="text-sm text-[#4E564F]">Acceptăm carduri de vacanță</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            6. CONTACT (Rezervare Directă la Proprietar)
           ========================================================= */}
        {page === 'contact' && (
          <section className="relative px-5 sm:px-12 py-16 sm:py-24 border-b border-[#D8D2C5] overflow-hidden">
            <CarpathianContours />
            <div className="relative z-10 max-w-6xl mx-auto space-y-8">
              <p className="text-xs uppercase tracking-widest text-[#7A5C43]">
                Rezervare directă fără comisioane
              </p>
              <h1 className="font-display text-4xl sm:text-6xl font-normal text-[#171C18] max-w-3xl">
                Str. Izvorul Negru nr. 257B, Moisei, Maramureș
              </h1>
              <p className="text-base text-[#4E564F]">
                Check-in: 13:00 – 15:00 &nbsp;|&nbsp; Check-out: 12:00 &nbsp;|&nbsp; penisiuneasimi87@gmail.com
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <a
                  href="tel:+40740981839"
                  className="px-7 py-4 bg-[#171C18] text-[#F4F1EA] text-sm font-medium hover:bg-[#28312A] transition-colors"
                >
                  Sună: +40 740 981 839
                </a>
                <a
                  href="https://wa.me/40740981839?text=Bun%C4%83%20ziua%2C%20doresc%20s%C4%83%20verific%20disponibilitatea%20la%20Pensiunea%20Simi%20din%20Moisei."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 border border-[#171C18] text-[#171C18] text-sm font-medium hover:bg-[#E7E0D2] transition-colors"
                >
                  Scrie pe WhatsApp
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Pensiunea+Simi+Moisei+Maramures+257B"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 border border-[#D8D2C5] text-[#4E564F] text-sm font-medium hover:border-[#171C18] hover:text-[#171C18] transition-colors"
                >
                  Deschide în Google Maps
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ─── Shared Bottom Direct-Booking Strip (on non-contact pages) ─── */}
        {page !== 'contact' && (
          <section className="px-5 sm:px-12 py-14 sm:py-18 bg-[#E7E0D2]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-2">
                <p className="text-sm text-[#4E564F]">Rezervare directă la proprietar</p>
                <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#171C18]">
                  Str. Izvorul Negru nr. 257B, Moisei, Maramureș
                </h2>
                <p className="text-sm text-[#4E564F]">
                  7 camere cu balcon &nbsp;·&nbsp; Ciubăr &amp; Foișor &nbsp;·&nbsp; Acceptăm tichete de vacanță
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="tel:+40740981839"
                  className="px-6 py-3.5 bg-[#171C18] text-[#F4F1EA] text-sm font-medium hover:bg-[#28312A] transition-colors"
                >
                  Sună: +40 740 981 839
                </a>
                <a
                  href="https://wa.me/40740981839?text=Bun%C4%83%20ziua%2C%20doresc%20s%C4%83%20verific%20disponibilitatea%20la%20Pensiunea%20Simi%20din%20Moisei."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 border border-[#171C18] text-[#171C18] text-sm font-medium hover:bg-[#F4F1EA] transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[#D8D2C5] px-5 sm:px-12 py-8 text-sm text-[#4E564F]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>Pensiunea Agroturistică Simi — Moisei, Maramureș</span>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/pensiunea_simi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#171C18] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/share/1Dr11vWoRq/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#171C18] transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://www.turistinfo.ro/moisei/cazare-moisei/pensiunea_simi-951496.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#171C18] transition-colors"
            >
              TuristInfo (10/10)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
