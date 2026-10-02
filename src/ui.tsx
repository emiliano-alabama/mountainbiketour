import { useEffect, useState } from 'react'
import { NEXT_RACE } from '@/data'

// Pseudo-aleatorio determinista para que las crestas no cambien entre renders
export function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

// Línea de cresta: devuelve puntos [x, y] a lo ancho de `w`
export function ridgePoints(seed: number, w: number, base: number, amp: number, n = 18) {
  const r = seeded(seed)
  const p1 = r() * 6
  const p2 = r() * 6
  const pts: [number, number][] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    // macizo grande + lomas medianas + roca suelta, normalizado a 0..1
    const h = 0.5 + 0.28 * Math.sin(t * 5.2 + p1) + 0.14 * Math.sin(t * 13 + p2) + 0.08 * (r() - 0.5)
    pts.push([Math.round(t * w), Math.round(base - Math.max(0, Math.min(1, h)) * amp)])
  }
  return pts
}

export const toPath = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ')

export function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, target.getTime() - now)
  return {
    dias: Math.floor(diff / 86400000),
    horas: Math.floor((diff / 3600000) % 24),
    min: Math.floor((diff / 60000) % 60),
    seg: Math.floor((diff / 1000) % 60),
  }
}

export const Arrow = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={`h-4 w-4 ${className}`} aria-hidden="true">
    <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
)

export function CtaButton({ href, children, variant = 'volt', className = '' }: { href: string; children: React.ReactNode; variant?: 'volt' | 'ink' | 'line'; className?: string }) {
  const styles = {
    volt: 'bg-volt text-white hover:bg-ink hover:text-white',
    ink: 'bg-ink text-white hover:bg-brand',
    line: 'border-2 border-ink text-ink hover:bg-ink hover:text-white',
  }[variant]
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${styles} ${className}`}
    >
      {children}
      <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  )
}

export function Countdown() {
  const t = useCountdown(NEXT_RACE)
  const items = [
    { v: t.dias, l: 'días' },
    { v: t.horas, l: 'horas' },
    { v: t.min, l: 'min' },
    { v: t.seg, l: 'seg' },
  ]
  return (
    <div className="grid grid-cols-4 divide-x divide-line rounded-2xl border border-line bg-white" role="timer" aria-label="Cuenta regresiva para la largada">
      {items.map((i) => (
        <div key={i.l} className="px-2 py-3 text-center">
          <div className="font-mono text-2xl font-semibold tabular-nums md:text-3xl">{String(i.v).padStart(2, '0')}</div>
          <div className="eyebrow mt-1 text-[0.65rem] text-slate">{i.l}</div>
        </div>
      ))}
    </div>
  )
}

export const PROFILE_SHAPES: Record<string, number[]> = {
  // forma relativa del perfil (0 = base, 1 = punto más alto)
  Familiar: [0, 0.2, 0.45, 0.35, 0.7, 1, 0.75, 0.5, 0.6, 0.3, 0],
  Intermedio: [0, 0.25, 0.5, 0.4, 0.75, 0.95, 1, 0.65, 0.8, 0.45, 0.25, 0],
  Experto: [0, 0.3, 0.55, 0.45, 0.8, 1, 0.7, 0.85, 0.95, 0.6, 0.4, 0.5, 0.2, 0],
}

