export default function UnreadSeparator({ count, dark }) {
  return (
    <div className="flex justify-center my-2 px-3">
      <span
        className="text-xs px-4 py-1.5 rounded-full text-center"
        style={{
          background: dark ? '#1F3B27' : '#C4F3C4',
          color: dark ? '#A0D4A0' : '#1a6e1a',
          fontSize: '12px',
          fontWeight: '400',
        }}
      >
        {count === 1 ? 'Mensagem não lida: 1' : `${count} mensagens não lidas`}
      </span>
    </div>
  )
}
