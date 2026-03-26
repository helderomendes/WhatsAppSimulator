import ReadReceipt from './ReadReceipt'
import { parseWAMarkdown } from '../../utils/text'

function Tail({ side, bubbleColor, bgColor }) {
  const isLeft = side === 'left'
  const base = {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    [isLeft ? 'left' : 'right']: '-6px',
  }
  return (
    <>
      {/* Protrusion in bubble color */}
      <div style={{
        ...base,
        width: '12px',
        borderBottom: `14px solid ${bubbleColor}`,
        [isLeft ? 'borderTopRightRadius' : 'borderTopLeftRadius']: '8px',
      }} />
      {/* Cutout in chat background color */}
      <div style={{
        ...base,
        [isLeft ? 'left' : 'right']: '-8px',
        top: '-1px',
        height: '14px',
        width: '8px',
        background: bgColor,
        [isLeft ? 'borderTopRightRadius' : 'borderTopLeftRadius']: '6px',
      }} />
    </>
  )
}

export default function TextMessage({ msg, dark, vars }) {
  const isIn = msg.from === 'brand'
  const bubbleBg = isIn
    ? (dark ? '#1F2C34' : '#FFFFFF')
    : (dark ? '#005C4B' : '#D9FDD3')
  const chatBg = dark ? '#0B141A' : '#D9E5BE'
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
            borderRadius: '8px',
            padding: '6px 10px 7px 10px',
          }}
        >
          <Tail side={isIn ? 'left' : 'right'} bubbleColor={bubbleBg} bgColor={chatBg} />

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
