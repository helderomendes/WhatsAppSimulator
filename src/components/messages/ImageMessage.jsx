import ReadReceipt from './ReadReceipt'

function TailIn({ color }) {
  return (
    <svg className="absolute -left-[7px] bottom-0" width="7" height="12" viewBox="0 0 7 12" fill="none">
      <path d="M7 12C7 12 0 12 0 5C0 5 0 0 7 0L7 12Z" fill={color}/>
    </svg>
  )
}

export default function ImageMessage({ msg, dark }) {
  const cardBg = dark ? '#1F2C34' : '#FFFFFF'

  return (
    <div className="flex mb-0.5 px-2 justify-start msg-anim">
      <div className="relative" style={{ maxWidth: '72%' }}>
        <div className="relative overflow-hidden shadow-sm" style={{ borderRadius: '0 8px 8px 8px' }}>
          <TailIn color={cardBg} />

          {/* Image area */}
          <div
            className="relative flex items-center justify-center"
            style={{
              width: '240px',
              height: '200px',
              background: msg.imageSrc ? undefined : (msg.imageBg || msg.gradient || 'linear-gradient(135deg, #1a1a2e, #0f3460)'),
              overflow: 'hidden',
            }}
          >
            {msg.imageSrc ? (
              <img
                src={msg.imageSrc}
                alt={msg.imageLabel || 'imagem'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div className="text-center px-3">
                <div style={{ fontSize: '36px', marginBottom: '6px' }}>{msg.imageEmoji || msg.emoji || '📦'}</div>
                {msg.imageLabel && (
                  <div
                    className="text-white font-bold text-center leading-tight"
                    style={{ fontSize: '11px', textShadow: '0 1px 4px rgba(0,0,0,0.6)', whiteSpace: 'pre-line' }}
                  >
                    {msg.imageLabel}
                  </div>
                )}
              </div>
            )}

            {/* Share icon */}
            <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/30 flex items-center justify-center cursor-pointer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
              </svg>
            </div>
            {/* Timestamp overlay */}
            <div className="absolute bottom-1.5 right-2 flex items-center gap-1">
              <span className="text-white font-medium" style={{ fontSize: '11px', textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}>
                {msg.time}
              </span>
              <ReadReceipt status={msg.status} />
            </div>
          </div>

          {/* Caption below image */}
          {msg.caption && (
            <div style={{ background: cardBg, padding: '6px 10px 8px', color: dark ? '#E9EDEF' : '#111B21', fontSize: '13.5px', lineHeight: '1.4' }}>
              {msg.caption}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
