import React, { useState, useEffect, useRef } from "react";

interface HeroChapter {
  id: string;
  title: string;
  photo: string;
  fallback: string;
}

const HERO_CHAPTERS: HeroChapter[] = [
  {
    id: "pensiunea",
    title: "Pensiunea",
    photo: "/images/fb/1345684012508679.jpg",
    fallback: "/images/fb/100012012794052.jpg",
  },
  {
    id: "ciubar",
    title: "Ciubărul & Curtea",
    photo: "/images/fb/1345682539175493.jpg",
    fallback: "/images/fb/1345682539175493.jpg",
  },
  {
    id: "living",
    title: "Interior & Living",
    photo: "/images/fb/1345684149175332.jpg",
    fallback: "/images/fb/1345684102508670.jpg",
  },
  {
    id: "vedere",
    title: "Vedere spre Munte",
    photo: "/images/fb/100057527436258.jpg",
    fallback: "/images/fb/564574628623035.jpg",
  },
];

interface PhotographicFrameHeroProps {
  isNight: boolean;
  onNavigate?: (page: "acasa" | "camere" | "ciubar" | "trasee" | "rezervare") => void;
}

/**
 * PhotographicFrameHero
 * Ultra-concise, natural Romanian presentation.
 * Clean full-viewport frame, authentic local Facebook photos, zero text clutter.
 */
export const PhotographicFrameHero: React.FC<PhotographicFrameHeroProps> = ({
  isNight,
  onNavigate,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Slow ambient cross-fade (7s), paused on hover
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_CHAPTERS.length);
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <div
      className="relative w-full h-[calc(100svh-65px)] min-h-[520px] max-h-[880px] overflow-hidden bg-[#141210] select-none flex flex-col justify-end"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ─── Background Layer: Cross-Fading Authentic Photos ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_CHAPTERS.map((ch, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={ch.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
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

        {/* Ambient Dark Gradient for Legibility */}
        <div
          className={`absolute inset-0 z-20 transition-colors duration-500 ${
            isNight
              ? "bg-gradient-to-t from-[#0E0C0B]/95 via-[#0E0C0B]/50 to-[#0E0C0B]/20"
              : "bg-gradient-to-t from-[#141210]/90 via-[#141210]/45 to-transparent"
          }`}
        />
      </div>

      {/* ─── Ultra-Concise Hero Headline & Actions ─── */}
      <div className="relative z-30 px-5 sm:px-8 lg:px-12 pb-8 sm:pb-10 max-w-3xl space-y-3">
        <h1 className="font-chalet text-3xl sm:text-5xl lg:text-6xl text-[#FAF6EE] font-normal leading-[1.08] tracking-tight">
          Tihnă la poalele Munților Rodnei.
        </h1>

        <p className="font-ui text-base sm:text-lg text-[#FAF6EE]/85 max-w-xl leading-relaxed">
          Pensiune primitoare cu ciubăr, foișor și grătar, în inima Moiseiului.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href="https://wa.me/40740981839?text=Bună%20ziua!%20Aș%20dori%20informații%20despre%20cazare%20la%20Pensiunea%20Simi."
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors shadow-sm"
          >
            WhatsApp
          </a>

          <a
            href="tel:+40740981839"
            className="py-3 px-6 bg-[#1A1614]/80 hover:bg-[#FAF6EE]/15 border border-[#FAF6EE]/25 text-[#FAF6EE] text-xs uppercase tracking-[0.12em] font-semibold text-center transition-colors backdrop-blur-sm"
          >
            Sună
          </a>

          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate("camere")}
              className="py-3 px-4 text-[#FAF6EE]/80 hover:text-[#FAF6EE] text-xs uppercase tracking-[0.12em] font-medium text-center transition-colors cursor-pointer"
            >
              Vezi Camerele →
            </button>
          )}
        </div>
      </div>

      {/* ─── Docked Minimal 4-Chapter Switcher ─── */}
      <nav
        aria-label="Galerie foto Pensiunea Simi"
        className="relative z-30 border-t border-[#FAF6EE]/15 bg-[#141210]/90 backdrop-blur-md grid grid-cols-2 sm:grid-cols-4"
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
              className={`text-left px-4 py-3 sm:py-3.5 transition-all relative group cursor-pointer border-r border-[#FAF6EE]/10 last:border-r-0 ${
                isActive ? "bg-[#FAF6EE]/10" : "hover:bg-[#FAF6EE]/5"
              }`}
            >
              {/* Active Hairline Progress Indicator */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 ${
                  isActive ? "bg-[#E28C46]" : "bg-transparent group-hover:bg-[#FAF6EE]/20"
                }`}
              />

              <div
                className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                  isActive ? "text-[#FAF6EE]" : "text-[#FAF6EE]/65 group-hover:text-[#FAF6EE]"
                }`}
              >
                {ch.title}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default PhotographicFrameHero;
