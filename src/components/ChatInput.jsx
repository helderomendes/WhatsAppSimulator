export default function ChatInput({ dark }) {
  const bg = dark ? '#1F2C34' : '#F0F2F5'
  const inputBg = dark ? '#2A3942' : '#FFFFFF'
  const textColor = dark ? '#8696A0' : '#8696A0'
  const iconColor = dark ? '#8696A0' : '#8696A0'

  return (
    <div
      className="flex items-center gap-2 px-2 py-2"
      style={{ backgroundColor: bg }}
    >
      {/* Plus / attach */}
      <button className="flex-shrink-0 w-9 h-9 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v8M8 12h8"/>
        </svg>
      </button>

      {/* Input field */}
      <div
        className="flex-1 flex items-center gap-2 px-3 py-2 rounded-full"
        style={{ backgroundColor: inputBg, minHeight: '36px' }}
      >
        {/* Emoji */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>

        <span className="flex-1 text-[14px]" style={{ color: textColor }}>
          Mensagem
        </span>

        {/* Sticker/GIF */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="3"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>

        {/* Camera */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
      </div>

      {/* Mic */}
      <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#00A884]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
          <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/>
        </svg>
      </button>
    </div>
  )
}
