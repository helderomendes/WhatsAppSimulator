import { useState, useRef, useCallback } from 'react'
import PhoneMockup from './components/PhoneMockup'
import ChatExportFrame from './components/ChatExportFrame'
import ConfigPanel from './components/ConfigPanel'
import { TEMPLATES, TYPES, DEFAULT_BRAND } from './data/templates'
import { SEGMENTS, SEGMENT_MAP } from './data/segments'
import { DEFAULT_WALLPAPER_ID, getWallpaper } from './data/wallpapers'

const DEFAULT_SEGMENT = 'beauty'
const DEFAULT_TYPE = 'carousel'

function getTemplateKey(segId, typeId) {
  return `${segId}_${typeId}`
}

function getBrandFromSegment(seg) {
  return {
    ...DEFAULT_BRAND,
    name: seg.brand,
    avatarColor: seg.avatarColor,
    verified: true,
    isCommercial: true,
  }
}

function getVarsFromSegment(seg) {
  return {
    nome: seg.customer,
    brand: seg.brand,
    fan_name: seg.fanName,
    coupon: seg.coupon,
    discount: seg.discount,
    product: seg.product,
  }
}

export default function App() {
  const [selectedSegment, setSelectedSegment] = useState(DEFAULT_SEGMENT)
  const [selectedType, setSelectedType] = useState(DEFAULT_TYPE)
  const [dark, setDark] = useState(false)
  const [wallpaperId, setWallpaperId] = useState(DEFAULT_WALLPAPER_ID)
  const wallpaper = getWallpaper(wallpaperId)

  // Messages — start from the default template
  const initialSeg = SEGMENT_MAP[DEFAULT_SEGMENT]
  const initialKey = getTemplateKey(DEFAULT_SEGMENT, DEFAULT_TYPE)
  const [messages, setMessages] = useState(TEMPLATES[initialKey] ?? [])
  const [brand, setBrand] = useState(getBrandFromSegment(initialSeg))
  const [vars, setVars] = useState(getVarsFromSegment(initialSeg))

  const phoneRef = useRef(null)
  const exportRef = useRef(null)

  // Custom templates — persisted to localStorage
  const [customTemplates, setCustomTemplates] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wa_custom_templates') || '[]') }
    catch { return [] }
  })

  const persistCustomTemplates = (tpls) => {
    setCustomTemplates(tpls)
    try { localStorage.setItem('wa_custom_templates', JSON.stringify(tpls)) } catch {}
  }

  const handleSaveCustomTemplate = useCallback((tpl) => {
    persistCustomTemplates([tpl, ...customTemplates])
  }, [customTemplates])

  const handleLoadCustomTemplate = useCallback((tpl) => {
    setMessages(tpl.messages || [])
    if (tpl.brand) setBrand(tpl.brand)
    if (tpl.vars) setVars(tpl.vars)
    if (tpl.wallpaperId) setWallpaperId(tpl.wallpaperId)
  }, [])

  const handleDeleteCustomTemplate = useCallback((id) => {
    persistCustomTemplates(customTemplates.filter(t => t.id !== id))
  }, [customTemplates])

  // When segment or type changes, reload template + brand + vars
  const handleSelectSegment = useCallback((segId) => {
    setSelectedSegment(segId)
    const seg = SEGMENT_MAP[segId]
    if (!seg) return
    const key = getTemplateKey(segId, selectedType)
    const tpl = TEMPLATES[key]
    if (tpl) setMessages(tpl)
    setBrand(getBrandFromSegment(seg))
    setVars(getVarsFromSegment(seg))
  }, [selectedType])

  const handleSelectType = useCallback((typeId) => {
    setSelectedType(typeId)
    const key = getTemplateKey(selectedSegment, typeId)
    const tpl = TEMPLATES[key]
    if (tpl) setMessages(tpl)
  }, [selectedSegment])

  const handleBrandChange = useCallback((newBrand) => {
    setBrand(newBrand)
    setVars(v => ({ ...v, brand: newBrand.name }))
  }, [])

  const handleExport = useCallback(async () => {
    const { default: html2canvas } = await import('html2canvas')
    const el = exportRef.current
    if (!el) return
    try {
      const canvas = await html2canvas(el, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        logging: false,
        // Capture full natural height (no scroll clipping)
        height: el.scrollHeight,
        windowHeight: el.scrollHeight,
      })
      const link = document.createElement('a')
      link.download = `whatsapp-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) {
      console.error('Export failed:', e)
    }
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#151A26', position: 'relative' }}>
      {/* Hidden export frame — absolutely off-screen, outside overflow:hidden containers */}
      <ChatExportFrame
        ref={exportRef}
        brand={brand}
        messages={messages}
        dark={dark}
        vars={{ ...vars, brand: brand.name }}
        wallpaper={wallpaper}
      />

      {/* Left panel */}
      <div style={{ width: '400px', flexShrink: 0, height: '100%', borderRight: '1px solid #1C2130', overflow: 'hidden' }}>
        <ConfigPanel
          selectedSegment={selectedSegment}
          onSelectSegment={handleSelectSegment}
          selectedType={selectedType}
          onSelectType={handleSelectType}
          messages={messages}
          onMessagesChange={setMessages}
          brand={brand}
          onBrandChange={handleBrandChange}
          vars={vars}
          onVarsChange={setVars}
          dark={dark}
          onDarkChange={setDark}
          wallpaperId={wallpaperId}
          onWallpaperChange={setWallpaperId}
          onExport={handleExport}
          customTemplates={customTemplates}
          onSaveCustomTemplate={handleSaveCustomTemplate}
          onLoadCustomTemplate={handleLoadCustomTemplate}
          onDeleteCustomTemplate={handleDeleteCustomTemplate}
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
          background: 'radial-gradient(ellipse at center, transparent 30%, #151A26 100%)',
          pointerEvents: 'none',
        }}/>

        {/* Phone */}
        <div ref={phoneRef} style={{ position: 'relative', zIndex: 10 }}>
          <PhoneMockup
            brand={brand}
            messages={messages}
            dark={dark}
            vars={{ ...vars, brand: brand.name }}
            wallpaper={wallpaper}
          />
        </div>

        {/* Template pill */}
        {(() => {
          const seg = SEGMENT_MAP[selectedSegment]
          const type = TYPES.find(t => t.id === selectedType)
          if (!seg || !type) return null
          return (
            <div
              className="no-export"
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: '#1A1A2E', border: `1px solid ${type.color}40`,
                borderRadius: '20px', padding: '6px 12px',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              <span style={{ fontSize: '13px' }}>{seg.emoji}</span>
              <span style={{ color: '#D1D5DB', fontSize: '11.5px', fontWeight: '500' }}>
                {seg.label}
              </span>
              <span style={{ color: '#4B5563', fontSize: '11px' }}>·</span>
              <span style={{ fontSize: '13px' }}>{type.icon}</span>
              <span style={{ color: '#D1D5DB', fontSize: '11.5px', fontWeight: '500' }}>
                {type.name}
              </span>
            </div>
          )
        })()}
      </div>
    </div>
  )
}
