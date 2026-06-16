export function XiaroMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="14" fill="url(#mark-bg)" />
      <path
        d="M13 15.5C13 13.6 15.2 12.5 16.8 13.7L24.1 19.2L31.3 13.7C32.9 12.5 35.1 13.6 35.1 15.5V16.1C35.1 16.8 34.8 17.5 34.2 18L27.8 23.8L35.2 31.5C36.5 32.9 35.5 35.2 33.6 35.2H32.2C31.6 35.2 31 35 30.6 34.5L24 27.5L17.4 34.5C17 35 16.4 35.2 15.8 35.2H14.4C12.5 35.2 11.5 32.9 12.8 31.5L20.2 23.8L13.8 18C13.3 17.5 13 16.8 13 16.1V15.5Z"
        fill="url(#mark-x)"
      />
      <circle cx="35" cy="13" r="4" fill="#84F27A" />
      <defs>
        <linearGradient id="mark-bg" x1="4" x2="45" y1="45" y2="5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#07111F" />
          <stop offset="1" stopColor="#061B3A" />
        </linearGradient>
        <linearGradient id="mark-x" x1="12" x2="37" y1="33" y2="13" gradientUnits="userSpaceOnUse">
          <stop stopColor="#18D9FF" />
          <stop offset="0.52" stopColor="#1677FF" />
          <stop offset="1" stopColor="#84F27A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function XiaroLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <XiaroMark className={compact ? "h-9 w-9" : "h-11 w-11"} />
      <div>
        <div className="text-xl font-semibold tracking-normal text-white">Xiaro</div>
        {!compact && (
          <div className="text-xs uppercase tracking-[0.26em] text-white/45">
            Right Person. First Time.
          </div>
        )}
      </div>
    </div>
  );
}
