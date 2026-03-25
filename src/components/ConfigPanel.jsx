import { useRef, useState } from 'react'
import { SEGMENTS } from '../data/segments'
import { TYPES } from '../data/templates'
import MessageEditor from './MessageEditor'

function Toggle({ label, checked, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0' }}>
      <span style={{ color: '#F2F2F7', fontSize: '13px' }}>{label}</span>
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

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <label style={{ display: 'block', color: '#9CA3AF', fontSize: '11px', marginBottom: '4px' }}>{label}</label>
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
}) {
  const fileRef = useRef()
  const [tab, setTab] = useState('templates') // 'templates' | 'editor'
  const [showSettings, setShowSettings] = useState(false)

  const handleLogoUpload = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => onBrandChange({ ...brand, logo: ev.target.result })
    reader.readAsDataURL(file)
  }

  const tabBtn = (id, label) => (
    <button
      onClick={() => setTab(id)}
      style={{
        flex: 1, height: '34px', border: 'none', cursor: 'pointer',
        borderRadius: '8px', fontSize: '13px', fontWeight: '600',
        background: tab === id ? '#2C2C2E' : 'transparent',
        color: tab === id ? '#F2F2F7' : '#6B7280',
        transition: 'all 0.15s',
      }}
    >
      {label}
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
          style={{ color: showSettings ? '#25D366' : '#6B7280', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          title="Configurações"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
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

          <Field label="Nome da Marca" value={brand.name} onChange={v => onBrandChange({ ...brand, name: v })} placeholder="Ex: Glow Beauty" />
          <Field label="Telefone" value={brand.phone || ''} onChange={v => onBrandChange({ ...brand, phone: v })} placeholder="+55 11 9999-9999" />
          <Toggle label="Badge Verificado ✓" checked={!!brand.verified} onChange={v => onBrandChange({ ...brand, verified: v })} />
          <Toggle label="Conta Comercial" checked={!!brand.isCommercial} onChange={v => onBrandChange({ ...brand, isCommercial: v })} />

          <div style={{ height: '1px', background: '#2C2C2E', margin: '10px 0' }} />

          <SectionLabel title="Variáveis de texto" />
          <Field label="{nome}" value={vars.nome || ''} onChange={v => onVarsChange({ ...vars, nome: v })} placeholder="Nome do cliente" />
          <Field label="{coupon}" value={vars.coupon || ''} onChange={v => onVarsChange({ ...vars, coupon: v })} placeholder="Código do cupom" />
          <Field label="{discount}" value={vars.discount || ''} onChange={v => onVarsChange({ ...vars, discount: v })} placeholder="% de desconto" />
          <Field label="{product}" value={vars.product || ''} onChange={v => onVarsChange({ ...vars, product: v })} placeholder="Nome do produto" />
          <Field label="{fan_name}" value={vars.fan_name || ''} onChange={v => onVarsChange({ ...vars, fan_name: v })} placeholder="Nome do fã" />

          <div style={{ height: '1px', background: '#2C2C2E', margin: '10px 0' }} />
          <Toggle label="🌙 Modo Escuro" checked={dark} onChange={onDarkChange} />
        </div>
      )}

      {/* Tab bar */}
      <div style={{ display: 'flex', padding: '8px 12px', gap: '4px', background: '#141416', borderBottom: '1px solid #2C2C2E' }}>
        {tabBtn('templates', '📋 Templates')}
        {tabBtn('editor', '✏️ Editor')}
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
                        border: active ? `1.5px solid #25D366` : '1.5px solid #2C2C2E',
                        background: active ? '#1A3A22' : '#1C1C1E',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ fontSize: '16px', flexShrink: 0 }}>{seg.emoji}</span>
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
                      <span style={{ fontSize: '18px', flexShrink: 0 }}>{t.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: active ? '#F2F2F7' : '#D1D5DB', fontSize: '12px', fontWeight: '600' }}>{t.name}</div>
                        <div style={{ color: '#6B7280', fontSize: '10.5px', marginTop: '1px' }}>{t.desc}</div>
                      </div>
                      {active && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2.5" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
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
                    {seg?.emoji} {seg?.label} · {type?.icon} {type?.name}
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
      </div>

      {/* Export footer */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid #2C2C2E', display: 'flex', gap: '8px' }}>
        <button
          onClick={onExport}
          style={{
            flex: 1, height: '40px', borderRadius: '10px',
            background: '#2C2C2E', color: '#E9EDEF', fontWeight: '600', fontSize: '13px',
            border: '1px solid #3C3C3E', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          Exportar PNG
        </button>
      </div>
    </div>
  )
}
