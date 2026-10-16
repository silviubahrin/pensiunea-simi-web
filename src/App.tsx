import { useState, useEffect } from "react";
import { PhotographicFrameHero } from "./components/PhotographicFrameHero";

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
    fallbackImg: "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=7018057c-1ce8-41d7-a607-7bfd742e7975.jpg",
  },
  {
    id: "tripla",
    index: "02",
    name: "Cameră Triplă de Familie",
    capacity: "3 Oaspeți · 24 m²",
    count: "1 Cameră în Pensiune",
    spec: "Pat dublu și pat single, balcon generos spre Pietrosul Rodnei, baie proprie și spațiu suplimentar.",
    highlights: ["Pat dublu + pat single", "Vedere panoramică", "Ideală pentru familii"],
    primaryImg: "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=7018057c-1ce8-41d7-a607-7bfd742e7975.jpg",
    fallbackImg: "https://v3.turistinfo.ro/images/camere/335673.jpg",
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
    fallbackImg: "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=df59a858-ffea-4824-be91-f59c2bc25c24.jpg",
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
            {/* ─── OPTION 2: Alpine Architectural Photographic Frame (Eriro / Forestis Style) ─── */}
            <PhotographicFrameHero isNight={isNight} onNavigate={navigate} />

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
                          : "https://www.turistinfo.ro/images/cazare/951496.jpg"
                      }
                      fallback="https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=df59a858-ffea-4824-be91-f59c2bc25c24.jpg"
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
                      : "https://www.turistinfo.ro/images/cazare/951496.jpg"
                  }
                  fallback="https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=df59a858-ffea-4824-be91-f59c2bc25c24.jpg"
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
