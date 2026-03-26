import { useState, useRef } from 'react'
import {
  ChatCircleText, Image, SquaresFour, ToggleLeft, Link,
  Minus, BellRinging, Trash, ArrowUp, ArrowDown, X,
  UploadSimple,
} from '@phosphor-icons/react'

const B   = '#1877F2'
const B_LT = '#60A5FA'

const TYPE_ICON_EL = {
  text:      <ChatCircleText size={14} weight="fill" color={B_LT} />,
  image:     <Image         size={14} weight="fill" color={B_LT} />,
  carousel:  <SquaresFour   size={14} weight="fill" color={B_LT} />,
  buttons:   <ToggleLeft    size={14} weight="fill" color={B_LT} />,
  cta:       <Link          size={14} weight="bold" color={B_LT} />,
  separator: <Minus         size={14} weight="bold" color="#4B5563" />,
  unread:    <BellRinging   size={14} weight="fill" color={B_LT} />,
}

const TYPE_LABELS = {
  text: 'Texto', image: 'Imagem', carousel: 'Carrossel', buttons: 'Botões',
  cta: 'Btn Link', separator: 'Separador', unread: 'Não lidas',
}

const ADDABLE_TYPES = ['text', 'image', 'carousel', 'buttons', 'cta', 'separator', 'unread']

const inputStyle = {
  width: '100%', background: '#0D0D0F', color: '#E5E7EB', fontSize: '12px',
  borderRadius: '7px', padding: '7px 10px', border: '1px solid #1C1C1E',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  transition: 'border-color 0.15s',
}

const labelStyle = { display: 'block', color: '#9CA3AF', fontSize: '10.5px', marginBottom: '3px' }

function SmallBtn({ onClick, title, color = '#9CA3AF', children }) {
  return (
    <button onClick={onClick} title={title}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 5px', color, fontSize: '13px', lineHeight: 1, borderRadius: '4px' }}
    >
      {children}
    </button>
  )
}

// Reusable image upload box with preview
function ImageUploadBox({ src, onUpload, onRemove, height = 80 }) {
  const ref = useRef()
  const readFile = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => onUpload(ev.target.result)
    reader.readAsDataURL(file)
    e.target.value = ''
  }
  return (
    <div>
      <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={readFile} />
      {src ? (
        <div style={{ position: 'relative', borderRadius: '7px', overflow: 'hidden', height }}>
          <img src={src} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <button
            onClick={onRemove}
            style={{
              position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)',
              border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer',
              color: 'white', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
          <button
            onClick={() => ref.current?.click()}
            style={{
              position: 'absolute', bottom: '4px', right: '4px', background: 'rgba(0,0,0,0.6)',
              border: 'none', borderRadius: '5px', padding: '2px 7px', cursor: 'pointer',
              color: 'white', fontSize: '10px',
            }}
          >Trocar</button>
        </div>
      ) : (
        <button
          onClick={() => ref.current?.click()}
          style={{
            width: '100%', height, border: '1px dashed #3C3C3E', borderRadius: '7px',
            background: '#1C1C1E', cursor: 'pointer', color: '#6B7280', fontSize: '12px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
          }}
        >
          <UploadSimple size={18} />
          <span>Enviar imagem</span>
        </button>
      )}
    </div>
  )
}

function TextEditor({ msg, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div>
        <label style={labelStyle}>Remetente</label>
        <select value={msg.from} onChange={e => onChange({ ...msg, from: e.target.value })} style={inputStyle}>
          <option value="brand">Marca (esquerda)</option>
          <option value="user">Usuário (direita)</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Texto (suporta *negrito*, _itálico_)</label>
        <textarea value={msg.text} onChange={e => onChange({ ...msg, text: e.target.value })} rows={4}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.45' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        <div>
          <label style={labelStyle}>Horário</label>
          <input type="text" value={msg.time || '14:30'} onChange={e => onChange({ ...msg, time: e.target.value })} style={inputStyle} placeholder="14:30" />
        </div>
        <div>
          <label style={labelStyle}>Status</label>
          <select value={msg.status || 'read'} onChange={e => onChange({ ...msg, status: e.target.value })} style={inputStyle}>
            <option value="sent">Enviado ✓</option>
            <option value="delivered">Entregue ✓✓</option>
            <option value="read">Lido ✓✓ (azul)</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function ImageEditor({ msg, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div>
        <label style={labelStyle}>Imagem</label>
        <ImageUploadBox
          src={msg.imageSrc}
          onUpload={src => onChange({ ...msg, imageSrc: src })}
          onRemove={() => onChange({ ...msg, imageSrc: null })}
          height={100}
        />
      </div>

      {/* Only show fallback options when no image uploaded */}
      {!msg.imageSrc && (
        <>
          <div>
            <label style={labelStyle}>Emoji (sem imagem)</label>
            <input type="text" value={msg.imageEmoji || '🖼️'} onChange={e => onChange({ ...msg, imageEmoji: e.target.value })} style={inputStyle} placeholder="🖼️" />
          </div>
          <div>
            <label style={labelStyle}>Gradiente de fundo</label>
            <input type="text" value={msg.imageBg || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'} onChange={e => onChange({ ...msg, imageBg: e.target.value })} style={inputStyle} />
          </div>
        </>
      )}

      <div>
        <label style={labelStyle}>Legenda (caption)</label>
        <textarea value={msg.caption || ''} onChange={e => onChange({ ...msg, caption: e.target.value })} rows={2}
          style={{ ...inputStyle, resize: 'vertical' }} placeholder="Opcional" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        <div>
          <label style={labelStyle}>Horário</label>
          <input type="text" value={msg.time || '14:30'} onChange={e => onChange({ ...msg, time: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Status</label>
          <select value={msg.status || 'read'} onChange={e => onChange({ ...msg, status: e.target.value })} style={inputStyle}>
            <option value="sent">Enviado</option>
            <option value="delivered">Entregue</option>
            <option value="read">Lido</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function CarouselEditor({ msg, onChange }) {
  const cards = msg.cards || []

  const updateCard = (i, field, val) => {
    const next = cards.map((c, j) => {
      if (j !== i) return c
      if (field === 'btnText') return { ...c, buttons: [{ text: val }] }
      return { ...c, [field]: val }
    })
    onChange({ ...msg, cards: next })
  }

  const addCard = () => {
    onChange({ ...msg, cards: [...cards, { title: 'Produto', emoji: '🛍️', body: 'Descrição do produto', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', buttons: [{ text: 'Comprar' }] }] })
  }

  const removeCard = i => onChange({ ...msg, cards: cards.filter((_, j) => j !== i) })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {cards.map((card, i) => (
        <div key={i} style={{ background: '#0D0D0F', borderRadius: '8px', padding: '8px', border: '1px solid #1C1C1E' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ color: '#9CA3AF', fontSize: '10.5px', fontWeight: '600' }}>Card {i + 1}</span>
            <SmallBtn onClick={() => removeCard(i)} color="#EF4444"><X size={12} weight="bold" /></SmallBtn>
          </div>

          {/* Image upload */}
          <div style={{ marginBottom: '6px' }}>
            <label style={labelStyle}>Imagem do card</label>
            <ImageUploadBox
              src={card.imageSrc}
              onUpload={src => updateCard(i, 'imageSrc', src)}
              onRemove={() => updateCard(i, 'imageSrc', null)}
              height={70}
            />
          </div>

          {!card.imageSrc && (
            <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr', gap: '5px', marginBottom: '5px' }}>
              <div>
                <label style={labelStyle}>Emoji</label>
                <input value={card.emoji || ''} onChange={e => updateCard(i, 'emoji', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Gradiente</label>
                <input value={card.gradient || ''} onChange={e => updateCard(i, 'gradient', e.target.value)} style={inputStyle} />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '5px' }}>
            <label style={labelStyle}>Título</label>
            <input value={card.title || ''} onChange={e => updateCard(i, 'title', e.target.value)} style={inputStyle} />
          </div>
          <div style={{ marginBottom: '5px' }}>
            <label style={labelStyle}>Descrição</label>
            <input value={card.body || ''} onChange={e => updateCard(i, 'body', e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Texto do botão</label>
            <input value={card.buttons?.[0]?.text || card.btn || ''} onChange={e => updateCard(i, 'btnText', e.target.value)} style={inputStyle} />
          </div>
        </div>
      ))}
      <button
        onClick={addCard}
        style={{ background: '#0D0D0F', color: '#1877F2', border: '1px dashed #1877F240', borderRadius: '7px', padding: '7px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
      >
        + Adicionar card
      </button>
    </div>
  )
}

function ButtonsEditor({ msg, onChange }) {
  const buttons = msg.buttons || []
  const updateBtn = (i, val) => onChange({ ...msg, buttons: buttons.map((b, j) => j === i ? { ...b, text: val } : b) })
  const addBtn = () => onChange({ ...msg, buttons: [...buttons, { id: `btn${Date.now()}`, text: 'Opção' }] })
  const removeBtn = i => onChange({ ...msg, buttons: buttons.filter((_, j) => j !== i) })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div>
        <label style={labelStyle}>Texto da mensagem</label>
        <textarea value={msg.text || ''} onChange={e => onChange({ ...msg, text: e.target.value })} rows={3}
          style={{ ...inputStyle, resize: 'vertical' }} />
      </div>
      <label style={{ ...labelStyle, marginTop: '4px' }}>Botões de resposta rápida</label>
      {buttons.map((btn, i) => (
        <div key={i} style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <input value={btn.text || btn.label || ''} onChange={e => updateBtn(i, e.target.value)} style={{ ...inputStyle, flex: 1 }} placeholder={`Botão ${i + 1}`} />
          <SmallBtn onClick={() => removeBtn(i)} color="#EF4444"><X size={12} weight="bold" /></SmallBtn>
        </div>
      ))}
      <button onClick={addBtn}
        style={{ background: '#0D0D0F', color: '#1877F2', border: '1px dashed #1877F240', borderRadius: '7px', padding: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
      >
        + Adicionar botão
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        <div>
          <label style={labelStyle}>Horário</label>
          <input value={msg.time || '14:30'} onChange={e => onChange({ ...msg, time: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Status</label>
          <select value={msg.status || 'read'} onChange={e => onChange({ ...msg, status: e.target.value })} style={inputStyle}>
            <option value="sent">Enviado</option>
            <option value="delivered">Entregue</option>
            <option value="read">Lido</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function CTAEditor({ msg, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div>
        <label style={labelStyle}>Texto da mensagem</label>
        <textarea value={msg.text || ''} onChange={e => onChange({ ...msg, text: e.target.value })} rows={3}
          style={{ ...inputStyle, resize: 'vertical' }} />
      </div>
      <div>
        <label style={labelStyle}>Texto do botão</label>
        <input value={msg.btnLabel || 'Acessar'} onChange={e => onChange({ ...msg, btnLabel: e.target.value })} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>URL (opcional)</label>
        <input value={msg.btnUrl || '#'} onChange={e => onChange({ ...msg, btnUrl: e.target.value })} style={inputStyle} placeholder="https://..." />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        <div>
          <label style={labelStyle}>Horário</label>
          <input value={msg.time || '14:30'} onChange={e => onChange({ ...msg, time: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Status</label>
          <select value={msg.status || 'read'} onChange={e => onChange({ ...msg, status: e.target.value })} style={inputStyle}>
            <option value="sent">Enviado</option>
            <option value="delivered">Entregue</option>
            <option value="read">Lido</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function SeparatorEditor({ msg, onChange }) {
  return (
    <div>
      <label style={labelStyle}>Texto do separador</label>
      <input value={msg.label || 'Hoje'} onChange={e => onChange({ ...msg, label: e.target.value })} style={inputStyle} placeholder="Hoje" />
    </div>
  )
}

function UnreadEditor({ msg, onChange }) {
  return (
    <div>
      <label style={labelStyle}>Quantidade de não lidas</label>
      <input type="number" min="1" value={msg.count || 1}
        onChange={e => onChange({ ...msg, count: parseInt(e.target.value) || 1 })} style={inputStyle} />
    </div>
  )
}

function MsgPreviewText({ msg }) {
  const preview = (() => {
    switch (msg.type) {
      case 'text': return (msg.text || '').replace(/[*_~]/g, '').slice(0, 50)
      case 'image': return msg.imageSrc ? '📷 Imagem enviada' : `${msg.imageEmoji || '🖼️'} ${msg.imageLabel || 'Imagem'}`
      case 'carousel': return `${(msg.cards || []).length} card${(msg.cards || []).length !== 1 ? 's' : ''}`
      case 'buttons': return (msg.text || '').replace(/[*_~]/g, '').slice(0, 40)
      case 'cta': return `${(msg.text || '').replace(/[*_~]/g, '').slice(0, 30)} · ${msg.btnLabel || 'Botão'}`
      case 'separator': return msg.label || 'Hoje'
      case 'unread': return `${msg.count || 1} não lida(s)`
      default: return ''
    }
  })()
  return <span style={{ color: '#9CA3AF', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{preview}</span>
}

function newMsg(type) {
  const id = Date.now()
  switch (type) {
    case 'text': return { id, type: 'text', from: 'brand', text: 'Nova mensagem', time: '14:30', status: 'read' }
    case 'image': return { id, type: 'image', from: 'brand', imageSrc: null, imageEmoji: '🖼️', imageLabel: 'Produto', imageBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', time: '14:30', status: 'read' }
    case 'carousel': return { id, type: 'carousel', from: 'brand', cards: [{ title: 'Produto', emoji: '🛍️', body: 'Descrição', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', buttons: [{ text: 'Comprar' }] }] }
    case 'buttons': return { id, type: 'buttons', from: 'brand', text: 'Escolha uma opção:', buttons: [{ id: 'b1', text: 'Sim' }, { id: 'b2', text: 'Não' }], time: '14:30', status: 'read' }
    case 'cta': return { id, type: 'cta', from: 'brand', text: 'Confira o link:', btnLabel: 'Acessar', btnUrl: '#', time: '14:30', status: 'read' }
    case 'separator': return { id, type: 'separator', label: 'Hoje' }
    case 'unread': return { id, type: 'unread', count: 1 }
    default: return { id, type: 'text', from: 'brand', text: '', time: '14:30', status: 'read' }
  }
}

export default function MessageEditor({ messages, onChange }) {
  const [expandedId, setExpandedId] = useState(null)
  const [showTypePicker, setShowTypePicker] = useState(false)

  const toggle = id => setExpandedId(prev => prev === id ? null : id)
  const updateMsg = (id, updated) => onChange(messages.map(m => m.id === id ? updated : m))
  const deleteMsg = id => onChange(messages.filter(m => m.id !== id))
  const moveUp = i => {
    if (i === 0) return
    const next = [...messages];
    [next[i - 1], next[i]] = [next[i], next[i - 1]]
    onChange(next)
  }
  const moveDown = i => {
    if (i === messages.length - 1) return
    const next = [...messages];
    [next[i], next[i + 1]] = [next[i + 1], next[i]]
    onChange(next)
  }
  const addMsg = type => {
    const msg = newMsg(type)
    onChange([...messages, msg])
    setExpandedId(msg.id)
    setShowTypePicker(false)
  }

  const renderEditor = msg => {
    switch (msg.type) {
      case 'text': return <TextEditor msg={msg} onChange={u => updateMsg(msg.id, u)} />
      case 'image': return <ImageEditor msg={msg} onChange={u => updateMsg(msg.id, u)} />
      case 'carousel': return <CarouselEditor msg={msg} onChange={u => updateMsg(msg.id, u)} />
      case 'buttons': return <ButtonsEditor msg={msg} onChange={u => updateMsg(msg.id, u)} />
      case 'cta': return <CTAEditor msg={msg} onChange={u => updateMsg(msg.id, u)} />
      case 'separator': return <SeparatorEditor msg={msg} onChange={u => updateMsg(msg.id, u)} />
      case 'unread': return <UnreadEditor msg={msg} onChange={u => updateMsg(msg.id, u)} />
      default: return null
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0, width: '100%' }}>
      {messages.length === 0 && (
        <div style={{ color: '#6B7280', fontSize: '12px', textAlign: 'center', padding: '20px 0' }}>
          Nenhuma mensagem. Adicione abaixo.
        </div>
      )}

      {messages.map((msg, i) => {
        const expanded = expandedId === msg.id
        return (
          <div key={msg.id} style={{
            background: expanded ? '#111113' : '#0D0D0F',
            borderRadius: '9px',
            border: `1px solid ${expanded ? '#1877F250' : '#111113'}`,
            overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 8px 8px 10px', cursor: 'pointer' }}
              onClick={() => toggle(msg.id)}>
              <span style={{ flexShrink: 0, display: 'flex' }}>{TYPE_ICON_EL[msg.type] || <Minus size={14} />}</span>
              <span style={{ color: '#E9EDEF', fontSize: '11px', fontWeight: '600', flexShrink: 0, width: '56px' }}>{TYPE_LABELS[msg.type]}</span>
              <MsgPreviewText msg={msg} />
              <div style={{ display: 'flex', gap: '1px', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                <SmallBtn onClick={() => moveUp(i)} color={i === 0 ? '#3C3C3E' : '#9CA3AF'}><ArrowUp size={13} /></SmallBtn>
                <SmallBtn onClick={() => moveDown(i)} color={i === messages.length - 1 ? '#3C3C3E' : '#9CA3AF'}><ArrowDown size={13} /></SmallBtn>
                <SmallBtn onClick={() => deleteMsg(msg.id)} color="#EF4444"><Trash size={13} /></SmallBtn>
              </div>
              <span style={{ color: expanded ? '#1877F2' : '#6B7280', flexShrink: 0, display: 'flex' }}>
                {expanded
                  ? <ArrowDown size={12} weight="bold" />
                  : <ArrowDown size={12} weight="bold" style={{ transform: 'rotate(-90deg)' }} />}
              </span>
            </div>
            {expanded && (
              <div style={{ borderTop: '1px solid #111113', padding: '10px' }}>
                {renderEditor(msg)}
              </div>
            )}
          </div>
        )
      })}

      {showTypePicker ? (
        <div style={{ background: '#0D0D0F', borderRadius: '10px', padding: '10px', border: '1px solid #1C1C1E' }}>
          <div style={{ color: '#9CA3AF', fontSize: '10.5px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
            Tipo de mensagem
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
            {ADDABLE_TYPES.map(t => (
              <button key={t} onClick={() => addMsg(t)} style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                background: '#111113', color: '#9CA3AF', border: '1px solid #1C1C1E',
                borderRadius: '7px', padding: '7px 9px', cursor: 'pointer', fontSize: '12px',
              }}>
                <span style={{ display: 'flex' }}>{TYPE_ICON_EL[t] || <Minus size={14} />}</span>
                <span>{TYPE_LABELS[t]}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setShowTypePicker(false)}
            style={{ marginTop: '8px', width: '100%', background: 'none', color: '#6B7280', border: 'none', cursor: 'pointer', fontSize: '12px', padding: '4px' }}>
            Cancelar
          </button>
        </div>
      ) : (
        <button onClick={() => setShowTypePicker(true)} style={{
          background: '#0D0D0F', color: '#1877F2', border: '1px dashed #1877F250',
          borderRadius: '9px', padding: '9px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', marginTop: '2px',
        }}>
          + Adicionar mensagem
        </button>
      )}
    </div>
  )
}
