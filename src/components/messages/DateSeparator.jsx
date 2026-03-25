export default function DateSeparator({ label, dark }) {
  return (
    <div className="flex justify-center my-3 px-3">
      <span
        className="text-xs px-3 py-1 rounded-full shadow-sm"
        style={{
          background: dark ? 'rgba(31,44,52,0.95)' : 'rgba(255,255,255,0.95)',
          color: dark ? '#8696A0' : '#667781',
          fontSize: '12.5px',
          fontWeight: '500',
          backdropFilter: 'blur(4px)',
        }}
      >
        {label}
      </span>
    </div>
  )
}
