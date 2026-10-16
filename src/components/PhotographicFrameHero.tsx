import React, { useState, useEffect, useRef } from "react";

type PageId = "acasa" | "camere" | "ciubar" | "trasee" | "rezervare";

export interface HeroChapter {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  tagline: string;
  altitude: string;
  photo: string;
  fallback: string;
  caption: string;
}

export const HERO_CHAPTERS: HeroChapter[] = [
  {
    id: "pensiunea",
    num: "I",
    title: "Pensiunea & Livada",
    subtitle: "Arhitectură tradițională din bârne de lemn la poalele Munților Rodnei",
    tagline: "Construcție Autentică",
    altitude: "Moisei · 650 m",
    photo: "https://www.turistinfo.ro/images/cazare/951496.jpg",
    fallback: "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=7018057c-1ce8-41d7-a607-7bfd742e7975.jpg",
    caption: "Cerdac din lemn sculptat, livadă verde și perspectivă directă spre creasta Pietrosului.",
  },
  {
    id: "ciubar",
    num: "II",
    title: "Ciubărul Cald la 39°C",
    subtitle: "Cadă din molid încălzită la foc de lemne sub cerul deschis din Moisei",
    tagline: "Foc de Lemne",
    altitude: "Curte Exterioară · 39°C",
    photo: "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=df59a858-ffea-4824-be91-f59c2bc25c24.jpg",
    fallback: "https://www.turistinfo.ro/images/cazare/951496.jpg",
    caption: "Relaxare în apă fierbinte de munte, pregătită pentru seri liniștite în toate anotimpurile.",
  },
  {
    id: "camere",
    num: "III",
    title: "Camerele cu Balcon",
    subtitle: "Șapte spații cu băi private, lemn primitor și liniște deplină",
    tagline: "7 Camere Masiv",
    altitude: "Corp Cazare · Etaje 1 & 2",
    photo: "https://v3.turistinfo.ro/images/camere/335673.jpg",
    fallback: "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=7018057c-1ce8-41d7-a607-7bfd742e7975.jpg",
    caption: "Paturi matrimoniale confortabile, lambriuri din brad și balcoane orientate spre masiv.",
  },
  {
    id: "foisor",
    num: "IV",
    title: "Foișorul & Vatra",
    subtitle: "Grătar de piatră, ceaun și terasă acoperită pentru bucate alese",
    tagline: "Bucătărie & Grătar",
    altitude: "Zonă Foișor & Livadă",
    photo: "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=7018057c-1ce8-41d7-a607-7bfd742e7975.jpg",
    fallback: "https://img.directbooking.ro/getimage.ashx?w=1200&h=900&file=df59a858-ffea-4824-be91-f59c2bc25c24.jpg",
    caption: "Foișor spațios din bârne rotunde, cuptor pe lemne și masă generoasă pentru familii.",
  },
];

interface PhotographicFrameHeroProps {
  isNight: boolean;
  onNavigate: (page: PageId) => void;
}

/**
 * PhotographicFrameHero (Option 2 — Eriro / Forestis Style)
 * Full-viewport alpine photographic frame featuring verified authentic photography,
 * fine architectural hairline telemetry, and a docked 4-chapter interactive switcher.
 */
export const PhotographicFrameHero: React.FC<PhotographicFrameHeroProps> = ({
  isNight,
  onNavigate,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeChapter = HERO_CHAPTERS[activeIdx];

  // Auto-advance chapters slowly (7.5s), pausing on user hover
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_CHAPTERS.length);
    }, 7500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <div
      className="relative w-full h-[calc(100svh-65px)] min-h-[580px] max-h-[960px] overflow-hidden bg-[#141210] select-none flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ─── Background Layer: Cross-Fading Authentic Photographs ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_CHAPTERS.map((ch, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={ch.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={ch.photo}
                alt={ch.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== ch.fallback) {
                    target.src = ch.fallback;
                  }
                }}
                className={`w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-out ${
                  isActive ? "scale-100" : "scale-105"
                }`}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
          );
        })}

        {/* Cinematic Atmospheric Dark Veil (Guarantees AAA Text Legibility in all conditions) */}
        <div
          className={`absolute inset-0 z-20 transition-colors duration-500 ${
            isNight
              ? "bg-gradient-to-t from-[#0E0C0B]/95 via-[#0E0C0B]/60 to-[#0E0C0B]/35"
              : "bg-gradient-to-t from-[#141210]/92 via-[#141210]/50 to-[#141210]/20"
          }`}
        />

        {/* Hairline Architectural Frame Borders (Alpine Atelier Grid) */}
        <div className="absolute inset-2 sm:inset-4 border border-[#FAF6EE]/15 z-20 pointer-events-none" />
      </div>

      {/* ─── Top Telemetry Bar (Coordinates · Altitude · Trust Rating) ─── */}
      <header className="relative z-30 px-5 sm:px-8 py-3.5 border-b border-[#FAF6EE]/15 backdrop-blur-xs bg-[#141210]/40 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] text-[#FAF6EE]/80">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E28C46] animate-pulse" />
          <span>47°39′20″N 24°32′24″E</span>
          <span className="hidden sm:inline text-[#FAF6EE]/40">·</span>
          <span className="hidden sm:inline">Moisei, Maramureș</span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[#FAF6EE]/70">
          <span>Valea Izvorul Negru</span>
          <span className="text-[#FAF6EE]/40">·</span>
          <span>Pietrosul Rodnei 2.303 m</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[#E28C46] font-semibold">10 / 10</span>
          <span>TuristInfo</span>
          <span className="hidden sm:inline text-[#FAF6EE]/40">·</span>
          <span className="hidden sm:inline text-[#FAF6EE]/60">Deschis tot anul</span>
        </div>
      </header>

      {/* ─── Center-Left Editorial Lockup & Actions ─── */}
      <div className="relative z-30 px-5 sm:px-8 lg:px-12 py-6 sm:py-8 max-w-4xl space-y-4">
        {/* Dynamic Chapter Tagline Badge */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#1A1614]/80 backdrop-blur-sm border border-[#FAF6EE]/15 text-[#FAF6EE] text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em]">
          <span className="text-[#E28C46] font-bold">CAP. {activeChapter.num}</span>
          <span className="text-[#FAF6EE]/30">|</span>
          <span>{activeChapter.tagline}</span>
          <span className="text-[#FAF6EE]/30">·</span>
          <span className="text-[#FAF6EE]/70">{activeChapter.altitude}</span>
        </div>

        {/* Display Headline in Fraunces */}
        <h1 className="font-chalet text-3xl sm:text-5xl lg:text-6xl text-[#FAF6EE] font-normal leading-[1.06] tracking-tight drop-shadow-sm max-w-3xl">
          Liniște, lemn masiv și ciubăr cald la poalele Munților Rodnei.
        </h1>

        {/* Dynamic Contextual Subtitle & Caption */}
        <p className="font-ui text-sm sm:text-base lg:text-lg text-[#FAF6EE]/85 max-w-2xl leading-relaxed">
          {activeChapter.caption}
        </p>

        {/* Action CTAs Row */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <a
            href="tel:+40740981839"
            className="py-3.5 px-6 bg-[#E28C46] text-[#141210] hover:bg-[#FAF6EE] text-xs uppercase tracking-[0.14em] font-semibold text-center transition-colors shadow-lg"
          >
            Sună gazda · 0740 981 839
          </a>

          <button
            type="button"
            onClick={() => onNavigate("rezervare")}
            className="py-3.5 px-6 bg-[#1A1614]/80 hover:bg-[#FAF6EE]/20 border border-[#FAF6EE]/25 text-[#FAF6EE] text-xs uppercase tracking-[0.14em] font-semibold text-center transition-colors cursor-pointer backdrop-blur-sm"
          >
            Rezervare rapidă
          </button>

          <button
            type="button"
            onClick={() => onNavigate("camere")}
            className="py-3.5 px-5 text-[#FAF6EE]/80 hover:text-[#FAF6EE] text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors cursor-pointer"
          >
            Vezi camerele →
          </button>
        </div>
      </div>

      {/* ─── Bottom Docked 4-Chapter Switcher (Eriro Alpine Bar) ─── */}
      <nav
        aria-label="Capitole experiență Pensiunea Simi"
        className="relative z-30 border-t border-[#FAF6EE]/15 bg-[#141210]/90 backdrop-blur-md grid grid-cols-2 lg:grid-cols-4"
      >
        {HERO_CHAPTERS.map((ch, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => {
                setActiveIdx(idx);
                setIsPaused(true);
              }}
              className={`text-left p-3.5 sm:p-4 transition-all relative group cursor-pointer border-r border-[#FAF6EE]/10 last:border-r-0 ${
                isActive ? "bg-[#FAF6EE]/8" : "hover:bg-[#FAF6EE]/4"
              }`}
            >
              {/* Active Hairline Progress Indicator */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 ${
                  isActive ? "bg-[#E28C46]" : "bg-transparent group-hover:bg-[#FAF6EE]/20"
                }`}
              />

              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] mb-1">
                <span className={isActive ? "text-[#E28C46] font-bold" : "text-[#FAF6EE]/50"}>
                  {ch.num}
                </span>
                <span className="text-[#FAF6EE]/40 text-[9px] sm:text-[10px]">
                  {ch.altitude.split("·")[0]}
                </span>
              </div>

              <div
                className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                  isActive ? "text-[#FAF6EE]" : "text-[#FAF6EE]/75 group-hover:text-[#FAF6EE]"
                }`}
              >
                {ch.title}
              </div>

              <div className="hidden sm:block text-[11px] text-[#FAF6EE]/50 truncate mt-0.5">
                {ch.tagline}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default PhotographicFrameHero;
