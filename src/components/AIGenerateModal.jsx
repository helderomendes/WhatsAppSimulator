import { useState } from 'react'
import { Sparkle, CircleNotch, X, Plus, Trash } from '@phosphor-icons/react'
import { GoogleGenAI } from '@google/genai'

const B = '#1877F2'

const INTENTS = [
  { id: 'reactivation',  label: 'Reativação',       emoji: '🔄' },
  { id: 'promotion',     label: 'Promoção',          emoji: '🎯' },
  { id: 'launch',        label: 'Lançamento',        emoji: '🚀' },
  { id: 'repurchase',    label: 'Recompra',          emoji: '🛒' },
  { id: 'nps',           label: 'Pesquisa NPS',      emoji: '⭐' },
  { id: 'support',       label: 'Suporte',           emoji: '💬' },
  { id: 'abandoned',     label: 'Carrinho Abandono', emoji: '🛍️' },
  { id: 'welcome',       label: 'Boas-vindas',       emoji: '👋' },
  { id: 'upsell',        label: 'Upsell',            emoji: '⬆️' },
  { id: 'custom',        label: 'Livre',             emoji: '✏️' },
]

const TONES = [
  { id: 'friendly',     label: 'Amigável' },
  { id: 'professional', label: 'Profissional' },
  { id: 'urgent',       label: 'Urgente' },
  { id: 'playful',      label: 'Descontraído' },
]

const SYSTEM_PROMPT = `Você é um especialista em marketing conversacional via WhatsApp Business.
Gere uma conversa realista entre uma marca e um cliente.

FORMATO: responda APENAS com um array JSON válido, sem texto extra, sem markdown, sem blocos de código.

Cada mensagem:
- id: número sequencial a partir de 1
- type: "text" | "separator" | "unread"
- from: "brand" | "user" (omitir em separator/unread)
- text: texto com *negrito*, _itálico_, emojis e quebras de linha \\n
- time: "HH:MM"
- status: "read" (só mensagens da marca)

REGRAS:
- Inicie com {"id":1,"type":"separator","label":"Hoje"} e {"id":2,"type":"unread","count":1}
- A marca sempre inicia
- IDs sequenciais
- Entre 4 e 12 mensagens`

function Field({ label, value, onChange, placeholder, multiline }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ color: '#6B7280', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{label}</div>
      {multiline
        ? <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            style={{
              width: '100%', boxSizing: 'border-box', resize: 'vertical',
              background: '#090D14', border: '1px solid #1C2130', borderRadius: '7px',
              color: '#D1D5DB', fontSize: '12px', padding: '8px 10px',
              outline: 'none', fontFamily: 'inherit', lineHeight: '1.5',
            }}
          />
        : <input
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            style={{
              width: '100%', boxSizing: 'border-box', height: '30px',
              background: '#090D14', border: '1px solid #1C2130', borderRadius: '7px',
              color: '#D1D5DB', fontSize: '12px', padding: '0 10px', outline: 'none',
            }}
          />
      }
    </div>
  )
}

export default function AIGenerateModal({ brand, vars, onGenerate, onBrandChange, onClose }) {
  const [intent, setIntent]       = useState('promotion')
  const [tone, setTone]           = useState('friendly')
  const [brandName, setBrandName] = useState(brand.name || '')
  const [clientName, setClientName] = useState(vars.nome || '')
  const [products, setProducts]   = useState(vars.product ? [vars.product] : [''])
  const [coupon, setCoupon]       = useState(vars.coupon || '')
  const [discount, setDiscount]   = useState(vars.discount || '')
  const [extra, setExtra]         = useState('')
  const [msgCount, setMsgCount]   = useState('6')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  const addProduct    = () => setProducts(p => [...p, ''])
  const removeProduct = i => setProducts(p => p.filter((_, j) => j !== i))
  const setProduct    = (i, v) => setProducts(p => p.map((x, j) => j === i ? v : x))

  const handleGenerate = async () => {
    const apiKey = localStorage.getItem('gemini_api_key')
    if (!apiKey) { setError('Configure a chave Gemini nas configurações'); return }

    setLoading(true)
    setError('')

    try {
      const ai = new GoogleGenAI({ apiKey })

      const intentLabel = INTENTS.find(i => i.id === intent)?.label || intent
      const toneLabel   = TONES.find(t => t.id === tone)?.label || tone
      const prods       = products.filter(Boolean)

      const contents = `${SYSTEM_PROMPT}

CONTEXTO DA CONVERSA:
- Marca: ${brandName || 'loja'}
- Intenção: ${intentLabel}
- Tom: ${toneLabel}
- Número de mensagens: ~${msgCount}
${clientName  ? `- Nome do cliente: ${clientName}` : ''}
${prods.length ? `- Produto(s): ${prods.join(', ')}` : ''}
${discount    ? `- Desconto: ${discount}%` : ''}
${coupon      ? `- Cupom: ${coupon}` : ''}
${extra       ? `- Contexto extra: ${extra}` : ''}

Gere a conversa agora. Lembre-se: APENAS o array JSON.`

      const MODELS = [
        'gemini-2.0-flash-lite',
        'gemini-2.5-flash',
        'gemini-2.0-flash-exp',
        'gemini-1.5-flash-latest',
        'gemini-2.5-pro',
      ]
      let result = null, lastErr = null
      for (const model of MODELS) {
        try { result = await ai.models.generateContent({ model, contents }); break }
        catch (e) { lastErr = e }
      }
      if (!result) throw lastErr

      const raw   = result.text.trim()
      const clean = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
      const messages = JSON.parse(clean)
      if (!Array.isArray(messages)) throw new Error('Resposta inválida da IA')

      if (brandName.trim() && brandName.trim() !== brand.name) {
        onBrandChange({ ...brand, name: brandName.trim() })
      }
      onGenerate(messages)
      onClose()
    } catch (e) {
      setError(e.message?.includes('API_KEY') ? 'Chave inválida' : (e.message || 'Erro ao gerar'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
    }}>
      <div style={{
        background: '#0C1019', borderRadius: '16px', border: '1px solid #1C2130',
        width: '100%', maxWidth: '460px', maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 48px rgba(0,0,0,0.6)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid #151A26', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: `linear-gradient(135deg, ${B}, #7C3AED)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkle size={14} color="white" weight="fill" />
            </div>
            <span style={{ color: '#F9FAFB', fontSize: '14px', fontWeight: '700' }}>Gerar conversa com IA</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4B5563', display: 'flex' }}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '16px 18px', flex: 1 }}>

          {/* Intent */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ color: '#6B7280', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Intenção</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {INTENTS.map(i => (
                <button key={i.id} onClick={() => setIntent(i.id)} style={{
                  padding: '4px 10px', borderRadius: '20px', fontSize: '11px', cursor: 'pointer',
                  background: intent === i.id ? B : '#151A26',
                  border: intent === i.id ? 'none' : '1px solid #1C2130',
                  color: intent === i.id ? 'white' : '#9CA3AF',
                  fontWeight: intent === i.id ? '600' : '400',
                }}>
                  {i.emoji} {i.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ color: '#6B7280', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Tom</div>
            <div style={{ display: 'flex', gap: '5px' }}>
              {TONES.map(t => (
                <button key={t.id} onClick={() => setTone(t.id)} style={{
                  flex: 1, padding: '5px 0', borderRadius: '7px', fontSize: '11px', cursor: 'pointer',
                  background: tone === t.id ? '#1C2130' : 'transparent',
                  border: tone === t.id ? `1px solid ${B}` : '1px solid #1C2130',
                  color: tone === t.id ? '#60A5FA' : '#6B7280',
                  fontWeight: tone === t.id ? '600' : '400',
                }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: '1px', background: '#151A26', margin: '12px 0' }} />

          {/* Marca + Cliente */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <Field label="Marca"   value={brandName}   onChange={setBrandName}   placeholder="Ex: Nike" />
            <Field label="Cliente" value={clientName}  onChange={setClientName}  placeholder="Ex: Ana" />
          </div>

          {/* Produtos */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ color: '#6B7280', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Produto(s)</div>
            {products.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                <input
                  value={p}
                  onChange={e => setProduct(i, e.target.value)}
                  placeholder={`Ex: Tênis Air Max ${i > 0 ? i + 1 : ''}`}
                  style={{
                    flex: 1, height: '30px', background: '#090D14', border: '1px solid #1C2130',
                    borderRadius: '7px', color: '#D1D5DB', fontSize: '12px', padding: '0 10px', outline: 'none',
                  }}
                />
                {products.length > 1 && (
                  <button onClick={() => removeProduct(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center' }}>
                    <Trash size={13} />
                  </button>
                )}
              </div>
            ))}
            <button onClick={addProduct} style={{
              display: 'flex', alignItems: 'center', gap: '4px', background: 'none',
              border: '1px dashed #1C2130', borderRadius: '7px', color: '#4B5563',
              fontSize: '11px', padding: '4px 10px', cursor: 'pointer', width: '100%', justifyContent: 'center',
            }}>
              <Plus size={11} /> Adicionar produto
            </button>
          </div>

          {/* Desconto + Cupom + Nº mensagens */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <Field label="Desconto %" value={discount} onChange={setDiscount} placeholder="Ex: 20" />
            <Field label="Cupom"      value={coupon}   onChange={setCoupon}   placeholder="Ex: VOLTA20" />
            <Field label="Nº msgs"    value={msgCount} onChange={setMsgCount} placeholder="6" />
          </div>

          {/* Extra */}
          <Field
            label="Contexto extra"
            value={extra}
            onChange={setExtra}
            placeholder="Ex: cliente já comprou antes, produto está em promoção relâmpago de 24h..."
            multiline
          />

          {error && (
            <div style={{ color: '#EF4444', fontSize: '11px', background: '#1A0A0A', borderRadius: '6px', padding: '8px 10px', marginTop: '4px' }}>
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid #151A26', flexShrink: 0, display: 'flex', gap: '8px' }}>
          <button onClick={onClose} style={{
            flex: 1, height: '38px', borderRadius: '8px', background: 'transparent',
            border: '1px solid #1C2130', color: '#6B7280', fontSize: '12px', cursor: 'pointer',
          }}>
            Cancelar
          </button>
          <button onClick={handleGenerate} disabled={loading} style={{
            flex: 3, height: '38px', borderRadius: '8px',
            background: loading ? '#1C2130' : `linear-gradient(135deg, ${B}, #7C3AED)`,
            border: 'none', color: 'white', fontSize: '13px', fontWeight: '600',
            cursor: loading ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}>
            {loading
              ? <><CircleNotch size={14} style={{ animation: 'spin 0.8s linear infinite' }} /> Gerando...</>
              : <><Sparkle size={14} weight="fill" /> Gerar conversa</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}
