import { useRef, useState } from 'react'
import { TEMPLATES } from '../data/templates'

const TEMPLATE_LIST = Object.values(TEMPLATES)

const EXAMPLE_PROMPTS = [
  'Campanha de NPS para loja de roupas, cliente chamado Bruno, desconto de R$30',
  'Promoção Black Friday com carrossel de 4 produtos de eletrônicos',
  'Reativação de cliente inativo da marca de cosméticos Glow Beauty',
  'Lançamento do produto "Whey Protein Pro" com oferta de 25% OFF',
  'Recompra inteligente de suplementos para academia',
]

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <div style={{ color: '#6B7280', fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '2px' }}>
        {title}
      </div>
      {children}
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

function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between" style={{ padding: '6px 0' }}>
      <span style={{ color: '#F2F2F7', fontSize: '13px' }}>{label}</span>
      <button
        onClick={() => onChange(!checked)}
        style={{
          position: 'relative', width: '44px', height: '24px',
          borderRadius: '12px', background: checked ? '#25D366' : '#3A3A3C',
          border: 'none', cursor: 'pointer', transition: 'background 0.2s',
          flexShrink: 0,
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

export default function ConfigPanel({
  prompt, onPromptChange,
  generating, onGenerate,
  selectedTemplate, onSelectTemplate,
  brand, onBrandChange,
  vars, onVarsChange,
  dark, onDarkChange,
  apiKey, onApiKeyChange,
  onExport,
  error,
}) {
  const fileRef = useRef()
  const [showSettings, setShowSettings] = useState(false)

  const handleLogoUpload = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => onBrandChange({ ...brand, logo: ev.target.result })
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #1A1A1C 0%, #141416 100%)' }}>

      {/* Header */}
      <div style={{ padding: '16px', borderBottom: '1px solid #2C2C2E', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.005c6.554 0 11.89-5.335 11.893-11.893a11.772 11.772 0 00-3.423-8.453zm-8.475 18.304h-.004a9.88 9.88 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>WA Simulator</div>
          <div style={{ color: '#6B7280', fontSize: '11px' }}>WhatsApp Business API</div>
        </div>
        <button onClick={() => setShowSettings(s => !s)} style={{ color: showSettings ? '#25D366' : '#6B7280', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </button>
      </div>

      {/* Scrollable area */}
      <div className="flex-1 overflow-y-auto config-scroll" style={{ padding: '16px' }}>

        {/* Settings panel */}
        {showSettings && (
          <div style={{ background: '#2C2C2E', borderRadius: '12px', padding: '12px', marginBottom: '16px', border: '1px solid #3C3C3E' }}>
            <div style={{ color: '#F2F2F7', fontSize: '12px', fontWeight: '600', marginBottom: '10px' }}>⚙️ Configurações</div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', color: '#9CA3AF', fontSize: '11px', marginBottom: '4px' }}>Anthropic API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={e => onApiKeyChange(e.target.value)}
                placeholder="sk-ant-..."
                style={{
                  width: '100%', background: '#1C1C1E', color: '#F2F2F7', fontSize: '12px',
                  borderRadius: '8px', padding: '8px 12px', border: '1px solid #3C3C3E',
                  outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace',
                }}
              />
              <div style={{ color: '#6B7280', fontSize: '10.5px', marginTop: '4px' }}>
                Sua chave é salva localmente. Não é enviada a nenhum servidor.
              </div>
            </div>
          </div>
        )}

        {/* ── PROMPT GENERATION ── */}
        <Section title="Gerar com Claude AI">
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <textarea
              value={prompt}
              onChange={e => onPromptChange(e.target.value)}
              placeholder="Descreva a conversa que você quer criar…&#10;&#10;Ex: NPS para academia GoldFit, cliente João, cupom FITNESS20"
              rows={4}
              style={{
                width: '100%', background: '#2C2C2E', color: '#F2F2F7', fontSize: '13px',
                borderRadius: '10px', padding: '10px 12px', border: '1px solid #3C3C3E',
                outline: 'none', resize: 'none', boxSizing: 'border-box', lineHeight: '1.5',
                fontFamily: 'inherit',
              }}
              onFocus={e => e.target.style.borderColor = '#25D366'}
              onBlur={e => e.target.style.borderColor = '#3C3C3E'}
            />
          </div>

          {/* Example prompts */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ color: '#6B7280', fontSize: '10.5px', marginBottom: '5px' }}>Exemplos rápidos:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {EXAMPLE_PROMPTS.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => onPromptChange(ex)}
                  style={{
                    background: '#2C2C2E', color: '#9CA3AF', fontSize: '11px',
                    borderRadius: '6px', padding: '5px 8px', border: '1px solid #3C3C3E',
                    textAlign: 'left', cursor: 'pointer', lineHeight: '1.4',
                  }}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: '#2D1515', border: '1px solid #5C2020', borderRadius: '8px', padding: '8px 10px', marginBottom: '8px', color: '#F87171', fontSize: '12px' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Generate button */}
          <button
            onClick={onGenerate}
            disabled={generating || !prompt.trim()}
            style={{
              width: '100%', height: '42px', borderRadius: '10px',
              background: generating || !prompt.trim() ? '#1C4D2E' : '#25D366',
              color: generating || !prompt.trim() ? '#4B8C5E' : 'white',
              fontWeight: '600', fontSize: '14px', border: 'none', cursor: generating || !prompt.trim() ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'all 0.2s',
            }}
          >
            {generating ? (
              <>
                <svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                Gerando...
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                Gerar com Claude
              </>
            )}
          </button>
        </Section>

        {/* ── OR USE TEMPLATE ── */}
        <Section title="Ou escolha um template">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {TEMPLATE_LIST.map(t => (
              <button
                key={t.id}
                onClick={() => onSelectTemplate(t.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  padding: '10px', borderRadius: '10px', textAlign: 'left',
                  border: selectedTemplate === t.id ? `1.5px solid ${t.color}` : '1.5px solid #2C2C2E',
                  background: selectedTemplate === t.id ? `${t.color}15` : '#2C2C2E',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '18px', marginBottom: '4px' }}>{t.icon}</span>
                <span style={{ color: '#F2F2F7', fontSize: '11px', fontWeight: '600', lineHeight: '1.3' }}>{t.name}</span>
              </button>
            ))}
          </div>
        </Section>

        {/* ── BRAND ── */}
        <Section title="Marca">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: '#2C2C2E', border: '2px dashed #3C3C3E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', overflow: 'hidden', flexShrink: 0,
              }}
            >
              {brand.logo ? (
                <img src={brand.logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
              )}
            </div>
            <div>
              <button onClick={() => fileRef.current?.click()} style={{ color: '#25D366', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', display: 'block', padding: 0 }}>
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
          <Field label="Nome da Marca" value={brand.name} onChange={v => onBrandChange({ ...brand, name: v })} placeholder="Ex: GoldKo" />
          <Field label="Telefone" value={brand.phone} onChange={v => onBrandChange({ ...brand, phone: v })} placeholder="+55 11 9999-9999" />
          <Toggle label="Badge Verificado ✓" checked={brand.verified} onChange={v => onBrandChange({ ...brand, verified: v })} />
          <Toggle label="Conta Comercial" checked={brand.isCommercial} onChange={v => onBrandChange({ ...brand, isCommercial: v })} />
        </Section>

        {/* ── VARIABLES ── */}
        <Section title="Variáveis">
          <Field label="Nome do cliente {nome}" value={vars.nome} onChange={v => onVarsChange({ ...vars, nome: v })} placeholder="Juliana" />
          <Field label="Cupom {coupon}" value={vars.coupon} onChange={v => onVarsChange({ ...vars, coupon: v })} placeholder="TOP10" />
          <Field label="Desconto {discount}" value={vars.discount} onChange={v => onVarsChange({ ...vars, discount: v })} placeholder="20" />
          <Field label="Produto {product}" value={vars.product} onChange={v => onVarsChange({ ...vars, product: v })} placeholder="Super Shampoo" />
          <Field label="Fã {fan_name}" value={vars.fan_name} onChange={v => onVarsChange({ ...vars, fan_name: v })} placeholder="Gold Member" />
        </Section>

        {/* ── APPEARANCE ── */}
        <Section title="Aparência">
          <Toggle label="🌙 Modo Escuro" checked={dark} onChange={onDarkChange} />
        </Section>
      </div>

      {/* Export footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #2C2C2E' }}>
        <button
          onClick={onExport}
          style={{
            width: '100%', height: '42px', borderRadius: '10px',
            background: '#2C2C2E', color: '#E9EDEF', fontWeight: '600', fontSize: '13px',
            border: '1px solid #3C3C3E', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          Exportar PNG
        </button>
      </div>
    </div>
  )
}
