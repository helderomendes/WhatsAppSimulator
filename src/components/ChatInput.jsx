import { PlusCircle, SmileySticker, Camera, ImageSquare, PaperPlaneRight } from '@phosphor-icons/react'

export default function ChatInput({ dark, glass }) {
  const iconColor = dark ? '#8696A0' : '#54656F'

  // Input pill: glass-style when inside liquid glass wrapper
  const pillBg = glass
    ? (dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.55)')
    : (dark ? '#2A3942' : '#FFFFFF')
  const pillBorder = glass
    ? (dark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.65)')
    : (dark ? '1px solid transparent' : '1px solid rgba(0,0,0,0.1)')
  const pillShadow = glass
    ? (dark ? 'none' : 'inset 0 1px 1px rgba(255,255,255,0.8)')
    : 'none'

  return (
    <div
      className="flex items-center gap-2 px-2 py-2"
      style={{ background: 'transparent' }}
    >
      {/* + button */}
      <button className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px' }}>
        <PlusCircle size={26} color={iconColor} weight="regular" />
      </button>

      {/* Input pill */}
      <div
        className="flex-1 flex items-center gap-2 px-3 rounded-full"
        style={{
          background: pillBg,
          height: '40px',
          border: pillBorder,
          boxShadow: pillShadow,
          backdropFilter: glass ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: glass ? 'blur(8px)' : 'none',
        }}
      >
        <SmileySticker size={21} color={iconColor} weight="regular" />
        <span className="flex-1 text-sm" style={{ color: dark ? '#6B7683' : '#9CA3AF' }}>Mensagem</span>
        <ImageSquare size={20} color={iconColor} weight="regular" />
        <Camera size={20} color={iconColor} weight="regular" />
      </div>

      {/* Send button */}
      <button
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{ width: '40px', height: '40px', background: '#00A884' }}
      >
        <PaperPlaneRight size={20} color="white" weight="fill" />
      </button>
    </div>
  )
}
