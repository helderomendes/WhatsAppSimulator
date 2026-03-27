import { useState } from 'react'
import { Sparkle, CircleNotch, X, Plus, Trash } from '@phosphor-icons/react'
import { GoogleGenAI } from '@google/genai'

const B = '#1877F2'

const SYSTEM_PROMPT = `Você é um especialista em marketing conversacional via WhatsApp Business.
Analise o contexto fornecido e gere a conversa mais adequada, escolhendo automaticamente os tipos de mensagem certos.

RESPONDA APENAS com um array JSON válido. Zero texto extra, zero markdown, zero blocos de código.

TIPOS DE MENSAGEM DISPONÍVEIS:

1. text — mensagem de texto simples
{"id":1,"type":"text","from":"brand","text":"Olá *Maria*! 👋","time":"10:00","status":"read"}

2. separator — divisor de data (sempre o primeiro elemento)
{"id":1,"type":"separator","label":"Hoje"}

3. unread — indicador de não lidas (sempre o segundo elemento)
{"id":2,"type":"unread","count":1}

4. buttons — mensagem com botões de resposta rápida
{"id":5,"type":"buttons","from":"brand","text":"Qual opção prefere?","time":"10:02","status":"delivered","buttons":[{"text":"Opção A"},{"text":"Opção B"},{"text":"Opção C"}]}

5. cta — mensagem com botão de link/ação
{"id":6,"type":"cta","from":"brand","text":"Acesse nossa loja!","time":"10:03","status":"delivered","button":{"text":"🛒 Ver produtos","icon":"↗"}}

6. carousel — carrossel de produtos (use quando houver múltiplos produtos ou promoção visual)
{"id":7,"type":"carousel","from":"brand","time":"10:04","status":"delivered","cards":[{"gradient":"linear-gradient(135deg,#6366F1,#8B5CF6)","emoji":"👟","title":"Tênis Air Max","body":"Conforto e estilo para o dia a dia","buttons":[{"type":"url","text":"Ver produto","icon":"↗"}]},{"gradient":"linear-gradient(135deg,#F59E0B,#EF4444)","emoji":"👕","title":"Camiseta Premium","body":"Tecido 100% algodão","buttons":[{"type":"url","text":"Ver produto","icon":"↗"}]}]}

REGRAS:
- Sempre inicie com separator (id:1) e unread (id:2)
- IDs sequenciais inteiros
- Use *negrito* e _itálico_ no texto
- A marca sempre inicia a conversa
- Use carousel quando houver 2+ produtos ou for promoção de catálogo
- Use buttons para pesquisas, enquetes ou opções de resposta
- Use cta para chamadas de ação com link
- Mensagens da marca têm status "read" ou "delivered"
- Mensagens do user não têm status
- Gere a quantidade de mensagens pedida ou entre 5-10 se não especificado
- Seja criativo, natural e convincente`

function Field({ label, value, onChange, placeholder, multiline }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ color: '#6B7280', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{label}</div>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={4}
            style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', background: '#090D14', border: '1px solid #1C2130', borderRadius: '7px', color: '#D1D5DB', fontSize: '12px', padding: '8px 10px', outline: 'none', fontFamily: 'inherit', lineHeight: '1.6' }} />
        : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            style={{ width: '100%', boxSizing: 'border-box', height: '30px', background: '#090D14', border: '1px solid #1C2130', borderRadius: '7px', color: '#D1D5DB', fontSize: '12px', padding: '0 10px', outline: 'none' }} />
      }
    </div>
  )
}

export default function AIGenerateModal({ brand, vars, onGenerate, onBrandChange, onClose }) {
  const [scenario, setScenario] = useState('')
  const [products, setProducts] = useState(vars.product ? [vars.product] : [''])
  const [clientName, setClientName] = useState(vars.nome || '')
  const [coupon, setCoupon]     = useState(vars.coupon || '')
  const [discount, setDiscount] = useState(vars.discount || '')
  const [msgCount, setMsgCount] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const addProduct    = () => setProducts(p => [...p, ''])
  const removeProduct = i  => setProducts(p => p.filter((_, j) => j !== i))
  const setProduct    = (i, v) => setProducts(p => p.map((x, j) => j === i ? v : x))

  const handleGenerate = async () => {
    const apiKey = localStorage.getItem('gemini_api_key')
    if (!apiKey) { setError('Configure a chave Gemini nas configurações'); return }
    if (!scenario.trim()) { setError('Descreva o que quer gerar'); return }

    setLoading(true)
    setError('')

    try {
      const ai = new GoogleGenAI({ apiKey })
      const prods = products.filter(Boolean)

      const contents = `${SYSTEM_PROMPT}

DADOS DA CONVERSA:
- Marca: ${brand.name || 'loja'}
${clientName  ? `- Cliente: ${clientName}` : ''}
${prods.length ? `- Produto(s): ${prods.join(', ')}` : ''}
${discount    ? `- Desconto: ${discount}%` : ''}
${coupon      ? `- Cupom: ${coupon}` : ''}
${msgCount    ? `- Número de mensagens: ${msgCount}` : ''}

CENÁRIO / INSTRUÇÃO:
${scenario.trim()}

Analise o cenário, escolha os tipos de mensagem mais adequados e gere o array JSON agora.`

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

      onGenerate(messages)
      onClose()
    } catch (e) {
      setError(e.message?.includes('API_KEY') ? 'Chave inválida' : (e.message || 'Erro ao gerar'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ background: '#0C1019', borderRadius: '16px', border: '1px solid #1C2130', width: '100%', maxWidth: '460px', maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 48px rgba(0,0,0,0.6)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 18px', borderBottom: '1px solid #151A26', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: `linear-gradient(135deg, ${B}, #7C3AED)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkle size={14} color="white" weight="fill" />
            </div>
            <span style={{ color: '#F9FAFB', fontSize: '14px', fontWeight: '700' }}>Gerar conversa com IA</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4B5563', display: 'flex' }}><X size={16} /></button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '16px 18px', flex: 1 }}>

          {/* Main scenario */}
          <Field
            label="O que você quer gerar?"
            value={scenario}
            onChange={setScenario}
            multiline
            placeholder={`Ex: promoção com carrossel de 3 tênis, cliente pergunta sobre tamanhos e a marca responde com cupom de 20% off\n\nEx: pesquisa NPS pós-compra com botões de nota\n\nEx: boas-vindas pra novo cliente com CTA pra loja`}
          />

          {/* Produtos */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ color: '#6B7280', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Produto(s)</div>
            {products.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                <input value={p} onChange={e => setProduct(i, e.target.value)} placeholder={`Ex: Tênis Air Max ${i > 0 ? i + 1 : ''}`}
                  style={{ flex: 1, height: '30px', background: '#090D14', border: '1px solid #1C2130', borderRadius: '7px', color: '#D1D5DB', fontSize: '12px', padding: '0 10px', outline: 'none' }} />
                {products.length > 1 && (
                  <button onClick={() => removeProduct(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center' }}>
                    <Trash size={13} />
                  </button>
                )}
              </div>
            ))}
            <button onClick={addProduct} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: '1px dashed #1C2130', borderRadius: '7px', color: '#4B5563', fontSize: '11px', padding: '4px 10px', cursor: 'pointer', width: '100%', justifyContent: 'center' }}>
              <Plus size={11} /> Adicionar produto
            </button>
          </div>

          {/* Row: Cliente + Desconto + Cupom */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <Field label="Cliente"    value={clientName} onChange={setClientName} placeholder="Ana" />
            <Field label="Desconto %" value={discount}   onChange={setDiscount}   placeholder="20" />
            <Field label="Cupom"      value={coupon}     onChange={setCoupon}     placeholder="OFF20" />
          </div>

          <Field label="Nº de mensagens (opcional)" value={msgCount} onChange={setMsgCount} placeholder="Ex: 8" />

          {error && (
            <div style={{ color: '#EF4444', fontSize: '11px', background: '#1A0A0A', borderRadius: '6px', padding: '8px 10px' }}>{error}</div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid #151A26', flexShrink: 0, display: 'flex', gap: '8px' }}>
          <button onClick={onClose} style={{ flex: 1, height: '38px', borderRadius: '8px', background: 'transparent', border: '1px solid #1C2130', color: '#6B7280', fontSize: '12px', cursor: 'pointer' }}>
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
              : <><Sparkle size={14} weight="fill" /> Gerar</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}
