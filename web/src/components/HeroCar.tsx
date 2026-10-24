export default function HeroCar() {
  return (
    <svg
      className="heroCar"
      viewBox="0 0 960 540"
      role="img"
      aria-label="Mini Adventure smart toy car racing across a sunlit track"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7EC8E3" />
          <stop offset="55%" stopColor="#C9E8F2" />
          <stop offset="100%" stopColor="#EDE6D9" />
        </linearGradient>
        <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0A7EA4" />
          <stop offset="100%" stopColor="#086484" />
        </linearGradient>
        <linearGradient id="asphalt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A4650" />
          <stop offset="100%" stopColor="#2A333B" />
        </linearGradient>
        <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodOpacity="0.28" />
        </filter>
      </defs>

      <rect width="960" height="540" fill="url(#sky)" />

      {/* Distant hills */}
      <path
        d="M0 310 C120 270 200 290 320 250 C420 220 500 260 620 240 C740 220 820 250 960 230 L960 360 L0 360 Z"
        fill="#9BC9A8"
        opacity="0.55"
      />
      <path
        d="M0 340 C180 300 280 330 420 300 C560 270 680 310 960 280 L960 380 L0 380 Z"
        fill="#7FB58E"
        opacity="0.45"
      />

      {/* Track */}
      <path
        d="M-40 420 C200 360 360 390 520 370 C700 345 820 380 1000 350 L1000 560 L-40 560 Z"
        fill="url(#asphalt)"
      />
      <path
        className="laneDash"
        d="M40 470 C220 420 380 445 540 425 C720 400 840 435 980 410"
        fill="none"
        stroke="#F4D35E"
        strokeWidth="10"
        strokeDasharray="36 28"
        strokeLinecap="butt"
      />

      {/* Car group */}
      <g className="carRide" filter="url(#soft)">
        {/* Shadow */}
        <ellipse cx="520" cy="455" rx="150" ry="18" fill="#1A2228" opacity="0.35" />

        {/* Chassis */}
        <path
          d="M340 390 C360 340 400 310 470 300 L610 300 C670 302 710 320 740 355 L760 390 C750 405 730 415 700 418 L390 418 C360 415 345 405 340 390 Z"
          fill="url(#body)"
        />
        {/* Racing stripe */}
        <path
          d="M455 305 L505 305 L490 415 L440 415 Z"
          fill="#FF5A1F"
        />
        {/* Cabin glass */}
        <path
          d="M470 308 L560 308 C590 310 610 325 618 350 L470 350 C460 330 460 315 470 308 Z"
          fill="#D8F1F8"
          opacity="0.92"
        />
        {/* Headlight */}
        <ellipse cx="735" cy="372" rx="16" ry="10" fill="#FFE8A3" />
        {/* AI sensor dome */}
        <circle cx="545" cy="298" r="14" fill="#14212B" />
        <circle cx="545" cy="298" r="7" fill="#7EE0FF" />
        {/* Wheels */}
        <g fill="#14212B">
          <circle cx="420" cy="420" r="36" />
          <circle cx="680" cy="420" r="36" />
        </g>
        <g fill="#E8EEF2">
          <circle cx="420" cy="420" r="16" />
          <circle cx="680" cy="420" r="16" />
        </g>
        {/* Spoiler */}
        <rect x="350" y="350" width="48" height="10" rx="2" fill="#0A5F7C" />
      </g>
    </svg>
  );
}
