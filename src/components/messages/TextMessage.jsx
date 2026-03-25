import { TailIn, TailOut } from './MessageTail'
import ReadReceipt from './ReadReceipt'
import { parseWAMarkdown } from '../../utils/text'

export default function TextMessage({ msg, dark, vars }) {
  const isIn = msg.from === 'brand'
  const bubbleColor = isIn
    ? dark ? '#1F2C34' : '#FFFFFF'
    : dark ? '#005C4B' : '#D9FDD3'
  const textColor = dark ? '#E9EDEF' : '#111B21'
  const timeColor = dark ? '#8696A0' : '#667781'

  return (
    <div className={`flex mb-1 px-2 ${isIn ? 'justify-start' : 'justify-end'}`}>
      <div className="relative max-w-[78%]">
        {/* Quoted message */}
        {msg.quoted && (
          <div
            className={`rounded-t-lg px-3 py-2 mb-0 text-xs border-l-[3px] ${
              dark ? 'bg-[#0D1F28] border-[#00A884]' : 'bg-[#F0F2F5] border-[#00A884]'
            }`}
            style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          >
            <div
              className="font-medium text-[#00A884] text-[11px]"
            >
              {isIn ? 'Você' : vars?.brand || 'Marca'}
            </div>
            <div
              className={`text-[11px] truncate ${dark ? 'text-[#8696A0]' : 'text-[#667781]'}`}
              dangerouslySetInnerHTML={{ __html: parseWAMarkdown(msg.quoted.text) }}
            />
          </div>
        )}
        <div
          className="relative px-3 py-2 rounded-lg shadow-sm"
          style={{
            backgroundColor: bubbleColor,
            borderRadius: msg.quoted
              ? '0 8px 8px 8px'
              : isIn ? '0 8px 8px 8px' : '8px 0 8px 8px',
          }}
        >
          {isIn ? (
            <TailIn color={bubbleColor} />
          ) : (
            <TailOut color={bubbleColor} />
          )}
          <div
            className="text-[13.5px] leading-[1.4] wa-text"
            style={{ color: textColor }}
            dangerouslySetInnerHTML={{ __html: parseWAMarkdown(msg.text) }}
          />
          <div className="flex items-center justify-end gap-1 mt-1 -mb-0.5">
            <span className="text-[10px]" style={{ color: timeColor }}>
              {msg.time}
            </span>
            {!isIn && <ReadReceipt status={msg.status} dark={dark} />}
          </div>
        </div>
      </div>
    </div>
  )
}
