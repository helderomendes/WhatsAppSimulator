import { useState } from 'react'
import { Sparkle, CircleNotch, X, ArrowRight } from '@phosphor-icons/react'
import { GoogleGenAI } from '@google/genai'

const B = '#1877F2'

const SYSTEM_PROMPT = `Você é um especialista em marketing via WhatsApp Business.
Gere uma conversa realista de WhatsApp entre uma marca e um cliente.

FORMATO: responda APENAS com um array JSON válido de mensagens, sem nenhum texto extra, sem markdown, sem blocos de código.

Cada mensagem tem:
- id: número sequencial começando em 1
- type: "text" (padrão), "separator" (divisor de data), "unread" (indicador de não lidas)
- from: "brand" (marca) ou "user" (cliente) — omitir em separator e unread
- text: texto da mensagem (suporte a *negrito*, _itálico_, emojis)
- time: horário no formato "HH:MM"
- status: "read" (para mensagens da marca)

REGRAS:
- Sempre comece com { id:1, type:"separator", label:"Hoje" } e { id:2, type:"unread", count:1 }
- A marca inicia a conversa
- Tom natural, humano, com emojis moderados
- Use *negrito* para destacar ofertas, preços, cupons
- Entre 4 e 10 mensagens no total
- IDs sequenciais

EXEMPLO de saída:
[{"id":1,"type":"separator","label":"Hoje"},{"id":2,"type":"unread","count":1},{"id":3,"type":"text","from":"brand","text":"Oi Maria! 👋 Temos uma oferta especial pra você hoje!","time":"10:30","status":"read"},{"id":4,"type":"text","from":"user","text":"Oi! Que oferta é essa?","time":"10:31"},{"id":5,"type":"text","from":"brand","text":"*20% OFF* em toda a loja com o cupom *MARIA20*! 🎉","time":"10:31","status":"read"}]`

export default function AIGenerateModal({ brand, vars, onGenerate, onClose }) {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    const apiKey = localStorage.getItem('gemini_api_key')
    if (!apiKey) {
      setError('Configure a chave Gemini nas configurações (engrenagem)')
      return
    }
    if (!prompt.trim()) {
      setError('Descreva o cenário da conversa')
      return
    }

    setLoading(true)
    setError('')

    try {
      const ai = new GoogleGenAI({ apiKey })

      const userPrompt = `${SYSTEM_PROMPT}

Marca: ${brand.name || 'loja'}
Cenário: ${prompt.trim()}
${vars.nome ? `Nome do cliente: ${vars.nome}` : ''}
${vars.product ? `Produto: ${vars.product}` : ''}
${vars.coupon ? `Cupom: ${vars.coupon}` : ''}
${vars.discount ? `Desconto: ${vars.discount}%` : ''}

Gere a conversa agora.`

      const result = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: userPrompt,
      })

      const raw = result.text.trim()
      // Strip markdown code blocks if present
      const clean = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
      const messages = JSON.parse(clean)

      if (!Array.isArray(messages)) throw new Error('Resposta inválida da IA')

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
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
    }}>
      <div style={{
        background: '#0C1019', borderRadius: '16px', border: '1px solid #1C2130',
        width: '100%', maxWidth: '420px', padding: '20px',
        boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: `linear-gradient(135deg, ${B}, #7C3AED)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkle size={14} color="white" weight="fill" />
            </div>
            <span style={{ color: '#F9FAFB', fontSize: '14px', fontWeight: '700' }}>Gerar conversa com IA</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4B5563', display: 'flex' }}>
            <X size={16} />
          </button>
        </div>

        {/* Prompt */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ color: '#6B7280', fontSize: '10.5px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
            Descreva o cenário
          </div>
          <textarea
            autoFocus
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && e.metaKey && handleGenerate()}
            placeholder={`Ex: cliente pergunta sobre rastreio do pedido de tênis, marca responde com link e oferece cupom pra próxima compra`}
            rows={4}
            style={{
              width: '100%', boxSizing: 'border-box',
              background: '#090D14', border: '1px solid #1C2130', borderRadius: '8px',
              color: '#D1D5DB', fontSize: '12.5px', padding: '10px 12px',
              outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.5',
            }}
          />
        </div>

        {/* Context pills */}
        {(brand.name || vars.product) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
            {brand.name && (
              <span style={{ background: '#1C2130', color: '#9CA3AF', fontSize: '10px', padding: '2px 8px', borderRadius: '20px' }}>
                marca: {brand.name}
              </span>
            )}
            {vars.product && (
              <span style={{ background: '#1C2130', color: '#9CA3AF', fontSize: '10px', padding: '2px 8px', borderRadius: '20px' }}>
                produto: {vars.product}
              </span>
            )}
            {vars.nome && (
              <span style={{ background: '#1C2130', color: '#9CA3AF', fontSize: '10px', padding: '2px 8px', borderRadius: '20px' }}>
                cliente: {vars.nome}
              </span>
            )}
          </div>
        )}

        {error && (
          <div style={{ color: '#EF4444', fontSize: '11px', marginBottom: '10px', background: '#1A0A0A', borderRadius: '6px', padding: '8px 10px' }}>
            {error}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, height: '36px', borderRadius: '8px',
              background: 'transparent', border: '1px solid #1C2130',
              color: '#6B7280', fontSize: '12px', cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              flex: 2, height: '36px', borderRadius: '8px',
              background: loading ? '#1C2130' : `linear-gradient(135deg, ${B}, #7C3AED)`,
              border: 'none', color: 'white', fontSize: '12px', fontWeight: '600',
              cursor: loading ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            }}
          >
            {loading
              ? <><CircleNotch size={13} style={{ animation: 'spin 0.8s linear infinite' }} /> Gerando...</>
              : <><Sparkle size={13} weight="fill" /> Gerar conversa</>
            }
          </button>
        </div>
        <div style={{ color: '#374151', fontSize: '10px', textAlign: 'center', marginTop: '8px' }}>⌘Enter para gerar</div>
      </div>
    </div>
  )
}
