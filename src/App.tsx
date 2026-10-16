import { useState, useEffect } from "react";

type PageId = "acasa" | "camere" | "ciubar" | "trasee" | "rezervare";
type MoodType = "morning" | "evening";

interface AlpineChapter {
  id: string;
  num: string;
  tabLabel: string;
  tabDetail: string;
  location: string;
  morningTitle: string;
  eveningTitle: string;
  morningLead: string;
  eveningLead: string;
  morningMainImg: string;
  eveningMainImg: string;
  morningDetailImg: string;
  eveningDetailImg: string;
  detailCaption: string;
}

const CHAPTERS: AlpineChapter[] = [
  {
    id: "curte",
    num: "01",
    tabLabel: "Pensiunea & Curtea",
    tabDetail: "Livadă & Vârful Pietrosul",
    location: "Moisei · La poalele Pietrosului",
    morningTitle: "Liniștea muntelui și căldura lemnului în Moisei.",
    eveningTitle: "Amurg liniștit în livadă, la lumina felinarelor.",
    morningLead: "Șapte camere luminoase cu balcon, livadă verde și aer curat la poalele Munților Rodnei.",
    eveningLead: "Seri tihnite sub cerul liber, aer răcoros de pădure și priveliște spre crestele luminate de lună.",
    morningMainImg: "https://www.turistinfo.ro/images/cazare/951496.jpg",
    eveningMainImg: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=80",
    morningDetailImg: "https://v3.turistinfo.ro/images/camere/335673.jpg",
    eveningDetailImg: "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=df59a858-ffea-4824-be91-f59c2bc25c24.jpg",
    detailCaption: "Vedere spre Pietrosul",
  },
  {
    id: "ciubar",
    num: "02",
    tabLabel: "Ciubărul cu Apă Caldă",
    tabDetail: "39°C · Sub cerul liber",
    location: "Răsfăț termic · Orice anotimp",
    morningTitle: "Apă caldă și abur proaspăt în roua dimineții.",
    eveningTitle: "Ciubăr fierbinte la 39°C sub bolta plină de stele.",
    morningLead: "Ciubăr din lemn masiv de molid, pregătit de dimineață pentru relaxare completă în aer de munte.",
    eveningLead: "Senzația apei fierbinți în contrast cu aerul răcoros al nopții. Lemnul cald și liniștea deplină a satului.",
    morningMainImg: "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=df59a858-ffea-4824-be91-f59c2bc25c24.jpg",
    eveningMainImg: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    morningDetailImg: "https://www.turistinfo.ro/images/cazare/951496.jpg",
    eveningDetailImg: "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=df59a858-ffea-4824-be91-f59c2bc25c24.jpg",
    detailCaption: "39°C la lemn masiv",
  },
  {
    id: "camere",
    num: "03",
    tabLabel: "Cele 7 Camere",
    tabDetail: "Balcon privat & Baie proprie",
    location: "Curățenie exemplară 10/10",
    morningTitle: "Trezire lină cu soarele peste crestele Rodnei.",
    eveningTitle: "Odihnă profundă în așternuturi albe și aer curat.",
    morningLead: "Deschide ușile balconului spre munte, respiră mirosul de brad și savurează cafeaua în liniște.",
    eveningLead: "Paturi matrimoniale generoase, băi proprii impecabile și căldura reconfortantă a lemnului.",
    morningMainImg: "https://v3.turistinfo.ro/images/camere/335673.jpg",
    eveningMainImg: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
    morningDetailImg: "https://res.klook.com/klook-hotel/image/upload/w_1200,c_fill,q_90/trip/22020r000000h4v18DF64_R_550_412_R5.jpg",
    eveningDetailImg: "https://v3.turistinfo.ro/images/camere/335673.jpg",
    detailCaption: "Balcon spre munte",
  },
  {
    id: "foisor",
    num: "04",
    tabLabel: "Foișor & Foc de Lemne",
    tabDetail: "Grătar · Cuptor · Ceaun",
    location: "Bucătărie utilată & Foișor mare",
    morningTitle: "Mic dejun tihnit și cafea la foișorul din livadă.",
    eveningTitle: "Foc de lemne, bucate la ceaun și cuptor încins.",
    morningLead: "Foișor spațios din bârne de lemn, cuptor de pizza, grătar de piatră și masă mare de familie.",
    eveningLead: "Jarul încins, poveștile între prieteni și gustul autentic al bucatelor pregătite la foc deschis.",
    morningMainImg: "https://a0.muscache.com/im/pictures/hosting/Hosting-34697625/original/fd98f82b-38db-4d5a-b993-9825ca007860.jpeg?im_w=1200",
    eveningMainImg: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=80",
    morningDetailImg: "https://www.turistinfo.ro/images/cazare/951496.jpg",
    eveningDetailImg: "https://a0.muscache.com/im/pictures/hosting/Hosting-34697625/original/fd98f82b-38db-4d5a-b993-9825ca007860.jpeg?im_w=1200",
    detailCaption: "Cuptor & grătar pe lemne",
  },
];

const SUITES = [
  {
    id: "dubla",
    index: "01",
    name: "Cameră Dublă Matrimonială",
    capacity: "2 Oaspeți · 16 m²",
    count: "6 Camere în Pensiune",
    spec: "Pat matrimonial comod, baie proprie cu duș, balcon privat spre munte, TV și Wi-Fi.",
    primaryImg: "https://v3.turistinfo.ro/images/camere/335673.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "tripla",
    index: "02",
    name: "Cameră Triplă de Familie",
    capacity: "3 Oaspeți · 24 m²",
    count: "1 Cameră în Pensiune",
    spec: "Pat dublu + pat single, balcon panoramic spre Pietrosul Rodnei, baie proprie mare.",
    primaryImg: "https://res.klook.com/klook-hotel/image/upload/w_1200,c_fill,q_90/trip/22020r000000h4v18DF64_R_550_412_R5.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "integral",
    index: "03",
    name: "Închiriere Integrală",
    capacity: "Până la 15 Oaspeți",
    count: "Toate cele 7 Camere",
    spec: "Acces exclusiv la 7 băi, living mare, sală de mese, curte verde, foișor și ciubăr.",
    primaryImg: "https://www.turistinfo.ro/images/cazare/951496.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
  },
];

const TRAILS = [
  {
    id: "pietrosul",
    num: "01",
    name: "Vârful Pietrosul Rodnei",
    elevation: "2.303 m · Cel mai înalt vârf",
    distance: "Direct la poalele masivului",
    bearing: 195,
    direction: "195° S-SV",
    desc: "Vizibil de pe balcon. Traseu marcat sau tură montană ghidată.",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "manastirea",
    num: "02",
    name: "Mănăstirea Moisei",
    elevation: "Monumentul Martirilor Vida Gheza",
    distance: "2 km · 3 min cu mașina",
    bearing: 155,
    direction: "155° S-SE",
    desc: "Biserică istorică din lemn din sec. XVII, pe drumul Izvorul Negru.",
    img: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mocanita",
    num: "03",
    name: "Mocănița Valea Vaserului",
    elevation: "Ultimul tren cu abur activ",
    distance: "13 km · 15 min (Vișeu de Sus)",
    bearing: 320,
    direction: "320° N-NV",
    desc: "Plecarea de dimineață a trenului cu abur prin defileul sălbatic.",
    img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "borsa",
    num: "04",
    name: "Cascada Cailor & Telegondola",
    elevation: "Cea mai înaltă cădere de apă (90 m)",
    distance: "14 km · 16 min (Stațiunea Borșa)",
    bearing: 110,
    direction: "110° E-SE",
    desc: "Traseu accesibil cu telegondola și pârtia olimpică din Borșa.",
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
  const [activeChapter, setActiveChapter] = useState(0);
  const [mood, setMood] = useState<MoodType>("morning");
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

  const chapter = CHAPTERS[activeChapter];
  const trail = TRAILS[selectedTrail];

  const currentMainPhoto =
    mood === "morning" ? chapter.morningMainImg : chapter.eveningMainImg;
  const currentDetailPhoto =
    mood === "morning" ? chapter.morningDetailImg : chapter.eveningDetailImg;
  const currentTitle =
    mood === "morning" ? chapter.morningTitle : chapter.eveningTitle;
  const currentLead =
    mood === "morning" ? chapter.morningLead : chapter.eveningLead;

  const whatsappMessage = `Bună ziua! Doresc disponibilitate la Pensiunea Simi Moisei pentru: ${bookRoom}, perioadă: ${bookPeriod}${
    bookExtras.length > 0 ? `, opțiuni: ${bookExtras.join(", ")}` : ""
  }. Vă mulțumesc!`;

  const whatsappUrl = `https://wa.me/40740981839?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF6EE] text-[#1A1614]">
      {/* ─── Top Architectural Bar ─── */}
      <header className="sticky top-0 z-50 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#1A1614]/12 px-4 sm:px-8 py-3.5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("acasa")}
            className="text-left cursor-pointer group flex items-baseline gap-3"
          >
            <span className="font-chalet text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1614]">
              Pensiunea Simi
            </span>
            <span className="hidden sm:inline text-[11px] uppercase tracking-[0.14em] text-[#6B635B]">
              Moisei · Maramureș
            </span>
          </button>

          {/* Desktop Nav: Editorial Links */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-7 text-[12px] uppercase tracking-[0.14em] font-medium text-[#6B635B]">
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
              className="px-4 py-2 bg-[#231F1C] hover:bg-[#B86B32] text-[#FAF6EE] text-[12px] uppercase tracking-[0.12em] font-semibold transition-colors"
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
          className="fixed inset-x-0 top-[59px] bottom-0 z-40 md:hidden bg-[#FAF6EE] text-[#1A1614] px-6 py-8 flex flex-col justify-between overflow-y-auto border-t border-[#1A1614]/12"
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
                    className={`font-chalet text-3xl ${
                      isActive ? "text-[#B86B32] font-semibold" : "text-[#1A1614]"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="text-xs uppercase tracking-[0.14em] text-[#B86B32]">
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
                className="py-3.5 bg-[#231F1C] text-[#FAF6EE] text-xs font-semibold text-center uppercase tracking-[0.12em]"
              >
                Sună direct
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 border border-[#1A1614] text-[#1A1614] text-xs font-semibold text-center uppercase tracking-[0.12em]"
              >
                WhatsApp
              </a>
            </div>
            <p className="text-[11px] text-[#6B635B] text-center">
              Str. Izvorul Negru 257B, Moisei · Tichete de vacanță
            </p>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col">
        {/* =========================================================
            PAGE 1: ACASĂ — Award-Winning Cozy Alpine Editorial Montage
           ========================================================= */}
        {page === "acasa" && (
          <section className="flex-1 flex flex-col px-3 sm:px-6 pt-3 pb-3 sm:pb-5 max-w-[1440px] w-full mx-auto h-[calc(100svh-65px)]">
            <div className="relative flex-1 w-full overflow-hidden bg-[#1F1B18] text-[#FAF6EE] flex flex-col justify-between shadow-[0_24px_55px_-18px_rgba(27,21,16,0.5)]">
              {/* Stacked Atmospheric Photography with Warm Glaze */}
              <div className="photo-crossfade absolute inset-0 w-full h-full">
                <ResilientPhoto
                  src={currentMainPhoto}
                  fallback="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
                  alt={currentTitle}
                  className="w-full h-full object-cover opacity-85"
                />
              </div>

              {/* Alpine Twilight & Fireside Glaze Scrim (Warm, never sterile or pitch-black) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(31,27,24,0.58) 0%, rgba(31,27,24,0.18) 35%, rgba(31,27,24,0.68) 75%, rgba(26,22,19,0.94) 100%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  background:
                    "radial-gradient(ellipse at 25% 45%, rgba(196,130,63,0.3) 0%, transparent 65%)",
                }}
              />

              {/* Tier A: Warm Top Telemetry & Atmosphere Bar */}
              <div className="relative z-10 border-b border-[#FAF6EE]/16 px-4 sm:px-8 py-2.5 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#FAF6EE]/85">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#E08238]" />
                  <span>Moisei · La poalele Pietrosului Rodnei</span>
                </div>
                <span className="hidden sm:inline font-medium text-[#E08238]">
                  {chapter.location}
                </span>
                <button
                  type="button"
                  onClick={() => navigate("rezervare")}
                  className="hover:text-[#FAF6EE] cursor-pointer flex items-center gap-1.5 text-[#FAF6EE]/90"
                >
                  <span className="text-[#E08238]">★</span>
                  <span>10 / 10 TuristInfo · Rezervă</span>
                </button>
              </div>

              {/* Tier B: The Warm 7:5 Editorial Split with Polaroid Montage */}
              <div className="relative z-10 px-5 sm:px-12 my-auto max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left 7 Columns: Evocative Storytelling & Direct Booking */}
                <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
                  {/* Mountain Mood Switcher: Dimineață la Munte / Seară la Ciubăr */}
                  <div className="inline-flex p-1 bg-[#1F1B18]/80 border border-[#FAF6EE]/20 backdrop-blur-md">
                    <button
                      type="button"
                      onClick={() => setMood("morning")}
                      className={`px-3 sm:px-4 py-1 text-xs font-semibold transition-all cursor-pointer ${
                        mood === "morning"
                          ? "bg-[#FAF6EE] text-[#1A1614]"
                          : "text-[#FAF6EE]/75 hover:text-[#FAF6EE]"
                      }`}
                    >
                      ☀️ Dimineață la Munte
                    </button>
                    <button
                      type="button"
                      onClick={() => setMood("evening")}
                      className={`px-3 sm:px-4 py-1 text-xs font-semibold transition-all cursor-pointer ${
                        mood === "evening"
                          ? "bg-[#B86B32] text-[#FAF6EE]"
                          : "text-[#FAF6EE]/75 hover:text-[#FAF6EE]"
                      }`}
                    >
                      🔥 Seară la Ciubăr (39°C)
                    </button>
                  </div>

                  <h1 className="font-chalet text-3xl sm:text-5xl lg:text-[54px] font-normal text-[#FAF6EE] leading-[1.07] tracking-tight">
                    {currentTitle}
                  </h1>

                  <p className="text-xs sm:text-base text-[#FAF6EE]/85 max-w-xl leading-relaxed font-ui">
                    {currentLead}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href="tel:+40740981839"
                      className="px-6 py-3.5 bg-[#B86B32] hover:bg-[#D4803E] text-[#FAF6EE] text-xs uppercase tracking-[0.12em] font-semibold transition-colors shadow-lg"
                    >
                      Sună gazda: 0740 981 839
                    </a>
                    <button
                      type="button"
                      onClick={() => navigate("rezervare")}
                      className="px-6 py-3.5 border border-[#FAF6EE]/35 bg-[#FAF6EE]/10 hover:bg-[#FAF6EE]/20 backdrop-blur-md text-[#FAF6EE] text-xs uppercase tracking-[0.12em] font-semibold transition-colors cursor-pointer"
                    >
                      Rezervă pe WhatsApp
                    </button>
                  </div>

                  {/* Micro-warmth indicator */}
                  <div className="pt-1 flex items-center gap-4 text-[11px] text-[#FAF6EE]/75">
                    <span>♨ Ciubăr la 39°C</span>
                    <span>·</span>
                    <span>Foișor cu cuptor</span>
                    <span>·</span>
                    <span>Fără comision</span>
                  </div>
                </div>

                {/* Right 5 Columns (Desktop Only): Layered Tactile Polaroid Montage */}
                <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-center items-end">
                  {/* Framed Architectural Crop */}
                  <div className="relative w-80 h-96 overflow-hidden border border-[#FAF6EE]/25 bg-[#28231F] shadow-2xl">
                    <ResilientPhoto
                      src={currentMainPhoto}
                      fallback="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                      alt="Pensiunea Simi Moisei"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#1F1B18]/85 text-[#FAF6EE] px-3 py-1 text-[10px] uppercase tracking-[0.14em] font-semibold border border-[#FAF6EE]/15">
                      ★ 10 / 10 TuristInfo
                    </div>
                  </div>

                  {/* Overlapping Analog Polaroid (Tactile Detail Inset) */}
                  <div className="absolute -bottom-6 -left-6 w-56 p-2.5 bg-[#FAF6EE] text-[#1A1614] polaroid-shadow rotate-[-3deg] border border-[#1A1614]/15">
                    <div className="h-32 w-full overflow-hidden bg-[#231F1C]">
                      <ResilientPhoto
                        src={currentDetailPhoto}
                        fallback="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
                        alt="Detaliu Pensiunea Simi"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-chalet text-xs italic text-[#1A1614]">
                        {chapter.detailCaption}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[#B86B32] font-semibold">
                        Moisei
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tier C: Bottom 4-Column Interactive Chapter Ribbon */}
              <div className="relative z-10 border-t border-[#FAF6EE]/16 bg-[#161311]/70 backdrop-blur-md grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#FAF6EE]/12">
                {CHAPTERS.map((c, idx) => {
                  const isActive = idx === activeChapter;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onMouseEnter={() => setActiveChapter(idx)}
                      onClick={() => setActiveChapter(idx)}
                      className={`p-3 sm:p-4 text-left transition-colors cursor-pointer ${
                        isActive ? "bg-[#FAF6EE]/14" : "hover:bg-[#FAF6EE]/6"
                      }`}
                    >
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] uppercase tracking-[0.14em] text-[#E08238] font-semibold">
                          {c.num}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rotate-45 bg-[#E08238]" />
                        )}
                      </div>
                      <span className="font-chalet text-base sm:text-xl text-[#FAF6EE] block mt-0.5 leading-snug">
                        {c.tabLabel}
                      </span>
                      <span className="text-[11px] text-[#FAF6EE]/65 block mt-0.5 truncate">
                        {c.tabDetail}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            PAGE 2: CAMERE — 3-Column Architectural Suite Showcase
           ========================================================= */}
        {page === "camere" && (
          <section className="px-4 sm:px-8 py-10 max-w-[1400px] w-full mx-auto space-y-10">
            <div className="border-b border-[#1A1614]/12 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#B86B32] font-semibold">
                  Cazare · Moisei · 7 Camere
                </span>
                <h1 className="font-chalet text-3xl sm:text-5xl font-normal text-[#1A1614] mt-1">
                  Camere cu balcon spre Munții Rodnei
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-[#6B635B]">
                Check-in 13:00 · Check-out 12:00 · Tichete de vacanță
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {SUITES.map((suite) => (
                <div
                  key={suite.id}
                  className="border border-[#1A1614]/15 bg-[#FAF6EE] flex flex-col justify-between"
                >
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-[#231F1C]">
                    <ResilientPhoto
                      src={suite.primaryImg}
                      fallback={suite.fallbackImg}
                      alt={suite.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#1A1614]/85 text-[#FAF6EE] px-3 py-1 text-[11px] uppercase tracking-[0.12em] font-medium">
                      {suite.index} · {suite.count}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#FAF6EE] text-[#1A1614] px-3 py-1 text-[11px] uppercase tracking-[0.12em] font-semibold">
                      {suite.capacity}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h2 className="font-chalet text-2xl font-normal text-[#1A1614]">
                      {suite.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B635B] leading-relaxed">
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

            <div className="border-t border-[#1A1614]/12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B635B]">
              <span>Toate camerele au baie proprie, balcon și vedere spre masiv.</span>
              <a href="tel:+40740981839" className="font-semibold text-[#1A1614] underline">
                Întrebări sau rezervare directă: 0740 981 839
              </a>
            </div>
          </section>
        )}

        {/* =========================================================
            PAGE 3: CIUBĂR & CURTE — Asymmetric Day/Night Spread
           ========================================================= */}
        {page === "ciubar" && (
          <section className="px-4 sm:px-8 py-10 max-w-[1400px] w-full mx-auto space-y-10">
            <div className="border-b border-[#1A1614]/12 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#B86B32] font-semibold">
                  Exterior &amp; Bucate
                </span>
                <h1 className="font-chalet text-3xl sm:text-5xl font-normal text-[#1A1614] mt-1">
                  {mood === "evening" ? "Seara la ciubăr sub stele" : "Ziua în livadă și foișor"}
                </h1>
              </div>

              {/* Day / Night Switcher */}
              <div className="inline-flex border border-[#1A1614]/20">
                <button
                  type="button"
                  onClick={() => setMood("morning")}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.12em] font-semibold transition-colors cursor-pointer ${
                    mood === "morning" ? "bg-[#231F1C] text-[#FAF6EE]" : "text-[#1A1614]"
                  }`}
                >
                  Ziua în Livadă
                </button>
                <button
                  type="button"
                  onClick={() => setMood("evening")}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.12em] font-semibold transition-colors cursor-pointer ${
                    mood === "evening" ? "bg-[#B86B32] text-[#FAF6EE]" : "text-[#1A1614]"
                  }`}
                >
                  Seara la Ciubăr (39°C)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 relative h-96 sm:h-[480px] overflow-hidden bg-[#231F1C]">
                <ResilientPhoto
                  src={
                    mood === "evening"
                      ? "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=df59a858-ffea-4824-be91-f59c2bc25c24.jpg"
                      : "https://a0.muscache.com/im/pictures/hosting/Hosting-34697625/original/fd98f82b-38db-4d5a-b993-9825ca007860.jpeg?im_w=1200"
                  }
                  fallback="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
                  alt="Ciubar si Curte Pensiunea Simi"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div className="border border-[#1A1614]/15 p-6 bg-[#FAF6EE] space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[#B86B32] font-semibold block">
                    01 · Ciubăr din Lemn Masiv
                  </span>
                  <h3 className="font-chalet text-xl text-[#1A1614]">
                    Apă caldă la 39°C pentru 6–8 persoane
                  </h3>
                  <p className="text-xs text-[#6B635B]">
                    Cadă rustică cu hidromasaj, amplasată în aer liber cu vedere spre creasta Rodnei.
                  </p>
                </div>

                <div className="border border-[#1A1614]/15 p-6 bg-[#FAF6EE] space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[#B86B32] font-semibold block">
                    02 · Foișor cu Grătar &amp; Cuptor
                  </span>
                  <h3 className="font-chalet text-xl text-[#1A1614]">
                    Zonă acoperită de gătit în aer liber
                  </h3>
                  <p className="text-xs text-[#6B635B]">
                    Dotat cu grătar mare, ceaun tradițional și cuptor pe lemne pentru pizza.
                  </p>
                </div>

                <div className="border border-[#1A1614]/15 p-6 bg-[#FAF6EE] space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[#B86B32] font-semibold block">
                    03 · Livadă cu Hamace
                  </span>
                  <h3 className="font-chalet text-xl text-[#1A1614]">
                    Curte verde, terasă la soare și spațiu de joacă
                  </h3>
                  <p className="text-xs text-[#6B635B]">
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
          <section className="px-4 sm:px-8 py-10 max-w-[1400px] w-full mx-auto space-y-10">
            <div className="border-b border-[#1A1614]/12 pb-6">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#B86B32] font-semibold">
                Busola Munților Rodnei · Plecare din Moisei (620 m)
              </span>
              <h1 className="font-chalet text-3xl sm:text-5xl font-normal text-[#1A1614] mt-1">
                Atracții și trasee în apropiere
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left: Interactive Compass Instrument */}
              <div className="lg:col-span-5 bg-[#231F1C] text-[#FAF6EE] p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="flex items-center justify-between text-xs text-[#E08238] uppercase tracking-[0.12em]">
                  <span>47.6556° N, 24.5401° E</span>
                  <span>{trail.direction}</span>
                </div>

                {/* Rotating Compass SVG with Warm Copper Styling */}
                <div className="relative w-52 h-52 mx-auto flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                    <circle cx="100" cy="100" r="90" stroke="rgba(250,246,238,0.2)" strokeWidth="1.5" fill="none" />
                    <circle cx="100" cy="100" r="65" stroke="rgba(224,130,56,0.3)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                    <text x="96" y="24" fill="#E08238" fontSize="10" fontWeight="600">N</text>
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
                      <polygon points="100,26 106,100 94,100" fill="#E08238" />
                      <polygon points="100,174 106,100 94,100" fill="rgba(250,246,238,0.3)" />
                      <circle cx="100" cy="100" r="5" fill="#FAF6EE" />
                    </g>
                  </svg>
                </div>

                <div className="space-y-1.5 border-t border-[#FAF6EE]/15 pt-4">
                  <span className="text-[11px] font-semibold text-[#E08238] uppercase tracking-[0.12em] block">
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
                          ? "border-[#B86B32] bg-[#231F1C] text-[#FAF6EE]"
                          : "border-[#1A1614]/15 bg-[#FAF6EE] text-[#1A1614] hover:bg-[#F4EDE2]"
                      }`}
                    >
                      <div className="relative h-36 w-full overflow-hidden bg-[#231F1C]">
                        <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                        <span className="absolute top-2 right-2 bg-[#1F1B18]/85 text-[#FAF6EE] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]">
                          {t.direction}
                        </span>
                      </div>
                      <div className="pt-3 space-y-1">
                        <span className={`text-[11px] uppercase tracking-[0.12em] font-semibold ${isSelected ? "text-[#E08238]" : "text-[#B86B32]"}`}>
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
          <section className="px-4 sm:px-8 py-10 max-w-[1400px] w-full mx-auto space-y-10">
            <div className="border-b border-[#1A1614]/12 pb-6">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#B86B32] font-semibold">
                Rezervare Directă · Fără Comisioane
              </span>
              <h1 className="font-chalet text-3xl sm:text-5xl font-normal text-[#1A1614] mt-1">
                Configurează cererea pe WhatsApp
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: 3-Tap Selector */}
              <div className="lg:col-span-7 bg-[#231F1C] text-[#FAF6EE] p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.12em] text-[#FAF6EE]/75 block font-semibold">
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
                            ? "bg-[#B86B32] border-[#E08238] text-[#FAF6EE] font-semibold"
                            : "border-[#FAF6EE]/15 text-[#FAF6EE]/80 hover:bg-[#2C2723]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.12em] text-[#FAF6EE]/75 block font-semibold">
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
                            ? "bg-[#B86B32] border-[#E08238] text-[#FAF6EE] font-semibold"
                            : "border-[#FAF6EE]/15 text-[#FAF6EE]/80 hover:bg-[#2C2723]"
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.12em] text-[#FAF6EE]/75 block font-semibold">
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
                          {active ? "✓ " : "+ "}
                          {extra}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border border-[#FAF6EE]/15 p-4 bg-[#2C2723] space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#E08238] block">
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
                    className="py-3.5 px-4 bg-[#B86B32] hover:bg-[#D4803E] text-[#FAF6EE] text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors"
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
                <div className="border border-[#1A1614]/15 p-6 bg-[#FAF6EE] space-y-4">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[#B86B32] font-semibold block">
                    Adresă &amp; Contact
                  </span>
                  <h2 className="font-chalet text-2xl text-[#1A1614]">
                    Str. Izvorul Negru nr. 257B, Moisei, Maramureș
                  </h2>
                  <div className="space-y-1.5 text-xs text-[#6B635B] pt-2 border-t border-[#1A1614]/10">
                    <p>Telefon: <strong className="text-[#1A1614]">+40 740 981 839</strong></p>
                    <p>Check-in: 13:00–15:00 · Check-out: până la 12:00</p>
                    <p>Carduri de vacanță: Pluxee, Up, Edenred</p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Pensiunea+Simi+Moisei+Maramures+257B"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 border border-[#1A1614] text-[#1A1614] text-xs uppercase tracking-[0.12em] font-semibold text-center hover:bg-[#231F1C] hover:text-[#FAF6EE] transition-colors"
                  >
                    Deschide în Google Maps →
                  </a>
                </div>

                <div className="border border-[#1A1614]/15 p-6 bg-[#FAF6EE] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-[#B86B32] font-semibold">
                      Nota 10 / 10 TuristInfo.ro
                    </span>
                    <span className="font-chalet text-xl text-[#1A1614]">Verificat</span>
                  </div>
                  <p className="font-chalet text-lg text-[#1A1614] italic leading-snug">
                    „Camere impecabil de curate, ciubărul și foișorul au fost un mare plus, iar priveliștea spre Pietrosul Rodnei îți taie răsuflarea.”
                  </p>
                  <span className="text-[11px] text-[#6B635B] block">
                    — Bumbas Costin &amp; Maria, oaspeți verificați
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ─── Architectural Footer ─── */}
      <footer className="border-t border-[#1A1614]/12 px-4 sm:px-8 py-5 text-xs text-[#6B635B]">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
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
