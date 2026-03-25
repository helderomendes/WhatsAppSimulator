export default function ReadReceipt({ status }) {
  if (status === 'sending') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" className="inline-block ml-0.5 flex-shrink-0">
        <circle cx="6" cy="6" r="5" stroke="#8696A0" strokeWidth="1.2" fill="none" strokeDasharray="3 2"/>
      </svg>
    )
  }
  if (status === 'sent') {
    return (
      <svg width="13" height="9" viewBox="0 0 13 9" fill="none" className="inline-block ml-0.5 flex-shrink-0">
        <path d="M1 4.5L4.5 8L12 1" stroke="#8696A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  if (status === 'delivered') {
    return (
      <svg width="16" height="9" viewBox="0 0 16 9" fill="none" className="inline-block ml-0.5 flex-shrink-0">
        <path d="M1 4.5L4.5 8L12 1" stroke="#8696A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 4.5L7.5 8L15 1" stroke="#8696A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  // read — blue ticks
  return (
    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" className="inline-block ml-0.5 flex-shrink-0">
      <path d="M1 4.5L4.5 8L12 1" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 4.5L7.5 8L15 1" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
