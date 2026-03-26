import { VideoCamera, Phone, DotsThreeVertical } from '@phosphor-icons/react'
import { stringToColor, getInitials } from '../utils/text'

function VerifiedBadge() {
  // 10-spike starburst with rounded tips via quadratic bezier.
  // Inner valleys (r=8) are line endpoints; outer spikes (r=20) are control points.
  // Path: M inner[9] → Q outer[i] inner[i] × 10 → Z
  const d = [
    "M 17.5,12.4",
    "Q 20,0      22.5,12.4",
    "Q 31.8,3.8  26.5,15.3",
    "Q 39.0,13.8 28,20",
    "Q 39.0,26.2 26.5,24.7",
    "Q 31.8,36.2 22.5,27.6",
    "Q 20,40     17.5,27.6",
    "Q 8.2,36.2  13.5,24.7",
    "Q 1.0,26.2  12,20",
    "Q 1.0,13.8  13.5,15.3",
    "Q 8.2,3.8   17.5,12.4",
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

export default function ChatHeader({ brand, dark, glass }) {
  const avatarBg = brand.avatarColor || stringToColor(brand.name)
  const initials = getInitials(brand.name)

  const nameColor = dark ? '#E9EDEF' : '#111B21'
  const subtitleColor = dark ? '#8696A0' : '#667781'
  const iconColor = dark ? '#8696A0' : '#54656F'
  const backColor = dark ? '#00A884' : '#007AFF'
  // When wrapped in a glass layer, online dot border must be transparent
  const dotBorder = glass
    ? (dark ? '2px solid rgba(11,20,26,0.72)' : '2px solid rgba(255,255,255,0.70)')
    : (dark ? '2px solid #1F2C34' : '2px solid #FFFFFF')

  return (
    <div
      className="flex items-center gap-2 px-2 py-2"
      style={{
        background: glass ? 'transparent' : (dark ? '#1F2C34' : '#FFFFFF'),
        minHeight: '56px',
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
          style={{ width: '10px', height: '10px', background: '#25D366', border: dotBorder, bottom: 0, right: 0 }}
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
        <VideoCamera size={22} color={iconColor} weight="regular" />
        <Phone size={20} color={iconColor} weight="regular" />
        <DotsThreeVertical size={20} color={iconColor} weight="bold" />
      </div>
    </div>
  )
}
