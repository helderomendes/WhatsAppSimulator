import { TailIn } from './MessageTail'
import ReadReceipt from './ReadReceipt'
import { parseWAMarkdown } from '../../utils/text'

export default function ButtonsMessage({ msg, dark }) {
  const bubbleColor = dark ? '#1F2C34' : '#FFFFFF'
  const textColor = dark ? '#E9EDEF' : '#111B21'
  const timeColor = dark ? '#8696A0' : '#667781'
  const dividerColor = dark ? 'rgba(134,150,160,0.2)' : 'rgba(0,0,0,0.1)'
  const btnColor = '#00A884'

  return (
    <div className="flex mb-1 px-2 justify-start">
      <div className="relative max-w-[82%]">
        <div
          className="relative rounded-lg overflow-hidden shadow-sm"
          style={{
            backgroundColor: bubbleColor,
            borderRadius: '0 8px 8px 8px',
          }}
        >
          <TailIn color={bubbleColor} />

          {/* Text content */}
          <div className="px-3 py-2">
            <div
              className="text-[13.5px] leading-[1.4] wa-text"
              style={{ color: textColor }}
              dangerouslySetInnerHTML={{ __html: parseWAMarkdown(msg.text) }}
            />
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-[10px]" style={{ color: timeColor }}>
                {msg.time}
              </span>
              <ReadReceipt status={msg.status} dark={dark} />
            </div>
          </div>

          {/* Buttons */}
          {msg.buttons.map((btn, i) => (
            <div key={i}>
              <div style={{ height: '1px', backgroundColor: dividerColor }} />
              <button
                className="w-full py-2.5 px-4 flex items-center justify-center gap-2 text-[13.5px] font-medium wa-btn-reply"
                style={{ color: btnColor, background: 'transparent' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 17l-4-4 4-4M20 17l-4-4 4-4" />
                </svg>
                {btn.text}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
