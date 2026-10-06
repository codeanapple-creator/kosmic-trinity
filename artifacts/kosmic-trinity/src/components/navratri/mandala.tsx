export function Mandala({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 9 });
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true" focusable="false">
      <g style={{ transformOrigin: "center", animation: "cosmic-spin 120s linear infinite" }} fill="none" stroke="#C9A84C" strokeWidth="0.6">
        {petals.map((_, i) => (
          <g key={i} transform={`rotate(${i * 40})`}>
            <path d="M0 -30 C 14 -55, 14 -78, 0 -92 C -14 -78, -14 -55, 0 -30 Z" opacity="0.75" />
            <circle cx="0" cy="-96" r="2" fill="#E8C96B" stroke="none" />
          </g>
        ))}
        <circle r="26" opacity="0.6" />
        <circle r="18" opacity="0.4" />
      </g>
      <g style={{ transformOrigin: "center", animation: "cosmic-spin-reverse 80s linear infinite" }} fill="none" stroke="#C47E8E" strokeWidth="0.5" opacity="0.7">
        {petals.map((_, i) => (
          <line key={i} x1="0" y1="-12" x2="0" y2="-26" transform={`rotate(${i * 40 + 20})`} />
        ))}
      </g>
      <circle r="3" fill="#E8C96B" />
    </svg>
  );
}
