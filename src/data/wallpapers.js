// ─── Chat Wallpapers ──────────────────────────────────────────────────────────
// Each wallpaper has:
//   id         — unique key
//   label      — display name
//   group      — 'pattern' | 'gradient'
//   preview    — CSS background shorthand for the small swatch
//   style      — full CSS style object applied to the chat area div

const LEAF_LIGHT = `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23b8cfA0' fill-opacity='0.25'%3E%3Cpath d='M40 0 C35 10 25 15 20 25 C15 35 18 45 25 50 C20 55 15 65 20 72 L25 72 C20 66 24 58 28 53 C32 57 38 60 40 68 C42 60 48 57 52 53 C56 58 60 66 55 72 L60 72 C65 65 60 55 55 50 C62 45 65 35 60 25 C55 15 45 10 40 0Z'/%3E%3C/g%3E%3C/svg%3E")`
const LEAF_DARK = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`

const POLKA = `radial-gradient(circle, rgba(0,0,0,0.12) 1.5px, transparent 1.5px)`
const GRID = `linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)`
const DIAG = `repeating-linear-gradient(45deg, transparent, transparent 9px, rgba(0,0,0,0.07) 9px, rgba(0,0,0,0.07) 10px)`
const HEX = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cpolygon points='14,1 27,8 27,22 14,29 1,22 1,8' fill='none' stroke='rgba(0,0,0,0.1)' stroke-width='1'/%3E%3Cpolygon points='14,22 27,29 27,43 14,50 1,43 1,29' fill='none' stroke='rgba(0,0,0,0.1)' stroke-width='1'/%3E%3C/svg%3E")`
const CIRC = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='10' fill='none' stroke='rgba(0,0,0,0.07)' stroke-width='1'/%3E%3C/svg%3E")`
const WAVE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20' viewBox='0 0 80 20'%3E%3Cpath d='M0 10 Q10 0 20 10 Q30 20 40 10 Q50 0 60 10 Q70 20 80 10' fill='none' stroke='rgba(0,0,0,0.08)' stroke-width='1.2'/%3E%3C/svg%3E")`

export const WALLPAPERS = [
  // ── Patterns ─────────────────────────────────────────────────────────────
  {
    id: 'wa_light',
    label: 'WA Verde',
    group: 'pattern',
    preview: '#D9E5BE',
    style: { backgroundColor: '#D9E5BE', backgroundImage: LEAF_LIGHT },
  },
  {
    id: 'wa_dark',
    label: 'WA Dark',
    group: 'pattern',
    preview: '#0B141A',
    style: { backgroundColor: '#0B141A', backgroundImage: LEAF_DARK },
  },
  {
    id: 'polka_blue',
    label: 'Bolinhas',
    group: 'pattern',
    preview: '#EEF2FF',
    style: { backgroundColor: '#EEF2FF', backgroundImage: POLKA, backgroundSize: '18px 18px' },
  },
  {
    id: 'polka_pink',
    label: 'Bolinhas Rosa',
    group: 'pattern',
    preview: '#FDF2F8',
    style: { backgroundColor: '#FDF2F8', backgroundImage: POLKA, backgroundSize: '18px 18px' },
  },
  {
    id: 'grid',
    label: 'Grade',
    group: 'pattern',
    preview: '#F8FAFC',
    style: { backgroundColor: '#F8FAFC', backgroundImage: GRID, backgroundSize: '22px 22px' },
  },
  {
    id: 'diagonal',
    label: 'Diagonal',
    group: 'pattern',
    preview: '#FFF7ED',
    style: { backgroundColor: '#FFF7ED', backgroundImage: DIAG },
  },
  {
    id: 'hexagon',
    label: 'Hexágonos',
    group: 'pattern',
    preview: '#F0FDF4',
    style: { backgroundColor: '#F0FDF4', backgroundImage: HEX, backgroundSize: '28px 49px' },
  },
  {
    id: 'circles',
    label: 'Círculos',
    group: 'pattern',
    preview: '#FAFAFA',
    style: { backgroundColor: '#FAFAFA', backgroundImage: CIRC, backgroundSize: '40px 40px' },
  },
  {
    id: 'waves',
    label: 'Ondas',
    group: 'pattern',
    preview: '#EFF6FF',
    style: { backgroundColor: '#EFF6FF', backgroundImage: WAVE, backgroundSize: '80px 20px' },
  },

  // ── Gradients ─────────────────────────────────────────────────────────────
  {
    id: 'grad_sunset',
    label: 'Sunset',
    group: 'gradient',
    preview: 'linear-gradient(135deg, #FF9A9E, #FECFEF)',
    style: { background: 'linear-gradient(160deg, #FF9A9E 0%, #FECFEF 60%, #FFF1F5 100%)' },
  },
  {
    id: 'grad_ocean',
    label: 'Ocean',
    group: 'gradient',
    preview: 'linear-gradient(135deg, #667eea, #764ba2)',
    style: { background: 'linear-gradient(160deg, #667eea 0%, #764ba2 100%)' },
  },
  {
    id: 'grad_mint',
    label: 'Mint',
    group: 'gradient',
    preview: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    style: { background: 'linear-gradient(160deg, #a8edea 0%, #b8f5d0 50%, #fed6e3 100%)' },
  },
  {
    id: 'grad_sky',
    label: 'Sky',
    group: 'gradient',
    preview: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    style: { background: 'linear-gradient(160deg, #4facfe 0%, #00f2fe 100%)' },
  },
  {
    id: 'grad_rose',
    label: 'Rose Gold',
    group: 'gradient',
    preview: 'linear-gradient(135deg, #f093fb, #f5576c)',
    style: { background: 'linear-gradient(160deg, #f093fb 0%, #f5576c 100%)' },
  },
  {
    id: 'grad_peach',
    label: 'Peach',
    group: 'gradient',
    preview: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
    style: { background: 'linear-gradient(160deg, #ffecd2 0%, #fcb69f 100%)' },
  },
  {
    id: 'grad_lavender',
    label: 'Lavanda',
    group: 'gradient',
    preview: 'linear-gradient(135deg, #d299c2, #fef9d7)',
    style: { background: 'linear-gradient(160deg, #d299c2 0%, #fef9d7 100%)' },
  },
  {
    id: 'grad_night',
    label: 'Noite',
    group: 'gradient',
    preview: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    style: { background: 'linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' },
  },
  {
    id: 'grad_forest',
    label: 'Floresta',
    group: 'gradient',
    preview: 'linear-gradient(135deg, #134e5e, #71b280)',
    style: { background: 'linear-gradient(160deg, #134e5e 0%, #71b280 100%)' },
  },
  {
    id: 'grad_fire',
    label: 'Fogo',
    group: 'gradient',
    preview: 'linear-gradient(135deg, #f12711, #f5af19)',
    style: { background: 'linear-gradient(160deg, #f12711 0%, #f5af19 100%)' },
  },
]

export const DEFAULT_WALLPAPER_ID = 'wa_light'
export const getWallpaper = (id) => WALLPAPERS.find(w => w.id === id) ?? WALLPAPERS[0]
