// Filled gradient icons for the five services (same order as data/services.js) and the wallet art.
const PATHS = [
  <>
    <path d="M12 2c3 2 5 5.5 5 9.5 0 1.7-.4 3.3-1.2 4.8H8.2C7.4 14.8 7 13.2 7 11.5 7 7.5 9 4 12 2z" />
    <path d="M7.5 14 4 17.5l3.5-.5zM16.5 14l3.5 3.5-3.5-.5zM10 18h4l-2 4z" />
    <circle cx="12" cy="10" r="2" fill="#fff" />
  </>,
  <>
    <path d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    <text x="12" y="13" fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle">+1</text>
  </>,
  <>
    <rect x="5" y="5" width="14" height="14" rx="3" />
    <path d="M8.5 2h2v3h-2zM13.5 2h2v3h-2zM8.5 19h2v3h-2zM13.5 19h2v3h-2zM2 8.5h3v2H2zM2 13.5h3v2H2zM19 8.5h3v2h-3zM19 13.5h3v2h-3z" />
    <text x="12" y="14" fontSize="5.5" fontWeight="800" fill="#fff" textAnchor="middle">eSIM</text>
  </>,
  <>
    <rect x="3" y="10" width="18" height="11" rx="2" />
    <rect x="2" y="6.5" width="20" height="4.5" rx="1.5" />
    <rect x="11" y="6.5" width="2" height="14.5" fill="#fff" />
    <path d="M12 6.5C9 6.5 7.5 5 8 3.8S11 3.3 12 6.5zM12 6.5c3 0 4.5-1.5 4-2.7S13 3.3 12 6.5z" />
  </>,
  <>
    <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" />
    <rect x="9" y="11" width="6" height="5" rx="1" fill="#fff" />
    <path d="M10 11V9.5a2 2 0 0 1 4 0V11" fill="none" stroke="#fff" strokeWidth="1.5" />
  </>,
];

export const SvcIcon = ({ n, size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="url(#ug)" aria-hidden="true">{PATHS[n]}</svg>
);

export const WalletArt = () => (
  <svg className="u-wart" viewBox="0 0 170 130" aria-hidden="true">
    <ellipse cx="88" cy="84" rx="78" ry="24" transform="rotate(-16 88 84)" fill="none" stroke="rgba(170,140,255,.55)" strokeWidth="5" />
    <g transform="rotate(-12 85 62)">
      <rect x="40" y="26" width="90" height="72" rx="16" fill="url(#wg)" />
      <rect x="92" y="52" width="42" height="22" rx="11" fill="#5a2fe0" />
      <circle cx="106" cy="63" r="4.5" fill="#d9ceff" />
    </g>
  </svg>
);
