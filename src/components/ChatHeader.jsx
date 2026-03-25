import { stringToColor, getInitials } from '../utils/text'

function VerifiedBadge() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#00A884" />
      <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function ChatHeader({ brand, dark, msgCount = 72 }) {
  const avatarColor = stringToColor(brand.name)
  const initials = getInitials(brand.name)

  const headerBg = dark ? '#1F2C34' : '#075E54'
  const titleColor = dark ? '#E9EDEF' : '#FFFFFF'
  const subtitleColor = dark ? '#8696A0' : 'rgba(255,255,255,0.75)'
  const iconColor = dark ? '#8696A0' : 'rgba(255,255,255,0.9)'
  const backCountColor = dark ? '#8696A0' : 'rgba(255,255,255,0.85)'

  return (
    <div
      className="flex items-center px-3 py-2 gap-3"
      style={{ backgroundColor: headerBg, minHeight: '56px' }}
    >
      {/* Back arrow + unread count */}
      <div className="flex items-center gap-0.5">
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
          <path d="M8 1L1.5 7.5L8 14" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[13px] font-medium" style={{ color: backCountColor }}>
          {msgCount}
        </span>
      </div>

      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {brand.logo ? (
          <img
            src={brand.logo}
            alt={brand.name}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: avatarColor }}
          >
            {initials}
          </div>
        )}
        {/* Online indicator */}
        <div className="absolute -bottom-0 -right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2"
          style={{ borderColor: headerBg }} />
      </div>

      {/* Name + subtitle */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span
            className="font-semibold text-[15px] truncate"
            style={{ color: titleColor }}
          >
            {brand.name}
          </span>
          {brand.verified && <VerifiedBadge />}
        </div>
        <div className="text-[12px]" style={{ color: subtitleColor }}>
          {brand.isCommercial ? 'Conta comercial' : brand.phone}
        </div>
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round">
          <path d="M15.05 5A5 5 0 0119 8.95M15.05 1A9 9 0 0123 8.94m-1 7.98v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.94a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.26h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 9a16 16 0 006 6l1.1-1.16a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0120 16z"/>
        </svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill={iconColor}>
          <circle cx="12" cy="5" r="1.5"/>
          <circle cx="12" cy="12" r="1.5"/>
          <circle cx="12" cy="19" r="1.5"/>
        </svg>
      </div>
    </div>
  )
}
