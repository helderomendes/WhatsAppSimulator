import ReadReceipt from './ReadReceipt'
import { parseWAMarkdown } from '../../utils/text'

function TailIn({ color }) {
  return (
    <svg className="absolute -left-[7px] bottom-0" width="7" height="12" viewBox="0 0 7 12" fill="none">
      <path d="M7 12C7 12 0 12 0 5C0 5 0 0 7 0L7 12Z" fill={color}/>
    </svg>
  )
}

export default function CTAMessage({ msg, dark }) {
  const bg = dark ? '#1F2C34' : '#FFFFFF'
  const textColor = dark ? '#E9EDEF' : '#111B21'
  const timeColor = dark ? '#8696A0' : '#667781'
  const divider = dark ? 'rgba(134,150,160,0.18)' : 'rgba(0,0,0,0.08)'
  const btnColor = '#00A884'

  return (
    <div className="flex mb-0.5 px-2 justify-start msg-anim">
      <div className="relative" style={{ maxWidth: '82%' }}>
        <div className="relative overflow-hidden shadow-sm" style={{ background: bg, borderRadius: '0 8px 8px 8px' }}>
          <TailIn color={bg} />
          <div className="px-3 py-2">
            <div
              className="wa-text leading-snug"
              style={{ color: textColor, fontSize: '14px' }}
              dangerouslySetInnerHTML={{ __html: parseWAMarkdown(msg.text) }}
            />
            <div className="flex items-center justify-end gap-1 mt-1">
              <span style={{ color: timeColor, fontSize: '11px' }}>{msg.time}</span>
              <ReadReceipt status={msg.status} />
            </div>
          </div>
          {msg.button && (
            <>
              <div style={{ height: '1px', background: divider }} />
              <button
                className="w-full py-2.5 px-4 flex items-center justify-center gap-2 font-medium"
                style={{ color: btnColor, background: 'transparent', fontSize: '14px' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
                {msg.button.text}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
