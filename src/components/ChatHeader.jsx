import { VideoCamera, Phone, DotsThreeVertical } from '@phosphor-icons/react'
import { stringToColor, getInitials } from '../utils/text'

function VerifiedBadge() {
  // Scalloped-circle badge (like WhatsApp/Meta verified seal).
  // 10 valleys at r=14 (large inner body), 10 bezier controls at r=23
  // (outside viewBox) → prominent convex bumps on a fat circular base.
  // Path: M valley[9] → Q control[i] valley[i] × 10 → Z
  const d = [
    "M 11.7,8.7",
    "Q 12.9,-1.9  20,6",
    "Q 27.1,-1.9  28.3,8.7",
    "Q 38.6,6.5   33.3,15.7",
    "Q 43,20      33.3,24.3",
    "Q 38.6,33.5  28.3,31.3",
    "Q 27.1,41.9  20,34",
    "Q 12.9,41.9  11.7,31.3",
    "Q 1.4,33.5   6.7,24.3",
    "Q -3,20      6.7,15.7",
    "Q 1.4,6.5    11.7,8.7",
    "Z",
  ].join(" ")
  return (
    <svg width="16" height="16" viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
      <path d={d} fill="#1877F2" />
      <polyline
        points="12,22 17.5,27 29,13"
        stroke="white"
        strokeWidth="4"
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
