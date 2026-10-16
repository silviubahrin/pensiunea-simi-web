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
      {/* ─── Top Architectural Bar ─── */}
      <header className="sticky top-0 z-50 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#1A1614]/10 px-4 sm:px-8 py-4">
        <div className="max-w-[1300px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("acasa")}
            className="text-left cursor-pointer group flex items-baseline gap-3"
          >
            <span className="font-chalet text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1614]">
              Pensiunea Simi
            </span>
            <span className="hidden sm:inline text-xs uppercase tracking-[0.12em] text-[#6B635B]">
              Moisei · Maramureș
            </span>
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
          className="fixed inset-x-0 top-[65px] bottom-0 z-40 md:hidden bg-[#FAF6EE] text-[#1A1614] px-6 py-8 flex flex-col justify-between overflow-y-auto border-t border-[#1A1614]/10"
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
            PAGE 1: ACASĂ — Pure Typographic Sanctuary (NO Hero Image)
           ========================================================= */}
        {page === "acasa" && (
          <section className="flex-1 flex flex-col justify-between px-4 sm:px-8 py-8 sm:py-12 max-w-[1300px] w-full mx-auto min-h-[calc(100svh-73px)]">
            {/* Top Minimal Label */}
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-[#6B635B] pb-6 border-b border-[#1A1614]/10">
              <span>Moisei · La poalele Pietrosului Rodnei</span>
              <span>Nota 10 TuristInfo · 7 Camere</span>
            </div>

            {/* Central Editorial Lockup (No background image, pure warm typography) */}
            <div className="my-auto py-8 sm:py-12 max-w-3xl space-y-6">
              <span className="text-xs uppercase tracking-[0.12em] text-[#B86B32] font-semibold block">
                Pensiunea Agroturistică Simi
              </span>

              <h1 className="font-chalet text-4xl sm:text-6xl font-normal text-[#1A1614] leading-[1.08] tracking-tight">
                Liniște și lemn cald la poalele Munților Rodnei.
              </h1>

              <p className="text-base sm:text-lg text-[#6B635B] leading-relaxed font-ui max-w-2xl">
                Șapte camere luminoase cu balcon propriu, ciubăr cu apă caldă la 39°C și foișor cu foc de lemne în Moisei, Maramureș.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="tel:+40740981839"
                  className="px-6 py-3.5 bg-[#1A1614] hover:bg-[#B86B32] text-[#FAF6EE] text-xs uppercase tracking-[0.12em] font-semibold transition-colors"
                >
                  Sună gazda: 0740 981 839
                </a>
                <button
                  type="button"
                  onClick={() => navigate("rezervare")}
                  className="px-6 py-3.5 border border-[#1A1614] hover:bg-[#1A1614] hover:text-[#FAF6EE] text-[#1A1614] text-xs uppercase tracking-[0.12em] font-semibold transition-colors cursor-pointer"
                >
                  Rezervare pe WhatsApp
                </button>
              </div>
            </div>

            {/* Bottom 3-Pillar Architectural Ledger (Concise & Pure) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#1A1614]/10">
              <div className="space-y-1.5">
                <span className="text-xs uppercase tracking-[0.12em] text-[#B86B32] font-semibold block">
                  01 · Camere
                </span>
                <h3 className="font-chalet text-xl text-[#1A1614]">
                  6 Duble &amp; 1 Triplă
                </h3>
                <p className="text-xs text-[#6B635B] leading-relaxed">
                  Băi proprii, balcoane spre masiv și paturi matrimoniale comode.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("camere")}
                  className="text-xs text-[#1A1614] hover:text-[#B86B32] font-semibold pt-1 block cursor-pointer"
                >
                  Vezi camerele →
                </button>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs uppercase tracking-[0.12em] text-[#B86B32] font-semibold block">
                  02 · Ciubăr &amp; Curte
                </span>
                <h3 className="font-chalet text-xl text-[#1A1614]">
                  Apă caldă la 39°C
                </h3>
                <p className="text-xs text-[#6B635B] leading-relaxed">
                  Ciubăr din lemn masiv, foișor cu grătar, ceaun și cuptor pe lemne.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("ciubar")}
                  className="text-xs text-[#1A1614] hover:text-[#B86B32] font-semibold pt-1 block cursor-pointer"
                >
                  Vezi curtea &amp; ciubărul →
                </button>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs uppercase tracking-[0.12em] text-[#B86B32] font-semibold block">
                  03 · Trasee &amp; Zonă
                </span>
                <h3 className="font-chalet text-xl text-[#1A1614]">
                  Pietrosul Rodnei (2.303 m)
                </h3>
                <p className="text-xs text-[#6B635B] leading-relaxed">
                  Mănăstirea Moisei la 2 km, Mocănița Vișeu la 13 km și Cascada Cailor.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("trasee")}
                  className="text-xs text-[#1A1614] hover:text-[#B86B32] font-semibold pt-1 block cursor-pointer"
                >
                  Deschide busola traseelor →
                </button>
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
