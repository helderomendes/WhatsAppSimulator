// WhatsApp-style read receipts
export default function ReadReceipt({ status, dark }) {
  if (status === 'sending') {
    return (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="inline-block ml-1">
        <circle cx="8" cy="8" r="7" stroke="#8696A0" strokeWidth="1.5" strokeDasharray="4 2" />
      </svg>
    )
  }
  if (status === 'sent') {
    return (
      <svg width="14" height="10" viewBox="0 0 16 11" fill="none" className="inline-block ml-1">
        <path d="M1 5.5L5.5 10L15 1" stroke="#8696A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  if (status === 'delivered') {
    return (
      <svg width="16" height="10" viewBox="0 0 18 11" fill="none" className="inline-block ml-1">
        <path d="M1 5.5L5.5 10L15 1" stroke="#8696A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 5.5L9.5 10L19 1" stroke="#8696A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  // read - blue
  return (
    <svg width="16" height="10" viewBox="0 0 18 11" fill="none" className="inline-block ml-1">
      <path d="M1 5.5L5.5 10L15 1" stroke="#53BDEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 5.5L9.5 10L19 1" stroke="#53BDEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
