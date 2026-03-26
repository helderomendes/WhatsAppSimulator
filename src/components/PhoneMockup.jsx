import ChatHeader from './ChatHeader'
import WhatsAppChat from './WhatsAppChat'
import ChatInput from './ChatInput'

// ── Heights (px) ──────────────────────────────────────────────────────────────
const STATUS_H  = 48
const HEADER_H  = 56
const INPUT_H   = 60
const HOME_H    = 22

function StatusBar({ dark, time }) {
  const color = dark ? '#E9EDEF' : '#000000'
  return (
    <div
      className="flex items-end justify-between px-5 pb-1"
      style={{ paddingTop: '14px', height: STATUS_H, flexShrink: 0 }}
    >
      <span style={{ color, fontSize: '15px', fontWeight: '600', letterSpacing: '-0.3px' }}>
        {time}
      </span>
      <div className="flex items-center gap-1.5">
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
        <div className="flex items-center gap-0.5">
          <span style={{ color, fontSize: '12px', fontWeight: '600' }}>96</span>
          <div className="relative flex items-center" style={{ width: '25px', height: '12px' }}>
            <div className="absolute rounded-sm" style={{ left: 0, top: 0, width: '22px', height: '12px', border: `1.5px solid ${color}`, borderRadius: '3px' }}/>
            <div className="absolute rounded-sm" style={{ left: '2px', top: '2px', width: '16px', height: '8px', background: color, opacity: 0.9, borderRadius: '1.5px' }}/>
            <div className="absolute" style={{ right: '-4px', top: '3.5px', width: '2.5px', height: '5px', background: color, opacity: 0.6, borderRadius: '0 1px 1px 0' }}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PhoneMockup({ brand, messages, dark, vars, wallpaper }) {
  const now  = new Date()
  const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`

  const frameColor = '#1C1C1E'
  const frameSide  = '#2C2C2E'

  return (
    <div
      className="relative"
      style={{
        width: '375px', height: '790px', borderRadius: '52px',
        background: `linear-gradient(160deg, #3A3A3C 0%, ${frameColor} 40%, #2A2A2C 100%)`,
        padding: '13px', boxSizing: 'border-box',
        boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.15)',
      }}
    >
      {/* Volume buttons */}
      {[115, 160, 205].map((top, i) => (
        <div key={i} className="absolute" style={{ left: '-3.5px', top, width: '3.5px', height: i === 0 ? 28 : 36, borderRadius: '2px 0 0 2px', background: `linear-gradient(to right, #555, ${frameSide})` }}/>
      ))}
      {/* Power button */}
      <div className="absolute" style={{ right: '-3.5px', top: 165, width: '3.5px', height: 70, borderRadius: '0 2px 2px 0', background: `linear-gradient(to left, #555, ${frameSide})` }}/>

      {/* ── Screen ──────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ width: '100%', height: '100%', borderRadius: '40px', background: dark ? '#0B141A' : '#F0F2F5' }}
      >
        {/* ── Messages scroll area — fills entire screen, pads under bars ── */}
        <div
          className="absolute inset-0 overflow-y-auto chat-scroll"
          style={{ paddingTop: STATUS_H + HEADER_H, paddingBottom: INPUT_H + HOME_H }}
        >
          <WhatsAppChat messages={messages} dark={dark} vars={vars} wallpaper={wallpaper} />
        </div>

        {/* ── Status bar — glass, top ──────────────────────────────────── */}
        <div
          className="absolute left-0 right-0 z-20"
          style={{
            top: 0, height: STATUS_H,
            background: dark ? 'rgba(11,20,26,0.55)' : 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          }}
        >
          <StatusBar dark={dark} time={time} />
        </div>

        {/* ── Chat header — liquid glass ────────────────────────────────── */}
        <div
          className="absolute left-0 right-0 z-10"
          style={{
            top: STATUS_H, height: HEADER_H,
            background: dark
              ? 'rgba(11,20,26,0.72)'
              : 'rgba(255,255,255,0.70)',
            backdropFilter: 'blur(28px) saturate(200%)',
            WebkitBackdropFilter: 'blur(28px) saturate(200%)',
            borderBottom: dark
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid rgba(255,255,255,0.9)',
            boxShadow: dark
              ? 'inset 0 1px 0 rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.35)'
              : 'inset 0 1px 0 rgba(255,255,255,1), 0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          <ChatHeader brand={brand} dark={dark} glass />
        </div>

        {/* ── Input bar — liquid glass, bottom ─────────────────────────── */}
        <div
          className="absolute left-0 right-0 z-10"
          style={{
            bottom: HOME_H, height: INPUT_H,
            background: dark
              ? 'rgba(11,20,26,0.72)'
              : 'rgba(255,255,255,0.70)',
            backdropFilter: 'blur(28px) saturate(200%)',
            WebkitBackdropFilter: 'blur(28px) saturate(200%)',
            borderTop: dark
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid rgba(255,255,255,0.9)',
            boxShadow: dark
              ? 'inset 0 -1px 0 rgba(255,255,255,0.07), 0 -4px 24px rgba(0,0,0,0.35)'
              : 'inset 0 -1px 0 rgba(255,255,255,1), 0 -4px 24px rgba(0,0,0,0.06)',
          }}
        >
          <ChatInput dark={dark} glass />
        </div>

        {/* ── Home indicator ────────────────────────────────────────────── */}
        <div
          className="absolute left-0 right-0 flex items-center justify-center z-20"
          style={{
            bottom: 0, height: HOME_H,
            background: dark ? 'rgba(11,20,26,0.6)' : 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div style={{ width: '130px', height: '5px', borderRadius: '3px', background: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)' }}/>
        </div>
      </div>
    </div>
  )
}
