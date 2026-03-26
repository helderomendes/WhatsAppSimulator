import { PlusCircle, SmileySticker, Camera, ImageSquare, PaperPlaneRight } from '@phosphor-icons/react'

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
        <PlusCircle size={26} color={iconColor} weight="regular" />
      </button>

      {/* Input pill */}
      <div
        className="flex-1 flex items-center gap-2 px-3 rounded-full"
        style={{ background: inputBg, height: '40px', border: `1px solid ${borderColor}` }}
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
