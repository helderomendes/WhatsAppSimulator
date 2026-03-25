import { useState } from 'react'
import { FloppyDisk, Trash, DownloadSimple } from '@phosphor-icons/react'

const inputStyle = {
  width: '100%', background: '#1C1C1E', color: '#F2F2F7', fontSize: '13px',
  borderRadius: '8px', padding: '8px 12px', border: '1px solid #3C3C3E',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' })
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

  const handleSave = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    onSave({
      id: `custom_${Date.now()}`,
      name: trimmed,
      messages: currentMessages,
      brand: currentBrand,
      vars: currentVars,
      createdAt: Date.now(),
    })
    setName('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* Save current as template */}
      <div style={{ background: '#1C1C1E', borderRadius: '10px', padding: '12px', border: '1px solid #2C2C2E' }}>
        <div style={{ color: '#9CA3AF', fontSize: '10.5px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
          Salvar conversa atual
        </div>
        <div style={{ color: '#6B7280', fontSize: '11px', marginBottom: '8px' }}>
          {currentMessages.length} mensagem{currentMessages.length !== 1 ? 's' : ''} · {currentBrand?.name || 'Sem marca'}
        </div>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          placeholder="Nome do template…"
          style={inputStyle}
        />
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          style={{
            marginTop: '8px', width: '100%', height: '36px', borderRadius: '8px',
            background: name.trim() ? '#25D366' : '#1C4D2E',
            color: name.trim() ? 'white' : '#4B8C5E',
            border: 'none', cursor: name.trim() ? 'pointer' : 'not-allowed',
            fontSize: '13px', fontWeight: '600',
          }}
        >
          <FloppyDisk size={14} weight="bold" /> Salvar template
        </button>
      </div>

      {/* Saved templates list */}
      {templates.length === 0 ? (
        <div style={{ color: '#4B5563', fontSize: '12px', textAlign: 'center', padding: '20px 0' }}>
          Nenhum template salvo ainda.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ color: '#6B7280', fontSize: '10.5px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Templates salvos ({templates.length})
          </div>
          {templates.map(tpl => (
            <div key={tpl.id} style={{ background: '#1C1C1E', borderRadius: '10px', padding: '10px 12px', border: '1px solid #2C2C2E' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#F2F2F7', fontSize: '13px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {tpl.name}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '10.5px', marginTop: '2px' }}>
                    {tpl.brand?.name || '—'} · {msgTypeSummary(tpl.messages || [])}
                  </div>
                  <div style={{ color: '#4B5563', fontSize: '10px', marginTop: '1px' }}>
                    {formatDate(tpl.createdAt)}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                  {confirmDelete === tpl.id ? (
                    <>
                      <button
                        onClick={() => { onDelete(tpl.id); setConfirmDelete(null) }}
                        style={{ background: '#EF4444', color: 'white', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '11px', fontWeight: '600' }}
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        style={{ background: '#2C2C2E', color: '#9CA3AF', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '11px' }}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => onLoad(tpl)}
                        style={{ background: '#1A3A22', color: '#4ADE80', border: '1px solid #25D36640', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <DownloadSimple size={12} weight="bold" /> Carregar
                      </button>
                      <button
                        onClick={() => setConfirmDelete(tpl.id)}
                        style={{ background: 'none', color: '#EF4444', border: 'none', borderRadius: '6px', padding: '4px 6px', cursor: 'pointer', fontSize: '13px' }}
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
