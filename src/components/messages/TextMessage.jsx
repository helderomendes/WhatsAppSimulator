import ReadReceipt from './ReadReceipt'
import { parseWAMarkdown } from '../../utils/text'

function Tail({ side, color }) {
  if (side === 'left') {
    return (
      <svg className="absolute -left-[7px] bottom-0" width="7" height="12" viewBox="0 0 7 12" fill="none">
        <path d="M7 12C7 12 0 12 0 5C0 5 0 0 7 0L7 12Z" fill={color}/>
      </svg>
    )
  }
  return (
    <svg className="absolute -right-[7px] bottom-0" width="7" height="12" viewBox="0 0 7 12" fill="none">
      <path d="M0 12C0 12 7 12 7 5C7 5 7 0 0 0L0 12Z" fill={color}/>
    </svg>
  )
}

export default function TextMessage({ msg, dark, vars }) {
  const isIn = msg.from === 'brand'
  const bubbleBg = isIn
    ? (dark ? '#1F2C34' : '#FFFFFF')
    : (dark ? '#005C4B' : '#D9FDD3')
  const textColor = dark ? '#E9EDEF' : '#111B21'
  const timeColor = dark ? '#8696A0' : '#667781'

  return (
    <div className={`flex mb-0.5 px-2 msg-anim ${isIn ? 'justify-start' : 'justify-end'}`}>
      <div className="relative" style={{ maxWidth: '78%' }}>
        {/* Quoted */}
        {msg.quoted && (
          <div
            className="rounded-t-lg px-2.5 py-1.5 text-xs"
            style={{
              background: isIn ? (dark ? '#17252C' : '#F0F2F5') : (dark ? '#025144' : '#C6F0C6'),
              borderLeft: '3px solid #00A884',
              borderRadius: '8px 8px 0 0',
            }}
          >
            <div className="font-semibold text-[#00A884] text-[11px] mb-0.5">
              {msg.quoted.from === 'brand' ? (vars?.brand || 'Marca') : 'Você'}
            </div>
            <div className="truncate text-[11px]" style={{ color: dark ? '#8696A0' : '#667781' }}
              dangerouslySetInnerHTML={{ __html: parseWAMarkdown(msg.quoted.text) }} />
          </div>
        )}

        {/* Bubble */}
        <div
          className="relative px-2.5 py-1.5 shadow-sm"
          style={{
            background: bubbleBg,
            borderRadius: msg.quoted
              ? isIn ? '0 8px 8px 8px' : '8px 0 8px 8px'
              : isIn ? '0 8px 8px 8px' : '8px 0 8px 8px',
          }}
        >
          <Tail side={isIn ? 'left' : 'right'} color={bubbleBg} />

          <div
            className="wa-text leading-snug"
            style={{ color: textColor, fontSize: '14px' }}
            dangerouslySetInnerHTML={{ __html: parseWAMarkdown(msg.text) }}
          />
          <div className="flex items-center justify-end gap-1 mt-0.5" style={{ minWidth: '60px' }}>
            <span style={{ color: timeColor, fontSize: '11px' }}>{msg.time}</span>
            {!isIn && <ReadReceipt status={msg.status} />}
          </div>
        </div>
      </div>
    </div>
  )
}
