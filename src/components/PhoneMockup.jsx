import { CellSignalFull, WifiHigh, BatteryHigh } from '@phosphor-icons/react'
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
        <CellSignalFull size={16} color={color} weight="fill" />
        <WifiHigh size={16} color={color} weight="fill" />
        <BatteryHigh size={20} color={color} weight="fill" />
      </div>
    </div>
  )
}

export default function PhoneMockup({ brand, messages, dark, vars, wallpaper }) {
  const now  = new Date()
  const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: '375px', height: '790px',
        borderRadius: '12px',
        background: dark ? '#0B141A' : '#F0F2F5',
        boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
      }}
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
  )
}
