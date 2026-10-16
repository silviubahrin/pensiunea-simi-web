import React from "react";

interface VectorAlpineHeroProps {
  isNight: boolean;
  themeBorder?: string;
  themeBg?: string;
}

/**
 * VectorAlpineHero
 * 10x Claude-Style Tactile Vector Motion Stage (ZERO BITMAP)
 * Stashed component preserving the full architectural alpine lodge,
 * wildlife (cerb carpatin, acvila de munte), Valea Izvorul Negru stream,
 * campfire, steaming ciubăr, and day/night celestial transitions.
 */
export const VectorAlpineHero: React.FC<VectorAlpineHeroProps> = ({
  isNight,
  themeBorder = isNight ? "border-[#FAF6EE]/12" : "border-[#1A1614]/10",
  themeBg = isNight ? "bg-[#141210]" : "bg-[#FAF6EE]",
}) => {
  return (
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
  );
};

export default VectorAlpineHero;
