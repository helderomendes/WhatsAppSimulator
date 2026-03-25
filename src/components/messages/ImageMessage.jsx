import { TailIn } from './MessageTail'
import ReadReceipt from './ReadReceipt'
import { parseWAMarkdown } from '../../utils/text'

export default function ImageMessage({ msg, dark }) {
  const bubbleColor = dark ? '#1F2C34' : '#FFFFFF'
  const timeColor = dark ? '#E9EDEF' : '#FFFFFF'

  return (
    <div className="flex mb-1 px-2 justify-start">
      <div className="relative max-w-[78%]">
        <div
          className="relative rounded-lg overflow-hidden shadow-sm"
          style={{ backgroundColor: bubbleColor, borderRadius: '0 8px 8px 8px' }}
        >
          <TailIn color={bubbleColor} />

          {/* Image / gradient placeholder */}
          <div
            className="relative w-[220px] h-[130px] flex items-center justify-center"
            style={{ background: msg.gradient || 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
          >
            <div className="text-center">
              <div className="text-4xl mb-1">{msg.emoji || '📦'}</div>
              <div
                className="text-white text-[10px] font-bold text-center leading-tight px-3"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)', whiteSpace: 'pre-line' }}
              >
                {msg.imageLabel || ''}
              </div>
            </div>
            {/* Timestamp overlay */}
            <div className="absolute bottom-1.5 right-2 flex items-center gap-1">
              <span className="text-[10px] font-medium" style={{ color: timeColor, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                {msg.time}
              </span>
              <ReadReceipt status={msg.status} dark={dark} />
            </div>
            {/* Share icon */}
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/30 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
              </svg>
            </div>
          </div>

          {/* Caption */}
          {msg.caption && (
            <div className="px-3 py-2">
              <div
                className="text-[13.5px]"
                style={{ color: dark ? '#E9EDEF' : '#111B21' }}
                dangerouslySetInnerHTML={{ __html: parseWAMarkdown(msg.caption) }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
