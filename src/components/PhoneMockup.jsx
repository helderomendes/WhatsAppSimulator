import ChatHeader from './ChatHeader'
import WhatsAppChat from './WhatsAppChat'
import ChatInput from './ChatInput'

function StatusBar({ dark, time = '9:41' }) {
  const color = dark ? '#E9EDEF' : '#111B21'
  return (
    <div
      className="flex items-center justify-between px-6 pt-3 pb-1"
      style={{ backgroundColor: dark ? '#1F2C34' : '#075E54', height: '44px' }}
    >
      <span className="text-[15px] font-semibold" style={{ color: dark ? '#E9EDEF' : '#fff' }}>
        {time}
      </span>
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill={dark ? '#E9EDEF' : '#fff'}>
          <rect x="0" y="8" width="3" height="4" rx="0.5" opacity="1"/>
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" opacity="1"/>
          <rect x="9" y="3" width="3" height="9" rx="0.5" opacity="1"/>
          <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" opacity="0.35"/>
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 24 18" fill={dark ? '#E9EDEF' : '#fff'}>
          <path d="M12 14.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/>
          <path d="M7.76 10.34C8.97 9.12 10.4 8.5 12 8.5s3.03.62 4.24 1.84l1.42-1.42A8.5 8.5 0 0012 6.5a8.5 8.5 0 00-5.66 2.42l1.42 1.42z" opacity="0.8"/>
          <path d="M4.93 7.07A12.5 12.5 0 0112 4.5a12.5 12.5 0 017.07 2.57l1.42-1.42A14.5 14.5 0 0012 2.5a14.5 14.5 0 00-9.49 3.15l1.42 1.42z" opacity="0.5"/>
        </svg>
        {/* Battery */}
        <div className="flex items-center">
          <div className="relative w-[22px] h-[11px] rounded-[2px] border" style={{ borderColor: dark ? '#E9EDEF' : '#fff' }}>
            <div className="absolute inset-[1.5px] rounded-[1px]" style={{ backgroundColor: dark ? '#E9EDEF' : '#fff', width: '80%' }} />
          </div>
          <div className="w-[2px] h-[4px] rounded-r-[1px] ml-0.5" style={{ backgroundColor: dark ? '#E9EDEF' : '#fff' }} />
        </div>
      </div>
    </div>
  )
}

export default function PhoneMockup({ brand, messages, dark, vars, chatTime }) {
  return (
    <div
      className="relative phone-shadow"
      style={{
        width: '375px',
        height: '780px',
        borderRadius: '50px',
        background: 'linear-gradient(145deg, #3a3a3c, #1c1c1e)',
        padding: '12px',
        boxSizing: 'border-box',
      }}
    >
      {/* Side button left (volume) */}
      <div
        className="absolute"
        style={{
          left: '-3px', top: '120px', width: '3px', height: '32px',
          borderRadius: '2px 0 0 2px',
          background: 'linear-gradient(to right, #3a3a3c, #555)',
        }}
      />
      <div
        className="absolute"
        style={{
          left: '-3px', top: '160px', width: '3px', height: '32px',
          borderRadius: '2px 0 0 2px',
          background: 'linear-gradient(to right, #3a3a3c, #555)',
        }}
      />
      <div
        className="absolute"
        style={{
          left: '-3px', top: '200px', width: '3px', height: '32px',
          borderRadius: '2px 0 0 2px',
          background: 'linear-gradient(to right, #3a3a3c, #555)',
        }}
      />
      {/* Power button right */}
      <div
        className="absolute"
        style={{
          right: '-3px', top: '160px', width: '3px', height: '60px',
          borderRadius: '0 2px 2px 0',
          background: 'linear-gradient(to left, #3a3a3c, #555)',
        }}
      />

      {/* Screen */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '40px',
          background: dark ? '#0B141A' : '#E5DDD5',
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 z-10"
          style={{
            width: '120px',
            height: '34px',
            borderRadius: '20px',
            backgroundColor: '#000',
            zIndex: 20,
          }}
        />

        {/* Status bar */}
        <StatusBar dark={dark} time={chatTime || '9:41'} />

        {/* Chat header */}
        <ChatHeader brand={brand} dark={dark} />

        {/* Messages */}
        <WhatsAppChat messages={messages} dark={dark} vars={vars} />

        {/* Input */}
        <ChatInput dark={dark} />

        {/* Home indicator */}
        <div
          style={{
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: dark ? '#1F2C34' : '#F0F2F5',
          }}
        >
          <div
            style={{
              width: '120px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: dark ? '#4A5568' : '#CBD5E0',
            }}
          />
        </div>
      </div>
    </div>
  )
}
