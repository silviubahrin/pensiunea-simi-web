import { useState, useEffect } from "react";

type PageId = "acasa" | "camere" | "ciubar" | "trasee" | "rezervare";

const SUITES = [
  {
    id: "dubla",
    index: "01",
    name: "Cameră Dublă Matrimonială",
    capacity: "2 Oaspeți · 16 m²",
    count: "6 Camere în Pensiune",
    spec: "Pat matrimonial, baie proprie cu duș, balcon spre munte, TV și Wi-Fi.",
    primaryImg: "https://v3.turistinfo.ro/images/camere/335673.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "tripla",
    index: "02",
    name: "Cameră Triplă de Familie",
    capacity: "3 Oaspeți · 24 m²",
    count: "1 Cameră în Pensiune",
    spec: "Pat dublu și pat single, balcon spre Pietrosul Rodnei, baie proprie.",
    primaryImg: "https://res.klook.com/klook-hotel/image/upload/w_1200,c_fill,q_90/trip/22020r000000h4v18DF64_R_550_412_R5.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "integral",
    index: "03",
    name: "Închiriere Integrală",
    capacity: "Până la 15 Oaspeți",
    count: "Toate cele 7 Camere",
    spec: "Acces exclusiv la 7 băi, living, bucătărie utilată, curte, foișor și ciubăr.",
    primaryImg: "https://www.turistinfo.ro/images/cazare/951496.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
  },
];

const TRAILS = [
  {
    id: "pietrosul",
    num: "01",
    name: "Vârful Pietrosul Rodnei",
    elevation: "2.303 m",
    distance: "La poalele masivului",
    bearing: 195,
    direction: "195° S-SV",
    desc: "Vizibil de pe balcon. Traseu marcat sau tură montană ghidată.",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "manastirea",
    num: "02",
    name: "Mănăstirea Moisei",
    elevation: "Secolul XVII",
    distance: "2 km de pensiune",
    bearing: 155,
    direction: "155° S-SE",
    desc: "Biserică istorică din lemn pe drumul Izvorul Negru.",
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
    desc: "Plecarea de dimineață prin defileul sălbatic al Vaserului.",
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
    desc: "Traseu accesibil cu telegondola și pârtia olimpică Borșa.",
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
  const [isDusk, setIsDusk] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState(0);

  // 3-Tap WhatsApp Configurator State
  const [bookRoom, setBookRoom] = useState("Cameră Dublă");
  const [bookPeriod, setBookPeriod] = useState("Weekend (2 nopți)");
  const [bookExtras, setBookExtras] = useState<string[]>([
    "Ciubăr cald",
    "Tichete vacanță",
  ]);

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

  const trail = TRAILS[selectedTrail];

  const whatsappMessage = `Bună ziua! Doresc disponibilitate la Pensiunea Simi Moisei pentru: ${bookRoom}, perioadă: ${bookPeriod}${
    bookExtras.length > 0 ? `, opțiuni: ${bookExtras.join(", ")}` : ""
  }. Vă mulțumesc!`;

  const whatsappUrl = `https://wa.me/40740981839?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF6EE] text-[#1A1614]">
      {/* ─── Top Architectural Bar with Minimal Cabin Logo Element ─── */}
      <header className="sticky top-0 z-50 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#1A1614]/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-[1300px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("acasa")}
            className="text-left cursor-pointer group flex items-center gap-3 transition-opacity hover:opacity-90"
            aria-label="Pensiunea Simi — Acasă"
          >
            {/* Minimal Architectural Cabin Mark with Hearth Amber Glow */}
            <div className="w-7 h-7 shrink-0 text-[#1A1614] transition-colors group-hover:text-[#B86B32]">
              <svg
                className="w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 6.5V3H18.5V8.8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 12.5L12 3.5L21.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="4.5"
                  y1="12.5"
                  x2="19.5"
                  y2="12.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M5.5 12.5V20.5H18.5V12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 20.5V16C10 14.9 10.9 14 12 14C13.1 14 14 14.9 14 16V20.5H10Z"
                  fill="#D4803E"
                />
                <line
                  x1="3"
                  y1="20.5"
                  x2="21"
                  y2="20.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
              <span className="font-chalet text-2xl sm:text-[26px] font-medium tracking-tight text-[#1A1614] leading-none">
                Pensiunea Simi
              </span>
              <span className="hidden sm:inline text-xs uppercase tracking-[0.14em] text-[#6B635B]">
                Moisei · Maramureș
              </span>
            </div>
          </button>

          {/* Desktop Nav: Clean Disciplined Links */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6 text-xs uppercase tracking-[0.12em] font-medium text-[#6B635B]">
              {NAV_ITEMS.map((item) => {
                const isActive = page === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(item.id)}
                    className={`relative py-1 transition-colors cursor-pointer ${
                      isActive
                        ? "text-[#1A1614] font-semibold"
                        : "hover:text-[#1A1614]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B86B32]" />
                    )}
                  </button>
                );
              })}
            </nav>

            <a
              href="tel:+40740981839"
              className="px-4 py-2 bg-[#1A1614] hover:bg-[#B86B32] text-[#FAF6EE] text-xs uppercase tracking-[0.12em] font-semibold transition-colors"
            >
              0740 981 839
            </a>
          </div>

          {/* Mobile Burger Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Închide" : "Meniu"}
            className="flex md:hidden flex-col justify-center items-end w-8 h-8 gap-1.5 cursor-pointer text-[#1A1614]"
          >
            <span
              className={`block h-[1.5px] bg-[#1A1614] transition-all duration-300 ${
                menuOpen ? "w-6 translate-y-[4.5px] rotate-45" : "w-6"
              }`}
            />
            <span
              className={`block h-[1.5px] bg-[#B86B32] transition-all duration-300 ${
                menuOpen ? "opacity-0 w-0" : "w-4"
              }`}
            />
            <span
              className={`block h-[1.5px] bg-[#1A1614] transition-all duration-300 ${
                menuOpen ? "w-6 -translate-y-[4.5px] -rotate-45" : "w-5"
              }`}
            />
          </button>
        </div>
      </header>

      {/* ─── Mobile Menu Overlay ─── */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-x-0 top-[61px] bottom-0 z-40 md:hidden bg-[#FAF6EE] text-[#1A1614] px-6 py-8 flex flex-col justify-between overflow-y-auto border-t border-[#1A1614]/10"
        >
          <nav className="divide-y divide-[#1A1614]/10 border-b border-[#1A1614]/10">
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
                      isActive ? "text-[#B86B32] font-semibold" : "text-[#1A1614]"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="text-xs uppercase tracking-[0.12em] text-[#B86B32]">
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
                className="py-3 bg-[#1A1614] text-[#FAF6EE] text-xs font-semibold text-center uppercase tracking-[0.12em]"
              >
                Sună direct
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 border border-[#1A1614] text-[#1A1614] text-xs font-semibold text-center uppercase tracking-[0.12em]"
              >
                WhatsApp
              </a>
            </div>
            <p className="text-xs text-[#6B635B] text-center">
              Str. Izvorul Negru 257B, Moisei · Tichete de vacanță
            </p>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col">
        {/* =========================================================
            PAGE 1: ACASĂ — Claude-Style Vector Alpine Motion Canvas (ZERO BITMAP HERO)
           ========================================================= */}
        {page === "acasa" && (
          <section className="flex-1 flex flex-col justify-between bg-[#FAF6EE] min-h-[calc(100svh-65px)]">
            {/* ─── Claude-Style Tactile Vector Motion Stage (No Bitmap Image) ─── */}
            <div className="relative w-full border-b border-[#1A1614]/10 bg-[#FAF6EE] overflow-hidden select-none">
              <div className="relative w-full aspect-[21/9] sm:aspect-[24/10] max-h-[500px] min-h-[300px]">
                <svg
                  viewBox="0 0 1200 480"
                  className="w-full h-full object-cover motion-safe-vector"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Peisaj vectorial animat cu Masivul Pietrosul Rodnei și Pensiunea Simi din Moisei"
                  role="img"
                >
                  <defs>
                    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={isDusk ? "#1F1B18" : "#FAF6EE"} />
                      <stop offset="60%" stopColor={isDusk ? "#2B2420" : "#F4EDE2"} />
                      <stop offset="100%" stopColor={isDusk ? "#3D2E24" : "#E8DEC8"} />
                    </linearGradient>

                    <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.95" />
                      <stop offset="60%" stopColor="#D4803E" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#B86B32" stopOpacity="0.4" />
                    </radialGradient>

                    <linearGradient id="ciubarWater" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8AC6B8" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#3F6358" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  {/* Atmosphere Sky */}
                  <rect width="1200" height="480" fill="url(#skyGrad)" />

                  {/* Sun / Moon Minimalist Line Ring */}
                  <g transform="translate(940, 95)">
                    <circle
                      r="42"
                      fill="none"
                      stroke={isDusk ? "#F4EDE2" : "#B86B32"}
                      strokeWidth="1.25"
                      strokeDasharray="4 4"
                      opacity={isDusk ? "0.35" : "0.45"}
                    />
                    <circle
                      r="32"
                      fill={isDusk ? "#EFE7D8" : "#FAF6EE"}
                      opacity={isDusk ? "0.15" : "0.5"}
                    />
                  </g>

                  {/* Drifting High-Altitude Wind Lines across Rodna Saddle */}
                  <g fill="none" stroke="#6B635B" strokeWidth="1" strokeLinecap="round" opacity="0.3">
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

                  {/* Distant Ridge — Pietrosul Rodnei (2.303 m) */}
                  <g>
                    <path
                      d="M 0 290 L 110 250 L 220 220 L 290 235 L 390 120 L 430 160 L 510 175 L 590 135 L 690 205 L 810 190 L 960 250 L 1100 240 L 1200 270 L 1200 480 L 0 480 Z"
                      fill={isDusk ? "#2A2521" : "#EAE0CE"}
                      stroke={isDusk ? "#3F3732" : "#CDBFA8"}
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
                        fill={isDusk ? "#EAE0CE" : "#6B635B"}
                        fontWeight="600"
                      >
                        PIETROSUL RODNEI · 2.303 M
                      </text>
                    </g>

                    {/* Glacial Couloirs & Topographic Hatching */}
                    <g fill="none" stroke={isDusk ? "#3A332E" : "#CDBFA8"} strokeWidth="1" opacity="0.6">
                      <path d="M 390 120 C 375 155, 360 200, 340 250" />
                      <path d="M 390 120 C 405 160, 420 195, 445 245" />
                      <path d="M 590 135 C 580 175, 560 210, 540 255" />
                      <path d="M 220 220 C 240 245, 270 265, 300 280" />
                    </g>
                  </g>

                  {/* Soaring Alpine Swifts over the Ridges */}
                  <g style={{ animation: "swiftFlightGlide 26s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}>
                    <g transform="translate(0, 105)" style={{ animation: "wingFlapMotion 1.4s ease-in-out infinite" }}>
                      <path
                        d="M -12 4 Q -6 -3 0 0 Q 6 -3 12 4 Q 5 1 0 1.5 Q -5 1 -12 4 Z"
                        fill={isDusk ? "#FAF6EE" : "#1A1614"}
                        opacity="0.75"
                      />
                    </g>
                  </g>

                  {/* Mid-Mountain Ridge */}
                  <g>
                    <path
                      d="M 0 345 L 140 310 L 270 270 L 380 300 L 510 280 L 640 315 L 740 250 L 860 290 L 1020 275 L 1200 335 L 1200 480 L 0 480 Z"
                      fill={isDusk ? "#352F2A" : "#DFD4C0"}
                      stroke={isDusk ? "#4B423B" : "#C0B29E"}
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* Wildlife — Alert Carpathian Chamois (Capră Neagră) on Crag */}
                  <g
                    transform="translate(738, 248)"
                    style={{
                      transformOrigin: "738px 248px",
                      animation: "chamoisBreathing 4.5s ease-in-out infinite",
                    }}
                    aria-label="Capră neagră carpatină pe creastă"
                  >
                    <polygon points="-12,2 -4,-6 8,-4 14,3" fill={isDusk ? "#4A423C" : "#A69885"} />
                    <g style={{ transformOrigin: "0px -10px", animation: "chamoisHeadLook 10s ease-in-out infinite" }}>
                      <ellipse cx="0" cy="-8" rx="6" ry="4" fill={isDusk ? "#1A1614" : "#28231F"} />
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

                  {/* Carpathian Pine Trees (Organic Swaying) */}
                  <g style={{ transformOrigin: "115px 400px", animation: "pineSwayGentle 6.4s ease-in-out infinite" }}>
                    <line x1="115" y1="400" x2="115" y2="330" stroke="#1A1614" strokeWidth="2" />
                    <polygon points="115,315 102,345 128,345" fill={isDusk ? "#1B231D" : "#4A5647"} />
                    <polygon points="115,335 97,365 133,365" fill={isDusk ? "#1B231D" : "#4A5647"} />
                    <polygon points="115,355 92,390 138,390" fill={isDusk ? "#161D18" : "#3B4539"} />
                  </g>

                  <g style={{ transformOrigin: "155px 410px", animation: "pineSwaySubtle 7.8s ease-in-out infinite -2.3s" }}>
                    <line x1="155" y1="410" x2="155" y2="350" stroke="#1A1614" strokeWidth="1.8" />
                    <polygon points="155,338 144,365 166,365" fill={isDusk ? "#1B231D" : "#515E4E"} />
                    <polygon points="155,358 139,385 171,385" fill={isDusk ? "#161D18" : "#424D3F"} />
                    <polygon points="155,378 135,404 175,404" fill={isDusk ? "#161D18" : "#353E32"} />
                  </g>

                  <g style={{ transformOrigin: "670px 405px", animation: "pineSwayGentle 8.2s ease-in-out infinite -4.1s" }}>
                    <line x1="670" y1="405" x2="670" y2="320" stroke="#1A1614" strokeWidth="2.2" />
                    <polygon points="670,305 654,340 686,340" fill={isDusk ? "#18201A" : "#455142"} />
                    <polygon points="670,328 648,362 692,362" fill={isDusk ? "#18201A" : "#3C473A"} />
                    <polygon points="670,350 642,392 698,392" fill={isDusk ? "#121813" : "#323B30"} />
                  </g>

                  <g style={{ transformOrigin: "1065px 420px", animation: "pineSwaySubtle 7.1s ease-in-out infinite -1.5s" }}>
                    <line x1="1065" y1="420" x2="1065" y2="345" stroke="#1A1614" strokeWidth="2" />
                    <polygon points="1065,330 1050,360 1080,360" fill={isDusk ? "#1B231D" : "#4A5647"} />
                    <polygon points="1065,352 1044,385 1086,385" fill={isDusk ? "#161D18" : "#3D483B"} />
                    <polygon points="1065,375 1038,412 1092,412" fill={isDusk ? "#161D18" : "#323B30"} />
                  </g>

                  {/* Lower Valley Foreground */}
                  <path
                    d="M 0 405 Q 260 380 520 415 T 980 410 L 1200 425 L 1200 480 L 0 480 Z"
                    fill={isDusk ? "#241F1C" : "#D2C5B0"}
                    stroke={isDusk ? "#3A322C" : "#B2A189"}
                    strokeWidth="1.5"
                  />

                  {/* Handcrafted Wooden Chalet (Pensiunea Simi) */}
                  <g transform="translate(710, 290)" id="pensiunea-simi-chalet">
                    {/* Chimney & Woodsmoke */}
                    <rect x="26" y="0" width="10" height="24" fill="#3D3631" stroke="#1A1614" strokeWidth="1" />
                    <line x1="24" y1="0" x2="38" y2="0" stroke="#1A1614" strokeWidth="1.5" />

                    <g transform="translate(31, 0)" fill="none" strokeLinecap="round">
                      <path
                        d="M 0 0 C -6 -18, -16 -32, -8 -54 C -2 -72, -18 -92, -12 -118"
                        stroke={isDusk ? "#EAE0CE" : "#6B635B"}
                        strokeWidth="1.75"
                        strokeDasharray="45 80"
                        style={{ animation: "simiSmokeWisp1 5.8s ease-out infinite" }}
                      />
                      <path
                        d="M 0 0 C 8 -16, 18 -36, 10 -58 C 4 -78, 22 -98, 16 -125"
                        stroke={isDusk ? "#EAE0CE" : "#8A8177"}
                        strokeWidth="1.4"
                        strokeDasharray="40 70"
                        style={{ animation: "simiSmokeWisp2 6.6s ease-out infinite -2.8s" }}
                      />
                    </g>

                    {/* Steep Roof with Shingle Texture */}
                    <polygon
                      points="65,18 2,82 128,82"
                      fill={isDusk ? "#1E1A17" : "#3A322C"}
                      stroke="#1A1614"
                      strokeWidth="1.75"
                    />
                    <line x1="22" y1="62" x2="108" y2="62" stroke="#FAF6EE" strokeWidth="0.8" opacity="0.25" />
                    <line x1="38" y1="46" x2="92" y2="46" stroke="#FAF6EE" strokeWidth="0.8" opacity="0.25" />

                    <line x1="-2" y1="83" x2="132" y2="83" stroke="#1A1614" strokeWidth="2.5" />

                    {/* Timber Walls */}
                    <rect
                      x="12"
                      y="84"
                      width="106"
                      height="58"
                      fill={isDusk ? "#2F2722" : "#B86B32"}
                      stroke="#1A1614"
                      strokeWidth="1.75"
                    />
                    <line x1="12" y1="98" x2="118" y2="98" stroke="#1A1614" strokeWidth="1" opacity="0.4" />
                    <line x1="12" y1="112" x2="118" y2="112" stroke="#1A1614" strokeWidth="1" opacity="0.4" />
                    <line x1="12" y1="126" x2="118" y2="126" stroke="#1A1614" strokeWidth="1" opacity="0.4" />

                    {/* Hearth Light Glowing in Windows */}
                    <g transform="translate(24, 95)">
                      <rect
                        width="16"
                        height="18"
                        fill="url(#windowGlow)"
                        stroke="#1A1614"
                        strokeWidth="1.2"
                        style={{ animation: "hearthWarmGlow 4.8s ease-in-out infinite" }}
                      />
                      <line x1="8" y1="0" x2="8" y2="18" stroke="#1A1614" strokeWidth="0.8" />
                      <line x1="0" y1="9" x2="16" y2="9" stroke="#1A1614" strokeWidth="0.8" />
                    </g>

                    <g transform="translate(56, 95)">
                      <rect
                        width="18"
                        height="20"
                        fill="url(#windowGlow)"
                        stroke="#1A1614"
                        strokeWidth="1.2"
                        style={{ animation: "hearthWarmGlow 5.2s ease-in-out infinite -1.6s" }}
                      />
                      <line x1="9" y1="0" x2="9" y2="20" stroke="#1A1614" strokeWidth="0.8" />
                      <line x1="0" y1="10" x2="18" y2="10" stroke="#1A1614" strokeWidth="0.8" />
                    </g>

                    <rect x="88" y="96" width="16" height="46" fill="#1A1614" />

                    <rect x="8" y="132" width="114" height="10" fill="#28231F" stroke="#1A1614" strokeWidth="1" />
                  </g>

                  {/* Steaming Outdoor Ciubăr (39°C) */}
                  <g transform="translate(865, 392)" id="ciubar-cald">
                    <path
                      d="M 0 16 L 4 44 Q 26 49 48 44 L 52 16 Z"
                      fill={isDusk ? "#2E2621" : "#5C4638"}
                      stroke="#1A1614"
                      strokeWidth="1.5"
                    />
                    <path d="M 2 26 Q 26 31 50 26" fill="none" stroke="#1A1614" strokeWidth="1.4" />
                    <path d="M 3 37 Q 26 42 49 37" fill="none" stroke="#1A1614" strokeWidth="1.4" />

                    <ellipse cx="26" cy="16" rx="26" ry="7" fill="url(#ciubarWater)" stroke="#1A1614" strokeWidth="1.2" />

                    {/* Rising Steam */}
                    <g fill="none" stroke="#FAF6EE" strokeWidth="1.2" strokeLinecap="round">
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

                  {/* Campfire Embers Glow */}
                  <g transform="translate(640, 422)" id="hearth-campfire">
                    <ellipse cx="0" cy="0" rx="14" ry="5" fill="#3D3631" stroke="#1A1614" strokeWidth="1" />
                    <ellipse cx="0" cy="-1" rx="8" ry="3" fill="#D4803E" />

                    <circle
                      cx="-2"
                      cy="-4"
                      r="1.4"
                      fill="#D4803E"
                      style={{ animation: "emberDrift1 3.8s ease-out infinite" }}
                    />
                    <circle
                      cx="3"
                      cy="-5"
                      r="1.1"
                      fill="#B86B32"
                      style={{ animation: "emberDrift2 4.6s ease-out infinite -1.8s" }}
                    />
                  </g>
                </svg>

                {/* Tactile Ambient Switcher (Dimineață / Amurg) */}
                <div className="absolute top-3 right-4 sm:top-5 sm:right-8 z-20">
                  <button
                    type="button"
                    onClick={() => setIsDusk(!isDusk)}
                    className="flex items-center gap-2 px-3 py-1.5 border border-[#1A1614]/15 bg-[#FAF6EE]/90 backdrop-blur-md text-xs uppercase tracking-[0.12em] font-medium text-[#1A1614] hover:border-[#B86B32] transition-colors cursor-pointer"
                  >
                    <span
                      className={`w-2 h-2 ${
                        isDusk ? "bg-[#D4803E]" : "bg-[#B86B32]"
                      }`}
                    />
                    <span>{isDusk ? "Amurg la Pietrosul" : "Dimineață în Moisei"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ─── Concise Disciplined Hero Text Lockup (Radically Short) ─── */}
            <div className="max-w-[1300px] w-full mx-auto px-4 sm:px-8 py-8 sm:py-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-[#B86B32] font-semibold">
                    <span>Pensiunea Agroturistică Simi</span>
                    <span>·</span>
                    <span>Moisei · Maramureș</span>
                  </div>

                  <h1 className="font-chalet text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1A1614] leading-[1.08] tracking-tight">
                    Liniște, lemn cald și ciubăr la poalele Munților Rodnei.
                  </h1>

                  <p className="font-ui text-base sm:text-lg text-[#6B635B] max-w-2xl leading-relaxed">
                    Șapte camere primitoare cu balcon propriu, foișor cu foc de lemne și apă caldă la 39°C pe Valea Izvorul Negru în Moisei.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <a
                    href="tel:+40740981839"
                    className="w-full py-3.5 px-6 bg-[#1A1614] hover:bg-[#B86B32] text-[#FAF6EE] text-xs uppercase tracking-[0.14em] font-semibold text-center transition-colors"
                  >
                    Sună gazda · 0740 981 839
                  </a>

                  <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                      type="button"
                      onClick={() => navigate("rezervare")}
                      className="py-3 px-4 border border-[#1A1614] hover:bg-[#1A1614] hover:text-[#FAF6EE] text-[#1A1614] text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors cursor-pointer"
                    >
                      Rezervare rapidă
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("trasee")}
                      className="py-3 px-4 border border-[#1A1614]/20 hover:border-[#1A1614] text-[#6B635B] hover:text-[#1A1614] text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors cursor-pointer"
                    >
                      Trasee 2.303m →
                    </button>
                  </div>
                </div>
              </div>

              {/* 3 Architectural Anchors: Authentic Hospitality Pop */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 mt-8 border-t border-[#1A1614]/10 text-xs text-[#6B635B]">
                <div className="space-y-1">
                  <span className="font-chalet text-lg text-[#B86B32] font-semibold block">01</span>
                  <strong className="block text-[#1A1614] font-medium text-sm">
                    Masivul Pietrosul în fereastră
                  </strong>
                  <p>7 camere cu balcon, baie proprie și vedere spre crestele Rodnei.</p>
                </div>

                <div className="space-y-1">
                  <span className="font-chalet text-lg text-[#B86B32] font-semibold block">02</span>
                  <strong className="block text-[#1A1614] font-medium text-sm">
                    Ciubăr cu lemne &amp; Foișor
                  </strong>
                  <p>Apă caldă la 39°C sub cerul liber, grătar mare, ceaun și cuptor pe lemne.</p>
                </div>

                <div className="space-y-1">
                  <span className="font-chalet text-lg text-[#B86B32] font-semibold block">03</span>
                  <strong className="block text-[#1A1614] font-medium text-sm">
                    Tichete &amp; Carduri de Vacanță
                  </strong>
                  <p>Plată acceptată cu cardurile Sodexo, Edenred și Up Vacanță.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            PAGE 2: CAMERE — 3-Column Architectural Suite Showcase (Real Photography)
           ========================================================= */}
        {page === "camere" && (
          <section className="px-4 sm:px-8 py-10 max-w-[1300px] w-full mx-auto space-y-8">
            <div className="border-b border-[#1A1614]/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.12em] text-[#B86B32] font-semibold">
                  Cazare · Moisei
                </span>
                <h1 className="font-chalet text-3xl sm:text-4xl font-normal text-[#1A1614] mt-1">
                  Cele 7 Camere ale Pensiunii
                </h1>
              </div>
              <p className="text-xs text-[#6B635B]">
                Check-in 13:00 · Check-out 12:00 · Tichete de vacanță
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {SUITES.map((suite) => (
                <div
                  key={suite.id}
                  className="border border-[#1A1614]/12 bg-[#FAF6EE] flex flex-col justify-between"
                >
                  <div className="relative h-72 overflow-hidden bg-[#231F1C]">
                    <ResilientPhoto
                      src={suite.primaryImg}
                      fallback={suite.fallbackImg}
                      alt={suite.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#1A1614]/90 text-[#FAF6EE] px-3 py-1 text-xs uppercase tracking-[0.12em] font-medium">
                      {suite.index} · {suite.count}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#FAF6EE] text-[#1A1614] px-3 py-1 text-xs uppercase tracking-[0.12em] font-semibold">
                      {suite.capacity}
                    </div>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <h2 className="font-chalet text-xl text-[#1A1614]">
                      {suite.name}
                    </h2>
                    <p className="text-xs text-[#6B635B] leading-relaxed">
                      {suite.spec}
                    </p>
                    <button
                      type="button"
                      onClick={() => selectRoomAndBook(suite.name)}
                      className="pt-2 text-xs uppercase tracking-[0.12em] font-semibold text-[#B86B32] hover:text-[#1A1614] transition-colors cursor-pointer block"
                    >
                      Alege această cameră →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#1A1614]/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B635B]">
              <span>Toate camerele au baie proprie, balcon și vedere spre munte.</span>
              <a href="tel:+40740981839" className="font-semibold text-[#1A1614] underline">
                Rezervare directă: 0740 981 839
              </a>
            </div>
          </section>
        )}

        {/* =========================================================
            PAGE 3: CIUBĂR & CURTE — Asymmetric Day/Night Spread (Real Photography)
           ========================================================= */}
        {page === "ciubar" && (
          <section className="px-4 sm:px-8 py-10 max-w-[1300px] w-full mx-auto space-y-8">
            <div className="border-b border-[#1A1614]/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.12em] text-[#B86B32] font-semibold">
                  Exterior &amp; Gastronomie
                </span>
                <h1 className="font-chalet text-3xl sm:text-4xl font-normal text-[#1A1614] mt-1">
                  {nightMode ? "Seara la ciubăr sub stele" : "Ziua în livadă și foișor"}
                </h1>
              </div>

              {/* Day / Night Switcher */}
              <div className="inline-flex border border-[#1A1614]/20">
                <button
                  type="button"
                  onClick={() => setNightMode(false)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.12em] font-semibold transition-colors cursor-pointer ${
                    !nightMode ? "bg-[#1A1614] text-[#FAF6EE]" : "text-[#1A1614]"
                  }`}
                >
                  Ziua în Livadă
                </button>
                <button
                  type="button"
                  onClick={() => setNightMode(true)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.12em] font-semibold transition-colors cursor-pointer ${
                    nightMode ? "bg-[#B86B32] text-[#FAF6EE]" : "text-[#1A1614]"
                  }`}
                >
                  Seara la Ciubăr (39°C)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 relative h-96 sm:h-[440px] overflow-hidden bg-[#231F1C]">
                <ResilientPhoto
                  src={
                    nightMode
                      ? "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=df59a858-ffea-4824-be91-f59c2bc25c24.jpg"
                      : "https://a0.muscache.com/im/pictures/hosting/Hosting-34697625/original/fd98f82b-38db-4d5a-b993-9825ca007860.jpeg?im_w=1200"
                  }
                  fallback="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
                  alt="Ciubar si Curte Pensiunea Simi"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div className="border border-[#1A1614]/12 p-6 bg-[#FAF6EE] space-y-1.5">
                  <span className="text-xs uppercase tracking-[0.12em] text-[#B86B32] font-semibold block">
                    01 · Ciubăr din Lemn Masiv
                  </span>
                  <h3 className="font-chalet text-xl text-[#1A1614]">
                    Apă caldă la 39°C pentru 6–8 persoane
                  </h3>
                  <p className="text-xs text-[#6B635B] leading-relaxed">
                    Cadă rustică cu hidromasaj, amplasată în aer liber cu vedere spre creasta Rodnei.
                  </p>
                </div>

                <div className="border border-[#1A1614]/12 p-6 bg-[#FAF6EE] space-y-1.5">
                  <span className="text-xs uppercase tracking-[0.12em] text-[#B86B32] font-semibold block">
                    02 · Foișor cu Grătar &amp; Cuptor
                  </span>
                  <h3 className="font-chalet text-xl text-[#1A1614]">
                    Zonă acoperită de gătit în aer liber
                  </h3>
                  <p className="text-xs text-[#6B635B] leading-relaxed">
                    Dotat cu grătar mare, ceaun tradițional și cuptor pe lemne pentru pizza.
                  </p>
                </div>

                <div className="border border-[#1A1614]/12 p-6 bg-[#FAF6EE] space-y-1.5">
                  <span className="text-xs uppercase tracking-[0.12em] text-[#B86B32] font-semibold block">
                    03 · Livadă Verde
                  </span>
                  <h3 className="font-chalet text-xl text-[#1A1614]">
                    Curte spațioasă și terasă la soare
                  </h3>
                  <p className="text-xs text-[#6B635B] leading-relaxed">
                    Spațiu generos pentru copii și după-amiezi de relaxare la umbra pomilor.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            PAGE 4: TRASEE & ZONĂ — The Beloved Munții Rodnei Compass
           ========================================================= */}
        {page === "trasee" && (
          <section className="px-4 sm:px-8 py-10 max-w-[1300px] w-full mx-auto space-y-8">
            <div className="border-b border-[#1A1614]/10 pb-6">
              <span className="text-xs uppercase tracking-[0.12em] text-[#B86B32] font-semibold">
                Busola Munților Rodnei · Moisei (620 m)
              </span>
              <h1 className="font-chalet text-3xl sm:text-4xl font-normal text-[#1A1614] mt-1">
                Atracții și trasee în apropiere
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left: Interactive Compass Instrument */}
              <div className="lg:col-span-5 bg-[#1A1614] text-[#FAF6EE] p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="flex items-center justify-between text-xs text-[#B86B32] uppercase tracking-[0.12em]">
                  <span>47.6556° N, 24.5401° E</span>
                  <span>{trail.direction}</span>
                </div>

                {/* Rotating Compass SVG */}
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                    <circle cx="100" cy="100" r="90" stroke="rgba(250,246,238,0.2)" strokeWidth="1.5" fill="none" />
                    <circle cx="100" cy="100" r="65" stroke="rgba(184,107,50,0.3)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                    <text x="96" y="24" fill="#B86B32" fontSize="10" fontWeight="600">N</text>
                    <text x="96" y="186" fill="#FAF6EE" opacity="0.5" fontSize="10">S</text>
                    <text x="178" y="104" fill="#FAF6EE" opacity="0.5" fontSize="10">E</text>
                    <text x="14" y="104" fill="#FAF6EE" opacity="0.5" fontSize="10">V</text>

                    {/* Rotating Needle */}
                    <g
                      className="needle-rotate"
                      style={{
                        transform: `rotate(${trail.bearing}deg)`,
                        transformOrigin: "100px 100px",
                      }}
                    >
                      <polygon points="100,26 106,100 94,100" fill="#B86B32" />
                      <polygon points="100,174 106,100 94,100" fill="rgba(250,246,238,0.3)" />
                      <circle cx="100" cy="100" r="5" fill="#FAF6EE" />
                    </g>
                  </svg>
                </div>

                <div className="space-y-1 border-t border-[#FAF6EE]/15 pt-4">
                  <span className="text-xs font-semibold text-[#B86B32] uppercase tracking-[0.12em] block">
                    {trail.elevation}
                  </span>
                  <h2 className="font-chalet text-2xl text-[#FAF6EE]">{trail.name}</h2>
                  <p className="text-xs text-[#FAF6EE]/75 leading-relaxed">{trail.desc}</p>
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
                      onClick={() => setSelectedTrail(idx)}
                      className={`border p-4 text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? "border-[#B86B32] bg-[#1A1614] text-[#FAF6EE]"
                          : "border-[#1A1614]/12 bg-[#FAF6EE] text-[#1A1614] hover:bg-[#F4EDE2]"
                      }`}
                    >
                      <div className="relative h-36 w-full overflow-hidden bg-[#231F1C]">
                        <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                        <span className="absolute top-2 right-2 bg-[#1A1614]/90 text-[#FAF6EE] px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]">
                          {t.direction}
                        </span>
                      </div>
                      <div className="pt-3 space-y-1">
                        <span className={`text-xs uppercase tracking-[0.12em] font-semibold ${isSelected ? "text-[#B86B32]" : "text-[#B86B32]"}`}>
                          {t.distance}
                        </span>
                        <h3 className="font-chalet text-lg font-normal leading-snug">
                          {t.name}
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
            PAGE 5: REZERVARE — 3-Tap WhatsApp Builder & Verified Social Proof
           ========================================================= */}
        {page === "rezervare" && (
          <section className="px-4 sm:px-8 py-10 max-w-[1300px] w-full mx-auto space-y-8">
            <div className="border-b border-[#1A1614]/10 pb-6">
              <span className="text-xs uppercase tracking-[0.12em] text-[#B86B32] font-semibold">
                Rezervare Directă · Fără Comisioane
              </span>
              <h1 className="font-chalet text-3xl sm:text-4xl font-normal text-[#1A1614] mt-1">
                Configurează cererea pe WhatsApp
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: 3-Tap Selector */}
              <div className="lg:col-span-7 bg-[#1A1614] text-[#FAF6EE] p-6 sm:p-8 space-y-6">
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
                            ? "bg-[#B86B32] border-[#B86B32] text-[#FAF6EE] font-semibold"
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
                            ? "bg-[#B86B32] border-[#B86B32] text-[#FAF6EE] font-semibold"
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

                <div className="border border-[#FAF6EE]/15 p-4 bg-[#231F1C] space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.12em] text-[#B86B32] block">
                    Mesaj pentru 0740 981 839:
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
                    className="py-3.5 px-4 bg-[#B86B32] hover:bg-[#A05A28] text-[#FAF6EE] text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors"
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
                <div className="border border-[#1A1614]/12 p-6 bg-[#FAF6EE] space-y-4">
                  <span className="text-xs uppercase tracking-[0.12em] text-[#B86B32] font-semibold block">
                    Adresă &amp; Contact
                  </span>
                  <h2 className="font-chalet text-xl text-[#1A1614]">
                    Str. Izvorul Negru nr. 257B, Moisei, Maramureș
                  </h2>
                  <div className="space-y-1 text-xs text-[#6B635B] pt-2 border-t border-[#1A1614]/10">
                    <p>Telefon: <strong className="text-[#1A1614]">+40 740 981 839</strong></p>
                    <p>Check-in: 13:00–15:00 · Check-out: până la 12:00</p>
                    <p>Carduri de vacanță: Pluxee, Up, Edenred</p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Pensiunea+Simi+Moisei+Maramures+257B"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 border border-[#1A1614] text-[#1A1614] text-xs uppercase tracking-[0.12em] font-semibold text-center hover:bg-[#1A1614] hover:text-[#FAF6EE] transition-colors"
                  >
                    Deschide în Google Maps →
                  </a>
                </div>

                <div className="border border-[#1A1614]/12 p-6 bg-[#FAF6EE] space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-[0.12em] text-[#B86B32] font-semibold">
                      Nota 10 / 10 TuristInfo.ro
                    </span>
                    <span className="font-chalet text-base text-[#1A1614]">Verificat</span>
                  </div>
                  <p className="font-chalet text-base text-[#1A1614] italic leading-snug">
                    „Camere impecabil de curate, ciubărul și foișorul au fost un mare plus, iar priveliștea spre Pietrosul Rodnei îți taie răsuflarea.”
                  </p>
                  <span className="text-xs text-[#6B635B] block">
                    — Bumbas Costin &amp; Maria, oaspeți verificați
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ─── Architectural Footer ─── */}
      <footer className="border-t border-[#1A1614]/10 px-4 sm:px-8 py-5 text-xs text-[#6B635B]">
        <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Pensiunea Simi · Str. Izvorul Negru 257B, Moisei, jud. Maramureș</span>

          <div className="flex items-center gap-6 font-medium">
            <a
              href="https://www.instagram.com/pensiunea_simi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1A1614] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/share/1Dr11vWoRq/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1A1614] transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://www.turistinfo.ro/moisei/cazare-moisei/pensiunea_simi-951496.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1A1614] transition-colors"
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
