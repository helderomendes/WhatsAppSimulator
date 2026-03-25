import { useState, useRef, useCallback, useEffect } from 'react'
import PhoneMockup from './components/PhoneMockup'
import ConfigPanel from './components/ConfigPanel'
import { TEMPLATES, DEFAULT_BRAND, DEFAULT_VARS } from './data/templates'
import { generateConversation } from './services/claudeApi'

const LS_API_KEY = 'wa_sim_api_key'

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('carousel')
  const [generatedMessages, setGeneratedMessages] = useState(null)
  const [brand, setBrand] = useState({ ...DEFAULT_BRAND })
  const [vars, setVars] = useState({ ...DEFAULT_VARS })
  const [dark, setDark] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(LS_API_KEY) || '')
  const phoneRef = useRef(null)

  // Persist API key
  useEffect(() => {
    localStorage.setItem(LS_API_KEY, apiKey)
  }, [apiKey])

  const handleSelectTemplate = useCallback((id) => {
    setSelectedTemplate(id)
    setGeneratedMessages(null)
    setError(null)
  }, [])

  const handleBrandChange = useCallback((newBrand) => {
    setBrand(newBrand)
    setVars(v => ({ ...v, brand: newBrand.name }))
  }, [])

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return
    if (!apiKey.trim()) {
      setError('Adicione sua Anthropic API Key em ⚙️ Configurações')
      return
    }
    setGenerating(true)
    setError(null)
    try {
      const result = await generateConversation(apiKey, prompt)
      setGeneratedMessages(result.messages)
      if (result.brand?.name) {
        setBrand(b => ({
          ...b,
          name: result.brand.name,
          verified: result.brand.verified ?? b.verified,
          isCommercial: result.brand.isCommercial ?? b.isCommercial,
          avatarColor: result.brand.avatarColor,
        }))
      }
      if (result.vars) {
        setVars(v => ({ ...v, ...result.vars }))
      }
    } catch (err) {
      setError(err.message || 'Erro ao gerar conversa')
    } finally {
      setGenerating(false)
    }
  }, [apiKey, prompt])

  const handleExport = useCallback(async () => {
    const { default: html2canvas } = await import('html2canvas')
    const el = phoneRef.current
    if (!el) return
    try {
      const canvas = await html2canvas(el, {
        backgroundColor: null, scale: 2.5, useCORS: true, logging: false,
        ignoreElements: el => el.classList?.contains('no-export'),
      })
      const link = document.createElement('a')
      link.download = `whatsapp-sim-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) {
      console.error('Export failed:', e)
    }
  }, [])

  // Active messages: generated ones take priority over template
  const activeMessages = generatedMessages ?? TEMPLATES[selectedTemplate]?.messages ?? []

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#111113' }}>

      {/* Left panel */}
      <div style={{ width: '320px', flexShrink: 0, height: '100%', borderRight: '1px solid #1C1C1E' }}>
        <ConfigPanel
          prompt={prompt}
          onPromptChange={setPrompt}
          generating={generating}
          onGenerate={handleGenerate}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleSelectTemplate}
          brand={brand}
          onBrandChange={handleBrandChange}
          vars={vars}
          onVarsChange={setVars}
          dark={dark}
          onDarkChange={setDark}
          apiKey={apiKey}
          onApiKeyChange={setApiKey}
          onExport={handleExport}
          error={error}
        />
      </div>

      {/* Preview area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Subtle dot grid */}
        <div
          style={{
            position: 'absolute', inset: 0, opacity: 0.15,
            backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        {/* Radial vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, #111113 100%)',
          pointerEvents: 'none',
        }}/>

        {/* Phone */}
        <div ref={phoneRef} style={{ position: 'relative', zIndex: 10 }}>
          <PhoneMockup
            brand={brand}
            messages={activeMessages}
            dark={dark}
            vars={{ ...vars, brand: brand.name }}
          />
        </div>

        {/* Status pill */}
        {generatedMessages && (
          <div
            style={{
              position: 'absolute', top: '16px', right: '16px',
              background: '#1A3A22', border: '1px solid #25D366',
              borderRadius: '20px', padding: '6px 12px',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            <div className="pulse-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#25D366' }}/>
            <span style={{ color: '#4ADE80', fontSize: '12px', fontWeight: '500' }}>Gerado por Claude AI</span>
          </div>
        )}
      </div>
    </div>
  )
}
