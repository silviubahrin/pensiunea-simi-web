import { useState, useEffect } from "react";

type PageId = "acasa" | "camere" | "ciubar" | "trasee" | "rezervare";

interface SuiteItem {
  id: string;
  index: string;
  name: string;
  capacity: string;
  count: string;
  spec: string;
  highlights: string[];
  primaryImg: string;
  fallbackImg: string;
}

const SUITES: SuiteItem[] = [
  {
    id: "dubla",
    index: "01",
    name: "Cameră Dublă Matrimonială",
    capacity: "2 Oaspeți · 16 m²",
    count: "6 Camere în Pensiune",
    spec: "Pat matrimonial confortabil, baie privată cu duș, balcon orientat spre masiv, TV cablu și Wi-Fi.",
    highlights: ["Balcon privat spre creastă", "Baie proprie cu duș", "Pat matrimonial 160×200"],
    primaryImg: "https://v3.turistinfo.ro/images/camere/335673.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "tripla",
    index: "02",
    name: "Cameră Triplă de Familie",
    capacity: "3 Oaspeți · 24 m²",
    count: "1 Cameră în Pensiune",
    spec: "Pat dublu și pat single, balcon generos spre Pietrosul Rodnei, baie proprie și spațiu suplimentar.",
    highlights: ["Pat dublu + pat single", "Vedere panoramică", "Ideală pentru familii"],
    primaryImg: "https://res.klook.com/klook-hotel/image/upload/w_1200,c_fill,q_90/trip/22020r000000h4v18DF64_R_550_412_R5.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "integral",
    index: "03",
    name: "Închiriere Integrală a Pensiunii",
    capacity: "Până la 15 Oaspeți",
    count: "Toate cele 7 Camere",
    spec: "Acces exclusiv la 7 băi, salon de zi cu șemineu, bucătărie complet utilată, curte, foișor și ciubăr cald.",
    highlights: ["Intimitate totală grup", "Acces nelimitat foișor & grătar", "Bucătărie complet utilată"],
    primaryImg: "https://www.turistinfo.ro/images/cazare/951496.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
  },
];

interface TrailItem {
  id: string;
  num: string;
  name: string;
  elevation: string;
  distance: string;
  bearing: number;
  direction: string;
  duration: string;
  difficulty: string;
  desc: string;
  img: string;
}

const TRAILS: TrailItem[] = [
  {
    id: "pietrosul",
    num: "01",
    name: "Vârful Pietrosul Rodnei",
    elevation: "2.303 m",
    distance: "8,4 km (la poalele masivului)",
    bearing: 195,
    direction: "195° S-SV",
    duration: "4–5 ore urcare",
    difficulty: "Mediu / Dificil",
    desc: "Cel mai înalt vârf din Carpații Orientali, vizibil direct de pe balcoanele pensiunii. Traseu marcat cu bandă albastră pornind din Moisei / Schit.",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "manastirea",
    num: "02",
    name: "Mănăstirea Moisei",
    elevation: "Secolul XVII",
    distance: "2,1 km de pensiune",
    bearing: 155,
    direction: "155° S-SE",
    duration: "25 min mers pe jos",
    difficulty: "Ușor / Plimbare",
    desc: "Biserică istorică din lemn ridicată în anul 1672, așezată într-o poiană liniștită pe drumul Izvorul Negru.",
    img: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mocanita",
    num: "03",
    name: "Mocănița Valea Vaserului",
    elevation: "Tren cu abur",
    distance: "13 km (Vișeu de Sus)",
    bearing: 320,
    direction: "320° N-NV",
    duration: "18 min cu mașina",
    difficulty: "Agrement turistic",
    desc: "Plecarea matinală pe ecartament îngust prin defileul sălbatic al râului Vaser până la stația Paltin.",
    img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "borsa",
    num: "04",
    name: "Cascada Cailor",
    elevation: "Cădere de 90 m",
    distance: "14 km (Stațiunea Borșa)",
    bearing: 110,
    direction: "110° E-SE",
    duration: "20 min cu mașina + telescaun",
    difficulty: "Accesibil",
    desc: "Cea mai înaltă cascadă din România, alimentată de zăpezile topite ale Masivului Piatra Rea.",
    img: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=900&q=80",
  },
];

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: "acasa", label: "Acasă" },
  { id: "camere", label: "Camere" },
  { id: "ciubar", label: "Ciubăr & Curte" },
  { id: "trasee", label: "Trasee & Zonă" },
  { id: "rezervare", label: "Rezervare" },
];

function ResilientPhoto({
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
  const [current, setCurrent] = useState(src);
  useEffect(() => setCurrent(src), [src]);

  return (
    <img
      src={current}
      alt={alt}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
      className={className}
      loading="eager"
    />
  );
}

export function App() {
  const [page, setPage] = useState<PageId>(() => {
    const hash = window.location.hash.replace("#", "") as PageId;
    return NAV_ITEMS.some((i) => i.id === hash) ? hash : "acasa";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNight, setIsNight] = useState<boolean>(() => {
    try {
      return localStorage.getItem("pensiunea_simi_theme") === "night";
    } catch {
      return false;
    }
  });

  const [selectedTrail, setSelectedTrail] = useState(0);
  const [manualBearingOffset, setManualBearingOffset] = useState(0);

  // 3-Tap WhatsApp Configurator State
  const [bookRoom, setBookRoom] = useState("Cameră Dublă");
  const [bookPeriod, setBookPeriod] = useState("Weekend (2 nopți)");
  const [bookExtras, setBookExtras] = useState<string[]>([
    "Ciubăr cald",
    "Tichete vacanță",
  ]);

  // Persist Theme Selection
  useEffect(() => {
    try {
      localStorage.setItem("pensiunea_simi_theme", isNight ? "night" : "day");
    } catch {}
  }, [isNight]);

  // Sync with browser Back/Forward
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace("#", "") as PageId;
      if (NAV_ITEMS.some((i) => i.id === hash)) {
        setPage(hash);
      } else if (!hash) {
        setPage("acasa");
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (next: PageId) => {
    window.location.hash = next === "acasa" ? "" : next;
    setPage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleExtra = (extra: string) => {
    setBookExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
    );
  };

  const selectRoomAndBook = (roomName: string) => {
    setBookRoom(roomName);
    navigate("rezervare");
  };

  const activeTrail = TRAILS[selectedTrail];
  const activeBearing = (activeTrail.bearing + manualBearingOffset + 360) % 360;

  const whatsappMessage = `Bună ziua! Doresc disponibilitate la Pensiunea Simi Moisei pentru: ${bookRoom}, perioadă: ${bookPeriod}${
    bookExtras.length > 0 ? `, opțiuni: ${bookExtras.join(", ")}` : ""
  }. Vă mulțumesc!`;

  const whatsappUrl = `https://wa.me/40740981839?text=${encodeURIComponent(whatsappMessage)}`;

  // Theme-aware tokens
  const themeBg = isNight ? "bg-[#141210]" : "bg-[#FAF6EE]";
  const themeSurface = isNight ? "bg-[#1F1B18]" : "bg-[#FAF6EE]";
  const themeSurfaceElevated = isNight ? "bg-[#28231F]" : "bg-[#F4EDE2]";
  const themeText = isNight ? "text-[#FAF6EE]" : "text-[#1A1614]";
  const themeTextMuted = isNight ? "text-[#A69D94]" : "text-[#6B635B]";
  const themeBorder = isNight ? "border-[#FAF6EE]/12" : "border-[#1A1614]/10";
  const themeAccent = isNight ? "text-[#E28C46]" : "text-[#B86B32]";
  const themeAccentBg = isNight ? "bg-[#E28C46]" : "bg-[#B86B32]";

  return (
    <div className={`min-h-screen flex flex-col justify-between ${themeBg} ${themeText} transition-colors duration-300`}>
      {/* ─── Top Architectural Bar with Minimal Cabin Logo Element & Global Theme Switcher ─── */}
      <header className={`sticky top-0 z-50 ${isNight ? "bg-[#141210]/95" : "bg-[#FAF6EE]/95"} backdrop-blur-md border-b ${themeBorder} px-4 sm:px-8 py-3.5 transition-colors duration-300`}>
        <div className="max-w-[1300px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("acasa")}
            className="text-left cursor-pointer group flex items-center gap-3 transition-opacity hover:opacity-90"
            aria-label="Pensiunea Simi — Acasă"
          >
            {/* Minimal Architectural Cabin Mark with Hearth Amber Glow & Smoke Micro-Motion */}
            <div className="relative w-8 h-8 shrink-0 transition-colors">
              <svg
                className="w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Chimney */}
                <path
                  d="M16 6.5V3H18.5V8.8"
                  stroke={isNight ? "#FAF6EE" : "#1A1614"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Chimney Smoke Puff Micro-Motion */}
                <path
                  d="M17.2 2.5 C 16.5 1, 18.2 0.2, 17.5 -1.2"
                  stroke={isNight ? "#E28C46" : "#B86B32"}
                  strokeWidth="1"
                  strokeLinecap="round"
                  style={{ animation: "chimneyLogoSmoke 3.6s ease-out infinite" }}
                />
                {/* Steep Roof */}
                <path
                  d="M2.5 12.5L12 3.5L21.5 12.5"
                  stroke={isNight ? "#FAF6EE" : "#1A1614"}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="4.5"
                  y1="12.5"
                  x2="19.5"
                  y2="12.5"
                  stroke={isNight ? "#FAF6EE" : "#1A1614"}
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                {/* Cabin Walls */}
                <path
                  d="M5.5 12.5V20.5H18.5V12.5"
                  stroke={isNight ? "#FAF6EE" : "#1A1614"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Hearth Amber Portal */}
                <path
                  d="M10 20.5V16C10 14.9 10.9 14 12 14C13.1 14 14 14.9 14 16V20.5H10Z"
                  fill="#D4803E"
                />
                {/* Base Ground Line */}
                <line
                  x1="3"
                  y1="20.5"
                  x2="21"
                  y2="20.5"
                  stroke={isNight ? "#FAF6EE" : "#1A1614"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
              <span className={`font-chalet text-2xl sm:text-[26px] font-medium tracking-tight ${themeText} leading-none`}>
                Pensiunea Simi
              </span>
              <span className={`hidden sm:inline text-xs uppercase tracking-[0.14em] ${themeTextMuted}`}>
                Moisei · Maramureș
              </span>
            </div>
          </button>

          {/* Desktop Nav: Clean Disciplined Links + Global Theme Switcher */}
          <div className="hidden md:flex items-center gap-6">
            <nav className={`flex items-center gap-6 text-xs uppercase tracking-[0.12em] font-medium ${themeTextMuted}`}>
              {NAV_ITEMS.map((item) => {
                const isActive = page === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(item.id)}
                    className={`relative py-1 transition-colors cursor-pointer ${
                      isActive
                        ? `${themeText} font-semibold`
                        : `hover:${themeText}`
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className={`absolute bottom-0 left-0 right-0 h-[2px] ${themeAccentBg}`} />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Global Day / Night Minimal Theme Switcher */}
            <button
              type="button"
              onClick={() => setIsNight((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 border text-xs uppercase tracking-[0.12em] font-medium transition-colors cursor-pointer ${
                isNight
                  ? "border-[#FAF6EE]/25 bg-[#28231F] text-[#FAF6EE] hover:border-[#D4803E]"
                  : "border-[#1A1614]/15 bg-[#FAF6EE] text-[#1A1614] hover:border-[#B86B32]"
              }`}
              aria-label={isNight ? "Comută pe tema Zi" : "Comută pe tema Noapte"}
            >
              <span className={`w-2 h-2 ${isNight ? "bg-[#D4803E]" : "bg-[#B86B32]"}`} />
              <span>{isNight ? "Noapte" : "Zi"}</span>
            </button>

            <a
              href="tel:+40740981839"
              className={`px-4 py-2 ${
                isNight ? "bg-[#E28C46] text-[#141210] hover:bg-[#FAF6EE]" : "bg-[#1A1614] text-[#FAF6EE] hover:bg-[#B86B32]"
              } text-xs uppercase tracking-[0.12em] font-semibold transition-colors`}
            >
              0740 981 839
            </a>
          </div>

          {/* Mobile Right Controls: Theme Switcher & Burger Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={() => setIsNight((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 border text-[11px] uppercase tracking-[0.12em] font-medium transition-colors cursor-pointer ${
                isNight
                  ? "border-[#FAF6EE]/25 bg-[#28231F] text-[#FAF6EE]"
                  : "border-[#1A1614]/15 bg-[#FAF6EE] text-[#1A1614]"
              }`}
              aria-label={isNight ? "Comută pe tema Zi" : "Comută pe tema Noapte"}
            >
              <span className={`w-1.5 h-1.5 ${isNight ? "bg-[#D4803E]" : "bg-[#B86B32]"}`} />
              <span>{isNight ? "Noapte" : "Zi"}</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Închide" : "Meniu"}
              className={`flex flex-col justify-center items-end w-8 h-8 gap-1.5 cursor-pointer ${themeText}`}
            >
              <span
                className={`block h-[1.5px] ${isNight ? "bg-[#FAF6EE]" : "bg-[#1A1614]"} transition-all duration-300 ${
                  menuOpen ? "w-6 translate-y-[4.5px] rotate-45" : "w-6"
                }`}
              />
              <span
                className={`block h-[1.5px] ${themeAccentBg} transition-all duration-300 ${
                  menuOpen ? "opacity-0 w-0" : "w-4"
                }`}
              />
              <span
                className={`block h-[1.5px] ${isNight ? "bg-[#FAF6EE]" : "bg-[#1A1614]"} transition-all duration-300 ${
                  menuOpen ? "w-6 -translate-y-[4.5px] -rotate-45" : "w-5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu Overlay ─── */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className={`fixed inset-x-0 top-[61px] bottom-0 z-40 md:hidden ${themeBg} ${themeText} px-6 py-8 flex flex-col justify-between overflow-y-auto border-t ${themeBorder}`}
        >
          <nav className={`divide-y ${themeBorder} border-b ${themeBorder}`}>
            {NAV_ITEMS.map((item) => {
              const isActive = page === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className="w-full py-4 text-left flex items-baseline justify-between group cursor-pointer"
                >
                  <span
                    className={`font-chalet text-2xl ${
                      isActive ? `${themeAccent} font-semibold` : themeText
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent}`}>
                    {isActive ? "Activ" : "→"}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="pt-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:+40740981839"
                className={`py-3 ${
                  isNight ? "bg-[#E28C46] text-[#141210]" : "bg-[#1A1614] text-[#FAF6EE]"
                } text-xs font-semibold text-center uppercase tracking-[0.12em]`}
              >
                Sună direct
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`py-3 border ${themeBorder} ${themeText} text-xs font-semibold text-center uppercase tracking-[0.12em]`}
              >
                WhatsApp
              </a>
            </div>
            <p className={`text-xs ${themeTextMuted} text-center`}>
              Str. Izvorul Negru 257B, Moisei · Tichete de vacanță
            </p>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col">
        {/* =========================================================
            PAGE 1: ACASĂ — 10x Claude-Style Vector Alpine Motion Canvas
           ========================================================= */}
        {page === "acasa" && (
          <div className="flex-1 flex flex-col min-h-[calc(100svh-65px)]">
            {/* ─── 10x Claude-Style Tactile Vector Motion Stage (ZERO BITMAP) ─── */}
            <div className={`relative w-full border-b ${themeBorder} ${themeBg} overflow-hidden select-none`}>
              <div className="relative w-full aspect-[21/9] sm:aspect-[24/10] max-h-[520px] min-h-[310px]">
                <svg
                  viewBox="0 0 1200 480"
                  className="w-full h-full object-cover motion-safe-vector"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Peisaj vectorial animat cu Masivul Pietrosul Rodnei, râul Izvorul Negru și Pensiunea Simi"
                  role="img"
                >
                  <defs>
                    {/* Sky Gradient */}
                    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={isNight ? "#0B0F15" : "#FAF6EE"} />
                      <stop offset="50%" stopColor={isNight ? "#121822" : "#F4EDE2"} />
                      <stop offset="100%" stopColor={isNight ? "#1B202C" : "#E8DEC8"} />
                    </linearGradient>

                    {/* Glacial Stream Valea Izvorul Negru */}
                    <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={isNight ? "#243A34" : "#8EC3B9"} />
                      <stop offset="50%" stopColor={isNight ? "#1B2D29" : "#5F948A"} />
                      <stop offset="100%" stopColor={isNight ? "#14211E" : "#4A786F"} />
                    </linearGradient>

                    {/* Window Hearth Amber Glow */}
                    <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.95" />
                      <stop offset="60%" stopColor="#D4803E" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#B86B32" stopOpacity="0.35" />
                    </radialGradient>

                    {/* Hot Tub Water Gradient */}
                    <linearGradient id="ciubarWater" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={isNight ? "#3B6158" : "#8AC6B8"} stopOpacity="0.8" />
                      <stop offset="100%" stopColor={isNight ? "#1F3530" : "#3F6358"} stopOpacity="0.95" />
                    </linearGradient>

                    {/* Architectural Chalet Shingle Roof Gradient */}
                    <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={isNight ? "#1F1A16" : "#3D342D"} />
                      <stop offset="100%" stopColor={isNight ? "#120E0C" : "#261F1A"} />
                    </linearGradient>

                    {/* Timber Log Facade Gradient */}
                    <linearGradient id="logWallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={isNight ? "#241D17" : "#A8622A"} />
                      <stop offset="70%" stopColor={isNight ? "#2F251E" : "#C47D3B"} />
                      <stop offset="100%" stopColor={isNight ? "#1F1712" : "#924E1D"} />
                    </linearGradient>
                  </defs>

                  {/* Atmosphere Sky Canvas */}
                  <rect width="1200" height="480" fill="url(#skyGrad)" />

                  {/* ─── Sky Elements: Sun (Day) or Moon & Twinkling Constellations (Night) ─── */}
                  {!isNight ? (
                    <g transform="translate(940, 90)">
                      <circle
                        r="44"
                        fill="none"
                        stroke="#B86B32"
                        strokeWidth="1.25"
                        strokeDasharray="4 4"
                        opacity="0.45"
                      />
                      <circle r="34" fill="#FAF6EE" opacity="0.6" />
                    </g>
                  ) : (
                    <g id="night-celestial">
                      {/* Crescent Moon with Pulsing Corona */}
                      <g transform="translate(945, 80)">
                        <circle
                          r="36"
                          fill="none"
                          stroke="#FFD175"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                          style={{ animation: "moonHaloPulse 5.5s ease-in-out infinite" }}
                        />
                        <path
                          d="M -10 -22 A 22 22 0 1 0 12 14 A 18 18 0 1 1 -10 -22 Z"
                          fill="#FFF2D6"
                        />
                      </g>

                      {/* Constellation Ursa Major (Carul Mare) over Rodna Saddle */}
                      <g id="ursa-major" stroke="rgba(255, 242, 214, 0.45)" strokeWidth="0.6" fill="none">
                        <line x1="210" y1="52" x2="260" y2="48" />
                        <line x1="260" y1="48" x2="310" y2="68" />
                        <line x1="310" y1="68" x2="350" y2="76" />
                        <line x1="350" y1="76" x2="395" y2="72" />
                        <line x1="395" y1="72" x2="390" y2="102" />
                        <line x1="390" y1="102" x2="345" y2="104" />
                        <line x1="345" y1="104" x2="350" y2="76" />

                        <circle cx="210" cy="52" r="1.8" fill="#FFF2D6" style={{ animation: "starTwinkle1 3.2s ease-in-out infinite" }} />
                        <circle cx="260" cy="48" r="1.5" fill="#FFF2D6" style={{ animation: "starTwinkle2 4.1s ease-in-out infinite" }} />
                        <circle cx="310" cy="68" r="1.6" fill="#FFF2D6" style={{ animation: "starTwinkle3 3.6s ease-in-out infinite" }} />
                        <circle cx="350" cy="76" r="2" fill="#FFF2D6" style={{ animation: "starTwinkle1 2.8s ease-in-out infinite -1s" }} />
                        <circle cx="395" cy="72" r="1.9" fill="#FFF2D6" style={{ animation: "starTwinkle4 4.5s ease-in-out infinite" }} />
                        <circle cx="390" cy="102" r="1.7" fill="#FFF2D6" style={{ animation: "starTwinkle2 3.8s ease-in-out infinite -1.5s" }} />
                        <circle cx="345" cy="104" r="1.6" fill="#FFF2D6" style={{ animation: "starTwinkle3 3.3s ease-in-out infinite -0.8s" }} />
                      </g>

                      {/* Constellation Cassiopeia (W Shape) */}
                      <g id="cassiopeia" stroke="rgba(255, 242, 214, 0.4)" strokeWidth="0.6" fill="none">
                        <line x1="680" y1="42" x2="715" y2="60" />
                        <line x1="715" y1="60" x2="745" y2="45" />
                        <line x1="745" y1="45" x2="780" y2="68" />
                        <line x1="780" y1="68" x2="815" y2="52" />

                        <circle cx="680" cy="42" r="1.6" fill="#FFF2D6" style={{ animation: "starTwinkle2 3.5s ease-in-out infinite" }} />
                        <circle cx="715" cy="60" r="1.8" fill="#FFF2D6" style={{ animation: "starTwinkle4 4.2s ease-in-out infinite" }} />
                        <circle cx="745" cy="45" r="1.5" fill="#FFF2D6" style={{ animation: "starTwinkle1 3.1s ease-in-out infinite -0.5s" }} />
                        <circle cx="780" cy="68" r="1.9" fill="#FFF2D6" style={{ animation: "starTwinkle3 3.9s ease-in-out infinite" }} />
                        <circle cx="815" cy="52" r="1.6" fill="#FFF2D6" style={{ animation: "starTwinkle2 2.9s ease-in-out infinite -1.2s" }} />
                      </g>
                    </g>
                  )}

                  {/* High-Altitude Drifting Wind Lines */}
                  <g fill="none" stroke={isNight ? "#6B7A8A" : "#6B635B"} strokeWidth="1" strokeLinecap="round" opacity="0.3">
                    <path
                      d="M 160 75 C 290 60, 440 88, 620 68"
                      strokeDasharray="90 140"
                      style={{ animation: "windStream 14s linear infinite" }}
                    />
                    <path
                      d="M 480 105 C 620 90, 780 120, 960 95"
                      strokeDasharray="70 120"
                      style={{ animation: "windStream 18s linear infinite -6s" }}
                    />
                  </g>

                  {/* ─── High Mountain Ridge: Pietrosul Rodnei (2.303 m) ─── */}
                  <g>
                    <path
                      d="M 0 290 L 110 250 L 220 220 L 290 235 L 390 120 L 430 160 L 510 175 L 590 135 L 690 205 L 810 190 L 960 250 L 1100 240 L 1200 270 L 1200 480 L 0 480 Z"
                      fill={isNight ? "#1C212B" : "#EAE0CE"}
                      stroke={isNight ? "#2B3342" : "#CDBFA8"}
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />

                    {/* Summit Elevation Indicator Pin */}
                    <g transform="translate(390, 114)">
                      <line x1="0" y1="0" x2="0" y2="-26" stroke="#B86B32" strokeWidth="1.2" />
                      <circle cx="0" cy="-26" r="2.5" fill="#D4803E" />
                      <text
                        x="8"
                        y="-22"
                        fontSize="10"
                        fontFamily="'Plus Jakarta Sans', sans-serif"
                        letterSpacing="0.12em"
                        fill={isNight ? "#EAE0CE" : "#6B635B"}
                        fontWeight="600"
                      >
                        PIETROSUL RODNEI · 2.303 M
                      </text>
                    </g>

                    {/* Glacial Couloirs & Topographic Hatching */}
                    <g fill="none" stroke={isNight ? "#2E3645" : "#CDBFA8"} strokeWidth="1" opacity="0.6">
                      <path d="M 390 120 C 375 155, 360 200, 340 250" />
                      <path d="M 390 120 C 405 160, 420 195, 445 245" />
                      <path d="M 590 135 C 580 175, 560 210, 540 255" />
                      <path d="M 220 220 C 240 245, 270 265, 300 280" />
                    </g>
                  </g>

                  {/* ─── Soaring Golden Eagle (Acvilă de Munte) ─── */}
                  <g style={{ animation: "eagleRaptorThermal 34s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}>
                    <g transform="translate(0, 95)">
                      <path
                        d="M -14 5 Q -7 -4 0 0 Q 7 -4 14 5 Q 6 1.5 0 2 Q -6 1.5 -14 5 Z"
                        fill={isNight ? "#FAF6EE" : "#1A1614"}
                        opacity="0.85"
                      />
                    </g>
                  </g>

                  {/* ─── Mid-Mountain Ridge ─── */}
                  <g>
                    <path
                      d="M 0 345 L 140 310 L 270 270 L 380 300 L 510 280 L 640 315 L 740 250 L 860 290 L 1020 275 L 1200 335 L 1200 480 L 0 480 Z"
                      fill={isNight ? "#222731" : "#DFD4C0"}
                      stroke={isNight ? "#353D4D" : "#C0B29E"}
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ─── Majestic Carpathian Stag (Cerb Carpatin cu Coarne) on Rocky Crest ─── */}
                  <g
                    transform="translate(268, 268)"
                    style={{
                      transformOrigin: "268px 268px",
                      animation: "cerbBreathing 5.2s ease-in-out infinite",
                    }}
                    aria-label="Cerb carpatin pe creastă"
                  >
                    {/* Stag Body */}
                    <path
                      d="M -16 6 C -18 0, -10 -8, 6 -6 C 16 -5, 20 2, 18 10 L 14 16 L -12 16 Z"
                      fill={isNight ? "#3E362E" : "#8A7966"}
                    />
                    {/* Legs */}
                    <line x1="-12" y1="16" x2="-14" y2="28" stroke={isNight ? "#2B241E" : "#5E5244"} strokeWidth="1.8" />
                    <line x1="-8" y1="16" x2="-7" y2="28" stroke={isNight ? "#2B241E" : "#5E5244"} strokeWidth="1.8" />
                    <line x1="10" y1="16" x2="9" y2="28" stroke={isNight ? "#2B241E" : "#5E5244"} strokeWidth="1.8" />
                    <line x1="14" y1="16" x2="16" y2="28" stroke={isNight ? "#2B241E" : "#5E5244"} strokeWidth="1.8" />

                    {/* Stag Head & Antlers (Animated Alert Head Scan) */}
                    <g style={{ transformOrigin: "12px -2px", animation: "cerbHeadAlert 11s ease-in-out infinite" }}>
                      {/* Neck & Head */}
                      <path d="M 6 -5 L 14 -14 L 18 -10 L 14 -3 Z" fill={isNight ? "#2B241E" : "#5E5244"} />
                      <circle cx="15" cy="-12" r="3.2" fill={isNight ? "#2B241E" : "#5E5244"} />
                      {/* Magnificent 12-point Antlers */}
                      <g fill="none" stroke={isNight ? "#EAE0CE" : "#1A1614"} strokeWidth="1.1" strokeLinecap="round">
                        {/* Left Main Beam */}
                        <path d="M 14 -15 Q 11 -26 6 -32 Q 4 -35 2 -36" />
                        <path d="M 12 -22 L 7 -25" />
                        <path d="M 9 -27 L 4 -29" />
                        <path d="M 6 -32 L 2 -33" />
                        {/* Right Main Beam */}
                        <path d="M 15 -15 Q 18 -26 23 -32 Q 25 -35 27 -36" />
                        <path d="M 17 -22 L 22 -25" />
                        <path d="M 20 -27 L 25 -29" />
                        <path d="M 23 -32 L 27 -33" />
                      </g>
                    </g>
                  </g>

                  {/* Carpathian Chamois (Capră Neagră) on Eastern Mountain Crag */}
                  <g
                    transform="translate(980, 270)"
                    style={{
                      transformOrigin: "980px 270px",
                      animation: "chamoisBreathing 4.5s ease-in-out infinite",
                    }}
                    aria-label="Capră neagră carpatină pe creastă"
                  >
                    <polygon points="-12,2 -4,-6 8,-4 14,3" fill={isNight ? "#36302B" : "#A69885"} />
                    <g style={{ transformOrigin: "0px -10px", animation: "chamoisHeadLook 10s ease-in-out infinite" }}>
                      <ellipse cx="0" cy="-8" rx="6" ry="4" fill={isNight ? "#141210" : "#28231F"} />
                      <line x1="-4" y1="-5" x2="-5" y2="0" stroke="#1A1614" strokeWidth="1.4" />
                      <line x1="-2" y1="-5" x2="-2" y2="0" stroke="#1A1614" strokeWidth="1.4" />
                      <line x1="2" y1="-5" x2="2" y2="0" stroke="#1A1614" strokeWidth="1.4" />
                      <line x1="4" y1="-5" x2="4" y2="0" stroke="#1A1614" strokeWidth="1.4" />
                      <path d="M 3 -10 L 6 -15 L 8 -14 L 5 -9 Z" fill="#1A1614" />
                      <path
                        d="M 6 -15 Q 7 -21 5 -22 Q 4 -22 3 -20"
                        fill="none"
                        stroke="#1A1614"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </g>
                  </g>

                  {/* Swaying Fir Trees along Ridge */}
                  <g style={{ transformOrigin: "115px 400px", animation: "pineSwayGentle 6.4s ease-in-out infinite" }}>
                    <line x1="115" y1="400" x2="115" y2="330" stroke="#1A1614" strokeWidth="2" />
                    <polygon points="115,315 102,345 128,345" fill={isNight ? "#121A15" : "#4A5647"} />
                    <polygon points="115,335 97,365 133,365" fill={isNight ? "#121A15" : "#4A5647"} />
                    <polygon points="115,355 92,390 138,390" fill={isNight ? "#0C120E" : "#3B4539"} />
                  </g>

                  <g style={{ transformOrigin: "670px 405px", animation: "pineSwayGentle 8.2s ease-in-out infinite -4.1s" }}>
                    <line x1="670" y1="405" x2="670" y2="320" stroke="#1A1614" strokeWidth="2.2" />
                    <polygon points="670,305 654,340 686,340" fill={isNight ? "#121A15" : "#455142"} />
                    <polygon points="670,328 648,362 692,362" fill={isNight ? "#121A15" : "#3C473A"} />
                    <polygon points="670,350 642,392 698,392" fill={isNight ? "#0C120E" : "#323B30"} />
                  </g>

                  {/* ─── Valley Meadow Foreground ─── */}
                  <path
                    d="M 0 405 Q 260 380 520 415 T 980 410 L 1200 425 L 1200 480 L 0 480 Z"
                    fill={isNight ? "#191614" : "#D2C5B0"}
                    stroke={isNight ? "#2B2521" : "#B2A189"}
                    strokeWidth="1.5"
                  />

                  {/* ─── Valea Izvorul Negru Glacial Stream (Winding with Flowing Ripples) ─── */}
                  <g id="valea-izvorul-negru">
                    {/* Winding River Bed */}
                    <path
                      d="M 420 310 C 445 345, 510 375, 485 410 C 460 445, 390 455, 340 480 L 440 480 C 490 455, 555 440, 565 405 C 575 370, 485 335, 465 310 Z"
                      fill="url(#streamGrad)"
                      stroke={isNight ? "#1B2F29" : "#3B6158"}
                      strokeWidth="1.2"
                    />

                    {/* Animated Glacial Water Current Ripples */}
                    <path
                      d="M 435 320 C 460 350, 495 375, 480 402"
                      stroke={isNight ? "#6FA398" : "#FAF6EE"}
                      strokeWidth="1.3"
                      strokeDasharray="22 40"
                      fill="none"
                      opacity="0.6"
                      style={{ animation: "streamFlowRipple1 3.2s linear infinite" }}
                    />
                    <path
                      d="M 455 352 C 490 385, 505 415, 470 445"
                      stroke={isNight ? "#55877D" : "#FAF6EE"}
                      strokeWidth="1.1"
                      strokeDasharray="18 36"
                      fill="none"
                      opacity="0.5"
                      style={{ animation: "streamFlowRipple2 3.8s linear infinite -1.6s" }}
                    />
                    <path
                      d="M 470 395 C 495 425, 450 455, 395 475"
                      stroke={isNight ? "#6FA398" : "#FAF6EE"}
                      strokeWidth="1.2"
                      strokeDasharray="20 38"
                      fill="none"
                      opacity="0.55"
                      style={{ animation: "streamFlowRipple1 3.5s linear infinite -0.9s" }}
                    />
                  </g>

                  {/* ─── Ultra-Premium Architectural Alpine Lodge (Pensiunea Simi) ─── */}
                  <g transform="translate(685, 230)" id="pensiunea-simi-chalet">
                    {/* 1. Heavy Mountain Fieldstone Chimney Breast */}
                    <g id="chalet-chimney">
                      <rect
                        x="28"
                        y="10"
                        width="18"
                        height="172"
                        fill={isNight ? "#241F1C" : "#5A5046"}
                        stroke="#1A1614"
                        strokeWidth="1.2"
                      />
                      {/* Alternating Stone Masonry Course Joints */}
                      <g stroke={isNight ? "#14110F" : "#3D352D"} strokeWidth="0.8" opacity="0.65">
                        <line x1="28" y1="24" x2="46" y2="24" />
                        <line x1="37" y1="10" x2="37" y2="24" />
                        <line x1="28" y1="42" x2="46" y2="42" />
                        <line x1="33" y1="24" x2="33" y2="42" />
                        <line x1="28" y1="64" x2="46" y2="64" />
                        <line x1="40" y1="42" x2="40" y2="64" />
                        <line x1="28" y1="90" x2="46" y2="90" />
                        <line x1="35" y1="64" x2="35" y2="90" />
                        <line x1="28" y1="120" x2="46" y2="120" />
                        <line x1="38" y1="90" x2="38" y2="120" />
                        <line x1="28" y1="150" x2="46" y2="150" />
                        <line x1="34" y1="120" x2="34" y2="150" />
                      </g>

                      {/* Handcrafted Copper Chimney Cap & Spark Hood */}
                      <rect
                        x="25"
                        y="8"
                        width="24"
                        height="3.5"
                        fill={isNight ? "#8C4E22" : "#B86B32"}
                        stroke="#1A1614"
                        strokeWidth="1"
                      />
                      <polygon
                        points="24,8 37,1 50,8"
                        fill={isNight ? "#A05A28" : "#D4803E"}
                        stroke="#1A1614"
                        strokeWidth="1.2"
                      />

                      {/* High-Craft Curling Woodsmoke Plumes */}
                      <g transform="translate(37, 0)" fill="none" strokeLinecap="round">
                        <path
                          d="M 0 0 C -8 -20, -18 -36, -10 -60 C -3 -82, -20 -105, -14 -132"
                          stroke={isNight ? "#EAE0CE" : "#6B635B"}
                          strokeWidth="1.8"
                          strokeDasharray="45 80"
                          style={{ animation: "simiSmokeWisp1 5.8s ease-out infinite" }}
                        />
                        <path
                          d="M 0 0 C 9 -18, 20 -40, 12 -64 C 5 -88, 24 -110, 18 -138"
                          stroke={isNight ? "#EAE0CE" : "#8A8177"}
                          strokeWidth="1.4"
                          strokeDasharray="40 70"
                          style={{ animation: "simiSmokeWisp2 6.6s ease-out infinite -2.8s" }}
                        />
                      </g>
                    </g>

                    {/* 2. Natural River-Stone Foundation Plinth */}
                    <g id="chalet-plinth">
                      <rect
                        x="12"
                        y="166"
                        width="226"
                        height="18"
                        fill={isNight ? "#1C1714" : "#564D44"}
                        stroke="#1A1614"
                        strokeWidth="1.5"
                      />
                      <g stroke={isNight ? "#120E0C" : "#3F3730"} strokeWidth="0.8" opacity="0.6">
                        <path d="M 24 166 Q 32 174 42 166 Q 52 174 62 166 Q 74 175 88 166" fill="none" />
                        <path d="M 30 176 Q 44 182 58 176 Q 72 183 86 176" fill="none" />
                        <path d="M 100 166 Q 112 175 126 166 Q 138 174 150 166 Q 164 175 180 166 Q 196 175 210 166" fill="none" />
                        <path d="M 110 176 Q 128 183 146 176 Q 166 182 186 176 Q 204 183 222 176" fill="none" />
                      </g>

                      {/* Stone Entry Porch Steps */}
                      <rect x="94" y="174" width="38" height="3.5" fill={isNight ? "#261F1A" : "#6E6356"} stroke="#1A1614" strokeWidth="0.8" />
                      <rect x="90" y="177.5" width="46" height="3.5" fill={isNight ? "#201A16" : "#60564A"} stroke="#1A1614" strokeWidth="0.8" />
                      <rect x="86" y="181" width="54" height="3.5" fill={isNight ? "#1A1512" : "#524A40"} stroke="#1A1614" strokeWidth="0.8" />
                    </g>

                    {/* 3. Right-Side Covered Firewood Store */}
                    <g id="chalet-wood-shed" transform="translate(230, 126)">
                      <polygon points="0,0 26,14 26,16 0,2" fill={isNight ? "#14110F" : "#3A322C"} stroke="#1A1614" strokeWidth="1" />
                      <line x1="0" y1="2" x2="26" y2="16" stroke="#FAF6EE" strokeWidth="0.8" opacity="0.3" />
                      <rect x="23" y="15" width="3" height="42" fill={isNight ? "#201813" : "#6E4522"} stroke="#1A1614" strokeWidth="0.8" />
                      <g fill={isNight ? "#3D2B1E" : "#B87A44"} stroke="#1A1614" strokeWidth="0.7">
                        <circle cx="6" cy="52" r="3.5" />
                        <circle cx="13" cy="52" r="3.5" />
                        <circle cx="20" cy="52" r="3.5" />
                        <circle cx="9.5" cy="46" r="3.5" />
                        <circle cx="16.5" cy="46" r="3.5" />
                        <circle cx="6" cy="40" r="3.5" />
                        <circle cx="13" cy="40" r="3.5" />
                        <circle cx="20" cy="40" r="3.5" />
                        <circle cx="9.5" cy="34" r="3.5" />
                        <circle cx="16.5" cy="34" r="3.5" />
                        <circle cx="13" cy="28" r="3.5" />
                      </g>
                    </g>

                    {/* 4. Ground Floor Timber Log Wall */}
                    <g id="chalet-ground-floor">
                      <rect
                        x="18"
                        y="98"
                        width="214"
                        height="68"
                        fill="url(#logWallGrad)"
                        stroke="#1A1614"
                        strokeWidth="1.5"
                      />
                      {/* Dovetail Notches on Left & Right Corners */}
                      <g fill={isNight ? "#201814" : "#9E5624"} stroke="#1A1614" strokeWidth="1">
                        <rect x="12" y="99" width="7" height="9" />
                        <rect x="11" y="117" width="8" height="9" />
                        <rect x="12" y="135" width="7" height="9" />
                        <rect x="11" y="153" width="8" height="9" />

                        <rect x="231" y="99" width="7" height="9" />
                        <rect x="230" y="117" width="8" height="9" />
                        <rect x="231" y="135" width="7" height="9" />
                        <rect x="230" y="153" width="8" height="9" />
                      </g>

                      {/* Horizontal Timber Log Seams */}
                      <g stroke="#1A1614" strokeWidth="0.8" opacity="0.35">
                        <line x1="18" y1="108" x2="232" y2="108" />
                        <line x1="18" y1="118" x2="232" y2="118" />
                        <line x1="18" y1="128" x2="232" y2="128" />
                        <line x1="18" y1="138" x2="232" y2="138" />
                        <line x1="18" y1="148" x2="232" y2="148" />
                        <line x1="18" y1="158" x2="232" y2="158" />
                      </g>

                      {/* Left Multi-Pane Panoramic Suite Window */}
                      <g transform="translate(36, 112)">
                        <rect x="-2" y="-2" width="46" height="42" fill={isNight ? "#1B1512" : "#4A2B14"} stroke="#1A1614" strokeWidth="1.2" />
                        <rect
                          width="42"
                          height="38"
                          fill="url(#windowGlow)"
                          stroke="#1A1614"
                          strokeWidth="1"
                          style={{ animation: "hearthWarmGlow 5s ease-in-out infinite" }}
                        />
                        <path d="M 0 0 Q 8 18 2 38 L 0 38 Z" fill="#6B3A18" opacity="0.45" />
                        <path d="M 42 0 Q 34 18 40 38 L 42 38 Z" fill="#6B3A18" opacity="0.45" />
                        <line x1="21" y1="0" x2="21" y2="38" stroke="#1A1614" strokeWidth="1" />
                        <line x1="0" y1="13" x2="42" y2="13" stroke="#1A1614" strokeWidth="0.8" />
                        <line x1="0" y1="26" x2="42" y2="26" stroke="#1A1614" strokeWidth="0.8" />
                        <line x1="-3" y1="39" x2="45" y2="39" stroke="#1A1614" strokeWidth="1.8" />
                      </g>

                      {/* Grand Entrance Portal */}
                      <g transform="translate(100, 114)">
                        <rect x="-2" y="-2" width="28" height="54" fill={isNight ? "#18120F" : "#3E2412"} stroke="#1A1614" strokeWidth="1.2" />
                        <rect x="0" y="0" width="24" height="10" fill="url(#windowGlow)" stroke="#1A1614" strokeWidth="0.9" />
                        <line x1="12" y1="0" x2="12" y2="10" stroke="#1A1614" strokeWidth="0.7" />
                        <rect x="0" y="11" width="24" height="41" fill={isNight ? "#1C1511" : "#4A2B14"} stroke="#1A1614" strokeWidth="1.2" />
                        <line x1="12" y1="11" x2="12" y2="52" stroke="#1A1614" strokeWidth="1" />
                        <line x1="6" y1="13" x2="6" y2="50" stroke="#1A1614" strokeWidth="0.6" opacity="0.5" />
                        <line x1="18" y1="13" x2="18" y2="50" stroke="#1A1614" strokeWidth="0.6" opacity="0.5" />
                        <circle cx="10" cy="32" r="1.2" fill="#E28C46" />
                        <circle cx="14" cy="32" r="1.2" fill="#E28C46" />

                        {/* Brass Sconces with Downlight Cones */}
                        <g transform="translate(-8, 16)">
                          <polygon points="-2,14 8,14 3,0" fill="#FFD175" opacity={isNight ? "0.35" : "0.15"} />
                          <rect x="1" y="0" width="4" height="4" fill="#E28C46" stroke="#1A1614" strokeWidth="0.6" />
                          <circle cx="3" cy="2" r="1" fill="#FFF2D6" />
                        </g>
                        <g transform="translate(26, 16)">
                          <polygon points="-2,14 8,14 3,0" fill="#FFD175" opacity={isNight ? "0.35" : "0.15"} />
                          <rect x="1" y="0" width="4" height="4" fill="#E28C46" stroke="#1A1614" strokeWidth="0.6" />
                          <circle cx="3" cy="2" r="1" fill="#FFF2D6" />
                        </g>
                      </g>

                      {/* Right Expansive Dining & Lounge Multi-Bay Window */}
                      <g transform="translate(142, 112)">
                        <rect x="-2" y="-2" width="76" height="42" fill={isNight ? "#1B1512" : "#4A2B14"} stroke="#1A1614" strokeWidth="1.2" />
                        <rect
                          width="72"
                          height="38"
                          fill="url(#windowGlow)"
                          stroke="#1A1614"
                          strokeWidth="1"
                          style={{ animation: "hearthWarmGlow 5.4s ease-in-out infinite -1.8s" }}
                        />
                        <path d="M 0 0 Q 7 18 2 38 L 0 38 Z" fill="#6B3A18" opacity="0.45" />
                        <path d="M 72 0 Q 65 18 70 38 L 72 38 Z" fill="#6B3A18" opacity="0.45" />
                        <line x1="24" y1="0" x2="24" y2="38" stroke="#1A1614" strokeWidth="1.1" />
                        <line x1="48" y1="0" x2="48" y2="38" stroke="#1A1614" strokeWidth="1.1" />
                        <line x1="0" y1="19" x2="72" y2="19" stroke="#1A1614" strokeWidth="0.8" />
                        <line x1="-3" y1="39" x2="75" y2="39" stroke="#1A1614" strokeWidth="1.8" />
                      </g>
                    </g>

                    {/* 5. Cantilevered First Floor Balcony (Prispă & Cerdac) */}
                    <g id="chalet-balcony">
                      <rect
                        x="12"
                        y="94"
                        width="226"
                        height="6"
                        fill={isNight ? "#1B1511" : "#5A3418"}
                        stroke="#1A1614"
                        strokeWidth="1.2"
                      />
                      {/* Carved Timber Corbels */}
                      <g fill={isNight ? "#14100D" : "#4A2810"} stroke="#1A1614" strokeWidth="0.8">
                        <polygon points="24,100 28,100 24,110" />
                        <polygon points="68,100 72,100 68,110" />
                        <polygon points="112,100 116,100 112,110" />
                        <polygon points="160,100 164,100 160,110" />
                        <polygon points="214,100 218,100 214,110" />
                      </g>

                      {/* Upper Floor Suite Walls (Behind Balcony) */}
                      <rect
                        x="22"
                        y="54"
                        width="206"
                        height="40"
                        fill={isNight ? "#241C16" : "#A65F28"}
                        stroke="#1A1614"
                        strokeWidth="1.2"
                      />

                      {/* Suite 1 Glazed French Balcony Doors */}
                      <g transform="translate(42, 58)">
                        <rect width="30" height="36" fill="url(#windowGlow)" stroke="#1A1614" strokeWidth="1" style={{ animation: "hearthWarmGlow 4.6s ease-in-out infinite -0.9s" }} />
                        <line x1="15" y1="0" x2="15" y2="36" stroke="#1A1614" strokeWidth="1" />
                        <line x1="0" y1="12" x2="30" y2="12" stroke="#1A1614" strokeWidth="0.7" />
                        <line x1="0" y1="24" x2="30" y2="24" stroke="#1A1614" strokeWidth="0.7" />
                      </g>

                      {/* Suite 2 Center French Balcony Doors */}
                      <g transform="translate(108, 58)">
                        <rect width="28" height="36" fill="url(#windowGlow)" stroke="#1A1614" strokeWidth="1" style={{ animation: "hearthWarmGlow 5.1s ease-in-out infinite -2.2s" }} />
                        <line x1="14" y1="0" x2="14" y2="36" stroke="#1A1614" strokeWidth="1" />
                        <line x1="0" y1="12" x2="28" y2="12" stroke="#1A1614" strokeWidth="0.7" />
                        <line x1="0" y1="24" x2="28" y2="24" stroke="#1A1614" strokeWidth="0.7" />
                      </g>

                      {/* Suite 3 Glazed French Balcony Doors */}
                      <g transform="translate(168, 58)">
                        <rect width="32" height="36" fill="url(#windowGlow)" stroke="#1A1614" strokeWidth="1" style={{ animation: "hearthWarmGlow 4.9s ease-in-out infinite -1.4s" }} />
                        <line x1="16" y1="0" x2="16" y2="36" stroke="#1A1614" strokeWidth="1" />
                        <line x1="0" y1="12" x2="32" y2="12" stroke="#1A1614" strokeWidth="0.7" />
                        <line x1="0" y1="24" x2="32" y2="24" stroke="#1A1614" strokeWidth="0.7" />
                      </g>

                      {/* 4 Carved Wooden Porch Pillars */}
                      <g fill={isNight ? "#18120E" : "#4A2B14"} stroke="#1A1614" strokeWidth="1">
                        <rect x="20" y="52" width="5" height="42" />
                        <rect x="80" y="52" width="5" height="42" />
                        <rect x="150" y="52" width="5" height="42" />
                        <rect x="220" y="52" width="5" height="42" />
                      </g>

                      {/* Traditional Maramureș Carved Wooden Balustrade */}
                      <rect x="10" y="74" width="230" height="3" fill={isNight ? "#1E1712" : "#6E3F18"} stroke="#1A1614" strokeWidth="1" />
                      <rect x="10" y="91" width="230" height="2" fill={isNight ? "#1E1712" : "#6E3F18"} stroke="#1A1614" strokeWidth="0.8" />
                      <g stroke="#1A1614" strokeWidth="0.7" fill={isNight ? "#14100D" : "#8A4F20"}>
                        {Array.from({ length: 28 }).map((_, i) => (
                          <rect key={i} x={15 + i * 8} y="77" width="4.5" height="14" rx="0.5" />
                        ))}
                      </g>
                    </g>

                    {/* 6. Multi-Tiered Steep Alpine Shingle Roof with Alpine Dormer */}
                    <g id="chalet-roof">
                      {/* Main Steep Gable Pitch Roof */}
                      <polygon
                        points="125,18 -4,78 254,78"
                        fill="url(#roofGrad)"
                        stroke="#1A1614"
                        strokeWidth="2"
                      />

                      {/* Under-Eave Timber Shadow Plane */}
                      <polygon
                        points="-4,78 254,78 248,82 2,82"
                        fill={isNight ? "#0C0A09" : "#1F1A15"}
                        stroke="#1A1614"
                        strokeWidth="1.2"
                      />

                      {/* Layered Alpine Spruce Shingle Rows */}
                      <g stroke={isNight ? "#2B231D" : "#4A3E34"} strokeWidth="0.9" fill="none">
                        <line x1="14" y1="72" x2="236" y2="72" />
                        <line x1="30" y1="64" x2="220" y2="64" />
                        <line x1="48" y1="56" x2="202" y2="56" />
                        <line x1="66" y1="48" x2="184" y2="48" />
                        <line x1="84" y1="40" x2="166" y2="40" />
                        <line x1="102" y1="32" x2="148" y2="32" />
                        <line x1="116" y1="24" x2="134" y2="24" />
                      </g>

                      {/* South-Facing Shingle Sheen */}
                      <line x1="6" y1="76" x2="124" y2="20" stroke="#FAF6EE" strokeWidth="0.8" opacity={isNight ? "0.15" : "0.35"} />

                      {/* Exposed Wooden Rafter Tails along the Eaves */}
                      <g stroke="#1A1614" strokeWidth="1.2" strokeLinecap="round">
                        {Array.from({ length: 14 }).map((_, i) => (
                          <line key={i} x1={8 + i * 18} y1="78" x2={8 + i * 18} y2="82" />
                        ))}
                      </g>

                      {/* Architectural Alpine Dormer (Lucarnă de Mansardă) */}
                      <g id="chalet-dormer" transform="translate(104, 30)">
                        <rect x="6" y="16" width="30" height="26" fill={isNight ? "#1C1612" : "#8A4F20"} stroke="#1A1614" strokeWidth="1" />
                        <polygon points="21,0 0,16 42,16" fill={isNight ? "#100D0B" : "#28211C"} stroke="#1A1614" strokeWidth="1.5" />
                        <line x1="1" y1="16" x2="21" y2="1" stroke="#FAF6EE" strokeWidth="0.7" opacity="0.4" />
                        <g transform="translate(11, 20)">
                          <rect width="20" height="18" rx="2" fill="url(#windowGlow)" stroke="#1A1614" strokeWidth="1" style={{ animation: "hearthWarmGlow 5.6s ease-in-out infinite -2.7s" }} />
                          <line x1="10" y1="0" x2="10" y2="18" stroke="#1A1614" strokeWidth="0.8" />
                          <line x1="0" y1="9" x2="20" y2="9" stroke="#1A1614" strokeWidth="0.8" />
                        </g>
                      </g>

                      {/* Traditional Maramureș Carved Roof Finial */}
                      <g transform="translate(125, 12)">
                        <line x1="0" y1="6" x2="0" y2="-6" stroke={isNight ? "#EAE0CE" : "#1A1614"} strokeWidth="1.6" strokeLinecap="round" />
                        <circle cx="0" cy="-6" r="2.2" fill={isNight ? "#E28C46" : "#B86B32"} stroke="#1A1614" strokeWidth="0.8" />
                      </g>
                    </g>
                  </g>

                  {/* ─── Steaming Outdoor Wooden Ciubăr (39°C) ─── */}
                  <g transform="translate(965, 392)" id="ciubar-cald">
                    <path
                      d="M 0 16 L 4 44 Q 26 49 48 44 L 52 16 Z"
                      fill={isNight ? "#241D18" : "#5C4638"}
                      stroke="#1A1614"
                      strokeWidth="1.5"
                    />
                    <path d="M 2 26 Q 26 31 50 26" fill="none" stroke="#1A1614" strokeWidth="1.4" />
                    <path d="M 3 37 Q 26 42 49 37" fill="none" stroke="#1A1614" strokeWidth="1.4" />

                    <ellipse cx="26" cy="16" rx="26" ry="7" fill="url(#ciubarWater)" stroke="#1A1614" strokeWidth="1.2" />

                    {/* Rising Steam Micro-Motion */}
                    <g fill="none" stroke={isNight ? "#EAE0CE" : "#FAF6EE"} strokeWidth="1.2" strokeLinecap="round">
                      <path
                        d="M 18 14 Q 14 6 20 -2 Q 26 -10 22 -18"
                        strokeDasharray="14 18"
                        style={{ animation: "steamRiseWisp 4.4s ease-out infinite" }}
                      />
                      <path
                        d="M 32 14 Q 38 6 30 -4 Q 24 -12 30 -22"
                        strokeDasharray="12 16"
                        style={{ animation: "steamRiseWisp 5.1s ease-out infinite -2.2s" }}
                      />
                    </g>
                  </g>

                  {/* ─── Campfire with 3-Layer Flickering Flames & Drifting Embers ─── */}
                  <g transform="translate(615, 420)" id="hearth-campfire">
                    {/* Firepit Stones */}
                    <ellipse cx="0" cy="4" rx="16" ry="6" fill="#3D3631" stroke="#1A1614" strokeWidth="1" />
                    <ellipse cx="0" cy="3" rx="10" ry="4" fill="#6B3214" />

                    {/* Outer Flame (Orange) */}
                    <path
                      d="M -7 3 Q -10 -8 0 -18 Q 10 -8 7 3 Z"
                      fill="#D4803E"
                      style={{ animation: "flameLickOuter 1.2s ease-in-out infinite" }}
                    />
                    {/* Mid Flame (Warm Amber) */}
                    <path
                      d="M -4 3 Q -6 -5 0 -13 Q 6 -5 4 3 Z"
                      fill="#FF9233"
                      style={{ animation: "flameLickMid 0.9s ease-in-out infinite" }}
                    />
                    {/* Core Flame (Bright Yellow) */}
                    <path
                      d="M -2 3 Q -3 -2 0 -8 Q 3 -2 2 3 Z"
                      fill="#FFF1B8"
                      style={{ animation: "flameLickCore 0.7s ease-in-out infinite" }}
                    />

                    {/* Drifting Embers */}
                    <circle cx="-3" cy="-10" r="1.3" fill="#FFD175" style={{ animation: "emberDrift1 3.2s ease-out infinite" }} />
                    <circle cx="4" cy="-12" r="1.1" fill="#FF9233" style={{ animation: "emberDrift2 3.9s ease-out infinite -1.4s" }} />
                    <circle cx="1" cy="-15" r="0.9" fill="#D4803E" style={{ animation: "emberDrift1 4.2s ease-out infinite -2.1s" }} />
                  </g>
                </svg>
              </div>
            </div>

            {/* ─── Concise Disciplined Hero Text Lockup (Radically Short) ─── */}
            <section className="max-w-[1300px] w-full mx-auto px-4 sm:px-8 py-8 sm:py-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-8 space-y-4">
                  <div className={`flex items-center gap-3 text-xs uppercase tracking-[0.14em] ${themeAccent} font-semibold`}>
                    <span>Pensiunea Agroturistică Simi</span>
                    <span>·</span>
                    <span>Moisei · Maramureș</span>
                  </div>

                  <h1 className={`font-chalet text-3xl sm:text-5xl lg:text-6xl font-normal ${themeText} leading-[1.08] tracking-tight`}>
                    Liniște, lemn cald și ciubăr la poalele Munților Rodnei.
                  </h1>

                  <p className={`font-ui text-base sm:text-lg ${themeTextMuted} max-w-2xl leading-relaxed`}>
                    Șapte camere cu balcon propriu, foișor cu foc de lemne și apă caldă la 39°C pe Valea Izvorul Negru în Moisei.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <a
                    href="tel:+40740981839"
                    className={`w-full py-3.5 px-6 ${
                      isNight ? "bg-[#E28C46] text-[#141210] hover:bg-[#FAF6EE]" : "bg-[#1A1614] text-[#FAF6EE] hover:bg-[#B86B32]"
                    } text-xs uppercase tracking-[0.14em] font-semibold text-center transition-colors`}
                  >
                    Sună gazda · 0740 981 839
                  </a>

                  <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                      type="button"
                      onClick={() => navigate("rezervare")}
                      className={`py-3 px-4 border ${themeBorder} hover:${themeAccentBg} hover:text-[#FAF6EE] ${themeText} text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors cursor-pointer`}
                    >
                      Rezervare rapidă
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("trasee")}
                      className={`py-3 px-4 border ${themeBorder} ${themeTextMuted} hover:${themeText} text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors cursor-pointer`}
                    >
                      Trasee 2.303m →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── SECTION A: Căldura Lemnului & Camerele (Curated Suite Peek) ─── */}
            <section className={`border-t ${themeBorder} py-12 sm:py-16 ${themeSurface} transition-colors duration-300`}>
              <div className="max-w-[1300px] mx-auto px-4 sm:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 ${themeBorder}">
                  <div>
                    <span className={`text-xs uppercase tracking-[0.14em] ${themeAccent} font-semibold block`}>
                      01 · Odihnă &amp; Intimitate
                    </span>
                    <h2 className={`font-chalet text-2xl sm:text-3xl font-normal ${themeText} mt-1`}>
                      Cele 7 Camere cu vedere spre Masivul Pietrosul
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("camere")}
                    className={`text-xs uppercase tracking-[0.12em] font-semibold ${themeAccent} hover:underline cursor-pointer`}
                  >
                    Vezi toate detaliile camerelor →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {SUITES.map((suite) => (
                    <div
                      key={suite.id}
                      className={`border ${themeBorder} ${themeSurfaceElevated} flex flex-col justify-between group transition-all hover:border-[#D4803E]`}
                    >
                      <div className="relative h-64 overflow-hidden bg-[#231F1C]">
                        <ResilientPhoto
                          src={suite.primaryImg}
                          fallback={suite.fallbackImg}
                          alt={suite.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-[#1A1614]/90 text-[#FAF6EE] px-3 py-1 text-xs uppercase tracking-[0.12em] font-medium">
                          {suite.index} · {suite.count}
                        </div>
                        <div className="absolute bottom-3 right-3 bg-[#FAF6EE] text-[#1A1614] px-3 py-1 text-xs uppercase tracking-[0.12em] font-semibold">
                          {suite.capacity}
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <h3 className={`font-chalet text-xl ${themeText}`}>
                          {suite.name}
                        </h3>
                        <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                          {suite.spec}
                        </p>
                        <div className="pt-2 flex items-center justify-between border-t ${themeBorder}">
                          <button
                            type="button"
                            onClick={() => selectRoomAndBook(suite.name)}
                            className={`text-xs uppercase tracking-[0.12em] font-semibold ${themeAccent} hover:underline cursor-pointer`}
                          >
                            Rezervă camera →
                          </button>
                          <span className={`text-[11px] ${themeTextMuted}`}>
                            Balcon privat
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── SECTION B: Ciubăr Cald (39°C) & Foișor Tradițional ─── */}
            <section className={`border-t ${themeBorder} py-12 sm:py-16 ${themeBg} transition-colors duration-300`}>
              <div className="max-w-[1300px] mx-auto px-4 sm:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 ${themeBorder}">
                  <div>
                    <span className={`text-xs uppercase tracking-[0.14em] ${themeAccent} font-semibold block`}>
                      02 · Tihnă &amp; Gastronomie
                    </span>
                    <h2 className={`font-chalet text-2xl sm:text-3xl font-normal ${themeText} mt-1`}>
                      Ciubăr fierbinte sub cerul liber și foișor cu cuptor pe lemne
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("ciubar")}
                    className={`text-xs uppercase tracking-[0.12em] font-semibold ${themeAccent} hover:underline cursor-pointer`}
                  >
                    Descoperă curtea și facilitățile →
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <div className="lg:col-span-7 relative h-80 sm:h-[440px] overflow-hidden bg-[#231F1C] border ${themeBorder}">
                    <ResilientPhoto
                      src={
                        isNight
                          ? "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=df59a858-ffea-4824-be91-f59c2bc25c24.jpg"
                          : "https://a0.muscache.com/im/pictures/hosting/Hosting-34697625/original/fd98f82b-38db-4d5a-b993-9825ca007860.jpeg?im_w=1200"
                      }
                      fallback="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
                      alt="Ciubar si Curte Pensiunea Simi Moisei"
                      className="w-full h-full object-cover"
                    />

                    {/* Live Vector Steam Badge Overlay */}
                    <div className="absolute top-4 left-4 bg-[#1A1614]/90 backdrop-blur-md text-[#FAF6EE] px-3.5 py-2 border border-[#FAF6EE]/15 flex items-center gap-2.5">
                      <div className="w-4 h-4 text-[#D4803E]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M 6 18 Q 4 10 8 4" style={{ animation: "steamRiseWisp 3.8s ease-out infinite" }} />
                          <path d="M 12 18 Q 14 10 10 4" style={{ animation: "steamRiseWisp 4.4s ease-out infinite -1.5s" }} />
                          <path d="M 18 18 Q 16 10 20 4" style={{ animation: "steamRiseWisp 4.1s ease-out infinite -0.8s" }} />
                        </svg>
                      </div>
                      <span className="text-xs uppercase tracking-[0.12em] font-semibold">
                        Apă la 39°C · Încălzit cu lemne
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                    <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold`}>
                          01 · Ciubăr din Lemn Masiv
                        </span>
                        <span className={`text-[11px] ${themeTextMuted}`}>6–8 persoane</span>
                      </div>
                      <h3 className={`font-chalet text-xl ${themeText}`}>
                        Hidromasaj și apă caldă sub creasta Pietrosului
                      </h3>
                      <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                        Pregătit la cerere cu lemne uscate de fag. O experiență terapeutică după o drumeție pe munte, fie ziua la soare, fie noaptea sub cerul înstelat.
                      </p>
                    </div>

                    <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold`}>
                          02 · Foișor cu Grătar &amp; Cuptor de Pizza
                        </span>
                        <span className={`text-[11px] ${themeTextMuted}`}>Zonă acoperită</span>
                      </div>
                      <h3 className={`font-chalet text-xl ${themeText}`}>
                        Gătit tradițional în aer liber
                      </h3>
                      <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                        Echipat complet cu grătar generos din cărămidă, plită pentru ceaun de fontă și cuptor pe lemne. Lemnele de foc sunt puse la dispoziție de gazdă.
                      </p>
                    </div>

                    <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold`}>
                          03 · Curte Mare &amp; Livadă
                        </span>
                        <span className={`text-[11px] ${themeTextMuted}`}>Râu &amp; Pajiște</span>
                      </div>
                      <h3 className={`font-chalet text-xl ${themeText}`}>
                        Relaxare pe malul Văii Izvorul Negru
                      </h3>
                      <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                        Curte îngrădită sigură pentru copii, parcare privată pentru 8 autoturisme și terasă la soare cu bănci din lemn masiv.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── SECTION C: Busola Munților Rodnei (LIVE INTERACTIVE NAVIGATION INSTRUMENT) ─── */}
            <section className={`border-t ${themeBorder} py-12 sm:py-16 ${themeSurface} transition-colors duration-300`}>
              <div className="max-w-[1300px] mx-auto px-4 sm:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 ${themeBorder}">
                  <div>
                    <span className={`text-xs uppercase tracking-[0.14em] ${themeAccent} font-semibold block`}>
                      03 · Orientare &amp; Drumeții
                    </span>
                    <h2 className={`font-chalet text-2xl sm:text-3xl font-normal ${themeText} mt-1`}>
                      Busola Munților Rodnei · Moisei (620 m)
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${themeTextMuted}`}>
                      Apasă orice destinație pentru a roti busola live
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left: The Genuine Live Interactive Vector Instrument */}
                  <div className={`lg:col-span-5 bg-[#141210] text-[#FAF6EE] p-6 sm:p-8 flex flex-col justify-between gap-6 border ${themeBorder}`}>
                    <div className="flex items-center justify-between text-xs text-[#E28C46] uppercase tracking-[0.14em] font-semibold border-b border-[#FAF6EE]/10 pb-3">
                      <span>47.6556° N, 24.5401° E</span>
                      <span className="font-mono text-sm">{activeBearing}° {activeTrail.direction.split(" ")[1] || "S-SV"}</span>
                    </div>

                    {/* Live Rotating Vector Compass SVG Dial */}
                    <div className="relative w-56 h-56 mx-auto flex items-center justify-center select-none">
                      <svg viewBox="0 0 220 220" className="w-full h-full" aria-label="Instrument Busolă Live">
                        {/* Outer Azimuth Degree Tick Marks Ring */}
                        <circle cx="110" cy="110" r="100" stroke="rgba(250,246,238,0.15)" strokeWidth="1.5" fill="none" />
                        <circle cx="110" cy="110" r="92" stroke="rgba(250,246,238,0.08)" strokeWidth="1" strokeDasharray="2 6" fill="none" />
                        <circle cx="110" cy="110" r="74" stroke="rgba(226,140,70,0.3)" strokeWidth="1" strokeDasharray="4 4" fill="none" />

                        {/* Cardinal Direction Marks */}
                        <text x="106" y="22" fill="#E28C46" fontSize="12" fontWeight="700" fontFamily="sans-serif">N</text>
                        <text x="107" y="206" fill="#FAF6EE" opacity="0.6" fontSize="11" fontFamily="sans-serif">S</text>
                        <text x="198" y="114" fill="#FAF6EE" opacity="0.6" fontSize="11" fontFamily="sans-serif">E</text>
                        <text x="14" y="114" fill="#FAF6EE" opacity="0.6" fontSize="11" fontFamily="sans-serif">V</text>

                        {/* Radar Pulse Beacon on Target Angle */}
                        <circle
                          cx={110 + 72 * Math.sin((activeBearing * Math.PI) / 180)}
                          cy={110 - 72 * Math.cos((activeBearing * Math.PI) / 180)}
                          r="6"
                          fill="none"
                          stroke="#E28C46"
                          style={{ animation: "radarBeacon 2s ease-out infinite" }}
                        />

                        {/* Dynamic Smooth Rotating Magnetic Needle */}
                        <g
                          className="needle-rotate"
                          style={{
                            transform: `rotate(${activeBearing}deg)`,
                            transformOrigin: "110px 110px",
                          }}
                        >
                          {/* North Pointer (Amber) */}
                          <polygon points="110,24 117,110 103,110" fill="#E28C46" />
                          <polygon points="110,24 110,110 103,110" fill="#F4A261" />
                          {/* South Pointer (Muted Silver) */}
                          <polygon points="110,196 117,110 103,110" fill="rgba(250,246,238,0.35)" />
                          <polygon points="110,196 110,110 103,110" fill="rgba(250,246,238,0.2)" />
                          {/* Center Brass Pivot */}
                          <circle cx="110" cy="110" r="6" fill="#FAF6EE" stroke="#1A1614" strokeWidth="1.5" />
                          <circle cx="110" cy="110" r="2" fill="#E28C46" />
                        </g>
                      </svg>
                    </div>

                    {/* Live Telemetry Display */}
                    <div className="space-y-2 border-t border-[#FAF6EE]/15 pt-4">
                      <div className="flex items-center justify-between text-xs text-[#E28C46] uppercase tracking-[0.12em] font-semibold">
                        <span>{activeTrail.elevation}</span>
                        <span>{activeTrail.distance}</span>
                      </div>
                      <h3 className="font-chalet text-2xl text-[#FAF6EE]">{activeTrail.name}</h3>
                      <p className="text-xs text-[#FAF6EE]/75 leading-relaxed">{activeTrail.desc}</p>
                      <div className="pt-2 flex items-center justify-between text-[11px] text-[#FAF6EE]/60 border-t border-[#FAF6EE]/10">
                        <span>Timp: <strong className="text-[#FAF6EE]">{activeTrail.duration}</strong></span>
                        <span>Dificultate: <strong className="text-[#FAF6EE]">{activeTrail.difficulty}</strong></span>
                      </div>
                    </div>

                    {/* Manual Angle Offset Controls */}
                    <div className="flex items-center justify-between gap-2 border-t border-[#FAF6EE]/10 pt-3 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setManualBearingOffset((p) => p - 15)}
                        className="px-2.5 py-1 border border-[#FAF6EE]/20 hover:border-[#E28C46] transition-colors cursor-pointer"
                        title="Rotește cu 15 grade spre stânga"
                      >
                        -15° Stânga
                      </button>
                      <button
                        type="button"
                        onClick={() => setManualBearingOffset(0)}
                        className="px-2.5 py-1 border border-[#FAF6EE]/20 hover:border-[#E28C46] transition-colors cursor-pointer text-[#E28C46]"
                        title="Resetează la azimutul țintei"
                      >
                        Centrare Azimut
                      </button>
                      <button
                        type="button"
                        onClick={() => setManualBearingOffset((p) => p + 15)}
                        className="px-2.5 py-1 border border-[#FAF6EE]/20 hover:border-[#E28C46] transition-colors cursor-pointer"
                        title="Rotește cu 15 grade spre dreapta"
                      >
                        +15° Dreapta
                      </button>
                    </div>
                  </div>

                  {/* Right: The 4 Selectable Destination Waypoints */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {TRAILS.map((t, idx) => {
                      const isSelected = idx === selectedTrail;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setSelectedTrail(idx);
                            setManualBearingOffset(0);
                          }}
                          className={`border p-4 text-left transition-all flex flex-col justify-between cursor-pointer group ${
                            isSelected
                              ? `border-[#E28C46] ${isNight ? "bg-[#28231F]" : "bg-[#1A1614]"} text-[#FAF6EE]`
                              : `border ${themeBorder} ${themeSurfaceElevated} ${themeText} hover:border-[#E28C46]`
                          }`}
                        >
                          <div className="relative h-36 w-full overflow-hidden bg-[#231F1C]">
                            <img
                              src={t.img}
                              alt={t.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-2 right-2 bg-[#1A1614]/90 text-[#FAF6EE] px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] font-medium">
                              {t.direction}
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 left-2 bg-[#E28C46] text-[#141210] px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] font-semibold">
                                Direcție Activă
                              </div>
                            )}
                          </div>

                          <div className="pt-3 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className={`uppercase tracking-[0.12em] font-semibold ${isSelected ? "text-[#E28C46]" : themeAccent}`}>
                                {t.distance}
                              </span>
                              <span className={isSelected ? "text-[#FAF6EE]/70" : themeTextMuted}>
                                {t.elevation}
                              </span>
                            </div>
                            <h3 className="font-chalet text-lg font-normal leading-snug">
                              {t.name}
                            </h3>
                            <p className={`text-xs line-clamp-2 ${isSelected ? "text-[#FAF6EE]/80" : themeTextMuted}`}>
                              {t.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* ─── SECTION D: Ospitalitate Verificată & Rezervare Rapidă ─── */}
            <section className={`border-t ${themeBorder} py-12 sm:py-16 ${themeBg} transition-colors duration-300`}>
              <div className="max-w-[1300px] mx-auto px-4 sm:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 ${themeBorder}">
                  <div>
                    <span className={`text-xs uppercase tracking-[0.14em] ${themeAccent} font-semibold block`}>
                      04 · Încredere &amp; Rezervare Directă
                    </span>
                    <h2 className={`font-chalet text-2xl sm:text-3xl font-normal ${themeText} mt-1`}>
                      Configurează cererea pe WhatsApp în 3 atingeri
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full bg-[#D4803E] opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 bg-[#D4803E]"></span>
                    </span>
                    <span className={themeTextMuted}>Gazda răspunde de obicei în ~15 minute</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: 3-Tap WhatsApp Builder */}
                  <div className={`lg:col-span-7 ${isNight ? "bg-[#1F1B18]" : "bg-[#1A1614]"} text-[#FAF6EE] p-6 sm:p-8 space-y-6 border ${themeBorder}`}>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-[0.12em] text-[#FAF6EE]/75 block font-semibold">
                        1. Alege Tipul de Cazare
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {["Cameră Dublă", "Cameră Triplă", "Integral (15 locuri)"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setBookRoom(opt)}
                            className={`p-3 text-xs text-left border transition-colors cursor-pointer ${
                              bookRoom === opt
                                ? "bg-[#E28C46] border-[#E28C46] text-[#141210] font-semibold"
                                : "border-[#FAF6EE]/15 text-[#FAF6EE]/80 hover:bg-[#28231F]"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-[0.12em] text-[#FAF6EE]/75 block font-semibold">
                        2. Durata Sejurului
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Weekend (2 nopți)", "Sejur 3–4 nopți", "Vacanță 5+ nopți"].map((dur) => (
                          <button
                            key={dur}
                            type="button"
                            onClick={() => setBookPeriod(dur)}
                            className={`p-3 text-xs text-center border transition-colors cursor-pointer ${
                              bookPeriod === dur
                                ? "bg-[#E28C46] border-[#E28C46] text-[#141210] font-semibold"
                                : "border-[#FAF6EE]/15 text-[#FAF6EE]/80 hover:bg-[#28231F]"
                            }`}
                          >
                            {dur}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-[0.12em] text-[#FAF6EE]/75 block font-semibold">
                        3. Opțiuni Dorite
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Ciubăr cald",
                          "Mic dejun local",
                          "Tichete vacanță",
                          "Ghidaj Pietrosul",
                        ].map((extra) => {
                          const active = bookExtras.includes(extra);
                          return (
                            <button
                              key={extra}
                              type="button"
                              onClick={() => toggleExtra(extra)}
                              className={`px-3.5 py-2 text-xs border transition-colors cursor-pointer ${
                                active
                                  ? "bg-[#FAF6EE] text-[#1A1614] font-semibold border-[#FAF6EE]"
                                  : "border-[#FAF6EE]/20 text-[#FAF6EE]/75 hover:border-[#FAF6EE]/40"
                              }`}
                            >
                              {extra}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border border-[#FAF6EE]/15 p-4 bg-[#141210] space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.12em] text-[#E28C46] block font-semibold">
                        Mesaj generat pentru gazdă (+40 740 981 839):
                      </span>
                      <p className="text-xs text-[#FAF6EE]/90 italic leading-relaxed">
                        „{whatsappMessage}”
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3.5 px-4 bg-[#E28C46] hover:bg-[#FAF6EE] hover:text-[#141210] text-[#141210] text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors"
                      >
                        Trimite pe WhatsApp →
                      </a>
                      <a
                        href="tel:+40740981839"
                        className="py-3.5 px-4 border border-[#FAF6EE]/30 hover:bg-[#FAF6EE]/10 text-[#FAF6EE] text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors"
                      >
                        Sună direct: 0740 981 839
                      </a>
                    </div>
                  </div>

                  {/* Right: Address & Verified Social Proof */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-4`}>
                      <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold block`}>
                        Adresă &amp; Contact Direct
                      </span>
                      <h3 className={`font-chalet text-xl ${themeText}`}>
                        Str. Izvorul Negru nr. 257B, Moisei, Maramureș
                      </h3>
                      <div className={`space-y-1 text-xs ${themeTextMuted} pt-2 border-t ${themeBorder}`}>
                        <p>Telefon: <strong className={themeText}>+40 740 981 839</strong></p>
                        <p>Check-in: 13:00–15:00 · Check-out: până la 12:00</p>
                        <p>Carduri de vacanță: Pluxee (Sodexo), Edenred, Up Vacanță</p>
                      </div>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Pensiunea+Simi+Moisei+Maramures+257B"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full py-2.5 border ${themeBorder} ${themeText} text-xs uppercase tracking-[0.12em] font-semibold text-center hover:${themeAccentBg} hover:text-[#FAF6EE] transition-colors`}
                      >
                        Deschide în Google Maps →
                      </a>
                    </div>

                    <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                      <div className="flex items-baseline justify-between">
                        <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold`}>
                          Nota 10 / 10 TuristInfo.ro
                        </span>
                        <span className={`font-chalet text-base ${themeText}`}>Oaspeți Verificați</span>
                      </div>
                      <p className={`font-chalet text-base ${themeText} italic leading-snug`}>
                        „Camere impecabil de curate, ciubărul și foișorul au fost un mare plus, iar priveliștea spre Pietrosul Rodnei îți taie răsuflarea.”
                      </p>
                      <span className={`text-xs ${themeTextMuted} block`}>
                        — Bumbas Costin &amp; Maria, oaspeți verificați
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            PAGE 2: CAMERE — Deep Architectural Suite Specifications
           ========================================================= */}
        {page === "camere" && (
          <section className="px-4 sm:px-8 py-10 max-w-[1300px] w-full mx-auto space-y-8">
            <div className={`border-b ${themeBorder} pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4`}>
              <div>
                <span className={`text-xs uppercase tracking-[0.14em] ${themeAccent} font-semibold block`}>
                  Cazare · Moisei, Maramureș
                </span>
                <h1 className={`font-chalet text-3xl sm:text-4xl font-normal ${themeText} mt-1`}>
                  Cele 7 Camere ale Pensiunii Simi
                </h1>
              </div>
              <p className={`text-xs ${themeTextMuted}`}>
                Check-in 13:00 · Check-out 12:00 · Tichete de vacanță acceptate
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {SUITES.map((suite) => (
                <div
                  key={suite.id}
                  className={`border ${themeBorder} ${themeSurfaceElevated} flex flex-col justify-between group transition-all hover:border-[#D4803E]`}
                >
                  <div className="relative h-72 overflow-hidden bg-[#231F1C]">
                    <ResilientPhoto
                      src={suite.primaryImg}
                      fallback={suite.fallbackImg}
                      alt={suite.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#1A1614]/90 text-[#FAF6EE] px-3 py-1 text-xs uppercase tracking-[0.12em] font-medium">
                      {suite.index} · {suite.count}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#FAF6EE] text-[#1A1614] px-3 py-1 text-xs uppercase tracking-[0.12em] font-semibold">
                      {suite.capacity}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h2 className={`font-chalet text-xl ${themeText}`}>
                      {suite.name}
                    </h2>
                    <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                      {suite.spec}
                    </p>

                    <div className="pt-2 border-t ${themeBorder} space-y-1">
                      {suite.highlights.map((h, i) => (
                        <div key={i} className={`flex items-center gap-2 text-xs ${themeText}`}>
                          <span className={`w-1.5 h-1.5 ${themeAccentBg} shrink-0`} />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => selectRoomAndBook(suite.name)}
                      className={`pt-3 text-xs uppercase tracking-[0.12em] font-semibold ${themeAccent} hover:underline cursor-pointer block`}
                    >
                      Alege această cameră →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={`border-t ${themeBorder} pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs ${themeTextMuted}`}>
              <div>
                <strong className={`block ${themeText} font-medium`}>Toate Camerele Includ</strong>
                <p>Baie proprie cu duș, balcon cu vedere montană, lenjerii curate, prosoape și Wi-Fi.</p>
              </div>
              <div>
                <strong className={`block ${themeText} font-medium`}>Curte &amp; Facilități Comune</strong>
                <p>Salon de zi, bucătărie utilată complet, foișor cu grătar și cuptor, parcare securizată.</p>
              </div>
              <div>
                <strong className={`block ${themeText} font-medium`}>Rezervare Rapidă</strong>
                <p>Fără comisioane intermediare: <a href="tel:+40740981839" className={`underline font-semibold ${themeText}`}>0740 981 839</a></p>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            PAGE 3: CIUBĂR & CURTE — Steaming Outdoor Wellness
           ========================================================= */}
        {page === "ciubar" && (
          <section className="px-4 sm:px-8 py-10 max-w-[1300px] w-full mx-auto space-y-8">
            <div className={`border-b ${themeBorder} pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4`}>
              <div>
                <span className={`text-xs uppercase tracking-[0.14em] ${themeAccent} font-semibold block`}>
                  Exterior &amp; Gastronomie · Valea Izvorul Negru
                </span>
                <h1 className={`font-chalet text-3xl sm:text-4xl font-normal ${themeText} mt-1`}>
                  Ciubăr cu lemne la 39°C și Foișor Tradițional
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs uppercase tracking-[0.12em] font-semibold ${themeAccent}`}>
                  Pregătit cu lemne uscate de fag
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 relative h-96 sm:h-[460px] overflow-hidden bg-[#231F1C] border ${themeBorder}">
                <ResilientPhoto
                  src={
                    isNight
                      ? "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=df59a858-ffea-4824-be91-f59c2bc25c24.jpg"
                      : "https://a0.muscache.com/im/pictures/hosting/Hosting-34697625/original/fd98f82b-38db-4d5a-b993-9825ca007860.jpeg?im_w=1200"
                  }
                  fallback="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
                  alt="Ciubar si Curte Pensiunea Simi Moisei"
                  className="w-full h-full object-cover"
                />

                {/* Animated Steam Callout */}
                <div className="absolute bottom-4 left-4 bg-[#1A1614]/90 backdrop-blur-md text-[#FAF6EE] px-4 py-2 border border-[#FAF6EE]/15 flex items-center gap-3">
                  <div className="w-5 h-5 text-[#E28C46]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M 6 18 Q 4 10 8 4" style={{ animation: "steamRiseWisp 3.8s ease-out infinite" }} />
                      <path d="M 12 18 Q 14 10 10 4" style={{ animation: "steamRiseWisp 4.4s ease-out infinite -1.5s" }} />
                      <path d="M 18 18 Q 16 10 20 4" style={{ animation: "steamRiseWisp 4.1s ease-out infinite -0.8s" }} />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.12em] font-semibold block">Cadă Rustic Molid</span>
                    <span className="text-[11px] text-[#FAF6EE]/75">Temperatură constantă 39°C</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                  <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold block`}>
                    01 · Ciubăr din Lemn Masiv
                  </span>
                  <h3 className={`font-chalet text-xl ${themeText}`}>
                    Apă caldă la 39°C pentru 6–8 persoane
                  </h3>
                  <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                    Cadă rustică dotată cu aeromasaj și hidromasaj, amplasată în aer liber pe terasă cu vedere directă spre creasta Munților Rodnei.
                  </p>
                </div>

                <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                  <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold block`}>
                    02 · Foișor Tradițional Acoperit
                  </span>
                  <h3 className={`font-chalet text-xl ${themeText}`}>
                    Grătar mare, ceaun &amp; cuptor de pizza
                  </h3>
                  <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                    Spațiu de mese acoperit unde oaspeții pot găti bucate maramureșene, fripturi la grătar sau pizza pe vatră de lemne.
                  </p>
                </div>

                <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                  <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold block`}>
                    03 · Râu &amp; Curte Verde
                  </span>
                  <h3 className={`font-chalet text-xl ${themeText}`}>
                    Liniștea Văii Izvorul Negru
                  </h3>
                  <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                    Râul curge chiar la marginea proprietății. Curtea generoasă oferă spațiu pentru relaxare în șezlonguri și loc de joacă.
                  </p>
                </div>
              </div>
            </div>

            <div className={`border-t ${themeBorder} pt-6 flex flex-col sm:flex-row items-center justify-between gap-4`}>
              <span className={`text-xs ${themeTextMuted}`}>
                Ciubărul este curățat și dezinfectat complet înainte de fiecare utilizare.
              </span>
              <button
                type="button"
                onClick={() => navigate("rezervare")}
                className={`py-3 px-6 ${
                  isNight ? "bg-[#E28C46] text-[#141210]" : "bg-[#1A1614] text-[#FAF6EE]"
                } text-xs uppercase tracking-[0.14em] font-semibold text-center transition-colors cursor-pointer`}
              >
                Rezervă un sejur cu ciubăr →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            PAGE 4: TRASEE & ZONĂ — Full Mountain Trail Guide & Interactive Compass
           ========================================================= */}
        {page === "trasee" && (
          <section className="px-4 sm:px-8 py-10 max-w-[1300px] w-full mx-auto space-y-8">
            <div className={`border-b ${themeBorder} pb-6`}>
              <span className={`text-xs uppercase tracking-[0.14em] ${themeAccent} font-semibold block`}>
                Ghid de Drumeții · Munții Rodnei &amp; Maramureș
              </span>
              <h1 className={`font-chalet text-3xl sm:text-4xl font-normal ${themeText} mt-1`}>
                Atracții și trasee montane în apropiere
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left: Interactive Compass Instrument */}
              <div className={`lg:col-span-5 bg-[#141210] text-[#FAF6EE] p-6 sm:p-8 flex flex-col justify-between gap-6 border ${themeBorder}`}>
                <div className="flex items-center justify-between text-xs text-[#E28C46] uppercase tracking-[0.14em] font-semibold border-b border-[#FAF6EE]/10 pb-3">
                  <span>Moisei · 620 m</span>
                  <span className="font-mono text-sm">{activeBearing}° {activeTrail.direction.split(" ")[1]}</span>
                </div>

                {/* Rotating Compass SVG */}
                <div className="relative w-56 h-56 mx-auto flex items-center justify-center select-none">
                  <svg viewBox="0 0 220 220" className="w-full h-full" aria-label="Busola Muntilor Rodnei">
                    <circle cx="110" cy="110" r="100" stroke="rgba(250,246,238,0.15)" strokeWidth="1.5" fill="none" />
                    <circle cx="110" cy="110" r="74" stroke="rgba(226,140,70,0.3)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                    <text x="106" y="22" fill="#E28C46" fontSize="12" fontWeight="700">N</text>
                    <text x="107" y="206" fill="#FAF6EE" opacity="0.6" fontSize="11">S</text>
                    <text x="198" y="114" fill="#FAF6EE" opacity="0.6" fontSize="11">E</text>
                    <text x="14" y="114" fill="#FAF6EE" opacity="0.6" fontSize="11">V</text>

                    {/* Rotating Needle */}
                    <g
                      className="needle-rotate"
                      style={{
                        transform: `rotate(${activeBearing}deg)`,
                        transformOrigin: "110px 110px",
                      }}
                    >
                      <polygon points="110,24 117,110 103,110" fill="#E28C46" />
                      <polygon points="110,196 117,110 103,110" fill="rgba(250,246,238,0.3)" />
                      <circle cx="110" cy="110" r="6" fill="#FAF6EE" stroke="#1A1614" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>

                <div className="space-y-2 border-t border-[#FAF6EE]/15 pt-4">
                  <span className="text-xs font-semibold text-[#E28C46] uppercase tracking-[0.12em] block">
                    {activeTrail.elevation} · {activeTrail.distance}
                  </span>
                  <h2 className="font-chalet text-2xl text-[#FAF6EE]">{activeTrail.name}</h2>
                  <p className="text-xs text-[#FAF6EE]/75 leading-relaxed">{activeTrail.desc}</p>
                </div>

                {/* Manual Calibration Controls */}
                <div className="flex items-center justify-between gap-2 border-t border-[#FAF6EE]/10 pt-3 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setManualBearingOffset((p) => p - 15)}
                    className="px-2.5 py-1 border border-[#FAF6EE]/20 hover:border-[#E28C46] transition-colors cursor-pointer"
                  >
                    -15° Stânga
                  </button>
                  <button
                    type="button"
                    onClick={() => setManualBearingOffset(0)}
                    className="px-2.5 py-1 border border-[#FAF6EE]/20 hover:border-[#E28C46] transition-colors cursor-pointer text-[#E28C46]"
                  >
                    Resetează
                  </button>
                  <button
                    type="button"
                    onClick={() => setManualBearingOffset((p) => p + 15)}
                    className="px-2.5 py-1 border border-[#FAF6EE]/20 hover:border-[#E28C46] transition-colors cursor-pointer"
                  >
                    +15° Dreapta
                  </button>
                </div>
              </div>

              {/* Right: Selectable Destinations */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TRAILS.map((t, idx) => {
                  const isSelected = idx === selectedTrail;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setSelectedTrail(idx);
                        setManualBearingOffset(0);
                      }}
                      className={`border p-4 text-left transition-all flex flex-col justify-between cursor-pointer group ${
                        isSelected
                          ? `border-[#E28C46] ${isNight ? "bg-[#28231F]" : "bg-[#1A1614]"} text-[#FAF6EE]`
                          : `border ${themeBorder} ${themeSurfaceElevated} ${themeText} hover:border-[#E28C46]`
                      }`}
                    >
                      <div className="relative h-36 w-full overflow-hidden bg-[#231F1C]">
                        <img src={t.img} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <span className="absolute top-2 right-2 bg-[#1A1614]/90 text-[#FAF6EE] px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]">
                          {t.direction}
                        </span>
                      </div>
                      <div className="pt-3 space-y-1">
                        <span className={`text-xs uppercase tracking-[0.12em] font-semibold ${isSelected ? "text-[#E28C46]" : themeAccent}`}>
                          {t.distance}
                        </span>
                        <h3 className="font-chalet text-lg font-normal leading-snug">
                          {t.name}
                        </h3>
                        <p className={`text-xs line-clamp-2 ${isSelected ? "text-[#FAF6EE]/80" : themeTextMuted}`}>
                          {t.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={`border-t ${themeBorder} pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs ${themeTextMuted}`}>
              <div className={`p-5 border ${themeBorder} ${themeSurfaceElevated} space-y-1.5`}>
                <strong className={`block ${themeText} text-sm font-medium`}>Sfaturi pentru urcarea pe Pietrosul Rodnei</strong>
                <p>Plecarea recomandată este dimineața devreme (ora 07:00–08:00). Traseul trece pe lângă Schitul Moisei și Stația Meteo Iezer, ajungând la lacul glaciar Iezer (în formă de hartă a României) și pe creasta de 2.303 m.</p>
              </div>
              <div className={`p-5 border ${themeBorder} ${themeSurfaceElevated} space-y-1.5`}>
                <strong className={`block ${themeText} text-sm font-medium`}>Recomandări pentru Mocănița Valea Vaserului</strong>
                <p>Gara Vișeu de Sus se află la 13 km de pensiune (aproximativ 18 minute cu mașina). Biletele se achiziționează online în avans în sezonul cald sau direct de la casa de bilete dimineața.</p>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            PAGE 5: REZERVARE — Direct WhatsApp Builder & Info
           ========================================================= */}
        {page === "rezervare" && (
          <section className="px-4 sm:px-8 py-10 max-w-[1300px] w-full mx-auto space-y-8">
            <div className={`border-b ${themeBorder} pb-6`}>
              <span className={`text-xs uppercase tracking-[0.14em] ${themeAccent} font-semibold block`}>
                Rezervare Directă · Fără Comisioane
              </span>
              <h1 className={`font-chalet text-3xl sm:text-4xl font-normal ${themeText} mt-1`}>
                Trimite cererea de cazare pe WhatsApp
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: 3-Tap Selector */}
              <div className={`lg:col-span-7 ${isNight ? "bg-[#1F1B18]" : "bg-[#1A1614]"} text-[#FAF6EE] p-6 sm:p-8 space-y-6 border ${themeBorder}`}>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.12em] text-[#FAF6EE]/75 block font-semibold">
                    1. Alege Tipul de Cazare
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {["Cameră Dublă", "Cameră Triplă", "Integral (15 locuri)"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setBookRoom(opt)}
                        className={`p-3 text-xs text-left border transition-colors cursor-pointer ${
                          bookRoom === opt
                            ? "bg-[#E28C46] border-[#E28C46] text-[#141210] font-semibold"
                            : "border-[#FAF6EE]/15 text-[#FAF6EE]/80 hover:bg-[#28231F]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.12em] text-[#FAF6EE]/75 block font-semibold">
                    2. Durata Sejurului
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Weekend (2 nopți)", "Sejur 3–4 nopți", "Vacanță 5+ nopți"].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setBookPeriod(dur)}
                        className={`p-3 text-xs text-center border transition-colors cursor-pointer ${
                          bookPeriod === dur
                            ? "bg-[#E28C46] border-[#E28C46] text-[#141210] font-semibold"
                            : "border-[#FAF6EE]/15 text-[#FAF6EE]/80 hover:bg-[#28231F]"
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.12em] text-[#FAF6EE]/75 block font-semibold">
                    3. Opțiuni Dorite
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Ciubăr cald",
                      "Mic dejun local",
                      "Tichete vacanță",
                      "Ghidaj Pietrosul",
                    ].map((extra) => {
                      const active = bookExtras.includes(extra);
                      return (
                        <button
                          key={extra}
                          type="button"
                          onClick={() => toggleExtra(extra)}
                          className={`px-3.5 py-2 text-xs border transition-colors cursor-pointer ${
                            active
                              ? "bg-[#FAF6EE] text-[#1A1614] font-semibold border-[#FAF6EE]"
                              : "border-[#FAF6EE]/20 text-[#FAF6EE]/75 hover:border-[#FAF6EE]/40"
                          }`}
                        >
                          {extra}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border border-[#FAF6EE]/15 p-4 bg-[#141210] space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.12em] text-[#E28C46] block font-semibold">
                    Mesaj pentru gazdă (+40 740 981 839):
                  </span>
                  <p className="text-xs text-[#FAF6EE]/90 italic leading-relaxed">
                    „{whatsappMessage}”
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-4 bg-[#E28C46] hover:bg-[#FAF6EE] hover:text-[#141210] text-[#141210] text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors"
                  >
                    Trimite pe WhatsApp →
                  </a>
                  <a
                    href="tel:+40740981839"
                    className="py-3.5 px-4 border border-[#FAF6EE]/30 hover:bg-[#FAF6EE]/10 text-[#FAF6EE] text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors"
                  >
                    Sună: 0740 981 839
                  </a>
                </div>
              </div>

              {/* Right: Coordinates & 10/10 TuristInfo Proof */}
              <div className="lg:col-span-5 space-y-6">
                <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-4`}>
                  <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold block`}>
                    Adresă &amp; Contact Direct
                  </span>
                  <h2 className={`font-chalet text-xl ${themeText}`}>
                    Str. Izvorul Negru nr. 257B, Moisei, Maramureș
                  </h2>
                  <div className={`space-y-1 text-xs ${themeTextMuted} pt-2 border-t ${themeBorder}`}>
                    <p>Telefon: <strong className={themeText}>+40 740 981 839</strong></p>
                    <p>Check-in: 13:00–15:00 · Check-out: până la 12:00</p>
                    <p>Carduri de vacanță: Pluxee, Up, Edenred</p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Pensiunea+Simi+Moisei+Maramures+257B"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-2.5 border ${themeBorder} ${themeText} text-xs uppercase tracking-[0.12em] font-semibold text-center hover:${themeAccentBg} hover:text-[#FAF6EE] transition-colors`}
                  >
                    Deschide în Google Maps →
                  </a>
                </div>

                <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                  <div className="flex items-baseline justify-between">
                    <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold`}>
                      Nota 10 / 10 TuristInfo.ro
                    </span>
                    <span className={`font-chalet text-base ${themeText}`}>Verificat</span>
                  </div>
                  <p className={`font-chalet text-base ${themeText} italic leading-snug`}>
                    „Camere impecabil de curate, ciubărul și foișorul au fost un mare plus, iar priveliștea spre Pietrosul Rodnei îți taie răsuflarea.”
                  </p>
                  <span className={`text-xs ${themeTextMuted} block`}>
                    — Bumbas Costin &amp; Maria, oaspeți verificați
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ─── Architectural Footer ─── */}
      <footer className={`border-t ${themeBorder} px-4 sm:px-8 py-5 text-xs ${themeTextMuted} transition-colors duration-300`}>
        <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Pensiunea Simi · Str. Izvorul Negru 257B, Moisei, jud. Maramureș</span>

          <div className="flex items-center gap-6 font-medium">
            <a
              href="https://www.instagram.com/pensiunea_simi"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:${themeText} transition-colors`}
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/share/1Dr11vWoRq/"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:${themeText} transition-colors`}
            >
              Facebook
            </a>
            <a
              href="https://www.turistinfo.ro/moisei/cazare-moisei/pensiunea_simi-951496.html"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:${themeText} transition-colors`}
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
