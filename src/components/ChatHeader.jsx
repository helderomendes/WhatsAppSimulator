import { stringToColor, getInitials } from '../utils/text'

function VerifiedBadge() {
  // 12-spike starburst with rounded tips.
  // Outer spikes become quadratic-bezier control points → never sharp.
  // Inner concave notches stay as line endpoints → crisp valleys.
  // Path: M inner[last] → Q outer[i] inner[i] × 12 → Z
  const d = [
    "M 16.6,7.4",
    "Q 20,1     23.4,7.4",
    "Q 29.5,3.6  29.2,10.8",
    "Q 36.5,10.5 32.6,16.6",
    "Q 39,20    32.6,23.4",
    "Q 36.5,29.5 29.2,29.2",
    "Q 29.5,36.5 23.4,32.6",
    "Q 20,39    16.6,32.6",
    "Q 10.5,36.5 10.8,29.2",
    "Q 3.5,29.5  7.4,23.4",
    "Q 1,20     7.4,16.6",
    "Q 3.5,10.5  10.8,10.8",
    "Q 10.5,3.6  16.6,7.4",
    "Z",
  ].join(" ")
  return (
    <svg width="15" height="15" viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
      <path d={d} fill="#1877F2" />
      <polyline
        points="13,21.5 17.5,25.5 28,14.5"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export default function ChatHeader({ brand, dark }) {
  const avatarBg = brand.avatarColor || stringToColor(brand.name)
  const initials = getInitials(brand.name)

  const headerBg = dark ? '#1F2C34' : '#FFFFFF'
  const nameColor = dark ? '#E9EDEF' : '#111B21'
  const subtitleColor = dark ? '#8696A0' : '#667781'
  const iconColor = dark ? '#8696A0' : '#54656F'
  const backColor = dark ? '#00A884' : '#007AFF'

  return (
    <div
      className="flex items-center gap-2 px-2 py-2"
      style={{
        background: headerBg,
        minHeight: '56px',
        borderBottom: dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.08)',
      }}
    >
      {/* iOS back chevron */}
      <button className="flex items-center gap-0.5 px-1 py-1 flex-shrink-0">
        <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
          <path d="M9 1.5L1.5 8.5L9 15.5" stroke={backColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Avatar */}
      <div className="flex-shrink-0 relative">
        {brand.logo ? (
          <img src={brand.logo} alt={brand.name} className="rounded-full object-cover" style={{ width: '38px', height: '38px' }} />
        ) : (
          <div
            className="rounded-full flex items-center justify-center text-white font-bold"
            style={{ width: '38px', height: '38px', background: avatarBg, fontSize: '14px', letterSpacing: '0.5px' }}
          >
            {initials}
          </div>
        )}
        {/* Online dot */}
        <div
          className="absolute rounded-full"
          style={{ width: '10px', height: '10px', background: '#25D366', border: `2px solid ${headerBg}`, bottom: 0, right: 0 }}
        />
      </div>

      {/* Name + subtitle */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="font-semibold truncate" style={{ color: nameColor, fontSize: '15.5px' }}>
            {brand.name}
          </span>
          {brand.verified && <VerifiedBadge />}
        </div>
        <div style={{ color: subtitleColor, fontSize: '12px' }}>
          {brand.isCommercial ? 'Conta comercial' : brand.phone || ''}
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4 flex-shrink-0 px-1">
        {/* Video call */}
        <svg width="21" height="15" viewBox="0 0 24 17" fill="none" stroke={iconColor} strokeWidth="1.7" strokeLinecap="round">
          <rect x="1" y="1" width="15" height="15" rx="3"/>
          <path d="M16 6l6-4v13l-6-4"/>
        </svg>
        {/* Phone */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.7" strokeLinecap="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.94a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.26h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 9a16 16 0 006 6l1.1-1.16a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16z"/>
        </svg>
        {/* Dots menu */}
        <svg width="4" height="18" viewBox="0 0 4 18" fill={iconColor}>
          <circle cx="2" cy="2" r="1.8"/>
          <circle cx="2" cy="9" r="1.8"/>
          <circle cx="2" cy="16" r="1.8"/>
        </svg>
      </div>
    </div>
  )
}
