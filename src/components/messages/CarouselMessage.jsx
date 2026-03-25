import { parseWAMarkdown } from '../../utils/text'

function CarouselCard({ card, dark }) {
  const cardBg = dark ? '#1F2C34' : '#FFFFFF'
  const textColor = dark ? '#E9EDEF' : '#111B21'
  const subColor = dark ? '#8696A0' : '#667781'
  const dividerColor = dark ? 'rgba(134,150,160,0.2)' : 'rgba(0,0,0,0.1)'
  const btnColor = dark ? '#00A884' : '#00A884'

  return (
    <div
      className="carousel-card rounded-xl overflow-hidden flex-shrink-0"
      style={{ width: '200px', backgroundColor: cardBg }}
    >
      {/* Card image */}
      <div
        className="w-full h-[120px] flex items-center justify-center relative"
        style={{ background: card.gradient || 'linear-gradient(135deg, #667eea, #764ba2)' }}
      >
        <span className="text-5xl">{card.emoji || '📦'}</span>
      </div>

      {/* Card body */}
      <div className="p-3 pb-1">
        <div
          className="font-semibold text-[13px] leading-tight mb-1"
          style={{ color: textColor }}
        >
          {card.title}
        </div>
        {card.body && (
          <div
            className="text-[12px] leading-snug"
            style={{ color: subColor }}
            dangerouslySetInnerHTML={{ __html: parseWAMarkdown(card.body) }}
          />
        )}
      </div>

      {/* Buttons */}
      {card.buttons && card.buttons.map((btn, i) => (
        <div key={i}>
          <div style={{ height: '1px', backgroundColor: dividerColor, margin: '0 12px' }} />
          <button
            className="w-full py-2.5 px-3 flex items-center justify-center gap-1.5 text-[13px] font-medium"
            style={{ color: btnColor, background: 'transparent' }}
          >
            {btn.icon && (
              <span className="text-[11px] font-bold border rounded-sm px-0.5"
                style={{ borderColor: btnColor, color: btnColor, fontSize: '9px' }}>
                {btn.icon}
              </span>
            )}
            {btn.text}
          </button>
        </div>
      ))}
    </div>
  )
}

export default function CarouselMessage({ msg, dark }) {
  const containerColor = dark ? '#1F2C34' : '#FFFFFF'

  return (
    <div className="flex mb-1 px-2 justify-start">
      <div className="w-full max-w-[90%]">
        <div
          className="relative overflow-hidden"
          style={{ borderRadius: '0 8px 8px 8px' }}
        >
          {/* Scrollable cards */}
          <div
            className="flex gap-2 overflow-x-auto pb-2 carousel-scroll pl-0 pr-2"
            style={{ paddingBottom: '4px' }}
          >
            {msg.cards.map((card, i) => (
              <CarouselCard key={i} card={card} dark={dark} />
            ))}
          </div>
        </div>

        {/* Timestamp */}
        <div className={`flex justify-start px-1 mt-0.5`}>
          <span
            className="text-[10px]"
            style={{ color: dark ? '#8696A0' : '#667781' }}
          >
            {msg.time}
          </span>
        </div>
      </div>
    </div>
  )
}
