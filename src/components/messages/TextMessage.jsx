import ReadReceipt from './ReadReceipt'
import { parseWAMarkdown } from '../../utils/text'

// Tail is rendered as a SIBLING *before* the bubble div so the bubble's
// background naturally covers the inner-concave portion of the path.
function Tail({ side, color }) {
  const isLeft = side === 'left'
  // Left tail: outer convex curve swings left, inner concave edge dips to x=10
  // (into bubble area). Bubble background covers x>8 automatically.
  // Right tail: mirror image — inner concave dips to x=-2.
  const d = isLeft
    ? 'M 8,0 C 6,0 1,4 0,8 C 0,11 4,13 8,13 C 10,12 10,1 8,0 Z'
    : 'M 0,0 C 2,0 7,4 8,8 C 8,11 4,13 0,13 C -2,12 -2,1 0,0 Z'

  return (
    <svg
      style={{
        position: 'absolute',
        bottom: 0,
        [isLeft ? 'left' : 'right']: '-8px',
        overflow: 'visible',
      }}
      width="8"
      height="13"
      viewBox="0 0 8 13"
      overflow="visible"
      fill="none"
    >
      <path d={d} fill={color} />
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

        {/* Tail rendered BEFORE bubble so bubble paints on top (covers inner concave) */}
        <Tail side={isIn ? 'left' : 'right'} color={bubbleBg} />

        {/* Bubble */}
        <div
          className="relative shadow-sm"
          style={{
            background: bubbleBg,
            borderRadius: isIn ? '8px 8px 8px 0' : '8px 8px 0 8px',
            padding: '6px 10px 7px 10px',
          }}
        >
          {/* Text */}
          <div style={{ color: textColor, fontSize: '14px', lineHeight: '1.4', wordBreak: 'break-word', paddingBottom: '2px' }}>
            <span dangerouslySetInnerHTML={{ __html: parseWAMarkdown(msg.text) }} />
          </div>

          {/* Meta: time + read receipt */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '3px', marginTop: '2px' }}>
            <span style={{ color: timeColor, fontSize: '11px', lineHeight: 1 }}>{msg.time}</span>
            {!isIn && <ReadReceipt status={msg.status} />}
          </div>
        </div>
      </div>
    </div>
  )
}
