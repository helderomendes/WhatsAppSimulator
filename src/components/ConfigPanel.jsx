import { useRef } from 'react'
import { TEMPLATES } from '../data/templates'

const TEMPLATE_LIST = Object.values(TEMPLATES)

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <div className="text-[11px] font-semibold uppercase tracking-widest text-[#6B7280] mb-2 px-1">
        {title}
      </div>
      {children}
    </div>
  )
}

function InputField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className="mb-2">
      <label className="block text-[11px] text-[#9CA3AF] mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#2C2C2E] text-[#F2F2F7] text-[13px] rounded-lg px-3 py-2 outline-none border border-transparent focus:border-[#25D366] placeholder-[#6B7280] transition-colors"
      />
    </div>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-[13px] text-[#F2F2F7]">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-[#25D366]' : 'bg-[#3A3A3C]'}`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

export default function ConfigPanel({
  selectedTemplate, onSelectTemplate,
  brand, onBrandChange,
  vars, onVarsChange,
  dark, onDarkChange,
  onExport,
}) {
  const fileRef = useRef()

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onBrandChange({ ...brand, logo: ev.target.result })
    reader.readAsDataURL(file)
  }

  return (
    <div className="h-full flex flex-col config-panel">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-[#2C2C2E]">
        <div className="w-7 h-7 rounded-lg bg-[#25D366] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.005c6.554 0 11.89-5.335 11.893-11.893a11.772 11.772 0 00-3.423-8.453zm-8.475 18.304h-.004a9.88 9.88 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/>
          </svg>
        </div>
        <div>
          <div className="text-[14px] font-semibold text-white">WA Simulator</div>
          <div className="text-[11px] text-[#6B7280]">WhatsApp Business</div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto config-scroll px-4 py-4">

        {/* Template Selection */}
        <Section title="Template">
          <div className="grid grid-cols-2 gap-2">
            {TEMPLATE_LIST.map(t => (
              <button
                key={t.id}
                onClick={() => onSelectTemplate(t.id)}
                className={`flex flex-col items-start p-2.5 rounded-xl border transition-all text-left ${
                  selectedTemplate === t.id
                    ? 'border-[#25D366] bg-[#25D36615]'
                    : 'border-[#2C2C2E] bg-[#2C2C2E] hover:border-[#3C3C3E]'
                }`}
              >
                <div className="text-xl mb-1">{t.icon}</div>
                <div className="text-[11px] font-semibold text-[#F2F2F7] leading-tight">{t.name}</div>
                <div className="text-[10px] text-[#6B7280] leading-tight mt-0.5">{t.description}</div>
              </button>
            ))}
          </div>
        </Section>

        {/* Brand Settings */}
        <Section title="Marca">
          {/* Logo upload */}
          <div className="mb-3">
            <label className="block text-[11px] text-[#9CA3AF] mb-1">Logo</label>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full bg-[#2C2C2E] border border-[#3C3C3E] overflow-hidden flex items-center justify-center cursor-pointer"
                onClick={() => fileRef.current?.click()}
              >
                {brand.logo ? (
                  <img src={brand.logo} alt="logo" className="w-full h-full object-cover" />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                )}
              </div>
              <div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="text-[12px] text-[#25D366] hover:text-[#1DB954] transition-colors block"
                >
                  {brand.logo ? 'Trocar logo' : 'Fazer upload'}
                </button>
                {brand.logo && (
                  <button
                    onClick={() => onBrandChange({ ...brand, logo: null })}
                    className="text-[11px] text-[#EF4444] hover:text-[#DC2626] transition-colors block mt-0.5"
                  >
                    Remover
                  </button>
                )}
              </div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
          </div>

          <InputField
            label="Nome da Marca"
            value={brand.name}
            onChange={v => onBrandChange({ ...brand, name: v })}
            placeholder="Nome da marca"
          />
          <InputField
            label="Telefone"
            value={brand.phone}
            onChange={v => onBrandChange({ ...brand, phone: v })}
            placeholder="+55 11 9999-9999"
          />
          <Toggle
            label="Verificado (badge)"
            checked={brand.verified}
            onChange={v => onBrandChange({ ...brand, verified: v })}
          />
          <Toggle
            label="Conta Comercial"
            checked={brand.isCommercial}
            onChange={v => onBrandChange({ ...brand, isCommercial: v })}
          />
        </Section>

        {/* Variables */}
        <Section title="Variáveis da Mensagem">
          <InputField
            label="Nome do cliente {nome}"
            value={vars.nome}
            onChange={v => onVarsChange({ ...vars, nome: v })}
            placeholder="Juliana"
          />
          <InputField
            label="Nome da marca {brand}"
            value={vars.brand}
            onChange={v => onVarsChange({ ...vars, brand: v })}
            placeholder="GoldKo"
          />
          <InputField
            label="Nome de fã {fan_name}"
            value={vars.fan_name}
            onChange={v => onVarsChange({ ...vars, fan_name: v })}
            placeholder="Gold Member"
          />
          <InputField
            label="Cupom {coupon}"
            value={vars.coupon}
            onChange={v => onVarsChange({ ...vars, coupon: v })}
            placeholder="TOP10"
          />
          <InputField
            label="Desconto % {discount}"
            value={vars.discount}
            onChange={v => onVarsChange({ ...vars, discount: v })}
            placeholder="20"
          />
          <InputField
            label="Produto {product}"
            value={vars.product}
            onChange={v => onVarsChange({ ...vars, product: v })}
            placeholder="Super Shampoo"
          />
        </Section>

        {/* Appearance */}
        <Section title="Aparência">
          <Toggle
            label="Modo Escuro"
            checked={dark}
            onChange={onDarkChange}
          />
        </Section>
      </div>

      {/* Export button */}
      <div className="px-4 py-3 border-t border-[#2C2C2E]">
        <button
          onClick={onExport}
          className="w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-[#1DB954] active:bg-[#17A34A] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          Exportar como PNG
        </button>
      </div>
    </div>
  )
}
