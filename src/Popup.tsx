import { useEffect, useRef, useState } from 'react'
import { FECHA_DESTACADA, LINKS, NEXT_RACE } from '@/data'
import { Arrow } from '@/ui'

// Una clave por fecha: al destacar una fecha nueva con afiche, el popup vuelve a mostrarse una vez
const CLAVE = `ct-popup-visto-${FECHA_DESTACADA.iso}`

function yaVisto() {
  try {
    return window.localStorage.getItem(CLAVE) === '1'
  } catch {
    return false
  }
}

function marcarVisto() {
  try {
    window.localStorage.setItem(CLAVE, '1')
  } catch {
    // Sin almacenamiento disponible (modo privado estricto): se cierra igual
  }
}

export default function Popup() {
  const afiche = FECHA_DESTACADA.afiche
  const inscripcion = FECHA_DESTACADA.inscripcion ?? LINKS.inscripcion
  const [abierto, setAbierto] = useState(false)
  const cerrarRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!afiche || FECHA_DESTACADA.agotado || Date.now() > NEXT_RACE.getTime() || yaVisto()) return
    const t = window.setTimeout(() => {
      setAbierto(true)
      marcarVisto()
    }, 700)
    return () => window.clearTimeout(t)
  }, [afiche])

  useEffect(() => {
    if (!abierto) return
    const previo = document.activeElement as HTMLElement | null
    cerrarRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previo?.focus()
    }
  }, [abierto])

  if (!abierto || !afiche) return null

  return (
    <div
      className="popup-fondo fixed inset-0 z-[70] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-titulo"
      onClick={(e) => e.target === e.currentTarget && setAbierto(false)}
    >
      <div className="popup-caja relative w-full max-w-[min(440px,calc((100svh-9rem)*0.8))]">
        <h2 id="popup-titulo" className="sr-only">
          {FECHA_DESTACADA.edicion ? `${FECHA_DESTACADA.edicion}: ` : ''}
          fecha {FECHA_DESTACADA.n}, {FECHA_DESTACADA.dia} de {FECHA_DESTACADA.mes} en {FECHA_DESTACADA.lugar}
        </h2>

        <button
          ref={cerrarRef}
          type="button"
          onClick={() => setAbierto(false)}
          aria-label="Cerrar"
          className="absolute -right-2 -top-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-lg ring-1 ring-line transition-colors hover:bg-ink hover:text-white sm:-right-4 sm:-top-4"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>

        <a href={inscripcion} target="_blank" rel="noopener noreferrer" onClick={() => setAbierto(false)} className="block overflow-hidden rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
          <img
            src={afiche}
            alt={`Afiche ${FECHA_DESTACADA.edicion ?? `fecha ${FECHA_DESTACADA.n}`}: ${FECHA_DESTACADA.lugar}, ${FECHA_DESTACADA.dia} ${FECHA_DESTACADA.mes}. ${FECHA_DESTACADA.distancias?.join(', ') ?? ''}`}
            className="block aspect-[4/5] w-full object-cover"
          />
        </a>

        <div className="mt-4 flex items-center justify-center gap-3">
          <a
            href={inscripcion}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setAbierto(false)}
            className="group inline-flex items-center gap-3 rounded-full bg-volt px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-ink"
          >
            Inscríbete aquí <Arrow className="transition-transform group-hover:translate-x-1" />
          </a>
          <button type="button" onClick={() => setAbierto(false)} className="rounded-full px-4 py-3.5 text-sm font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline">
            Ahora no
          </button>
        </div>
      </div>
    </div>
  )
}
