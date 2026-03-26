import ReadReceipt from './ReadReceipt'
import { parseWAMarkdown } from '../../utils/text'

function Tail({ side, color }) {
  if (side === 'left') {
    return (
      <svg className="absolute -left-[8px] bottom-0" width="8" height="13" viewBox="0 0 8 13" fill="none">
        <path d="M8 0 L8 13 C8 13 0 10 0 6 C0 2 8 0 8 0 Z" fill={color}/>
      </svg>
    )
  }
  return (
    <svg className="absolute -right-[8px] bottom-0" width="8" height="13" viewBox="0 0 8 13" fill="none">
      <path d="M0 0 L0 13 C0 13 8 10 8 6 C8 2 0 0 0 0 Z" fill={color}/>
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
            borderRadius: isIn ? '8px 8px 8px 0' : '8px 8px 0 8px',
            padding: '6px 10px 7px 10px',
          }}
        >
          <Tail side={isIn ? 'left' : 'right'} color={bubbleBg} />

            {/* Text */}
          <div style={{ color: textColor, fontSize: '14px', lineHeight: '1.4', wordBreak: 'break-word', paddingBottom: '2px' }}>
            <span dangerouslySetInnerHTML={{ __html: parseWAMarkdown(msg.text) }} />
          </div>

          {/* Meta: time + read receipt — inline, right-aligned */}
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '3px',
              marginTop: '2px',
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
