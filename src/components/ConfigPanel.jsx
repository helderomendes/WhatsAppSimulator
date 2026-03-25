import { useRef, useState } from 'react'
import {
  SquaresFour, PencilSimple, BookmarkSimple,
  Gear, Moon, Sun, SealCheck, Storefront, UploadSimple,
  ArrowLineDown, User, Tag, Percent, Package, Star,
  ArrowCounterClockwise, Check, Phone, X,
} from '@phosphor-icons/react'
import { SEGMENTS } from '../data/segments'
import { TYPES } from '../data/templates'
import MessageEditor from './MessageEditor'
import CustomTemplatesTab from './CustomTemplatesTab'

// ─── Design tokens ────────────────────────────────────────────────────────────
const BLUE = '#1877F2'          // Meta blue – single accent color
const BLUE_DIM = '#1877F220'    // 12 % opacity tint for active backgrounds
const BLUE_BORDER = '#1877F250' // 31 % opacity for active borders
const BLUE_MUTED = '#4B78C0'    // disabled / subtle blue text

// Phosphor icon per conversation type
const TYPE_ICONS_PH = {
  nps:          <Star          size={17} weight="fill"   color="#F59E0B" />,
  carousel:     <SquaresFour   size={17} weight="fill"   color="#10B981" />,
  reactivation: <ArrowCounterClockwise size={17} weight="bold" color="#8B5CF6" />,
  promotion:    <Tag           size={17} weight="fill"   color="#EF4444" />,
  repurchase:   <Package       size={17} weight="fill"   color="#06B6D4" />,
  launch:       <Star          size={17} weight="duotone" color="#F97316" />,
}

// ─── Small reusable components ────────────────────────────────────────────────
function Toggle({ label, icon, checked, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#D1D5DB', fontSize: '13px' }}>
        {icon}
        {label}
      </span>
      <button
        onClick={() => onChange(!checked)}
        style={{
          position: 'relative', width: '42px', height: '23px',
          borderRadius: '12px', background: checked ? BLUE : '#3A3A3C',
          border: 'none', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute', top: '2px', width: '19px', height: '19px',
          borderRadius: '50%', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
          transition: 'transform 0.2s',
          transform: checked ? 'translateX(21px)' : 'translateX(2px)',
        }}/>
      </button>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', icon }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#6B7280', fontSize: '11px', marginBottom: '4px' }}>
        {icon}
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', background: '#232326', color: '#F2F2F7', fontSize: '13px',
          borderRadius: '8px', padding: '7px 11px', border: '1px solid #2C2C2E',
          outline: 'none', boxSizing: 'border-box',
        }}
        onFocus={e => e.target.style.borderColor = BLUE}
        onBlur={e => e.target.style.borderColor = '#2C2C2E'}
      />
    </div>
  )
}

function SectionLabel({ title }) {
  return (
    <div style={{
      color: '#4B5563', fontSize: '10px', fontWeight: '700',
      letterSpacing: '0.1em', textTransform: 'uppercase',
      marginBottom: '7px', paddingLeft: '1px',
    }}>
      {title}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ConfigPanel({
  selectedSegment, onSelectSegment,
  selectedType, onSelectType,
  messages, onMessagesChange,
  brand, onBrandChange,
  vars, onVarsChange,
  dark, onDarkChange,
  onExport,
  customTemplates, onSaveCustomTemplate, onLoadCustomTemplate, onDeleteCustomTemplate,
}) {
  const fileRef = useRef()
  const [tab, setTab] = useState('templates')
  const [showSettings, setShowSettings] = useState(false)

  const handleLogoUpload = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => onBrandChange({ ...brand, logo: ev.target.result })
    reader.readAsDataURL(file)
  }

  const tabBtn = (id, icon, label, badge) => {
    const active = tab === id
    return (
      <button
        onClick={() => setTab(id)}
        style={{
          flex: 1, height: '32px', border: 'none', cursor: 'pointer',
          borderRadius: '7px', fontSize: '11px', fontWeight: '600',
          background: active ? BLUE_DIM : 'transparent',
          color: active ? BLUE : '#6B7280',
          borderBottom: active ? `2px solid ${BLUE}` : '2px solid transparent',
          transition: 'all 0.15s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
        }}
      >
        {icon}
        {label}
        {badge
          ? <span style={{ background: BLUE, color: 'white', borderRadius: '9px', fontSize: '9.5px', padding: '0 5px', lineHeight: '16px', fontWeight: '700' }}>{badge}</span>
          : null}
      </button>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#111113' }}>

      {/* ── Header ── */}
      <div style={{ padding: '13px 16px', borderBottom: '1px solid #1C1C1E', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '30px', height: '30px', borderRadius: '9px', background: BLUE,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
            <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.005c6.554 0 11.89-5.335 11.893-11.893a11.772 11.772 0 00-3.423-8.453zm-8.475 18.304h-.004a9.88 9.88 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#F2F2F7', fontSize: '14px', fontWeight: '700', letterSpacing: '-0.01em' }}>WA Simulator</div>
          <div style={{ color: '#4B5563', fontSize: '10.5px' }}>WhatsApp Business</div>
        </div>
        <button
          onClick={() => setShowSettings(s => !s)}
          style={{ color: showSettings ? BLUE : '#6B7280', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}
          title="Configurações"
        >
          <Gear size={18} weight={showSettings ? 'fill' : 'regular'} />
        </button>
      </div>

      {/* ── Settings drawer ── */}
      {showSettings && (
        <div style={{ padding: '14px 16px', background: '#0D0D0F', borderBottom: '1px solid #1C1C1E' }}>

          {/* Logo upload */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                width: '46px', height: '46px', borderRadius: '50%',
                background: brand.avatarColor || '#1C1C1E',
                border: `2px dashed ${brand.logo ? 'transparent' : '#2C2C2E'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', overflow: 'hidden', flexShrink: 0,
              }}
            >
              {brand.logo
                ? <img src={brand.logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <UploadSimple size={18} color="#6B7280" />}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <button onClick={() => fileRef.current?.click()}
                style={{ color: BLUE, fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontWeight: '500' }}>
                {brand.logo ? 'Trocar logo' : 'Upload logo'}
              </button>
              {brand.logo && (
                <button onClick={() => onBrandChange({ ...brand, logo: null })}
                  style={{ color: '#EF4444', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
                  Remover
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoUpload} />
          </div>

          <Field label="Nome da Marca"   icon={<Storefront size={11} />} value={brand.name}     onChange={v => onBrandChange({ ...brand, name: v })}  placeholder="Ex: Glow Beauty" />
          <Field label="Telefone"        icon={<Phone size={11} />}      value={brand.phone || ''} onChange={v => onBrandChange({ ...brand, phone: v })} placeholder="+55 11 9999-9999" />
          <Toggle label="Badge Verificado"  icon={<SealCheck size={14} color={BLUE} />}          checked={!!brand.verified}     onChange={v => onBrandChange({ ...brand, verified: v })} />
          <Toggle label="Conta Comercial"   icon={<Storefront size={14} color="#6B7280" />}      checked={!!brand.isCommercial} onChange={v => onBrandChange({ ...brand, isCommercial: v })} />

          <div style={{ height: '1px', background: '#1C1C1E', margin: '10px 0' }} />

          <SectionLabel title="Variáveis" />
          <Field label="{nome}"      icon={<User    size={11} />} value={vars.nome    || ''} onChange={v => onVarsChange({ ...vars, nome: v })}     placeholder="Nome do cliente" />
          <Field label="{coupon}"    icon={<Tag     size={11} />} value={vars.coupon  || ''} onChange={v => onVarsChange({ ...vars, coupon: v })}   placeholder="Código do cupom" />
          <Field label="{discount}"  icon={<Percent size={11} />} value={vars.discount|| ''} onChange={v => onVarsChange({ ...vars, discount: v })} placeholder="% de desconto" />
          <Field label="{product}"   icon={<Package size={11} />} value={vars.product || ''} onChange={v => onVarsChange({ ...vars, product: v })}  placeholder="Nome do produto" />
          <Field label="{fan_name}"  icon={<Star    size={11} />} value={vars.fan_name|| ''} onChange={v => onVarsChange({ ...vars, fan_name: v })} placeholder="Nome do fã" />

          <div style={{ height: '1px', background: '#1C1C1E', margin: '10px 0' }} />
          <Toggle
            label="Modo Escuro"
            icon={dark ? <Moon size={14} weight="fill" color={BLUE} /> : <Sun size={14} color="#F59E0B" />}
            checked={dark}
            onChange={onDarkChange}
          />
        </div>
      )}

      {/* ── Tab bar ── */}
      <div style={{ display: 'flex', padding: '6px 10px', gap: '2px', background: '#111113', borderBottom: '1px solid #1C1C1E' }}>
        {tabBtn('templates', <SquaresFour  size={13} weight={tab === 'templates' ? 'fill' : 'regular'} />, 'Templates')}
        {tabBtn('editor',    <PencilSimple size={13} weight={tab === 'editor'    ? 'fill' : 'regular'} />, 'Editor')}
        {tabBtn('saved',     <BookmarkSimple size={13} weight={tab === 'saved'   ? 'fill' : 'regular'} />, 'Salvos', customTemplates?.length || null)}
      </div>

      {/* ── Tab content ── */}
      <div className="flex-1 overflow-y-auto config-scroll" style={{ padding: '14px' }}>

        {/* ── TEMPLATES tab ── */}
        {tab === 'templates' && (
          <>
            <div style={{ marginBottom: '16px' }}>
              <SectionLabel title="Segmento" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                {SEGMENTS.map(seg => {
                  const active = selectedSegment === seg.id
                  return (
                    <button
                      key={seg.id}
                      onClick={() => onSelectSegment(seg.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '7px',
                        padding: '8px 10px', borderRadius: '9px', textAlign: 'left',
                        border: active ? `1.5px solid ${BLUE}` : '1.5px solid #1C1C1E',
                        background: active ? BLUE_DIM : '#181818',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ fontSize: '14px', flexShrink: 0 }}>{seg.emoji}</span>
                      <span style={{ color: active ? '#93C5FD' : '#9CA3AF', fontSize: '11px', fontWeight: active ? '600' : '400', lineHeight: '1.3' }}>
                        {seg.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <SectionLabel title="Tipo de conversa" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {TYPES.map(t => {
                  const active = selectedType === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => onSelectType(t.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '8px 11px', borderRadius: '9px', textAlign: 'left',
                        border: active ? `1.5px solid ${BLUE}` : '1.5px solid #1C1C1E',
                        background: active ? BLUE_DIM : '#181818',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ flexShrink: 0 }}>{TYPE_ICONS_PH[t.id] || <SquaresFour size={17} />}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: active ? '#DBEAFE' : '#D1D5DB', fontSize: '12px', fontWeight: '600' }}>{t.name}</div>
                        <div style={{ color: '#4B5563', fontSize: '10.5px', marginTop: '1px' }}>{t.desc}</div>
                      </div>
                      {active && <Check size={13} color={BLUE} weight="bold" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {selectedSegment && selectedType && (() => {
              const seg = SEGMENTS.find(s => s.id === selectedSegment)
              const type = TYPES.find(t => t.id === selectedType)
              return (
                <div style={{ background: BLUE_DIM, borderRadius: '10px', padding: '10px 12px', border: `1px solid ${BLUE_BORDER}` }}>
                  <div style={{ color: '#93C5FD', fontSize: '11.5px', fontWeight: '600', marginBottom: '3px' }}>
                    {seg?.emoji} {seg?.label} · {type?.name}
                  </div>
                  <div style={{ color: '#4B5563', fontSize: '10.5px' }}>
                    Marca: <span style={{ color: '#9CA3AF' }}>{seg?.brand}</span> · Cliente: <span style={{ color: '#9CA3AF' }}>{seg?.customer}</span>
                  </div>
                  <div style={{ color: '#4B5563', fontSize: '10.5px', marginTop: '2px' }}>
                    Cupom: <span style={{ color: '#9CA3AF' }}>{seg?.coupon}</span> · Desconto: <span style={{ color: '#9CA3AF' }}>{seg?.discount}%</span>
                  </div>
                </div>
              )
            })()}
          </>
        )}

        {/* ── EDITOR tab ── */}
        {tab === 'editor' && (
          <MessageEditor messages={messages} onChange={onMessagesChange} />
        )}

        {/* ── SAVED tab ── */}
        {tab === 'saved' && (
          <CustomTemplatesTab
            templates={customTemplates || []}
            currentMessages={messages}
            currentBrand={brand}
            currentVars={vars}
            onSave={onSaveCustomTemplate}
            onLoad={onLoadCustomTemplate}
            onDelete={onDeleteCustomTemplate}
          />
        )}
      </div>

      {/* ── Export footer ── */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid #1C1C1E' }}>
        <button
          onClick={onExport}
          style={{
            width: '100%', height: '38px', borderRadius: '9px',
            background: BLUE, color: 'white', fontWeight: '700', fontSize: '13px',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
            letterSpacing: '0.01em',
          }}
        >
          <ArrowLineDown size={16} weight="bold" />
          Exportar PNG
        </button>
      </div>
    </div>
  )
}
