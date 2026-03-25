export default function DateSeparator({ label, dark }) {
  return (
    <div className="flex justify-center my-2">
      <span
        className={`text-xs px-3 py-1 rounded-full shadow-sm ${
          dark
            ? 'bg-[#1F2C34] text-[#8696A0]'
            : 'bg-[#E1F2FB] text-[#54656F]'
        }`}
        style={{ fontSize: '12px' }}
      >
        {label}
      </span>
    </div>
  )
}
