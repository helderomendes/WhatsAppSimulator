import { useState } from 'react'
import { FloppyDisk, Trash, ArrowLineDown } from '@phosphor-icons/react'

const BLUE = '#1877F2'
const BLUE_DIM = '#1877F220'
const BLUE_BORDER = '#1877F250'

const inputStyle = {
  width: '100%', background: '#181818', color: '#F2F2F7', fontSize: '13px',
  borderRadius: '8px', padding: '8px 11px', border: '1px solid #2C2C2E',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit',
  })
}

function msgTypeSummary(messages) {
  const counts = {}
  for (const m of messages) {
    if (m.type === 'separator' || m.type === 'unread') continue
    counts[m.type] = (counts[m.type] || 0) + 1
  }
  return Object.entries(counts).map(([t, n]) => `${n} ${t}`).join(', ') || 'vazio'
}

export default function CustomTemplatesTab({ templates, onSave, onLoad, onDelete, currentMessages, currentBrand, currentVars }) {
  const [name, setName] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)
  const canSave = name.trim().length > 0

  const handleSave = () => {
    if (!canSave) return
    onSave({
      id: `custom_${Date.now()}`,
      name: name.trim(),
      messages: currentMessages,
      brand: currentBrand,
      vars: currentVars,
      createdAt: Date.now(),
    })
    setName('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* Save card */}
      <div style={{ background: '#181818', borderRadius: '10px', padding: '12px', border: '1px solid #1C1C1E' }}>
        <div style={{ color: '#4B5563', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
          Salvar conversa atual
        </div>
        <div style={{ color: '#6B7280', fontSize: '11px', marginBottom: '8px' }}>
          {currentMessages.length} msg{currentMessages.length !== 1 ? 's' : ''} · {currentBrand?.name || 'Sem marca'}
        </div>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          placeholder="Nome do template…"
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = BLUE}
          onBlur={e => e.target.style.borderColor = '#2C2C2E'}
        />
        <button
          onClick={handleSave}
          disabled={!canSave}
          style={{
            marginTop: '8px', width: '100%', height: '35px', borderRadius: '8px',
            background: canSave ? BLUE : '#1C1C1E',
            color: canSave ? 'white' : '#4B5563',
            border: 'none', cursor: canSave ? 'pointer' : 'not-allowed',
            fontSize: '12px', fontWeight: '700',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            transition: 'background 0.15s',
          }}
        >
          <FloppyDisk size={14} weight="bold" />
          Salvar template
        </button>
      </div>

      {/* Saved list */}
      {templates.length === 0 ? (
        <div style={{ color: '#374151', fontSize: '12px', textAlign: 'center', padding: '24px 0' }}>
          Nenhum template salvo ainda.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ color: '#4B5563', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>
            Salvos ({templates.length})
          </div>
          {templates.map(tpl => (
            <div key={tpl.id} style={{ background: '#181818', borderRadius: '10px', padding: '10px 12px', border: '1px solid #1C1C1E' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#F2F2F7', fontSize: '13px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {tpl.name}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '10.5px', marginTop: '2px' }}>
                    {tpl.brand?.name || '—'} · {msgTypeSummary(tpl.messages || [])}
                  </div>
                  <div style={{ color: '#374151', fontSize: '10px', marginTop: '1px' }}>
                    {formatDate(tpl.createdAt)}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                  {confirmDelete === tpl.id ? (
                    <>
                      <button
                        onClick={() => { onDelete(tpl.id); setConfirmDelete(null) }}
                        style={{ background: '#EF4444', color: 'white', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '11px', fontWeight: '700' }}
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        style={{ background: '#1C1C1E', color: '#9CA3AF', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '11px' }}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => onLoad(tpl)}
                        style={{
                          background: BLUE_DIM, color: '#93C5FD',
                          border: `1px solid ${BLUE_BORDER}`,
                          borderRadius: '6px', padding: '4px 10px', cursor: 'pointer',
                          fontSize: '11px', fontWeight: '600',
                          display: 'flex', alignItems: 'center', gap: '4px',
                        }}
                      >
                        <ArrowLineDown size={11} weight="bold" /> Carregar
                      </button>
                      <button
                        onClick={() => setConfirmDelete(tpl.id)}
                        style={{ background: 'none', color: '#EF4444', border: 'none', borderRadius: '6px', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        title="Excluir"
                      >
                        <Trash size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
