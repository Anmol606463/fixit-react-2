// ── Config — update these before deploying ──────────────────────────────
export const API_URL   = import.meta.env.VITE_API_URL   ?? 'http://localhost:5000'
export const WA_NUMBER = import.meta.env.VITE_WA_NUMBER ?? '971529307089'

// ── Category definitions ─────────────────────────────────────────────────
export interface Category {
  id:          string
  icon:        string
  name:        string
  placeholder: string
}

export const CATEGORIES: Category[] = [
  { id: 'travel',        icon: '✈️',  name: 'Travel & Flights',   placeholder: 'E.g. Return flights Dubai to London, 2 adults, Dec 20–27, business class...' },
  { id: 'visa',          icon: '🛂',  name: 'Visa & Immigration', placeholder: 'E.g. My UAE visa expires Jan 5, need urgent renewal, all documents ready...' },
  { id: 'accommodation', icon: '🏠',  name: 'Accommodation',      placeholder: 'E.g. Furnished 1BR in Dubai Marina, 3 months from Jan 1, budget AED 8k/mo...' },
  { id: 'transport',     icon: '🚗',  name: 'Car & Transport',    placeholder: 'E.g. Toyota Camry AC not working, need a reliable garage in Deira...' },
  { id: 'education',     icon: '🎓',  name: 'Education',          placeholder: 'E.g. Enroll my son in British curriculum school Abu Dhabi, Grade 5...' },
  { id: 'shopping',      icon: '🛒',  name: 'Shopping',           placeholder: 'E.g. 50 custom polo shirts with company logo for corporate event...' },
  { id: 'medical',       icon: '💊',  name: 'Medical',            placeholder: 'E.g. Orthopedic specialist for knee pain, this week in Dubai...' },
  { id: 'legal',         icon: '⚖️',  name: 'Legal',              placeholder: 'E.g. Bilingual consultant for tenancy contract dispute...' },
  { id: 'finance',       icon: '💰',  name: 'Finance',            placeholder: 'E.g. Help setting up a UAE business bank account...' },
  { id: 'home',          icon: '🔧',  name: 'Home Services',      placeholder: 'E.g. AC unit not cooling in JVC apartment, need technician ASAP...' },
  { id: 'business',      icon: '💼',  name: 'Business Setup',     placeholder: 'E.g. Set up mainland LLC in Dubai, trading license...' },
  { id: 'other',         icon: '📦',  name: 'Other',              placeholder: "Describe what you need and we'll find the right solution..." },
]

// ── WhatsApp message builder ─────────────────────────────────────────────
export function buildWAMessage(name: string, cat: Category, desc: string): string {
  return `Hi FixIt! I'm ${name}.\n\n*Category:* ${cat.icon} ${cat.name}\n\n*Request:*\n${desc}`
}

export function buildWALink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

// ── API call ─────────────────────────────────────────────────────────────
export async function saveRequest(params: {
  name:         string
  category:     string
  categoryIcon: string
  description:  string
  waMessage:    string
}): Promise<void> {
  await fetch(`${API_URL}/api/requests`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ ...params, phone: null }),
  })
}
