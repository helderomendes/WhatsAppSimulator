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

  // Meta width: time (max ~32px) + gap + ticks (14px) or just time for incoming
  const metaWidth = isIn ? 34 : 50

  return (
    <div className={`flex mb-0.5 px-2 msg-anim ${isIn ? 'justify-start' : 'justify-end'}`}>
      <div className="relative" style={{ maxWidth: '78%' }}>
        {/* Quoted */}
        {msg.quoted && (
          <div
            style={{
              background: isIn ? (dark ? '#17252C' : '#F0F2F5') : (dark ? '#025144' : '#C6F0C6'),
              borderLeft: '3px solid #00A884',
              borderRadius: '8px 8px 0 0',
              padding: '6px 10px',
            }}
          >
            <div style={{ color: '#00A884', fontSize: '11px', fontWeight: '600', marginBottom: '2px' }}>
              {msg.quoted.from === 'brand' ? (vars?.brand || 'Marca') : 'Você'}
            </div>
            <div
              style={{ color: dark ? '#8696A0' : '#667781', fontSize: '11px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              dangerouslySetInnerHTML={{ __html: parseWAMarkdown(msg.quoted.text) }}
            />
          </div>
        )}

        {/* Bubble */}
        <div
          className="relative shadow-sm"
          style={{
            background: bubbleBg,
            borderRadius: msg.quoted
              ? isIn ? '0 8px 8px 8px' : '8px 0 8px 8px'
              : isIn ? '0 8px 8px 8px' : '8px 0 8px 8px',
            padding: '6px 10px 7px 10px',
          }}
        >
          <Tail side={isIn ? 'left' : 'right'} color={bubbleBg} />

          {/* Text + inline float-right meta spacer */}
          <div style={{ color: textColor, fontSize: '14px', lineHeight: '1.4', wordBreak: 'break-word' }}>
            {/* Invisible spacer that pushes the last text line to make room for meta */}
            <span
              style={{ display: 'inline-block', width: `${metaWidth}px`, height: '1px', float: 'right', clear: 'both', marginLeft: '4px', marginTop: '4px' }}
              aria-hidden="true"
            />
            <span dangerouslySetInnerHTML={{ __html: parseWAMarkdown(msg.text) }} />
          </div>

          {/* Meta: time + read receipt — absolute bottom-right */}
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '3px',
              position: 'absolute', bottom: '5px', right: '8px',
              pointerEvents: 'none',
            }}
          >
            <span style={{ color: timeColor, fontSize: '11px', lineHeight: 1 }}>{msg.time}</span>
            {!isIn && <ReadReceipt status={msg.status} />}
          </div>
        </div>
      </div>
    </div>
  )
}
