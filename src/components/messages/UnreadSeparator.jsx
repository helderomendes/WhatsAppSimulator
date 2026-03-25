export default function UnreadSeparator({ count, dark }) {
  return (
    <div className="flex justify-center my-2">
      <span
        className={`text-xs px-3 py-1 rounded-full ${
          dark ? 'bg-[#1F2C34] text-[#8696A0]' : 'bg-[#FFF9C4] text-[#54656F]'
        }`}
        style={{ fontSize: '12px' }}
      >
        {count === 1 ? 'Mensagem não lida: 1' : `${count} mensagens não lidas`}
      </span>
    </div>
  )
}
