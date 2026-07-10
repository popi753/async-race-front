interface CarIconProps {
    color: string;
    className?: string;
}

export default function CarIcon({ color, className }: CarIconProps) {
    return (
        <svg viewBox="0 0 120 50" className={className} role="img" aria-label="car" style={{ color }}>
            <defs>
                <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="1" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.7" />
                </linearGradient>
            </defs>
            <path
                d="M5 35 Q5 28 12 28 L20 28 L30 16 L70 16 L82 28 L108 28 Q115 28 115 35 L115 40 Q115 42 113 42 L100 42 Q98 47 92 47 Q86 47 84 42 L36 42 Q34 47 28 47 Q22 47 20 42 L7 42 Q5 42 5 40 Z"
                fill={`url(#grad-${color.replace("#", "")})`}
                stroke="rgba(0,0,0,0.25)"
                strokeWidth="1"
            />
            <path
                d="M32 18 L40 18 L40 28 L32 28 Z M44 18 L68 18 L78 28 L44 28 Z"
                fill="rgba(180,220,255,0.55)"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="0.5"
            />
            <circle cx="28" cy="42" r="6" fill="#1a1a1a" />
            <circle cx="28" cy="42" r="3" fill="#555" />
            <circle cx="92" cy="42" r="6" fill="#1a1a1a" />
            <circle cx="92" cy="42" r="3" fill="#555" />
            <rect x="8" y="30" width="6" height="4" rx="1" fill="#ffd24a" />
            <rect x="106" y="30" width="6" height="4" rx="1" fill="#ff4a4a" />
        </svg>
    );
}
