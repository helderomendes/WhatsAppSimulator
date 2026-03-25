import { useState, useRef, useCallback } from 'react'
import PhoneMockup from './components/PhoneMockup'
import ConfigPanel from './components/ConfigPanel'
import { TEMPLATES, DEFAULT_BRAND, DEFAULT_VARS } from './data/templates'

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('carousel')
  const [brand, setBrand] = useState({ ...DEFAULT_BRAND })
  const [vars, setVars] = useState({ ...DEFAULT_VARS })
  const [dark, setDark] = useState(true)
  const phoneRef = useRef(null)

  const handleSelectTemplate = useCallback((id) => {
    setSelectedTemplate(id)
    // Sync brand name with vars
    const tpl = TEMPLATES[id]
    if (tpl) setVars(v => ({ ...v, brand: brand.name }))
  }, [brand.name])

  const handleBrandChange = useCallback((newBrand) => {
    setBrand(newBrand)
    setVars(v => ({ ...v, brand: newBrand.name }))
  }, [])

  const handleExport = useCallback(async () => {
    const { default: html2canvas } = await import('html2canvas')
    const el = phoneRef.current
    if (!el) return
    try {
      const canvas = await html2canvas(el, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = `whatsapp-${selectedTemplate}-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) {
      console.error('Export failed:', e)
    }
  }, [selectedTemplate])

  const template = TEMPLATES[selectedTemplate]
  const messages = template?.messages || []

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0D0D0F' }}>
      {/* Left config panel */}
      <div className="w-[320px] flex-shrink-0 h-full border-r border-[#1C1C1E]">
        <ConfigPanel
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleSelectTemplate}
          brand={brand}
          onBrandChange={handleBrandChange}
          vars={vars}
          onVarsChange={setVars}
          dark={dark}
          onDarkChange={setDark}
          onExport={handleExport}
        />
      </div>

      {/* Main preview area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden relative">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #2C2C2E 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, #0D0D0F 100%)' }}
        />

        {/* Phone */}
        <div ref={phoneRef} className="relative z-10">
          <PhoneMockup
            brand={brand}
            messages={messages}
            dark={dark}
            vars={{ ...vars, brand: brand.name }}
          />
        </div>

        {/* Template badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#1C1C1E] rounded-full px-3 py-1.5 border border-[#2C2C2E]">
          <span className="text-base">{template?.icon}</span>
          <span className="text-[12px] text-[#9CA3AF] font-medium">{template?.name}</span>
        </div>

        {/* Info badge */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#1C1C1E] rounded-full px-4 py-2 border border-[#2C2C2E]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
          <span className="text-[11px] text-[#6B7280]">
            WhatsApp Business API Simulator • Todos os tipos de mensagem suportados
          </span>
        </div>
      </div>
    </div>
  )
}
