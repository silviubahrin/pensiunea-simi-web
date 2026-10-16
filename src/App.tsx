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
    capacity: "2 Oaspeți",
    count: "6 Camere",
    spec: "Pat matrimonial confortabil, baie proprie cu duș, balcon orientat spre munte, TV și Wi-Fi.",
    highlights: ["Balcon privat spre munte", "Baie proprie cu duș", "Pat matrimonial"],
    primaryImg: "/images/fb/1345684102508670.jpg",
    fallbackImg: "/images/fb/1345684149175332.jpg",
  },
  {
    id: "tripla",
    index: "02",
    name: "Cameră Triplă",
    capacity: "3 Oaspeți",
    count: "1 Cameră",
    spec: "Pat dublu și pat single, baie proprie și balcon cu vedere spre creasta Pietrosului.",
    highlights: ["Pat dublu și pat single", "Balcon cu vedere", "Baie proprie"],
    primaryImg: "/images/fb/1345684149175332.jpg",
    fallbackImg: "/images/fb/1345684102508670.jpg",
  },
  {
    id: "integral",
    index: "03",
    name: "Închiriere Integrală",
    capacity: "Până la 15 Oaspeți",
    count: "Toată Pensiunea",
    spec: "Toate cele 7 camere cu băi proprii, salon de zi, bucătărie utilată, foișor cu grătar și ciubăr cald.",
    highlights: ["Intimitate deplină", "Foișor cu grătar și cuptor", "Ciubăr încălzit cu lemne"],
    primaryImg: "/images/fb/1345684012508679.jpg",
    fallbackImg: "/images/fb/100012012794052.jpg",
  },
];

interface TrailItem {
  id: string;
  num: string;
  name: string;
  elevation: string;
  distance: string;
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
    distance: "8,4 km",
    duration: "4–5 ore urcare",
    difficulty: "Mediu / Dificil",
    desc: "Cel mai înalt vârf din Carpații Orientali, vizibil direct din curtea și balcoanele pensiunii.",
    img: "/images/fb/564574535289711.jpg",
  },
  {
    id: "manastirea",
    num: "02",
    name: "Mănăstirea Moisei",
    elevation: "Anul 1672",
    distance: "2,1 km",
    duration: "25 min pe jos",
    difficulty: "Plimbare ușoară",
    desc: "Biserica istorică din lemn într-o poiană liniștită, pe drumul Izvorul Negru.",
    img: "/images/attractions/manastirea_moisei.jpg",
  },
  {
    id: "mocanita",
    num: "03",
    name: "Mocănița Valea Vaserului",
    elevation: "Tren cu abur",
    distance: "13 km (Vișeu)",
    duration: "18 min cu mașina",
    difficulty: "Agrement turistic",
    desc: "Plimbare cu trenul pe ecartament îngust prin defileul sălbatic al râului Vaser.",
    img: "/images/attractions/mocanita_vaser.jpg",
  },
  {
    id: "borsa",
    num: "04",
    name: "Cascada Cailor",
    elevation: "Cădere de 90 m",
    distance: "14 km (Borșa)",
    duration: "20 min cu mașina",
    difficulty: "Accesibil",
    desc: "Cea mai înaltă cascadă din România, alimentată de zăpezile masivului Rodnei.",
    img: "/images/fb/564574448623053.jpg",
  },
];

// No duplicate 'Acasă': the logo in header acts as home button
const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: "camere", label: "Camere" },
  { id: "ciubar", label: "Ciubăr & Curte" },
  { id: "trasee", label: "Trasee" },
  { id: "rezervare", label: "Rezervare" },
];

const WHATSAPP_NUMBER = "40740981839";
const PHONE_DISPLAY = "0740 981 839";
const WHATSAPP_DEFAULT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bună ziua! Aș dori informații despre disponibilitate la Pensiunea Simi Moisei.")}`;

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

function ThemeCommuter({
  isNight,
  onToggle,
}: {
  isNight: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isNight}
      aria-label={isNight ? "Comută pe tema de zi" : "Comută pe tema de noapte"}
      onClick={onToggle}
      className={`relative inline-flex h-7 w-13 items-center rounded-full p-0.5 transition-colors duration-300 cursor-pointer focus:outline-none ${
        isNight
          ? "bg-[#28231F] border border-[#FAF6EE]/20 hover:border-[#D4803E]"
          : "bg-[#EAE2D3] border border-[#1A1614]/15 hover:border-[#B86B32]"
      }`}
    >
      <span className="sr-only">Comutator temă zi/noapte</span>

      <span
        className={`absolute left-1.5 w-3.5 h-3.5 transition-opacity duration-200 pointer-events-none ${
          isNight ? "opacity-35 text-[#FAF6EE]" : "opacity-0 text-[#1A1614]"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </span>

      <span
        className={`absolute right-1.5 w-3.5 h-3.5 transition-opacity duration-200 pointer-events-none ${
          isNight ? "opacity-0 text-[#FAF6EE]" : "opacity-35 text-[#1A1614]"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>

      <span
        className={`flex h-5 w-5 transform items-center justify-center rounded-full shadow-md transition-transform duration-300 ${
          isNight
            ? "translate-x-6 bg-[#E28C46] text-[#141210]"
            : "translate-x-0.5 bg-[#FAF6EE] text-[#B86B32]"
        }`}
      >
        {isNight ? (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
          </svg>
        )}
      </span>
    </button>
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

  const getRoomWhatsAppUrl = (roomName: string) => {
    const message = `Bună ziua! Aș dori informații despre disponibilitate pentru ${roomName} la Pensiunea Simi Moisei.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

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
      {/* ─── Top Header with Cabin Logo & Day/Night Toggle ─── */}
      <header className={`sticky top-0 z-50 ${isNight ? "bg-[#141210]/95" : "bg-[#FAF6EE]/95"} backdrop-blur-md border-b ${themeBorder} px-4 sm:px-8 py-3.5 transition-colors duration-300`}>
        <div className="max-w-[1300px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("acasa")}
            className="text-left cursor-pointer group flex items-center gap-3 transition-opacity hover:opacity-90"
            aria-label="Pensiunea Simi — Pagina Principală"
          >
            {/* Minimal Cabin Logo Element */}
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
                {/* Chimney Smoke Motion */}
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
                {/* Walls */}
                <path
                  d="M5.5 12.5V20.5H18.5V12.5"
                  stroke={isNight ? "#FAF6EE" : "#1A1614"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Hearth Glow Portal */}
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

          {/* Desktop Nav: Clean Links + Theme Switcher + Direct Phone */}
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

            {/* Day / Night Theme Commuter */}
            <ThemeCommuter
              isNight={isNight}
              onToggle={() => setIsNight((prev) => !prev)}
            />

            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className={`px-4 py-2 ${
                isNight ? "bg-[#E28C46] text-[#141210] hover:bg-[#FAF6EE]" : "bg-[#1A1614] text-[#FAF6EE] hover:bg-[#B86B32]"
              } text-xs uppercase tracking-[0.12em] font-semibold transition-colors`}
            >
              {PHONE_DISPLAY}
            </a>
          </div>

          {/* Mobile Right Controls: Theme Commuter & Burger Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeCommuter
              isNight={isNight}
              onToggle={() => setIsNight((prev) => !prev)}
            />

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

      {/* ─── Mobile Menu Drawer ─── */}
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
                href={`tel:+${WHATSAPP_NUMBER}`}
                className={`py-3 ${
                  isNight ? "bg-[#E28C46] text-[#141210]" : "bg-[#1A1614] text-[#FAF6EE]"
                } text-xs font-semibold text-center uppercase tracking-[0.12em]`}
              >
                Sună direct
              </a>
              <a
                href={WHATSAPP_DEFAULT_URL}
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
            PAGINA 1: ACASĂ
           ========================================================= */}
        {page === "acasa" && (
          <div className="flex-1 flex flex-col min-h-[calc(100svh-65px)]">
            {/* Hero cu cadre foto autentice */}
            <PhotographicFrameHero isNight={isNight} onNavigate={navigate} />

            {/* ─── SECȚIUNEA A: Camerele ─── */}
            <section className={`border-t ${themeBorder} py-12 sm:py-16 ${themeSurface} transition-colors duration-300`}>
              <div className="max-w-[1300px] mx-auto px-4 sm:px-8 space-y-8">
                <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 ${themeBorder}`}>
                  <div>
                    <h2 className={`font-chalet text-2xl sm:text-3xl font-normal ${themeText}`}>
                      Camerele Pensiunii Simi
                    </h2>
                    <p className={`text-sm ${themeTextMuted} mt-1`}>
                      Vedere spre Pietrosul Rodnei, băi proprii și liniște deplină.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("camere")}
                    className={`text-xs uppercase tracking-[0.12em] font-semibold ${themeAccent} hover:underline cursor-pointer`}
                  >
                    Toate camerele →
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
                          {suite.count}
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
                        <div className={`pt-3 flex items-center justify-between border-t ${themeBorder}`}>
                          <a
                            href={getRoomWhatsAppUrl(suite.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-xs uppercase tracking-[0.12em] font-semibold ${themeAccent} hover:underline`}
                          >
                            Rezervă pe WhatsApp →
                          </a>
                          <span className={`text-[11px] ${themeTextMuted}`}>
                            Balcon
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── SECȚIUNEA B: Ciubăr & Curte ─── */}
            <section className={`border-t ${themeBorder} py-12 sm:py-16 ${themeBg} transition-colors duration-300`}>
              <div className="max-w-[1300px] mx-auto px-4 sm:px-8 space-y-8">
                <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 ${themeBorder}`}>
                  <div>
                    <h2 className={`font-chalet text-2xl sm:text-3xl font-normal ${themeText}`}>
                      Ciubăr încălzit și foișor cu grătar
                    </h2>
                    <p className={`text-sm ${themeTextMuted} mt-1`}>
                      Relaxare în aer liber pe malul Văii Izvorul Negru.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("ciubar")}
                    className={`text-xs uppercase tracking-[0.12em] font-semibold ${themeAccent} hover:underline cursor-pointer`}
                  >
                    Vezi facilitățile →
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <div className={`lg:col-span-7 relative h-80 sm:h-[440px] overflow-hidden bg-[#231F1C] border ${themeBorder}`}>
                    <ResilientPhoto
                      src="/images/fb/1345682539175493.jpg"
                      fallback="/images/fb/100012012794052.jpg"
                      alt="Curtea si Ciubarul Pensiunea Simi Moisei"
                      className="w-full h-full object-cover"
                    />

                    {/* Steam Badge */}
                    <div className="absolute top-4 left-4 bg-[#1A1614]/90 backdrop-blur-md text-[#FAF6EE] px-3.5 py-2 border border-[#FAF6EE]/15 flex items-center gap-2.5">
                      <div className="w-4 h-4 text-[#D4803E]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M 6 18 Q 4 10 8 4" style={{ animation: "steamRiseWisp 3.8s ease-out infinite" }} />
                          <path d="M 12 18 Q 14 10 10 4" style={{ animation: "steamRiseWisp 4.4s ease-out infinite -1.5s" }} />
                          <path d="M 18 18 Q 16 10 20 4" style={{ animation: "steamRiseWisp 4.1s ease-out infinite -0.8s" }} />
                        </svg>
                      </div>
                      <span className="text-xs uppercase tracking-[0.12em] font-semibold">
                        Apă caldă la 39°C · Încălzit cu lemne
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                    <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                      <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold block`}>
                        Ciubăr din Lemn Masiv
                      </span>
                      <h3 className={`font-chalet text-xl ${themeText}`}>
                        Hidromasaj sub cerul liber
                      </h3>
                      <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                        Pregătit la cerere cu lemne uscate de fag, perfect după o drumeție pe Pietrosul Rodnei.
                      </p>
                    </div>

                    <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                      <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold block`}>
                        Foișor Tradițional Acoperit
                      </span>
                      <h3 className={`font-chalet text-xl ${themeText}`}>
                        Grătar, plită de ceaun și cuptor
                      </h3>
                      <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                        Foișor spațios din lemn pentru mese în aer liber. Lemnele de foc sunt puse la dispoziție de gazdă.
                      </p>
                    </div>

                    <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                      <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold block`}>
                        Curte Mare &amp; Loc de Joacă
                      </span>
                      <h3 className={`font-chalet text-xl ${themeText}`}>
                        Liniște pe malul apei
                      </h3>
                      <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                        Curte îngrădită sigură pentru copii, spațiu verde generos și parcare privată gratuită.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── SECȚIUNEA C: Trasee & Atracții ─── */}
            <section className={`border-t ${themeBorder} py-12 sm:py-16 ${themeSurface} transition-colors duration-300`}>
              <div className="max-w-[1300px] mx-auto px-4 sm:px-8 space-y-8">
                <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 ${themeBorder}`}>
                  <div>
                    <h2 className={`font-chalet text-2xl sm:text-3xl font-normal ${themeText}`}>
                      Trasee și Atracții în Zonă
                    </h2>
                    <p className={`text-sm ${themeTextMuted} mt-1`}>
                      Destinații naturale și obiective emblematice ușor accesibile din Moisei.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("trasee")}
                    className={`text-xs uppercase tracking-[0.12em] font-semibold ${themeAccent} hover:underline cursor-pointer`}
                  >
                    Ghidul complet de trasee →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {TRAILS.map((t) => (
                    <div
                      key={t.id}
                      className={`border ${themeBorder} ${themeSurfaceElevated} flex flex-col justify-between group transition-all hover:border-[#D4803E]`}
                    >
                      <div className="relative h-48 overflow-hidden bg-[#231F1C]">
                        <img
                          src={t.img}
                          alt={t.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 bg-[#1A1614]/90 text-[#FAF6EE] px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] font-medium">
                          {t.distance}
                        </div>
                        <div className="absolute bottom-3 right-3 bg-[#FAF6EE] text-[#1A1614] px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] font-semibold">
                          {t.elevation}
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <h3 className={`font-chalet text-xl ${themeText} leading-tight`}>
                            {t.name}
                          </h3>
                          <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                            {t.desc}
                          </p>
                        </div>
                        <div className={`pt-3 border-t ${themeBorder} flex items-center justify-between text-[11px] ${themeTextMuted}`}>
                          <span>{t.duration}</span>
                          <span className={`font-medium ${themeAccent}`}>{t.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── SECȚIUNEA D: Rezervare Directă (Simplitate Maximă) ─── */}
            <section className={`border-t ${themeBorder} py-12 sm:py-16 ${themeBg} transition-colors duration-300`}>
              <div className="max-w-[1300px] mx-auto px-4 sm:px-8 space-y-8">
                <div className={`border-b pb-6 ${themeBorder}`}>
                  <h2 className={`font-chalet text-2xl sm:text-3xl font-normal ${themeText}`}>
                    Rezervare Directă
                  </h2>
                  <p className={`text-sm ${themeTextMuted} mt-1`}>
                    Contact direct cu gazda, fără comisioane sau intermediari.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Butoane directe WhatsApp & Telefon */}
                  <div className={`lg:col-span-7 ${isNight ? "bg-[#1F1B18]" : "bg-[#1A1614]"} text-[#FAF6EE] p-6 sm:p-8 space-y-6 border ${themeBorder}`}>
                    <div className="space-y-2">
                      <h3 className="font-chalet text-2xl text-[#FAF6EE]">
                        Scrie-ne sau sună-ne direct
                      </h3>
                      <p className="text-xs text-[#FAF6EE]/75 leading-relaxed">
                        Spune-ne perioada în care dorești să vii și numărul de persoane. Îți răspundem rapid cu disponibilitatea și cel mai bun tarif.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <a
                        href={WHATSAPP_DEFAULT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors shadow-md"
                      >
                        Scrie pe WhatsApp · {PHONE_DISPLAY}
                      </a>
                      <a
                        href={`tel:+${WHATSAPP_NUMBER}`}
                        className="py-3.5 px-6 bg-[#E28C46] hover:bg-[#FAF6EE] hover:text-[#141210] text-[#141210] text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors"
                      >
                        Sună acum: {PHONE_DISPLAY}
                      </a>
                    </div>

                    <div className="border-t border-[#FAF6EE]/15 pt-4 text-xs text-[#FAF6EE]/70 space-y-1">
                      <p>Răspundem de obicei în câteva minute.</p>
                      <p>Acceptăm tichete și carduri de vacanță (Pluxee, Edenred, Up).</p>
                    </div>
                  </div>

                  {/* Informații Locație */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-3`}>
                      <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold block`}>
                        Adresă &amp; Localizare
                      </span>
                      <h3 className={`font-chalet text-xl ${themeText}`}>
                        Str. Izvorul Negru nr. 257B, Moisei, Maramureș
                      </h3>
                      <div className={`space-y-1 text-xs ${themeTextMuted} pt-2 border-t ${themeBorder}`}>
                        <p>Check-in: 13:00 · Check-out: 12:00</p>
                        <p>Parcare privată gratuită în curte</p>
                      </div>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Pensiunea+Simi+Moisei+Maramures+257B"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block pt-2 text-xs uppercase tracking-[0.12em] font-semibold ${themeAccent} hover:underline`}
                      >
                        Deschide în Google Maps →
                      </a>
                    </div>

                    <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                      <div className="flex items-baseline justify-between">
                        <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold`}>
                          Nota 10 / 10 TuristInfo
                        </span>
                        <span className={`text-xs ${themeTextMuted}`}>Oaspeți Verificați</span>
                      </div>
                      <p className={`font-chalet text-base ${themeText} italic leading-snug`}>
                        „Curățenie impecabilă, gazde primitoare, foișorul și ciubărul au fost perfecte după urcarea pe Pietrosul.”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            PAGINA 2: CAMERE
           ========================================================= */}
        {page === "camere" && (
          <section className="px-4 sm:px-8 py-10 max-w-[1300px] w-full mx-auto space-y-8">
            <div className={`border-b ${themeBorder} pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4`}>
              <div>
                <h1 className={`font-chalet text-3xl sm:text-4xl font-normal ${themeText}`}>
                  Camerele Pensiunii Simi
                </h1>
                <p className={`text-sm ${themeTextMuted} mt-1`}>
                  7 camere luminoase cu baie privată, balcon și vedere spre Munții Rodnei.
                </p>
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
                      {suite.count}
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

                    <div className={`pt-2 border-t ${themeBorder} space-y-1`}>
                      {suite.highlights.map((h, i) => (
                        <div key={i} className={`flex items-center gap-2 text-xs ${themeText}`}>
                          <span className={`w-1.5 h-1.5 ${themeAccentBg} shrink-0`} />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 flex items-center justify-between">
                      <a
                        href={getRoomWhatsAppUrl(suite.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs uppercase tracking-[0.12em] font-semibold ${themeAccent} hover:underline`}
                      >
                        Rezervă pe WhatsApp →
                      </a>
                      <a
                        href={`tel:+${WHATSAPP_NUMBER}`}
                        className={`text-xs ${themeTextMuted} hover:${themeText}`}
                      >
                        Sună
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`border-t ${themeBorder} pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs ${themeTextMuted}`}>
              <div>
                <strong className={`block ${themeText} font-medium`}>În Toate Camerele</strong>
                <p>Baie proprie cu duș, balcon spre munte, lenjerii curate, prosoape și Wi-Fi gratuit.</p>
              </div>
              <div>
                <strong className={`block ${themeText} font-medium`}>Facilități Comune</strong>
                <p>Salon de zi, bucătărie utilată complet, foișor cu grătar și cuptor, parcare în curte.</p>
              </div>
              <div>
                <strong className={`block ${themeText} font-medium`}>Contact Rapid</strong>
                <p>Telefon și WhatsApp: <a href={`tel:+${WHATSAPP_NUMBER}`} className={`underline font-semibold ${themeText}`}>{PHONE_DISPLAY}</a></p>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            PAGINA 3: CIUBĂR & CURTE
           ========================================================= */}
        {page === "ciubar" && (
          <section className="px-4 sm:px-8 py-10 max-w-[1300px] w-full mx-auto space-y-8">
            <div className={`border-b ${themeBorder} pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4`}>
              <div>
                <h1 className={`font-chalet text-3xl sm:text-4xl font-normal ${themeText}`}>
                  Ciubăr cu Apă Caldă și Foișor Tradițional
                </h1>
                <p className={`text-sm ${themeTextMuted} mt-1`}>
                  Zonă amenajată în aer liber pe malul Văii Izvorul Negru.
                </p>
              </div>

              <span className={`text-xs uppercase tracking-[0.12em] font-semibold ${themeAccent}`}>
                Încălzit cu lemne de fag
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className={`lg:col-span-7 relative h-96 sm:h-[460px] overflow-hidden bg-[#231F1C] border ${themeBorder}`}>
                <ResilientPhoto
                  src="/images/fb/1345682539175493.jpg"
                  fallback="/images/fb/100012012794052.jpg"
                  alt="Ciubar si Curte Pensiunea Simi Moisei"
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-4 left-4 bg-[#1A1614]/90 backdrop-blur-md text-[#FAF6EE] px-4 py-2 border border-[#FAF6EE]/15 flex items-center gap-3">
                  <div className="w-5 h-5 text-[#E28C46]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M 6 18 Q 4 10 8 4" style={{ animation: "steamRiseWisp 3.8s ease-out infinite" }} />
                      <path d="M 12 18 Q 14 10 10 4" style={{ animation: "steamRiseWisp 4.4s ease-out infinite -1.5s" }} />
                      <path d="M 18 18 Q 16 10 20 4" style={{ animation: "steamRiseWisp 4.1s ease-out infinite -0.8s" }} />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.12em] font-semibold block">Ciubăr Tradițional</span>
                    <span className="text-[11px] text-[#FAF6EE]/75">Apă caldă la 39°C</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                  <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold block`}>
                    Ciubăr din Lemn Masiv
                  </span>
                  <h3 className={`font-chalet text-xl ${themeText}`}>
                    Apă caldă și hidromasaj
                  </h3>
                  <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                    Capacitate 6–8 persoane, amplasat pe terasă din lemn cu vedere spre creasta munților.
                  </p>
                </div>

                <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                  <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold block`}>
                    Foișor Tradițional Acoperit
                  </span>
                  <h3 className={`font-chalet text-xl ${themeText}`}>
                    Grătar mare, ceaun și cuptor
                  </h3>
                  <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                    Zonă acoperită de mese pentru prepararea mâncărurilor la aer curat de munte.
                  </p>
                </div>

                <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                  <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold block`}>
                    Râu &amp; Curte Verde
                  </span>
                  <h3 className={`font-chalet text-xl ${themeText}`}>
                    Liniștea naturii
                  </h3>
                  <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                    Curtea generoasă oferă loc de joacă din lemn pentru copii și acces la malul râului.
                  </p>
                </div>
              </div>
            </div>

            <div className={`border-t ${themeBorder} pt-6 flex flex-col sm:flex-row items-center justify-between gap-4`}>
              <span className={`text-xs ${themeTextMuted}`}>
                Ciubărul este igienizat complet înainte de fiecare utilizare.
              </span>
              <div className="flex gap-3">
                <a
                  href={WHATSAPP_DEFAULT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors shadow-sm"
                >
                  Rezervă pe WhatsApp
                </a>
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className={`py-3 px-6 border ${themeBorder} ${themeText} text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors`}
                >
                  Sună: {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            PAGINA 4: TRASEE & ATRACȚII
           ========================================================= */}
        {page === "trasee" && (
          <section className="px-4 sm:px-8 py-10 max-w-[1300px] w-full mx-auto space-y-8">
            <div className={`border-b ${themeBorder} pb-6`}>
              <h1 className={`font-chalet text-3xl sm:text-4xl font-normal ${themeText}`}>
                Trasee și Atracții în Zonă
              </h1>
              <p className={`text-sm ${themeTextMuted} mt-1`}>
                Obiective turistice și drumeții ușor accesibile din Moisei.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRAILS.map((t) => (
                <div
                  key={t.id}
                  className={`border ${themeBorder} ${themeSurfaceElevated} flex flex-col justify-between group transition-all hover:border-[#D4803E]`}
                >
                  <div className="relative h-52 overflow-hidden bg-[#231F1C]">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-[#1A1614]/90 text-[#FAF6EE] px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] font-medium">
                      {t.distance}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-[#FAF6EE] text-[#1A1614] px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] font-semibold">
                      {t.elevation}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <h2 className={`font-chalet text-xl ${themeText} leading-tight`}>
                        {t.name}
                      </h2>
                      <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                        {t.desc}
                      </p>
                    </div>
                    <div className={`pt-3 border-t ${themeBorder} flex items-center justify-between text-[11px] ${themeTextMuted}`}>
                      <span>{t.duration}</span>
                      <span className={`font-medium ${themeAccent}`}>{t.difficulty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`border-t ${themeBorder} pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs ${themeTextMuted}`}>
              <div className={`p-6 border ${themeBorder} ${themeSurfaceElevated} space-y-2`}>
                <strong className={`block ${themeText} text-base font-medium`}>Pietrosul Rodnei (2.303 m)</strong>
                <p className="leading-relaxed">Traseul marcat cu bandă albastră pornește din Moisei sau Borșa, trecând pe lângă Lacul glaciar Iezer și stația meteo până pe cel mai înalt vârf din Carpații Orientali.</p>
              </div>
              <div className={`p-6 border ${themeBorder} ${themeSurfaceElevated} space-y-2`}>
                <strong className={`block ${themeText} text-base font-medium`}>Mocănița de pe Valea Vaserului</strong>
                <p className="leading-relaxed">Gara CFF Vișeu de Sus se află la 13 km de pensiune (circa 18 minute cu mașina). Este ultima cale ferată forestieră cu abur din Europa, o experiență deosebită pentru orice călător.</p>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            PAGINA 5: REZERVARE (Ultra-Simplă: Buton WhatsApp + Telefon)
           ========================================================= */}
        {page === "rezervare" && (
          <section className="px-4 sm:px-8 py-10 max-w-[1300px] w-full mx-auto space-y-8">
            <div className={`border-b ${themeBorder} pb-6`}>
              <h1 className={`font-chalet text-3xl sm:text-4xl font-normal ${themeText}`}>
                Rezervare Directă la Pensiunea Simi
              </h1>
              <p className={`text-sm ${themeTextMuted} mt-1`}>
                Fără taxe ascunse sau comisioane. Răspundem direct pe WhatsApp sau telefonic.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Card Direct WhatsApp & Telefon */}
              <div className={`lg:col-span-7 ${isNight ? "bg-[#1F1B18]" : "bg-[#1A1614]"} text-[#FAF6EE] p-6 sm:p-8 space-y-6 border ${themeBorder}`}>
                <div className="space-y-2">
                  <h2 className="font-chalet text-2xl text-[#FAF6EE]">
                    Trimite o cerere de disponibilitate
                  </h2>
                  <p className="text-xs text-[#FAF6EE]/80 leading-relaxed">
                    Apasă butonul de mai jos pentru a deschide conversația direct pe WhatsApp cu gazda pensiunii.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={WHATSAPP_DEFAULT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-[0.14em] font-semibold text-center transition-colors shadow-md"
                  >
                    Scrie pe WhatsApp · {PHONE_DISPLAY}
                  </a>

                  <a
                    href={`tel:+${WHATSAPP_NUMBER}`}
                    className="py-4 px-6 bg-[#E28C46] hover:bg-[#FAF6EE] hover:text-[#141210] text-[#141210] text-xs uppercase tracking-[0.14em] font-semibold text-center transition-colors"
                  >
                    Sună: {PHONE_DISPLAY}
                  </a>
                </div>

                <div className="border-t border-[#FAF6EE]/15 pt-4 text-xs text-[#FAF6EE]/75 space-y-2">
                  <p>Informații utile de menționat în mesaj: perioada dorită, numărul de adulți și copii, și dacă dorești pregătirea ciubărului.</p>
                  <p>Acceptăm tichete de vacanță: Pluxee (Sodexo), Edenred, Up Vacanță.</p>
                </div>
              </div>

              {/* Detalii Locație & Notă */}
              <div className="lg:col-span-5 space-y-4">
                <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-3`}>
                  <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold block`}>
                    Localizare
                  </span>
                  <h2 className={`font-chalet text-xl ${themeText}`}>
                    Str. Izvorul Negru nr. 257B, Moisei, Maramureș
                  </h2>
                  <div className={`space-y-1 text-xs ${themeTextMuted} pt-2 border-t ${themeBorder}`}>
                    <p>Telefon: <strong className={themeText}>+{WHATSAPP_NUMBER}</strong></p>
                    <p>Check-in: 13:00 · Check-out: 12:00</p>
                    <p>Parcare privată gratuită pentru 8 autoturisme</p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Pensiunea+Simi+Moisei+Maramures+257B"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block pt-2 text-xs uppercase tracking-[0.12em] font-semibold ${themeAccent} hover:underline`}
                  >
                    Deschide în Google Maps →
                  </a>
                </div>

                <div className={`border ${themeBorder} p-6 ${themeSurfaceElevated} space-y-2`}>
                  <div className="flex items-baseline justify-between">
                    <span className={`text-xs uppercase tracking-[0.12em] ${themeAccent} font-semibold`}>
                      Nota 10 / 10 TuristInfo.ro
                    </span>
                    <span className={`text-xs ${themeTextMuted}`}>Oaspeți Verificați</span>
                  </div>
                  <p className={`font-chalet text-base ${themeText} italic leading-snug`}>
                    „O pensiune primitoare și curată, într-o zonă liniștită din Moisei. Ciubărul încălzit a făcut toți banii!”
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ─── Footer Simplu & Curat ─── */}
      <footer className={`border-t ${themeBorder} px-4 sm:px-8 py-5 text-xs ${themeTextMuted} transition-colors duration-300`}>
        <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Pensiunea Simi · Str. Izvorul Negru 257B, Moisei, Maramureș</span>

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
