import { forwardRef } from 'react'
import { VideoCamera, Phone, DotsThreeVertical, PlusCircle, SmileySticker, Camera, ImageSquare, PaperPlaneRight } from '@phosphor-icons/react'
import WhatsAppChat from './WhatsAppChat'
import { stringToColor, getInitials } from '../utils/text'

// ── Inline mini-components (solid, no glass — renders correctly in html2canvas) ──

function ExportStatusBar({ dark }) {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  const color = dark ? '#E9EDEF' : '#000000'
  const bg = dark ? '#1F2C34' : '#FFFFFF'

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      padding: '14px 20px 4px', height: '48px', background: bg, flexShrink: 0,
    }}>
      <span style={{ color, fontSize: '15px', fontWeight: '600', letterSpacing: '-0.3px' }}>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={color}>
          <rect x="0" y="8" width="3" height="4" rx="0.5"/>
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5"/>
          <rect x="9" y="3" width="3" height="9" rx="0.5"/>
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.3"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={color}>
          <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/>
          <path d="M4.1 6.9C5.1 5.9 6.5 5.25 8 5.25s2.9.65 3.9 1.65l1.1-1.1A7.1 7.1 0 008 3.5a7.1 7.1 0 00-5 2.3l1.1 1.1z" opacity="0.75"/>
          <path d="M1.3 4.1A10.5 10.5 0 018 1.5c2.55 0 4.9.9 6.7 2.6l1.05-1.05A12.1 12.1 0 008 0 12.1 12.1 0 00.25 3.05L1.3 4.1z" opacity="0.4"/>
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ color, fontSize: '12px', fontWeight: '600' }}>96</span>
          <div style={{ position: 'relative', width: '25px', height: '12px', display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: '22px', height: '12px', border: `1.5px solid ${color}`, borderRadius: '3px' }}/>
            <div style={{ position: 'absolute', left: '2px', top: '2px', width: '16px', height: '8px', background: color, opacity: 0.9, borderRadius: '1.5px' }}/>
            <div style={{ position: 'absolute', right: '-4px', top: '3.5px', width: '2.5px', height: '5px', background: color, opacity: 0.6, borderRadius: '0 1px 1px 0' }}/>
          </div>
        </div>
      </div>
    </div>
  )
}

function VerifiedBadge() {
  const d = [
    "M 16.6,7.4","Q 20,1 23.4,7.4","Q 29.5,3.6 29.2,10.8","Q 36.5,10.5 32.6,16.6",
    "Q 39,20 32.6,23.4","Q 36.5,29.5 29.2,29.2","Q 29.5,36.5 23.4,32.6",
    "Q 20,39 16.6,32.6","Q 10.5,36.5 10.8,29.2","Q 3.5,29.5 7.4,23.4",
    "Q 1,20 7.4,16.6","Q 3.5,10.5 10.8,10.8","Q 10.5,3.6 16.6,7.4","Z",
  ].join(" ")
  return (
    <svg width="15" height="15" viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
      <path d={d} fill="#1877F2" />
      <polyline points="13,21.5 17.5,25.5 28,14.5" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

function ExportHeader({ brand, dark }) {
  const avatarBg = brand.avatarColor || stringToColor(brand.name)
  const initials = getInitials(brand.name)
  const bg = dark ? '#1F2C34' : '#FFFFFF'
  const nameColor = dark ? '#E9EDEF' : '#111B21'
  const subtitleColor = dark ? '#8696A0' : '#667781'
  const iconColor = dark ? '#8696A0' : '#54656F'
  const backColor = dark ? '#00A884' : '#007AFF'

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '8px', background: bg, minHeight: '56px', flexShrink: 0,
      borderBottom: dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.08)',
    }}>
      <button style={{ display: 'flex', alignItems: 'center', padding: '4px', flexShrink: 0, background: 'none', border: 'none' }}>
        <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
          <path d="M9 1.5L1.5 8.5L9 15.5" stroke={backColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div style={{ flexShrink: 0, position: 'relative' }}>
        {brand.logo ? (
          <img src={brand.logo} alt={brand.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '14px' }}>
            {initials}
          </div>
        )}
        <div style={{ position: 'absolute', width: '10px', height: '10px', background: '#25D366', border: `2px solid ${bg}`, borderRadius: '50%', bottom: 0, right: 0 }}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontWeight: '600', color: nameColor, fontSize: '15.5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {brand.name}
          </span>
          {brand.verified && <VerifiedBadge />}
        </div>
        <div style={{ color: subtitleColor, fontSize: '12px' }}>
          {brand.isCommercial ? 'Conta comercial' : brand.phone || ''}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0, padding: '0 4px' }}>
        <VideoCamera size={22} color={iconColor} weight="regular" />
        <Phone size={20} color={iconColor} weight="regular" />
        <DotsThreeVertical size={20} color={iconColor} weight="bold" />
      </div>
    </div>
  )
}

function ExportInput({ dark }) {
  const bg = dark ? '#1F2C34' : '#F0F2F5'
  const inputBg = dark ? '#2A3942' : '#FFFFFF'
  const iconColor = dark ? '#8696A0' : '#54656F'
  const borderColor = dark ? 'transparent' : 'rgba(0,0,0,0.1)'

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '8px', background: bg, flexShrink: 0,
      borderTop: `1px solid ${borderColor}`,
    }}>
      <div style={{ width: '40px', height: '40px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PlusCircle size={26} color={iconColor} weight="regular" />
      </div>
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', gap: '8px',
        padding: '0 12px', borderRadius: '20px', height: '40px',
        background: inputBg, border: `1px solid ${borderColor}`,
      }}>
        <SmileySticker size={21} color={iconColor} weight="regular" />
        <span style={{ flex: 1, fontSize: '14px', color: dark ? '#6B7683' : '#9CA3AF' }}>Mensagem</span>
        <ImageSquare size={20} color={iconColor} weight="regular" />
        <Camera size={20} color={iconColor} weight="regular" />
      </div>
      <div style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '50%', background: '#00A884', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PaperPlaneRight size={20} color="white" weight="fill" />
      </div>
    </div>
  )
}

// ── Main export frame (hidden off-screen) ────────────────────────────────────

const ChatExportFrame = forwardRef(function ChatExportFrame({ brand, messages, dark, vars, wallpaper }, ref) {
  return (
    <div
      ref={ref}
      className="no-anim"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: 0,
        width: '375px',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <ExportStatusBar dark={dark} />
      <ExportHeader brand={brand} dark={dark} />
      {/* WhatsAppChat: flat mode removes flex-1/overflow-y-auto → full natural height */}
      <WhatsAppChat messages={messages} dark={dark} vars={vars} wallpaper={wallpaper} flat />
      <ExportInput dark={dark} />
    </div>
  )
})

export default ChatExportFrame
