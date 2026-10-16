import { useState, useEffect } from 'react';

type PageId = 'acasa' | 'camere' | 'ciubar' | 'trasee' | 'recenzii' | 'rezervare';

interface HeroStory {
  id: string;
  pill: string;
  badge: string;
  title: string;
  subtitle: string;
  primaryImg: string;
  fallbackImg: string;
}

const HERO_STORIES: HeroStory[] = [
  {
    id: 'munte',
    pill: 'Curte & Munte',
    badge: 'Vârful Pietrosul Rodnei · 2303 m',
    title: 'Liniștea muntelui, căldura lemnului din Maramureș.',
    subtitle: 'Str. Izvorul Negru nr. 257B, Moisei — 7 camere cu balcon, curte verde și livadă la poalele Munților Rodnei.',
    primaryImg: 'https://www.turistinfo.ro/images/cazare/951496.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'ciubar',
    pill: 'Ciubăr Cald',
    badge: 'Apă încălzită 38–40°C · 6–8 persoane',
    title: 'Relaxare în ciubăr sub cerul liber, vara și iarna.',
    subtitle: 'Ciubăr din lemn masiv amplasat în curte, cu priveliște directă spre culmile Munților Rodnei.',
    primaryImg: 'https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=df59a858-ffea-4824-be91-f59c2bc25c24.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'camere',
    pill: 'Camere',
    badge: '6 Duble (16 mp) · 1 Triplă (24 mp)',
    title: 'Camere luminoase cu balcon și baie proprie.',
    subtitle: 'Paturi matrimoniale confortabile, curățenie exemplară (10/10) și balcon spre munte sau grădină.',
    primaryImg: 'https://v3.turistinfo.ro/images/camere/335673.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'foisor',
    pill: 'Foișor & Bucate',
    badge: 'Grătar · Ceaun · Cuptor Pizza · Livadă',
    title: 'Foișor din lemn, livadă cu hamace și bucate de casă.',
    subtitle: 'Mic dejun cu ouă de casă, caș proaspăt și clătite calde, plus bucătărie utilată pentru oaspeți.',
    primaryImg: 'https://a0.muscache.com/im/pictures/hosting/Hosting-34697625/original/fd98f82b-38db-4d5a-b993-9825ca007860.jpeg?im_w=1200',
    fallbackImg: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=85',
  },
];

const SUITES = [
  {
    id: 'dubla',
    category: 'dubla',
    name: 'Cameră Dublă Matrimonială',
    badge: '6 camere · 16 mp',
    capacity: '2 adulți',
    description: 'Pat matrimonial confortabil, balcon privat cu vedere spre Pietrosul Rodnei sau grădină, baie proprie cu duș, TV și Wi-Fi.',
    tags: ['Balcon privat', 'Baie cu duș', 'Vedere munte', 'TV & Wi-Fi'],
    primaryImg: 'https://v3.turistinfo.ro/images/camere/335673.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'tripla',
    category: 'tripla',
    name: 'Cameră Triplă de Familie',
    badge: '1 cameră · 24 mp',
    capacity: '3 persoane / familie',
    description: 'Spațiu generos cu pat matrimonial + pat single, balcon panoramic spre munte, baie proprie cu uscător și articole de toaletă.',
    tags: ['24 mp spațioasă', 'Pat dublu + single', 'Balcon panoramic', 'Ideală familii'],
    primaryImg: 'https://res.klook.com/klook-hotel/image/upload/w_1200,c_fill,q_90/trip/22020r000000h4v18DF64_R_550_412_R5.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'integral',
    category: 'integral',
    name: 'Închiriere Integrală Pensiune',
    badge: 'Toate 7 camerele · Exclusiv',
    capacity: 'Până la 15 oaspeți',
    description: 'Întreaga proprietate rezervată pentru grupul vostru: 7 camere cu băi proprii, salon de mese, bucătărie utilată, foișor și ciubăr.',
    tags: ['15 locuri în 7 camere', 'Living & Bucătărie', 'Foișor & Grătar', 'Ciubăr în curte'],
    primaryImg: 'https://www.turistinfo.ro/images/cazare/951496.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
  },
];

const TRAILS = [
  {
    id: 'pietrosul',
    name: 'Vârful Pietrosul Rodnei (2.303 m)',
    distance: 'La poalele masivului · Traseu & Off-Road',
    bearing: 195,
    direction: '195° S-SV',
    elevation: '+1.680 m diferență nivel',
    detail: 'Cel mai înalt vârf din Carpații Orientali, vizibil direct de pe balconul pensiunii. Gazdele organizează și ture off-road în munți.',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'manastirea',
    name: 'Mănăstirea Moisei & Monumentul Martirilor',
    distance: '2 km · 3 min cu mașina / 20 min pe jos',
    bearing: 155,
    direction: '155° S-SE',
    elevation: 'Pe direcția Str. Izvorul Negru',
    detail: 'Așezământ monahal istoric cu biserică de lemn din sec. XVII și ansamblul monumental sculptat de Vida Gheza.',
    img: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'mocanita',
    name: 'Mocănița de pe Valea Vaserului',
    distance: '13 km · 15 min cu mașina (Vișeu de Sus)',
    bearing: 320,
    direction: '320° N-NV',
    elevation: 'Cale ferată forestieră cu abur',
    detail: 'Ultima cale ferată forestieră cu abur activă din Europa — gara din Vișeu de Sus este la doar un sfert de oră de pensiune.',
    img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'borsa',
    name: 'Cascada Cailor & Telegondola Borșa',
    distance: '14 km · 16 min cu mașina (Stațiunea Borșa)',
    bearing: 110,
    direction: '110° E-SE',
    elevation: 'Pârtie olimpică & cascadă 90 m',
    detail: 'Cea mai spectaculoasă cădere de apă din Munții Rodnei și pârtiile de schi deservite de Telegondola Olimpică din Borșa.',
    img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=900&q=80',
  },
];

const REVIEWS = [
  {
    author: 'Bumbas Costin',
    date: 'Martie 2026 · Nota 10/10',
    tag: 'Ciubăr & Foișor',
    quote:
      'Locul ideal pentru un grup de prieteni sau familie. Pensiunea este spațioasă, camerele sunt foarte curate, iar curtea oferă mult loc pentru relaxare. Ciubărul și foișorul au fost un mare plus.',
  },
  {
    author: 'Patricia',
    date: 'Iulie 2025 · Nota 10/10',
    tag: 'Bucate de casă & Familii',
    quote:
      'Ne-am răsfățat cu mic dejun cu ouă de casă și caș proaspăt, iar ciubărul din curte a fost o adevărată relaxare. Camera triplă e perfectă pentru familii cu copii.',
  },
  {
    author: 'Corina Petrache',
    date: 'TuristInfo · Nota 10/10',
    tag: 'Aventură Off-Road',
    quote:
      'Am descoperit un loc în care liniștea și natura îți dau o stare de bine de la primul pas. Experiența off-road organizată de gazdă a fost una dintre cele mai tari aventuri trăite împreună.',
  },
  {
    author: 'Maria & Costin',
    date: 'Iulie 2025 · Nota 10/10',
    tag: 'Vedere Pietrosul Rodnei',
    quote:
      'Bucatele sunt delicioase, camerele impecabile, iar priveliștea spre Vârful Pietrosul Rodnei îți taie răsuflarea. Gazda primitoare ne-a făcut să ne simțim ca acasă.',
  },
];

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'acasa', label: 'Acasă' },
  { id: 'camere', label: 'Camere' },
  { id: 'ciubar', label: 'Ciubăr & Curte' },
  { id: 'trasee', label: 'Trasee' },
  { id: 'recenzii', label: 'Recenzii' },
  { id: 'rezervare', label: 'Rezervare' },
];

/** Resilient image component that falls back cleanly if a directory host blocks hotlinking */
function PropertyImage({
  src,
  fallback,
  alt,
  className,
}: {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
      className={className}
      loading="eager"
    />
  );
}

export function App() {
  const [page, setPage] = useState<PageId>(() => {
    const hash = window.location.hash.replace('#', '') as PageId;
    return NAV_ITEMS.some((i) => i.id === hash) ? hash : 'acasa';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const [roomFilter, setRoomFilter] = useState<'toate' | 'dubla' | 'tripla' | 'integral'>('toate');
  const [nightMode, setNightMode] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState(0);

  // 3-Tap WhatsApp Reservation Configurator state
  const [bookRoom, setBookRoom] = useState('Cameră Dublă (2 adulți)');
  const [bookDuration, setBookDuration] = useState('Weekend (2 nopți)');
  const [bookExtras, setBookExtras] = useState<string[]>([
    'Ciubăr cu apă caldă',
    'Mic dejun tradițional',
  ]);

  // Sync URL #hash with browser Back/Forward buttons
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (NAV_ITEMS.some((i) => i.id === hash)) {
        setPage(hash);
      } else if (!hash) {
        setPage('acasa');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (next: PageId) => {
    window.location.hash = next === 'acasa' ? '' : next;
    setPage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleExtra = (extra: string) => {
    setBookExtras((prev) =>
      prev.includes(extra) ? prev.filter((item) => item !== extra) : [...prev, extra]
    );
  };

  const quickSelectRoomForBooking = (roomTitle: string) => {
    setBookRoom(roomTitle);
    navigate('rezervare');
  };

  const activeStory = HERO_STORIES[storyIndex];
  const activeTrail = TRAILS[selectedTrail];
  const filteredSuites = SUITES.filter(
    (s) => roomFilter === 'toate' || s.category === roomFilter
  );

  const whatsappMessage = `Bună ziua! Doresc să verific disponibilitatea la Pensiunea Simi (Moisei) pentru: ${bookRoom}, perioadă: ${bookDuration}${
    bookExtras.length > 0 ? `, opțiuni: ${bookExtras.join(', ')}` : ''
  }. Vă mulțumesc!`;

  const whatsappUrl = `https://wa.me/40740981839?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF6EE] text-[#111E16]">
      {/* ─── Header (Desktop: Pill Nav | Mobile: Light-Theme Burger Only) ─── */}
      <header className="sticky top-0 z-50 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#14241B]/10 px-4 sm:px-10 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('acasa')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            {/* Carved Maramureș Peak & Timber Emblem */}
            <span className="w-8 h-8 rounded-xl bg-[#14241B] text-[#FAF6EE] flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 19L10.5 7L15 14L17.5 10.5L21 19H3Z"
                  stroke="#D48C46"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <span className="font-chalet text-xl sm:text-2xl font-medium text-[#111E16] block leading-none">
                Pensiunea Simi
              </span>
              <span className="text-[11px] text-[#4A5D52] block mt-0.5">
                Moisei · Munții Rodnei
              </span>
            </div>
          </button>

          {/* Desktop Only: Rounded Pill Navigation + Direct Call */}
          <div className="hidden md:flex items-center gap-3">
            <nav className="flex items-center gap-1 bg-[#E6ECE8] p-1 rounded-full border border-[#14241B]/10">
              {NAV_ITEMS.map((item) => {
                const isActive = page === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(item.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#14241B] text-[#FAF6EE] shadow-xs'
                        : 'text-[#4A5D52] hover:text-[#111E16]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <a
              href="tel:+40740981839"
              className="px-4 py-2 rounded-full bg-[#B87333] text-[#FAF6EE] text-xs font-semibold hover:bg-[#9E5F24] transition-colors"
            >
              0740 981 839
            </a>
          </div>

          {/* Mobile Only: Light-Theme Burger Icon */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'}
            className="flex md:hidden w-9 h-9 rounded-xl bg-[#E6ECE8] items-center justify-center text-[#111E16] cursor-pointer"
          >
            <div className="w-4.5 h-3 flex flex-col justify-between items-end">
              <span
                className={`block h-[1.5px] bg-[#111E16] transition-all duration-300 ${
                  menuOpen ? 'w-4.5 translate-y-[5px] rotate-45' : 'w-4.5'
                }`}
              />
              <span
                className={`block h-[1.5px] bg-[#B87333] transition-all duration-300 ${
                  menuOpen ? 'opacity-0 w-0' : 'w-3'
                }`}
              />
              <span
                className={`block h-[1.5px] bg-[#111E16] transition-all duration-300 ${
                  menuOpen ? 'w-4.5 -translate-y-[5.5px] -rotate-45' : 'w-4'
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* ─── Light-Theme Mobile Burger Menu (Aligned Directly Below Header) ─── */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Meniu navigare"
          className="fixed inset-x-0 top-[57px] bottom-0 z-40 md:hidden bg-[#FAF6EE] text-[#111E16] px-5 pt-3 pb-7 flex flex-col justify-between overflow-y-auto"
        >
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = page === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={`w-full px-4 py-3.5 rounded-2xl flex items-center justify-between text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#14241B] text-[#FAF6EE]'
                      : 'bg-[#E6ECE8]/70 text-[#111E16] hover:bg-[#E6ECE8]'
                  }`}
                >
                  <span className="font-chalet text-2xl">{item.label}</span>
                  <span className={`text-xs ${isActive ? 'text-[#D48C46]' : 'text-[#4A5D52]'}`}>
                    {isActive ? 'Activ' : '→'}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="space-y-3 pt-4 border-t border-[#14241B]/10">
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:+40740981839"
                className="py-3.5 rounded-2xl bg-[#14241B] text-[#FAF6EE] text-xs font-semibold text-center"
              >
                Sună: 0740 981 839
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 rounded-2xl bg-[#B87333] text-[#FAF6EE] text-xs font-semibold text-center"
              >
                WhatsApp
              </a>
            </div>
            <p className="text-xs text-[#4A5D52] text-center">
              Str. Izvorul Negru nr. 257B, Moisei · Tichete de vacanță
            </p>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* =========================================================
            PAGE 1: ACASĂ — Mobile-First 100svh Framed Alpine Window + Story Pills + Docked Booking Bar
           ========================================================= */}
        {page === 'acasa' && (
          <section className="px-4 sm:px-10 pt-2.5 pb-4 sm:py-10 max-w-6xl mx-auto min-h-[calc(100svh-58px)] lg:min-h-0 flex flex-col justify-between">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-8 items-stretch my-auto">
              {/* Framed Alpine Sanctuary Photo Window (Engineered to 290px on mobile so entire Hero = 585px < 100svh) */}
              <div className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-[#14241B] min-h-[290px] sm:min-h-[460px] flex flex-col justify-between p-4 sm:p-7 shadow-[0_20px_50px_-20px_rgba(20,36,27,0.45)]">
                <PropertyImage
                  key={activeStory.id}
                  src={activeStory.primaryImg}
                  fallback={activeStory.fallbackImg}
                  alt={activeStory.title}
                  className="animate-alpine-photo absolute inset-0 w-full h-full object-cover opacity-80"
                />

                {/* Warm Carpathian Forest Gradient Vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(20,36,27,0.45) 0%, rgba(20,36,27,0.18) 40%, rgba(20,36,27,0.88) 100%)',
                  }}
                />

                {/* Top Floating Altitude / Ciubăr Badge */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14241B]/80 backdrop-blur-md text-[#FAF6EE] text-xs font-medium border border-[#FAF6EE]/15">
                    <span className="w-2 h-2 rounded-full bg-[#D48C46] animate-steam" />
                    {activeStory.badge}
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-[#FAF6EE]/90 text-[#111E16] text-[11px] font-semibold">
                    10 / 10 TuristInfo
                  </span>
                </div>

                {/* Bottom Overlay: Headline + 4 Tactile Story Pills */}
                <div className="relative z-10 space-y-3 pt-16">
                  <h1 className="font-chalet text-2xl sm:text-4xl lg:text-[42px] font-normal text-[#FAF6EE] leading-[1.08]">
                    {activeStory.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#E6ECE8]/90 leading-snug max-w-xl">
                    {activeStory.subtitle}
                  </p>

                  {/* 4 Horizontal Story Switcher Pills Inside Frame */}
                  <div className="pt-1 grid grid-cols-4 gap-1.5 sm:gap-2">
                    {HERO_STORIES.map((story, idx) => {
                      const isCurrent = idx === storyIndex;
                      return (
                        <button
                          key={story.id}
                          type="button"
                          onClick={() => setStoryIndex(idx)}
                          className={`py-2 px-2 rounded-xl text-[11px] sm:text-xs font-medium transition-all cursor-pointer truncate ${
                            isCurrent
                              ? 'bg-[#B87333] text-[#FAF6EE] shadow-sm'
                              : 'bg-[#FAF6EE]/15 text-[#FAF6EE]/85 hover:bg-[#FAF6EE]/25 backdrop-blur-xs'
                          }`}
                        >
                          {story.pill}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right / Bottom Column: 2×2 Pine Sage Bento Tiles + Deep Forest Docked Booking Bar */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-3.5">
                {/* 2×2 Soft Pine Sage Bento Grid */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('camere')}
                    className="p-3.5 sm:p-5 rounded-2xl bg-[#E6ECE8] hover:bg-[#DCE5DF] text-left transition-colors cursor-pointer"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B87333] block">
                      7 Camere · 15 Locuri
                    </span>
                    <span className="font-chalet text-lg sm:text-2xl text-[#111E16] block mt-0.5">
                      6 Duble &amp; 1 Triplă
                    </span>
                    <span className="text-xs text-[#4A5D52] block mt-0.5">
                      Balcon &amp; baie proprie →
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('ciubar')}
                    className="p-3.5 sm:p-5 rounded-2xl bg-[#E6ECE8] hover:bg-[#DCE5DF] text-left transition-colors cursor-pointer"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B87333] block">
                      Relaxare în Curte
                    </span>
                    <span className="font-chalet text-lg sm:text-2xl text-[#111E16] block mt-0.5">
                      Ciubăr &amp; Foișor
                    </span>
                    <span className="text-xs text-[#4A5D52] block mt-0.5">
                      Grătar, ceaun &amp; cuptor →
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('trasee')}
                    className="p-3.5 sm:p-5 rounded-2xl bg-[#E6ECE8] hover:bg-[#DCE5DF] text-left transition-colors cursor-pointer"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B87333] block">
                      Moisei · Maramureș
                    </span>
                    <span className="font-chalet text-lg sm:text-2xl text-[#111E16] block mt-0.5">
                      Pietrosul Rodnei
                    </span>
                    <span className="text-xs text-[#4A5D52] block mt-0.5">
                      Mocănița &amp; Borșa 13 km →
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('recenzii')}
                    className="p-3.5 sm:p-5 rounded-2xl bg-[#E6ECE8] hover:bg-[#DCE5DF] text-left transition-colors cursor-pointer"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B87333] block">
                      Carduri Vacanță
                    </span>
                    <span className="font-chalet text-lg sm:text-2xl text-[#111E16] block mt-0.5">
                      Pluxee · Up · Edenred
                    </span>
                    <span className="text-xs text-[#4A5D52] block mt-0.5">
                      Scor 10/10 oaspeți →
                    </span>
                  </button>
                </div>

                {/* Deep Carpathian Forest Docked Conversion Bar */}
                <div className="rounded-3xl bg-[#14241B] text-[#FAF6EE] p-4 sm:p-6 space-y-3.5 shadow-[0_14px_34px_-12px_rgba(20,36,27,0.4)]">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#D48C46] font-semibold block">
                        Rezervare directă fără comisioane
                      </span>
                      <h2 className="font-chalet text-xl sm:text-2xl font-normal text-[#FAF6EE]">
                        Str. Izvorul Negru nr. 257B, Moisei
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => navigate('rezervare')}
                      className="py-3.5 px-3 rounded-2xl bg-[#B87333] hover:bg-[#D48C46] text-[#FAF6EE] text-xs sm:text-sm font-semibold text-center transition-colors cursor-pointer"
                    >
                      Configurator WhatsApp
                    </button>
                    <a
                      href="tel:+40740981839"
                      className="py-3.5 px-3 rounded-2xl bg-[#1C3125] hover:bg-[#274233] border border-[#FAF6EE]/15 text-[#FAF6EE] text-xs sm:text-sm font-semibold text-center transition-colors"
                    >
                      Sună: 0740 981 839
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            PAGE 2: CAMERE — Photographic Suite Cards + Filter Pills
           ========================================================= */}
        {page === 'camere' && (
          <section className="px-4 sm:px-10 py-8 sm:py-12 max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#B87333]">
                  7 Spații de Cazare · 15 Locuri
                </span>
                <h1 className="font-chalet text-3xl sm:text-5xl font-normal text-[#111E16] mt-1">
                  Camere cu balcon spre Munții Rodnei
                </h1>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1.5 bg-[#E6ECE8] p-1.5 rounded-2xl self-start">
                {[
                  { id: 'toate', label: 'Toate (7)' },
                  { id: 'dubla', label: 'Duble (6)' },
                  { id: 'tripla', label: 'Triplă (1)' },
                  { id: 'integral', label: 'Integral (15 pers)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setRoomFilter(tab.id as 'toate' | 'dubla' | 'tripla' | 'integral')
                    }
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      roomFilter === tab.id
                        ? 'bg-[#14241B] text-[#FAF6EE]'
                        : 'text-[#4A5D52] hover:text-[#111E16]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {filteredSuites.map((suite) => (
                <div
                  key={suite.id}
                  className="rounded-3xl overflow-hidden bg-[#E6ECE8] border border-[#14241B]/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden bg-[#14241B]">
                      <PropertyImage
                        src={suite.primaryImg}
                        fallback={suite.fallbackImg}
                        alt={suite.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#14241B]/85 backdrop-blur-xs text-[#FAF6EE] text-xs font-medium">
                          {suite.badge}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#FAF6EE]/90 text-[#111E16] text-xs font-semibold">
                          {suite.capacity}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h2 className="font-chalet text-2xl font-normal text-[#111E16]">
                        {suite.name}
                      </h2>
                      <p className="text-sm text-[#4A5D52] leading-snug">{suite.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {suite.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-[#FAF6EE] text-[#111E16] text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => quickSelectRoomForBooking(suite.name)}
                      className="w-full py-3 rounded-2xl bg-[#14241B] hover:bg-[#B87333] text-[#FAF6EE] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Selectează pentru rezervare →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-[#14241B] text-[#FAF6EE] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm">
              <span>
                Check-in: <strong>13:00 – 15:00</strong> &nbsp;·&nbsp; Check-out:{' '}
                <strong>până la 12:00</strong> &nbsp;·&nbsp; Parcare privată &amp; Wi-Fi gratuit
              </span>
              <span className="text-[#D48C46] font-semibold">
                Acceptăm Tichete de Vacanță (Pluxee, Up, Edenred)
              </span>
            </div>
          </section>
        )}

        {/* =========================================================
            PAGE 3: CIUBĂR & CURTE — Day-to-Night Atmosphere Switcher + Bento Grid
           ========================================================= */}
        {page === 'ciubar' && (
          <section className="px-4 sm:px-10 py-8 sm:py-12 max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#B87333]">
                  Relaxare în Aer Liber · Moisei
                </span>
                <h1 className="font-chalet text-3xl sm:text-5xl font-normal text-[#111E16] mt-1">
                  {nightMode
                    ? 'Seara la ciubăr și foc la ceaun'
                    : 'Ziua în livadă, hamace și foișor'}
                </h1>
              </div>

              {/* Interactive Day / Night Courtyard Switcher */}
              <div className="inline-flex p-1.5 rounded-2xl bg-[#E6ECE8] border border-[#14241B]/10 self-start">
                <button
                  type="button"
                  onClick={() => setNightMode(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    !nightMode ? 'bg-[#FAF6EE] text-[#111E16] shadow-xs' : 'text-[#4A5D52]'
                  }`}
                >
                  Ziua în Livadă
                </button>
                <button
                  type="button"
                  onClick={() => setNightMode(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    nightMode ? 'bg-[#14241B] text-[#FAF6EE] shadow-xs' : 'text-[#4A5D52]'
                  }`}
                >
                  Seara la Ciubăr (39°C)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: 'Ciubăr din lemn cu apă caldă (6–8 locuri)',
                  badge: '38–40°C · Vara și Iarna',
                  desc: 'Amplasat în aer liber cu vedere spre munte, ideal după o zi pe traseele din Pietrosul Rodnei sau pe pârtia de la Borșa.',
                  img: 'https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=df59a858-ffea-4824-be91-f59c2bc25c24.jpg',
                  fallback:
                    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
                },
                {
                  title: 'Foișor acoperit cu grătar, ceaun și cuptor pizza',
                  badge: 'Gastronomie în Curte',
                  desc: 'Foișor spațios din lemn masiv echipat cu zidărie pentru grătar, ceaun maramureșean și cuptor pe lemne pentru pizza.',
                  img: 'https://a0.muscache.com/im/pictures/hosting/Hosting-34697625/original/fd98f82b-38db-4d5a-b993-9825ca007860.jpeg?im_w=1200',
                  fallback:
                    'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=80',
                },
                {
                  title: 'Livadă cu hamace și loc de joacă pentru copii',
                  badge: 'Curte Verde Spațioasă',
                  desc: 'Grădină îngrijită cu pomi fructiferi, zonă de hamace la umbră, terasă însorită și spațiu sigur de joacă pentru cei mici.',
                  img: 'https://www.turistinfo.ro/images/cazare/951496.jpg',
                  fallback:
                    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
                },
                {
                  title: 'Mic dejun cu bucate de casă și bucătărie utilată',
                  badge: 'Ouă de casă & Caș proaspăt',
                  desc: 'La cerere pregătim mic dejun tradițional (ouă de casă, caș proaspăt, omletă, clătite pufoase) sau aveți acces la bucătăria utilată.',
                  img: 'https://res.klook.com/klook-hotel/image/upload/w_1200,c_fill,q_90/trip/22020r000000h4v18DF64_R_550_412_R5.jpg',
                  fallback:
                    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`rounded-3xl overflow-hidden border transition-colors ${
                    nightMode
                      ? 'bg-[#14241B] text-[#FAF6EE] border-[#FAF6EE]/10'
                      : 'bg-[#E6ECE8] text-[#111E16] border-[#14241B]/10'
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <PropertyImage
                      src={card.img}
                      fallback={card.fallback}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#14241B]/85 text-[#D48C46] text-xs font-semibold">
                      {card.badge}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h2 className="font-chalet text-2xl font-normal">{card.title}</h2>
                    <p
                      className={`text-sm leading-snug ${
                        nightMode ? 'text-[#E6ECE8]/80' : 'text-[#4A5D52]'
                      }`}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================
            PAGE 4: TRASEE — Interactive Munții Rodnei Trail & Distance Compass
           ========================================================= */}
        {page === 'trasee' && (
          <section className="px-4 sm:px-10 py-8 sm:py-12 max-w-6xl mx-auto space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B87333]">
                Busola Munților Rodnei · Plecare din Moisei (620 m)
              </span>
              <h1 className="font-chalet text-3xl sm:text-5xl font-normal text-[#111E16] mt-1">
                Atracții și trasee în jurul pensiunii
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left: Interactive Deep Forest Topographic Compass Card */}
              <div className="lg:col-span-5 rounded-3xl bg-[#14241B] text-[#FAF6EE] p-6 flex flex-col justify-between gap-6">
                <div className="flex items-center justify-between text-xs text-[#D48C46]">
                  <span>47.6556° N, 24.5401° E</span>
                  <span>{activeTrail.direction}</span>
                </div>

                {/* Rotating Compass SVG */}
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                    <circle
                      cx="100"
                      cy="100"
                      r="86"
                      stroke="rgba(250,246,238,0.16)"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="62"
                      stroke="rgba(212,140,70,0.28)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                    <text x="95" y="24" fill="#D48C46" fontSize="10" fontWeight="600">
                      N
                    </text>
                    <text x="96" y="184" fill="#FAF6EE" opacity="0.5" fontSize="10">
                      S
                    </text>
                    <text x="176" y="104" fill="#FAF6EE" opacity="0.5" fontSize="10">
                      E
                    </text>
                    <text x="16" y="104" fill="#FAF6EE" opacity="0.5" fontSize="10">
                      V
                    </text>

                    {/* Rotating Compass Needle */}
                    <g
                      style={{
                        transform: `rotate(${activeTrail.bearing}deg)`,
                        transformOrigin: '100px 100px',
                        transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <polygon points="100,28 106,100 94,100" fill="#D48C46" />
                      <polygon points="100,172 106,100 94,100" fill="rgba(250,246,238,0.3)" />
                      <circle cx="100" cy="100" r="5" fill="#FAF6EE" />
                    </g>
                  </svg>
                </div>

                <div className="space-y-1.5 text-center sm:text-left">
                  <span className="text-xs font-semibold text-[#D48C46] block">
                    {activeTrail.elevation}
                  </span>
                  <h2 className="font-chalet text-2xl text-[#FAF6EE]">{activeTrail.name}</h2>
                  <p className="text-xs sm:text-sm text-[#E6ECE8]/80 leading-snug">
                    {activeTrail.detail}
                  </p>
                </div>
              </div>

              {/* Right: 4 Selectable Destination Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TRAILS.map((trail, idx) => {
                  const isSelected = idx === selectedTrail;
                  return (
                    <button
                      key={trail.id}
                      type="button"
                      onClick={() => setSelectedTrail(idx)}
                      className={`rounded-3xl overflow-hidden text-left border transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#14241B] text-[#FAF6EE] border-[#B87333] shadow-md'
                          : 'bg-[#E6ECE8] text-[#111E16] border-[#14241B]/10 hover:bg-[#DCE5DF]'
                      }`}
                    >
                      <div className="relative h-36 w-full overflow-hidden">
                        <img
                          src={trail.img}
                          alt={trail.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#14241B]/80 text-[#FAF6EE] text-[11px] font-medium">
                          {trail.direction}
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <span
                          className={`text-xs font-semibold block ${
                            isSelected ? 'text-[#D48C46]' : 'text-[#B87333]'
                          }`}
                        >
                          {trail.distance}
                        </span>
                        <h3 className="font-chalet text-xl font-normal leading-snug">
                          {trail.name}
                        </h3>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            PAGE 5: RECENZII — Verified 10/10 TuristInfo Guestbook
           ========================================================= */}
        {page === 'recenzii' && (
          <section className="px-4 sm:px-10 py-8 sm:py-12 max-w-6xl mx-auto space-y-8">
            <div className="rounded-3xl bg-[#14241B] text-[#FAF6EE] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D48C46]">
                  Recenzii Verificate pe TuristInfo.ro
                </span>
                <h1 className="font-chalet text-3xl sm:text-5xl font-normal">
                  Nota 10 / 10 din partea oaspeților
                </h1>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-[#FAF6EE]/15">
                <div>
                  <span className="font-chalet text-3xl text-[#D48C46] block">10/10</span>
                  <span className="text-xs text-[#E6ECE8]/80">Curățenie</span>
                </div>
                <div>
                  <span className="font-chalet text-3xl text-[#D48C46] block">10/10</span>
                  <span className="text-xs text-[#E6ECE8]/80">Ospitalitate</span>
                </div>
                <div>
                  <span className="font-chalet text-3xl text-[#D48C46] block">10/10</span>
                  <span className="text-xs text-[#E6ECE8]/80">Ciubăr &amp; Curte</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {REVIEWS.map((rev) => (
                <div
                  key={rev.author}
                  className="rounded-3xl bg-[#E6ECE8] p-6 border border-[#14241B]/10 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FAF6EE] text-[#B87333] text-xs font-semibold">
                      {rev.tag}
                    </span>
                    <p className="font-chalet text-xl sm:text-2xl text-[#111E16] leading-snug">
                      „{rev.quote}”
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-3 border-t border-[#14241B]/10">
                    <span className="font-semibold text-[#111E16]">{rev.author}</span>
                    <span className="text-[#4A5D52]">{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================
            PAGE 6: REZERVARE — Interactive 3-Tap WhatsApp Configurator
           ========================================================= */}
        {page === 'rezervare' && (
          <section className="px-4 sm:px-10 py-8 sm:py-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 7 Cols: 3-Tap Interactive WhatsApp Reservation Builder */}
              <div className="lg:col-span-7 rounded-3xl bg-[#14241B] text-[#FAF6EE] p-6 sm:p-8 space-y-6 shadow-lg">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#D48C46]">
                    Rezervare Directă la Gazdă · Fără Comisioane
                  </span>
                  <h1 className="font-chalet text-3xl sm:text-4xl font-normal mt-1">
                    Configurează cererea pe WhatsApp
                  </h1>
                </div>

                {/* Step 1: Room Type */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#E6ECE8]/80 block">
                    1. Alege tipul de cazare
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      'Cameră Dublă (2 adulți)',
                      'Cameră Triplă (3 persoane)',
                      'Integral (7 camere · 15 locuri)',
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setBookRoom(option)}
                        className={`p-3 rounded-2xl text-xs font-semibold text-left border transition-all cursor-pointer ${
                          bookRoom === option
                            ? 'bg-[#B87333] text-[#FAF6EE] border-[#D48C46]'
                            : 'bg-[#1C3125] text-[#FAF6EE]/80 border-[#FAF6EE]/10 hover:bg-[#243D2F]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Duration */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#E6ECE8]/80 block">
                    2. Durata sejurului
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Weekend (2 nopți)', 'Sejur 3–4 nopți', 'Vacanță 5+ nopți'].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setBookDuration(dur)}
                        className={`p-3 rounded-2xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                          bookDuration === dur
                            ? 'bg-[#B87333] text-[#FAF6EE] border-[#D48C46]'
                            : 'bg-[#1C3125] text-[#FAF6EE]/80 border-[#FAF6EE]/10 hover:bg-[#243D2F]'
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Extra Experiences */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#E6ECE8]/80 block">
                    3. Opțiuni dorite (atinge pentru selectare)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Ciubăr cu apă caldă',
                      'Mic dejun tradițional',
                      'Plată cu tichete de vacanță',
                      'Tură Off-Road în munți',
                    ].map((extra) => {
                      const active = bookExtras.includes(extra);
                      return (
                        <button
                          key={extra}
                          type="button"
                          onClick={() => toggleExtra(extra)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            active
                              ? 'bg-[#FAF6EE] text-[#111E16] border-[#FAF6EE]'
                              : 'bg-[#1C3125] text-[#FAF6EE]/75 border-[#FAF6EE]/15'
                          }`}
                        >
                          {active ? '✓ ' : '+ '}
                          {extra}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Preview Box */}
                <div className="p-4 rounded-2xl bg-[#1C3125] border border-[#FAF6EE]/10 space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#D48C46] font-semibold block">
                    Mesaj pregătit pentru 0740 981 839:
                  </span>
                  <p className="text-xs sm:text-sm text-[#FAF6EE]/95 italic leading-relaxed">
                    „{whatsappMessage}”
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-5 rounded-2xl bg-[#B87333] hover:bg-[#D48C46] text-[#FAF6EE] text-sm font-semibold text-center transition-colors"
                  >
                    Trimite pe WhatsApp →
                  </a>
                  <a
                    href="tel:+40740981839"
                    className="py-4 px-5 rounded-2xl bg-[#FAF6EE] text-[#111E16] text-sm font-semibold text-center hover:bg-[#E6ECE8] transition-colors"
                  >
                    Sună direct: 0740 981 839
                  </a>
                </div>
              </div>

              {/* Right 5 Cols: Real Address, Schedule & Map Links */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-[#E6ECE8] p-6 space-y-4 border border-[#14241B]/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#B87333]">
                    Localizare Verificată
                  </span>
                  <h2 className="font-chalet text-2xl sm:text-3xl font-normal text-[#111E16]">
                    Str. Izvorul Negru nr. 257B, Comuna Moisei, Maramureș
                  </h2>
                  <p className="text-sm text-[#4A5D52] leading-relaxed">
                    Acces facil din drumul DN17C / DJ17C (spre Mănăstirea Moisei), la poalele Vârfului Pietrosul Rodnei.
                  </p>

                  <div className="pt-2 space-y-2 text-xs sm:text-sm text-[#111E16] border-t border-[#14241B]/10">
                    <div className="flex justify-between">
                      <span className="text-[#4A5D52]">Telefon / WhatsApp:</span>
                      <a href="tel:+40740981839" className="font-semibold underline">
                        +40 740 981 839
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A5D52]">Check-in / Check-out:</span>
                      <span className="font-semibold">13:00 – 15:00 / 12:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A5D52]">Tichete de vacanță:</span>
                      <span className="font-semibold text-[#B87333]">Acceptate</span>
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Pensiunea+Simi+Moisei+Maramures+257B"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3.5 rounded-2xl bg-[#14241B] text-[#FAF6EE] text-xs font-semibold text-center hover:bg-[#1C3125] transition-colors"
                  >
                    Deschide în Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ─── Compact Footer ─── */}
      <footer className="border-t border-[#14241B]/10 px-4 sm:px-10 py-6 text-xs sm:text-sm text-[#4A5D52]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Pensiunea Agroturistică Simi — Str. Izvorul Negru 257B, Moisei, Maramureș</span>

          <div className="flex items-center gap-5 font-medium">
            <a
              href="https://www.instagram.com/pensiunea_simi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111E16] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/share/1Dr11vWoRq/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111E16] transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://www.turistinfo.ro/moisei/cazare-moisei/pensiunea_simi-951496.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111E16] transition-colors"
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
