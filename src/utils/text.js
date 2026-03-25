// Apply variable substitution to text
export function applyVars(text, vars) {
  if (!text) return ''
  return text.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`)
}

// Parse WhatsApp markdown: *bold*, _italic_, ~strikethrough~
export function parseWAMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/~(.*?)~/g, '<del>$1</del>')
    .replace(/\n/g, '<br />')
}

// Generate a color from a string (for avatars)
export function stringToColor(str) {
  const colors = [
    '#25D366', '#128C7E', '#075E54',
    '#00A884', '#34B7F1', '#ECE5DD',
    '#667eea', '#764ba2', '#f093fb',
    '#4facfe', '#43e97b', '#fa709a',
  ]
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

// Get initials from brand name
export function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
}
