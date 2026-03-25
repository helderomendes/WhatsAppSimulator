import { useRef, useState } from 'react'
import {
  SquaresFour, PencilSimple, BookmarkSimple,
  Gear, Moon, Sun, SealCheck, Storefront, UploadSimple,
  DownloadSimple, User, Tag, Percent, Package, Star,
  ArrowCounterClockwise, Check,
} from '@phosphor-icons/react'
import { SEGMENTS } from '../data/segments'
import { TYPES } from '../data/templates'
import MessageEditor from './MessageEditor'
import CustomTemplatesTab from './CustomTemplatesTab'

// Phosphor icon map for type IDs (replaces emoji)
const TYPE_ICONS_PH = {
  nps:        <Star size={17} weight="fill" color="#F59E0B" />,
  carousel:   <SquaresFour size={17} weight="fill" color="#10B981" />,
  reactivation: <ArrowCounterClockwise size={17} weight="bold" color="#8B5CF6" />,
  promotion:  <Tag size={17} weight="fill" color="#EF4444" />,
  repurchase: <Package size={17} weight="fill" color="#06B6D4" />,
  launch:     <Star size={17} weight="duotone" color="#F97316" />,
}

function Toggle({ label, icon, checked, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#F2F2F7', fontSize: '13px' }}>
        {icon}
        {label}
      </span>
      <button
        onClick={() => onChange(!checked)}
        style={{
          position: 'relative', width: '44px', height: '24px',
          borderRadius: '12px', background: checked ? '#25D366' : '#3A3A3C',
          border: 'none', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute', top: '2px', width: '20px', height: '20px',
          borderRadius: '50%', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          transition: 'transform 0.2s',
          transform: checked ? 'translateX(22px)' : 'translateX(2px)',
        }}/>
      </button>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', icon }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#9CA3AF', fontSize: '11px', marginBottom: '4px' }}>
        {icon}
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', background: '#2C2C2E', color: '#F2F2F7', fontSize: '13px',
          borderRadius: '8px', padding: '8px 12px', border: '1px solid transparent',
          outline: 'none', boxSizing: 'border-box',
        }}
        onFocus={e => e.target.style.borderColor = '#25D366'}
        onBlur={e => e.target.style.borderColor = 'transparent'}
      />
    </div>
  )
}

function SectionLabel({ title }) {
  return (
    <div style={{ color: '#6B7280', fontSize: '10.5px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '7px', paddingLeft: '1px' }}>
      {title}
    </div>
  )
}

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

  const tabBtn = (id, icon, label, badge) => (
    <button
      onClick={() => setTab(id)}
      style={{
        flex: 1, height: '34px', border: 'none', cursor: 'pointer',
        borderRadius: '8px', fontSize: '11.5px', fontWeight: '600',
        background: tab === id ? '#2C2C2E' : 'transparent',
        color: tab === id ? '#F2F2F7' : '#6B7280',
        transition: 'all 0.15s',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
      }}
    >
      {icon}
      {label}
      {badge ? <span style={{ background: '#25D366', color: 'white', borderRadius: '9px', fontSize: '10px', padding: '0 5px', lineHeight: '16px' }}>{badge}</span> : null}
    </button>
  )

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #1A1A1C 0%, #141416 100%)' }}>

      {/* Header */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #2C2C2E', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
            <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.005c6.554 0 11.89-5.335 11.893-11.893a11.772 11.772 0 00-3.423-8.453zm-8.475 18.304h-.004a9.88 9.88 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>WA Simulator</div>
          <div style={{ color: '#6B7280', fontSize: '10.5px' }}>WhatsApp Business</div>
        </div>
        <button
          onClick={() => setShowSettings(s => !s)}
          style={{ color: showSettings ? '#25D366' : '#6B7280', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}
          title="Configurações"
        >
          <Gear size={18} weight={showSettings ? 'fill' : 'regular'} />
        </button>
      </div>

      {/* Settings drawer */}
      {showSettings && (
        <div style={{ padding: '12px 16px', background: '#1C1C1E', borderBottom: '1px solid #2C2C2E' }}>
          {/* Brand logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                width: '46px', height: '46px', borderRadius: '50%',
                background: brand.avatarColor || '#2C2C2E', border: '2px dashed #3C3C3E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', overflow: 'hidden', flexShrink: 0,
              }}
            >
              {brand.logo ? (
                <img src={brand.logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <UploadSimple size={18} color="#6B7280" />
              )}
            </div>
            <div>
              <button onClick={() => fileRef.current?.click()} style={{ color: '#25D366', fontSize: '11.5px', background: 'none', border: 'none', cursor: 'pointer', display: 'block', padding: 0 }}>
                {brand.logo ? 'Trocar logo' : 'Upload logo'}
              </button>
              {brand.logo && (
                <button onClick={() => onBrandChange({ ...brand, logo: null })} style={{ color: '#EF4444', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', display: 'block', padding: 0, marginTop: '2px' }}>
                  Remover
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoUpload} />
          </div>

          <Field label="Nome da Marca" icon={<Storefront size={11} />} value={brand.name} onChange={v => onBrandChange({ ...brand, name: v })} placeholder="Ex: Glow Beauty" />
          <Field label="Telefone" icon={<User size={11} />} value={brand.phone || ''} onChange={v => onBrandChange({ ...brand, phone: v })} placeholder="+55 11 9999-9999" />
          <Toggle label="Badge Verificado" icon={<SealCheck size={14} color="#3B82F6" />} checked={!!brand.verified} onChange={v => onBrandChange({ ...brand, verified: v })} />
          <Toggle label="Conta Comercial" icon={<Storefront size={14} color="#9CA3AF" />} checked={!!brand.isCommercial} onChange={v => onBrandChange({ ...brand, isCommercial: v })} />

          <div style={{ height: '1px', background: '#2C2C2E', margin: '10px 0' }} />

          <SectionLabel title="Variáveis de texto" />
          <Field label="{nome}" icon={<User size={11} />} value={vars.nome || ''} onChange={v => onVarsChange({ ...vars, nome: v })} placeholder="Nome do cliente" />
          <Field label="{coupon}" icon={<Tag size={11} />} value={vars.coupon || ''} onChange={v => onVarsChange({ ...vars, coupon: v })} placeholder="Código do cupom" />
          <Field label="{discount}" icon={<Percent size={11} />} value={vars.discount || ''} onChange={v => onVarsChange({ ...vars, discount: v })} placeholder="% de desconto" />
          <Field label="{product}" icon={<Package size={11} />} value={vars.product || ''} onChange={v => onVarsChange({ ...vars, product: v })} placeholder="Nome do produto" />
          <Field label="{fan_name}" icon={<Star size={11} />} value={vars.fan_name || ''} onChange={v => onVarsChange({ ...vars, fan_name: v })} placeholder="Nome do fã" />

          <div style={{ height: '1px', background: '#2C2C2E', margin: '10px 0' }} />
          <Toggle
            label="Modo Escuro"
            icon={dark ? <Moon size={14} weight="fill" color="#8B5CF6" /> : <Sun size={14} color="#F59E0B" />}
            checked={dark}
            onChange={onDarkChange}
          />
        </div>
      )}

      {/* Tab bar */}
      <div style={{ display: 'flex', padding: '8px 10px', gap: '3px', background: '#141416', borderBottom: '1px solid #2C2C2E' }}>
        {tabBtn('templates', <SquaresFour size={14} weight={tab === 'templates' ? 'fill' : 'regular'} />, 'Templates')}
        {tabBtn('editor', <PencilSimple size={14} weight={tab === 'editor' ? 'fill' : 'regular'} />, 'Editor')}
        {tabBtn('saved', <BookmarkSimple size={14} weight={tab === 'saved' ? 'fill' : 'regular'} />, 'Salvos', customTemplates?.length || null)}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto config-scroll" style={{ padding: '14px' }}>

        {tab === 'templates' && (
          <>
            {/* Segments */}
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
                        border: active ? '1.5px solid #25D366' : '1.5px solid #2C2C2E',
                        background: active ? '#1A3A22' : '#1C1C1E',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ fontSize: '15px', flexShrink: 0 }}>{seg.emoji}</span>
                      <span style={{ color: active ? '#4ADE80' : '#D1D5DB', fontSize: '11px', fontWeight: active ? '600' : '500', lineHeight: '1.3' }}>
                        {seg.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Types */}
            <div style={{ marginBottom: '16px' }}>
              <SectionLabel title="Tipo de conversa" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {TYPES.map(t => {
                  const active = selectedType === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => onSelectType(t.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '9px 12px', borderRadius: '9px', textAlign: 'left',
                        border: active ? `1.5px solid ${t.color}` : '1.5px solid #2C2C2E',
                        background: active ? `${t.color}15` : '#1C1C1E',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ flexShrink: 0 }}>{TYPE_ICONS_PH[t.id] || <SquaresFour size={17} />}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: active ? '#F2F2F7' : '#D1D5DB', fontSize: '12px', fontWeight: '600' }}>{t.name}</div>
                        <div style={{ color: '#6B7280', fontSize: '10.5px', marginTop: '1px' }}>{t.desc}</div>
                      </div>
                      {active && <Check size={14} color={t.color} weight="bold" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Current template info */}
            {selectedSegment && selectedType && (() => {
              const seg = SEGMENTS.find(s => s.id === selectedSegment)
              const type = TYPES.find(t => t.id === selectedType)
              return (
                <div style={{ background: '#1A3A22', borderRadius: '10px', padding: '10px 12px', border: '1px solid #25D36640' }}>
                  <div style={{ color: '#4ADE80', fontSize: '11.5px', fontWeight: '600', marginBottom: '3px' }}>
                    {seg?.emoji} {seg?.label} · {type?.name}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '10.5px' }}>
                    Marca: <span style={{ color: '#9CA3AF' }}>{seg?.brand}</span> · Cliente: <span style={{ color: '#9CA3AF' }}>{seg?.customer}</span>
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '10.5px', marginTop: '2px' }}>
                    Cupom: <span style={{ color: '#9CA3AF' }}>{seg?.coupon}</span> · Desconto: <span style={{ color: '#9CA3AF' }}>{seg?.discount}%</span>
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
            onSave={onSaveCustomTemplate}
            onLoad={onLoadCustomTemplate}
            onDelete={onDeleteCustomTemplate}
          />
        )}
      </div>

      {/* Export footer */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid #2C2C2E' }}>
        <button
          onClick={onExport}
          style={{
            width: '100%', height: '40px', borderRadius: '10px',
            background: '#2C2C2E', color: '#E9EDEF', fontWeight: '600', fontSize: '13px',
            border: '1px solid #3C3C3E', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
          }}
        >
          <DownloadSimple size={16} weight="bold" />
          Exportar PNG
        </button>
      </div>
    </div>
  )
}
