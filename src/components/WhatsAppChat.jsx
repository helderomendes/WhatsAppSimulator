import { useRef, useEffect } from 'react'
import DateSeparator from './messages/DateSeparator'
import UnreadSeparator from './messages/UnreadSeparator'
import TextMessage from './messages/TextMessage'
import ImageMessage from './messages/ImageMessage'
import CarouselMessage from './messages/CarouselMessage'
import ButtonsMessage from './messages/ButtonsMessage'
import CTAMessage from './messages/CTAMessage'
import { applyVars } from '../utils/text'

function applyVarsToMsg(msg, vars) {
  const process = (val) => {
    if (typeof val === 'string') return applyVars(val, vars)
    if (Array.isArray(val)) return val.map(process)
    if (val && typeof val === 'object') {
      const out = {}
      for (const k in val) out[k] = process(val[k])
      return out
    }
    return val
  }
  return process(msg)
}

export default function WhatsAppChat({ messages, dark, vars, wallpaper }) {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const processed = messages.map(m => applyVarsToMsg(m, vars))

  return (
    <div
      className="flex-1 overflow-y-auto chat-scroll py-2"
      style={wallpaper?.style ?? (dark ? { backgroundColor: '#0B141A' } : { backgroundColor: '#D9E5BE' })}
    >
      {processed.map((msg) => {
        switch (msg.type) {
          case 'separator':
            return <DateSeparator key={msg.id} label={msg.label} dark={dark} />
          case 'unread':
            return <UnreadSeparator key={msg.id} count={msg.count} dark={dark} />
          case 'text':
            return <TextMessage key={msg.id} msg={msg} dark={dark} vars={vars} />
          case 'image':
            return <ImageMessage key={msg.id} msg={msg} dark={dark} />
          case 'carousel':
            return <CarouselMessage key={msg.id} msg={msg} dark={dark} />
          case 'buttons':
            return <ButtonsMessage key={msg.id} msg={msg} dark={dark} />
          case 'cta':
            return <CTAMessage key={msg.id} msg={msg} dark={dark} />
          default:
            return null
        }
      })}
      <div ref={endRef} className="h-2" />
    </div>
  )
}
