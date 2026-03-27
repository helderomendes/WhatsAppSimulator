import { useRef, useState } from 'react'
import { WALLPAPERS } from '../data/wallpapers'
import {
  SquaresFour, PencilSimple, BookmarkSimple,
  Gear, Moon, Sun, SealCheck, Storefront, UploadSimple,
  User, Tag, Percent, Package, Star,
  ArrowCounterClockwise, Check, Phone, Rocket,
  Sparkle, TShirt, Flower, Lightning, CoatHanger, Diamond, Barbell, ShoppingBag,
  ArrowsClockwise, SealPercent, GridFour, Globe, CircleNotch,
} from '@phosphor-icons/react'
import { SEGMENTS } from '../data/segments'
import { TYPES } from '../data/templates'
import MessageEditor from './MessageEditor'
import CustomTemplatesTab from './CustomTemplatesTab'

// ─── Design tokens ─────────────────────────────────────────────────────────────
const B   = '#1877F2'        // Meta blue — single accent
const B10 = '#1877F21A'      // 10 % tint (hover / active bg)
const B20 = '#1877F233'      // 20 % tint (pressed bg)
const B50 = '#1877F280'      // 50 % (active border)
const B_LT = '#60A5FA'       // blue-400 (icon secondary)
const B_XL = '#93C5FD'       // blue-300 (active text)

// ─── Segment → Phosphor icon ────────────────────────────────────────────────
const SEG_ICONS = {
  beauty:        <Sparkle    size={16} weight="fill" color={B_LT} />,
  mens_fashion:  <TShirt     size={16} weight="fill" color={B_LT} />,
  womens_fashion:<Flower     size={16} weight="fill" color={B_LT} />,
  streetwear:    <Lightning  size={16} weight="fill" color={B_LT} />,
  fashion:       <CoatHanger size={16} weight="fill" color={B_LT} />,
  accessories:   <Diamond    size={16} weight="fill" color={B_LT} />,
  fitness:       <Barbell    size={16} weight="fill" color={B_LT} />,
  retail:        <ShoppingBag size={16} weight="fill" color={B_LT} />,
}

// ─── Type → Phosphor icon (all blue family) ─────────────────────────────────
const TYPE_ICONS = {
  nps:          <Star               size={16} weight="fill"    color={B} />,
  carousel:     <GridFour           size={16} weight="fill"    color={B} />,
  reactivation: <ArrowsClockwise    size={16} weight="bold"    color={B} />,
  promotion:    <SealPercent        size={16} weight="fill"    color={B} />,
  repurchase:   <ArrowCounterClockwise size={16} weight="bold" color={B} />,
  launch:       <Rocket             size={16} weight="fill"    color={B} />,
}

// ─── Sub-components ─────────────────────────────────────────────────────────
function Toggle({ label, icon, checked, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9CA3AF', fontSize: '12.5px' }}>
        {icon}
        {label}
      </span>
      <button
        onClick={() => onChange(!checked)}
        style={{
          position: 'relative', width: '42px', height: '23px',
          borderRadius: '12px', background: checked ? B : '#28282C',
          border: 'none', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute', top: '2px', width: '19px', height: '19px',
          borderRadius: '50%', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
          transition: 'transform 0.2s',
          transform: checked ? 'translateX(21px)' : 'translateX(2px)',
        }} />
      </button>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', icon }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#4B5563', fontSize: '10.5px', marginBottom: '4px', fontWeight: '500' }}>
        {icon}
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', background: '#0F131C', color: '#E5E7EB', fontSize: '12.5px',
          borderRadius: '8px', padding: '7px 11px', border: '1px solid #1C2130',
          outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s',
        }}
        onFocus={e => e.target.style.borderColor = B}
        onBlur={e => e.target.style.borderColor = '#1C2130'}
      />
    </div>
  )
}

function SectionLabel({ title }) {
  return (
    <div style={{
      color: '#374151', fontSize: '9.5px', fontWeight: '700',
      letterSpacing: '0.12em', textTransform: 'uppercase',
      marginBottom: '8px',
    }}>
      {title}
    </div>
  )
}

function Divider() {
  return <div style={{ height: '1px', background: '#151A26', margin: '10px 0' }} />
}

// ─── Extract dominant color from image URL via Canvas ────────────────────────
function extractDominantColor(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const size = 32
      const canvas = document.createElement('canvas')
      canvas.width = size; canvas.height = size
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, size, size)
      const { data } = ctx.getImageData(0, 0, size, size)
      let r = 0, g = 0, b = 0, count = 0
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 128) continue // skip transparent
        r += data[i]; g += data[i + 1]; b += data[i + 2]; count++
      }
      if (!count) return reject(new Error('no pixels'))
      const toHex = v => Math.round(v / count).toString(16).padStart(2, '0')
      resolve(`#${toHex(r)}${toHex(g)}${toHex(b)}`)
    }
    img.onerror = reject
    img.src = src
  })
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function ConfigPanel({
  selectedSegment, onSelectSegment,
  selectedType, onSelectType,
  messages, onMessagesChange,
  brand, onBrandChange,
  vars, onVarsChange,
  dark, onDarkChange,
  wallpaperId, onWallpaperChange,
  customTemplates, onSaveCustomTemplate, onLoadCustomTemplate, onDeleteCustomTemplate,
}) {
  const fileRef = useRef()
  const [tab, setTab] = useState('templates')
  const [showSettings, setShowSettings] = useState(false)
  const [brandUrl, setBrandUrl] = useState('')
  const [brandLoading, setBrandLoading] = useState(false)
  const [brandError, setBrandError] = useState('')

  const handleImportBrand = async () => {
    if (!brandUrl.trim()) return
    setBrandLoading(true)
    setBrandError('')
    try {
      let url = brandUrl.trim()
      if (!/^https?:\/\//i.test(url)) url = 'https://' + url

      const res = await fetch(`/api/brand?url=${encodeURIComponent(url)}`)
      const json = await res.json()

      if (!json.ok) {
        setBrandError(json.error || 'Falha ao buscar marca')
        return
      }

      const d = json.data
      const updates = {}
      if (d.brand_name) updates.name = d.brand_name
      if (d.logos?.length) {
        const best = [...d.logos].sort((a, b) => (b.width || 0) - (a.width || 0))[0]
        if (best?.url) updates.logo = best.url
      }
      if (d.colors?.length) {
        const hex = d.colors[0]?.hex
        if (hex) updates.avatarColor = hex
      }
      onBrandChange({ ...brand, ...updates })
    } catch (e) {
      setBrandError(e.message || 'Falha ao buscar marca')
    } finally {
      setBrandLoading(false)
    }
  }

  const handleLogoUpload = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => onBrandChange({ ...brand, logo: ev.target.result })
    reader.readAsDataURL(file)
  }

  const TabBtn = ({ id, icon, label, badge }) => {
    const active = tab === id
    return (
      <button
        onClick={() => setTab(id)}
        style={{
          flex: 1, height: '34px', border: 'none', cursor: 'pointer',
          borderRadius: '8px', fontSize: '11px', fontWeight: active ? '700' : '500',
          background: active ? B10 : 'transparent',
          color: active ? B : '#4B5563',
          outline: 'none',
          transition: 'all 0.15s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
        }}
      >
        {icon}
        {label}
        {badge
          ? <span style={{ background: B, color: 'white', borderRadius: '9px', fontSize: '9px', padding: '1px 5px', fontWeight: '700', lineHeight: '14px' }}>{badge}</span>
          : null}
      </button>
    )
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#0C1019', overflow: 'hidden' }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #151A26', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '10px',
          background: `linear-gradient(135deg, ${B} 0%, #0D5FCC 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          boxShadow: `0 2px 8px ${B}40`,
        }}>
          {/* WhatsApp logo mark */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.005c6.554 0 11.89-5.335 11.893-11.893a11.772 11.772 0 00-3.423-8.453zm-8.475 18.304h-.004a9.88 9.88 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#F9FAFB', fontSize: '13.5px', fontWeight: '700', letterSpacing: '-0.01em' }}>WA Simulator</div>
          <div style={{ color: '#374151', fontSize: '10px', marginTop: '1px' }}>WhatsApp Business</div>
        </div>
        <button
          onClick={() => setShowSettings(s => !s)}
          style={{ color: showSettings ? B : '#374151', background: 'none', border: 'none', cursor: 'pointer', padding: '5px', display: 'flex', borderRadius: '7px', transition: 'color 0.15s' }}
          title="Configurações"
        >
          <Gear size={17} weight={showSettings ? 'fill' : 'regular'} />
        </button>
      </div>

      {/* ── Settings drawer ─────────────────────────────────────────────────── */}
      {showSettings && (
        <div style={{ padding: '14px 16px', background: '#090D14', borderBottom: '1px solid #151A26', overflowY: 'auto', overflowX: 'hidden' }}>

          {/* Import from URL */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ color: '#6B7280', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              Importar marca pelo site
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Globe size={13} color="#4B5563" style={{ position: 'absolute', left: '8px', pointerEvents: 'none' }} />
                <input
                  value={brandUrl}
                  onChange={e => { setBrandUrl(e.target.value); setBrandError('') }}
                  onKeyDown={e => e.key === 'Enter' && handleImportBrand()}
                  placeholder="ex: nike.com"
                  style={{
                    width: '100%', paddingLeft: '26px', paddingRight: '8px',
                    height: '30px', borderRadius: '7px', border: '1px solid #1C2130',
                    background: '#0C1019', color: '#D1D5DB', fontSize: '11.5px', outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <button
                onClick={handleImportBrand}
                disabled={brandLoading}
                style={{
                  height: '30px', padding: '0 10px', borderRadius: '7px',
                  background: B, border: 'none', cursor: brandLoading ? 'default' : 'pointer',
                  color: 'white', fontSize: '11px', fontWeight: '600',
                  display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0,
                  opacity: brandLoading ? 0.7 : 1,
                }}
              >
                {brandLoading
                  ? <CircleNotch size={13} style={{ animation: 'spin 0.8s linear infinite' }} />
                  : 'Importar'}
              </button>
            </div>
            {brandError && (
              <div style={{ color: '#EF4444', fontSize: '10.5px', marginTop: '4px' }}>{brandError}</div>
            )}
          </div>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: brand.avatarColor || '#151A26',
                border: `1.5px dashed ${brand.logo ? 'transparent' : '#1C2130'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', overflow: 'hidden', flexShrink: 0,
              }}
            >
              {brand.logo
                ? <img src={brand.logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <UploadSimple size={17} color="#374151" />}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <button onClick={() => fileRef.current?.click()}
                style={{ color: B, fontSize: '11.5px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontWeight: '600' }}>
                {brand.logo ? 'Trocar logo' : 'Upload logo'}
              </button>
              {brand.logo && (
                <button onClick={() => onBrandChange({ ...brand, logo: null })}
                  style={{ color: '#EF4444', fontSize: '10.5px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
                  Remover
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoUpload} />
          </div>

          <SectionLabel title="Marca" />
          <Field label="Nome"     icon={<Storefront size={10} color="#4B5563" />} value={brand.name}      onChange={v => onBrandChange({ ...brand, name: v })}  placeholder="Ex: Glow Beauty" />
          <Field label="Telefone" icon={<Phone      size={10} color="#4B5563" />} value={brand.phone||''} onChange={v => onBrandChange({ ...brand, phone: v })} placeholder="+55 11 9999-9999" />
          <Toggle label="Badge Verificado"  icon={<SealCheck  size={13} color={B}        />} checked={!!brand.verified}     onChange={v => onBrandChange({ ...brand, verified: v })} />
          <Toggle label="Conta Comercial"   icon={<Storefront size={13} color="#4B5563"  />} checked={!!brand.isCommercial} onChange={v => onBrandChange({ ...brand, isCommercial: v })} />

          <Divider />
          <SectionLabel title="Variáveis" />
          <Field label="{nome}"     icon={<User    size={10} color="#4B5563" />} value={vars.nome    ||''} onChange={v => onVarsChange({ ...vars, nome: v })}     placeholder="Nome do cliente" />
          <Field label="{coupon}"   icon={<Tag     size={10} color="#4B5563" />} value={vars.coupon  ||''} onChange={v => onVarsChange({ ...vars, coupon: v })}   placeholder="Código do cupom" />
          <Field label="{discount}" icon={<Percent size={10} color="#4B5563" />} value={vars.discount||''} onChange={v => onVarsChange({ ...vars, discount: v })} placeholder="% de desconto" />
          <Field label="{product}"  icon={<Package size={10} color="#4B5563" />} value={vars.product ||''} onChange={v => onVarsChange({ ...vars, product: v })}  placeholder="Nome do produto" />
          <Field label="{fan_name}" icon={<Star    size={10} color="#4B5563" />} value={vars.fan_name||''} onChange={v => onVarsChange({ ...vars, fan_name: v })} placeholder="Nome do fã" />

          <Divider />
          <Toggle
            label="Modo Escuro"
            icon={dark
              ? <Moon size={13} weight="fill" color={B} />
              : <Sun  size={13} weight="bold"  color="#F59E0B" />}
            checked={dark}
            onChange={onDarkChange}
          />

          <Divider />
          <SectionLabel title="Fundo do Chat" />

          {/* Patterns */}
          <div style={{ fontSize: '9.5px', color: '#374151', fontWeight: '600', letterSpacing: '0.08em', marginBottom: '6px' }}>PADRÕES</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '5px', marginBottom: '10px' }}>
            {WALLPAPERS.filter(w => w.group === 'pattern').map(w => (
              <button
                key={w.id}
                title={w.label}
                onClick={() => onWallpaperChange(w.id)}
                style={{
                  width: '100%', aspectRatio: '1', borderRadius: '7px',
                  background: w.preview, cursor: 'pointer',
                  border: wallpaperId === w.id ? `2px solid ${B}` : '2px solid transparent',
                  boxShadow: wallpaperId === w.id ? `0 0 0 1px ${B}` : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                  padding: 0, overflow: 'hidden', transition: 'border-color 0.15s',
                }}
              />
            ))}
          </div>

          {/* Gradients */}
          <div style={{ fontSize: '9.5px', color: '#374151', fontWeight: '600', letterSpacing: '0.08em', marginBottom: '6px' }}>GRADIENTES</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '5px' }}>
            {WALLPAPERS.filter(w => w.group === 'gradient').map(w => (
              <button
                key={w.id}
                title={w.label}
                onClick={() => onWallpaperChange(w.id)}
                style={{
                  width: '100%', aspectRatio: '1', borderRadius: '7px',
                  background: w.preview, cursor: 'pointer',
                  border: wallpaperId === w.id ? `2px solid ${B}` : '2px solid transparent',
                  boxShadow: wallpaperId === w.id ? `0 0 0 1px ${B}` : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                  padding: 0, overflow: 'hidden', transition: 'border-color 0.15s',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Tab bar ─────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', padding: '6px 8px', gap: '2px', background: '#0C1019', borderBottom: '1px solid #151A26' }}>
        <TabBtn id="templates" label="Templates" icon={<SquaresFour  size={13} weight={tab==='templates'?'fill':'regular'} />} />
        <TabBtn id="editor"    label="Editor"    icon={<PencilSimple size={13} weight={tab==='editor'   ?'fill':'regular'} />} />
        <TabBtn id="saved"     label="Salvos"    icon={<BookmarkSimple size={13} weight={tab==='saved'  ?'fill':'regular'} />} badge={customTemplates?.length||null} />
      </div>

      {/* ── Tab content ─────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto config-scroll" style={{ padding: '16px', overflowX: 'hidden', minWidth: 0 }}>

        {/* TEMPLATES */}
        {tab === 'templates' && (
          <>
            {/* Segment grid — 4 cols tile */}
            <div style={{ marginBottom: '16px' }}>
              <SectionLabel title="Segmento" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
                {SEGMENTS.map(seg => {
                  const active = selectedSegment === seg.id
                  return (
                    <button
                      key={seg.id}
                      onClick={() => onSelectSegment(seg.id)}
                      title={seg.label}
                      style={{
                        minWidth: 0, overflow: 'hidden',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: '5px', padding: '10px 6px 8px',
                        borderRadius: '10px', textAlign: 'center',
                        border: `1px solid ${active ? B50 : '#151A26'}`,
                        background: active ? B10 : '#0F131C',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ opacity: active ? 1 : 0.45, flexShrink: 0 }}>{SEG_ICONS[seg.id]}</span>
                      <span style={{
                        color: active ? B_XL : '#6B7280',
                        fontSize: '9.5px', fontWeight: active ? '600' : '400',
                        lineHeight: '1.2', overflow: 'hidden', textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap', maxWidth: '100%',
                      }}>
                        {seg.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Type list — 2 cols */}
            <div style={{ marginBottom: '16px' }}>
              <SectionLabel title="Tipo de conversa" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                {TYPES.map(t => {
                  const active = selectedType === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => onSelectType(t.id)}
                      style={{
                        minWidth: 0, overflow: 'hidden',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '8px 10px', borderRadius: '9px', textAlign: 'left',
                        border: `1px solid ${active ? B50 : '#151A26'}`,
                        background: active ? B10 : '#0F131C',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ flexShrink: 0, opacity: active ? 1 : 0.4 }}>{TYPE_ICONS[t.id]}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: active ? B_XL : '#9CA3AF', fontSize: '11px', fontWeight: active ? '600' : '400', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</div>
                      </div>
                      {active && <Check size={11} color={B} weight="bold" style={{ flexShrink: 0 }} />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active template pill */}
            {selectedSegment && selectedType && (() => {
              const seg = SEGMENTS.find(s => s.id === selectedSegment)
              const type = TYPES.find(t => t.id === selectedType)
              return (
                <div style={{ background: B10, borderRadius: '10px', padding: '10px 12px', border: `1px solid ${B20}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ opacity: 0.8 }}>{SEG_ICONS[seg?.id]}</span>
                    <span style={{ color: B_XL, fontSize: '11.5px', fontWeight: '600' }}>{seg?.label} · {type?.name}</span>
                  </div>
                  <div style={{ color: '#4B5563', fontSize: '10.5px' }}>
                    Marca: <span style={{ color: '#6B7280' }}>{seg?.brand}</span>
                    <span style={{ margin: '0 4px', color: '#1C2130' }}>·</span>
                    Cliente: <span style={{ color: '#6B7280' }}>{seg?.customer}</span>
                  </div>
                  <div style={{ color: '#4B5563', fontSize: '10.5px', marginTop: '2px' }}>
                    Cupom: <span style={{ color: '#6B7280' }}>{seg?.coupon}</span>
                    <span style={{ margin: '0 4px', color: '#1C2130' }}>·</span>
                    Desconto: <span style={{ color: '#6B7280' }}>{seg?.discount}%</span>
                  </div>
                </div>
              )
            })()}
          </>
        )}

        {tab === 'editor' && (
          <MessageEditor messages={messages} onChange={onMessagesChange} />
        )}

        {tab === 'saved' && (
          <CustomTemplatesTab
            templates={customTemplates || []}
            currentMessages={messages}
            currentBrand={brand}
            currentVars={vars}
            currentWallpaperId={wallpaperId}
            onSave={onSaveCustomTemplate}
            onLoad={onLoadCustomTemplate}
            onDelete={onDeleteCustomTemplate}
          />
        )}
      </div>

    </div>
  )
}
