import { useState, useRef, useEffect } from 'react'
import {
  PaperPlaneTilt, Robot, ArrowLeft, Key, Eye, EyeSlash,
  CircleNotch, ChatTeardropText, WarningCircle,
} from '@phosphor-icons/react'
import { chatWithAgent } from '../services/claudeApi'

const B = '#1877F2'
const B10 = '#1877F21A'
const B50 = '#1877F280'

function getCurrentTime() {
  const now = new Date()
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}

export default function AIChatTab({ onMessagesChange, brand }) {
  const [phase, setPhase] = useState('setup')
  const [agentTheme, setAgentTheme] = useState('')
  const [claudeKey, setClaudeKey] = useState(() => localStorage.getItem('claude_api_key') || '')
  const [showKey, setShowKey] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const historyEndRef = useRef(null)

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory, loading])

  const handleStart = () => {
    if (!claudeKey.trim() || !agentTheme.trim()) return
    localStorage.setItem('claude_api_key', claudeKey.trim())
    onMessagesChange([
      { id: 1, type: 'separator', label: 'Hoje' },
      { id: 2, type: 'unread', count: 1 },
    ])
    setChatHistory([])
    setError('')
    setPhase('chat')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleReset = () => {
    setPhase('setup')
    setChatHistory([])
    setError('')
    setInput('')
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setError('')

    const time = getCurrentTime()
    const userId = Date.now()
    const brandId = Date.now() + 1

    const userMsg = { id: userId, type: 'text', from: 'user', text, time }
    const brandMsg = { id: brandId, type: 'text', from: 'brand', text: '...', time, status: 'delivered' }

    const newHistory = [...chatHistory, { role: 'user', content: text }]
    setChatHistory(newHistory)
    onMessagesChange(prev => [...prev, userMsg, brandMsg])
    setLoading(true)

    try {
      let fullResponse = ''
      await chatWithAgent(claudeKey, agentTheme, newHistory, (chunk) => {
        fullResponse = chunk
        onMessagesChange(prev =>
          prev.map(m => m.id === brandId ? { ...m, text: chunk } : m)
        )
      })
      setChatHistory(h => [...h, { role: 'assistant', content: fullResponse }])
    } catch (e) {
      setError(e.message || 'Erro ao conectar com a IA')
      onMessagesChange(prev => prev.filter(m => m.id !== brandId))
      setChatHistory(h => h.slice(0, -1))
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // ── Setup phase ─────────────────────────────────────────────────────────────
  if (phase === 'setup') {
    const ready = claudeKey.trim() && agentTheme.trim()
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px', background: B10, borderRadius: '10px', border: `1px solid ${B50}` }}>
          <Robot size={20} weight="fill" color={B} style={{ flexShrink: 0, marginTop: '1px' }} />
          <div style={{ color: '#9CA3AF', fontSize: '11.5px', lineHeight: '1.6' }}>
            Configure um agente de IA e converse com ele diretamente no simulador. Cada mensagem aparece no mockup em tempo real.
          </div>
        </div>

        {/* Claude API Key */}
        <div>
          <div style={{ color: '#4B5563', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
            Chave da API Claude
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Key size={13} color="#4B5563" style={{ position: 'absolute', left: '9px', pointerEvents: 'none' }} />
            <input
              type={showKey ? 'text' : 'password'}
              value={claudeKey}
              onChange={e => setClaudeKey(e.target.value)}
              placeholder="sk-ant-..."
              style={{
                width: '100%', paddingLeft: '28px', paddingRight: '32px',
                height: '32px', borderRadius: '8px',
                border: `1px solid ${claudeKey ? B50 : '#1C2130'}`,
                background: '#0F131C', color: '#D1D5DB', fontSize: '12px',
                outline: 'none', boxSizing: 'border-box',
              }}
            />
            <button
              onClick={() => setShowKey(s => !s)}
              style={{ position: 'absolute', right: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#4B5563', display: 'flex', padding: 0 }}
            >
              {showKey ? <EyeSlash size={13} /> : <Eye size={13} />}
            </button>
          </div>
          <div style={{ color: '#374151', fontSize: '10px', marginTop: '4px' }}>
            Obtenha em <span style={{ color: B }}>console.anthropic.com</span>
          </div>
        </div>

        {/* Agent theme */}
        <div>
          <div style={{ color: '#4B5563', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
            Tema / Persona do Agente
          </div>
          <textarea
            value={agentTheme}
            onChange={e => setAgentTheme(e.target.value)}
            placeholder={`Ex: Você é um atendente da ${brand?.name || 'marca'}, especialista em moda feminina. Responda em português, seja cordial e use emojis com moderação.`}
            rows={6}
            style={{
              width: '100%', boxSizing: 'border-box', resize: 'vertical',
              background: '#0F131C', border: `1px solid ${agentTheme ? B50 : '#1C2130'}`,
              borderRadius: '8px', color: '#D1D5DB', fontSize: '12px',
              padding: '9px 11px', outline: 'none', fontFamily: 'inherit',
              lineHeight: '1.6', minHeight: '120px',
            }}
            onFocus={e => e.target.style.borderColor = B}
            onBlur={e => e.target.style.borderColor = agentTheme ? B50 : '#1C2130'}
          />
        </div>

        <button
          onClick={handleStart}
          disabled={!ready}
          style={{
            width: '100%', height: '38px', borderRadius: '9px',
            background: ready ? `linear-gradient(135deg, ${B}, #7C3AED)` : '#151A26',
            border: ready ? 'none' : '1px dashed #1C2130',
            color: ready ? 'white' : '#374151',
            fontSize: '13px', fontWeight: '600', cursor: ready ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
            transition: 'all 0.2s',
          }}
        >
          <ChatTeardropText size={15} weight="fill" />
          Iniciar Conversa
        </button>
      </div>
    )
  }

  // ── Chat phase ───────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>

      {/* Agent status bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '8px 10px', background: '#0F131C',
        borderRadius: '10px', marginBottom: '12px',
        border: '1px solid #1C2130',
      }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: loading ? '#F59E0B' : '#22C55E',
          boxShadow: loading ? '0 0 6px #F59E0B80' : '0 0 6px #22C55E80',
          flexShrink: 0,
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#E5E7EB', fontSize: '11.5px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {brand?.name || 'Agente'} — IA Ativa
          </div>
          <div style={{ color: '#4B5563', fontSize: '10px', marginTop: '1px' }}>
            {loading ? 'Digitando...' : `${Math.floor(chatHistory.length / 2)} trocas`}
          </div>
        </div>
        <button
          onClick={handleReset}
          title="Reiniciar"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#374151', display: 'flex', padding: '4px', borderRadius: '6px',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
          onMouseLeave={e => e.currentTarget.style.color = '#374151'}
        >
          <ArrowLeft size={14} weight="bold" />
        </button>
      </div>

      {/* Mini history */}
      <div style={{
        flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column',
        gap: '6px', marginBottom: '12px', minHeight: 0,
      }}>
        {chatHistory.length === 0 && (
          <div style={{ color: '#374151', fontSize: '11px', textAlign: 'center', padding: '20px 0' }}>
            Envie uma mensagem para começar
          </div>
        )}
        {chatHistory.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div style={{
              maxWidth: '85%', padding: '7px 10px', borderRadius: '10px',
              fontSize: '11.5px', lineHeight: '1.5',
              background: msg.role === 'user' ? B : '#1C2130',
              color: msg.role === 'user' ? 'white' : '#D1D5DB',
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '8px 12px', borderRadius: '10px',
              background: '#1C2130', color: '#6B7280', fontSize: '11px',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <CircleNotch size={11} style={{ animation: 'spin 0.8s linear infinite' }} />
              digitando…
            </div>
          </div>
        )}
        <div ref={historyEndRef} />
      </div>

      {/* Error */}
      {error && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '6px',
          color: '#EF4444', fontSize: '11px', marginBottom: '8px',
          padding: '8px 10px', background: '#EF444410', borderRadius: '8px',
        }}>
          <WarningCircle size={13} style={{ flexShrink: 0, marginTop: '1px' }} />
          {error}
        </div>
      )}

      {/* Input */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end' }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          rows={2}
          disabled={loading}
          style={{
            flex: 1, resize: 'none', background: '#0F131C',
            border: `1px solid ${input ? B50 : '#1C2130'}`,
            borderRadius: '8px', color: '#E5E7EB', fontSize: '12.5px',
            padding: '8px 10px', outline: 'none', fontFamily: 'inherit',
            lineHeight: '1.5', boxSizing: 'border-box',
            opacity: loading ? 0.6 : 1,
          }}
          onFocus={e => e.target.style.borderColor = B}
          onBlur={e => e.target.style.borderColor = input ? B50 : '#1C2130'}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          style={{
            width: '36px', height: '36px', borderRadius: '9px', flexShrink: 0,
            background: input.trim() && !loading ? B : '#151A26',
            border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'default',
            color: input.trim() && !loading ? 'white' : '#374151',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s',
          }}
        >
          {loading
            ? <CircleNotch size={15} style={{ animation: 'spin 0.8s linear infinite' }} />
            : <PaperPlaneTilt size={15} weight="fill" />}
        </button>
      </div>

      <div style={{ color: '#1C2130', fontSize: '9.5px', marginTop: '5px', textAlign: 'center' }}>
        Enter para enviar · Shift+Enter nova linha
      </div>
    </div>
  )
}
