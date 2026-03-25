// SVG tail for message bubbles (like WhatsApp)
export function TailIn({ color }) {
  return (
    <svg
      className="absolute -left-[8px] bottom-0"
      width="8"
      height="13"
      viewBox="0 0 8 13"
      fill="none"
    >
      <path d="M7 0C7 0 7 13 0 13C0 13 3.5 13 7 0Z" fill={color} />
    </svg>
  )
}

export function TailOut({ color }) {
  return (
    <svg
      className="absolute -right-[8px] bottom-0"
      width="8"
      height="13"
      viewBox="0 0 8 13"
      fill="none"
    >
      <path d="M1 0C1 0 1 13 8 13C8 13 4.5 13 1 0Z" fill={color} />
    </svg>
  )
}
