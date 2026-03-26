import { parseWAMarkdown } from '../../utils/text'

function Card({ card, dark }) {
  const cardBg = dark ? '#1F2C34' : '#FFFFFF'
  const textColor = dark ? '#E9EDEF' : '#111B21'
  const subColor = dark ? '#8696A0' : '#667781'
  const divider = dark ? 'rgba(134,150,160,0.18)' : 'rgba(0,0,0,0.08)'
  const btnColor = '#00A884'

  return (
    <div
      className="flex-shrink-0 overflow-hidden"
      style={{ width: '210px', borderRadius: '10px', background: cardBg, boxShadow: dark ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.12)' }}
    >
      {/* Image */}
      <div
        className="w-full flex items-center justify-center overflow-hidden"
        style={{
          height: '126px',
          background: card.imageSrc ? undefined : (card.gradient || 'linear-gradient(135deg, #667eea, #764ba2)'),
        }}
      >
        {card.imageSrc ? (
          <img
            src={card.imageSrc}
            alt={card.title || 'card'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <span style={{ fontSize: '44px' }}>{card.emoji || '📦'}</span>
        )}
      </div>
      {/* Body */}
      <div className="px-3 pt-2 pb-1">
        <div className="font-semibold leading-tight truncate" style={{ color: textColor, fontSize: '13.5px' }}>
          {card.title}
        </div>
        {card.body && (
          <div
            className="mt-0.5 leading-snug"
            style={{ color: subColor, fontSize: '12px' }}
            dangerouslySetInnerHTML={{ __html: parseWAMarkdown(card.body) }}
          />
        )}
      </div>
      {/* Buttons */}
      {card.buttons?.map((btn, i) => (
        <div key={i}>
          <div style={{ height: '1px', background: divider, margin: '0 12px' }} />
          <button
            className="w-full py-2.5 flex items-center justify-center gap-1.5 font-medium"
            style={{ color: btnColor, background: 'transparent', fontSize: '13.5px' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
            {btn.text}
          </button>
        </div>
      ))}
    </div>
  )
}

export default function CarouselMessage({ msg, dark, flat }) {
  return (
    <div className="flex mb-1 px-2 justify-start msg-anim">
      <div style={{ maxWidth: flat ? '100%' : '92%', width: flat ? '100%' : undefined }}>
        <div
          className={flat ? 'flex flex-wrap gap-2.5 pb-1' : 'flex gap-2.5 overflow-x-auto pb-1 carousel-scroll'}
          style={{ paddingRight: '4px' }}
        >
          {msg.cards.map((card, i) => (
            <Card key={i} card={card} dark={dark} />
          ))}
        </div>
        <div className="mt-1 px-0.5">
          <span style={{ color: dark ? '#8696A0' : '#667781', fontSize: '11px' }}>{msg.time}</span>
        </div>
      </div>
    </div>
  )
}
