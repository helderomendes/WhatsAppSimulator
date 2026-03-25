export default function ChatInput({ dark }) {
  const barBg = dark ? '#1F2C34' : '#F0F2F5'
  const inputBg = dark ? '#2A3942' : '#FFFFFF'
  const iconColor = dark ? '#8696A0' : '#8696A0'
  const borderColor = dark ? 'transparent' : 'rgba(0,0,0,0.1)'

  return (
    <div
      className="flex items-center gap-2 px-2 py-2"
      style={{ background: barBg, borderTop: `1px solid ${borderColor}` }}
    >
      {/* + button */}
      <button className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="10.5"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      </button>

      {/* Input pill */}
      <div
        className="flex-1 flex items-center gap-2 px-3 rounded-full"
        style={{ background: inputBg, height: '40px', border: `1px solid ${borderColor}` }}
      >
        {/* Emoji */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          <circle cx="9" cy="9" r="1" fill={iconColor}/>
          <circle cx="15" cy="9" r="1" fill={iconColor}/>
        </svg>
        <span className="flex-1 text-sm" style={{ color: dark ? '#6B7683' : '#9CA3AF' }}>Mensagem</span>
        {/* Sticker */}
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="4"/>
          <circle cx="8.5" cy="8.5" r="1.5" fill={iconColor}/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
        {/* Camera */}
        <svg width="19" height="17" viewBox="0 0 24 20" fill="none" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round">
          <path d="M23 18a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
          <circle cx="12" cy="12.5" r="3.5"/>
        </svg>
      </div>

      {/* Send button */}
      <button
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{ width: '40px', height: '40px', background: '#00A884' }}
      >
        {/* Paper-plane send icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
