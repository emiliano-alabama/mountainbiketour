import { useCallback, useEffect, useRef, useState } from 'react'
import { FECHA_DESTACADA, LINKS } from '@/data'

/*
 * Modal de inscripción con la ticketera Welcu.
 *
 * - Cualquier enlace a la página de inscripción (botones "Inscríbete", "Comprar tickets", etc.)
 *   abre este modal en vez de navegar. Ctrl/Cmd + clic sigue abriendo la página en otra pestaña.
 * - El script de Welcu se precarga poco después de entrar al sitio, porque tarda ~5 s en
 *   dibujar el formulario. El contenedor nunca se desmonta: Welcu lo busca por id una sola vez.
 */

const ticketera = FECHA_DESTACADA.ticketera
const URLS_INSCRIPCION = new Set([LINKS.inscripcion, FECHA_DESTACADA.inscripcion].filter(Boolean) as string[])

function cargarWelcu() {
  if (!ticketera || document.querySelector(`script[data-welcu="${ticketera.id}"]`)) return
  const s = document.createElement('script')
  s.type = 'text/javascript'
  s.async = true
  s.src = ticketera.script
  s.dataset.welcu = ticketera.id
  document.body.appendChild(s)
}

const fechaLarga = (iso: string) => {
  const t = new Date(`${iso}T12:00:00`).toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })
  return t.charAt(0).toUpperCase() + t.slice(1)
}

export default function Inscripcion() {
  const [abierto, setAbierto] = useState(false)
  const [listo, setListo] = useState(false)
  const contenedor = useRef<HTMLDivElement>(null)
  const cerrarRef = useRef<HTMLButtonElement>(null)

  const abrir = useCallback(() => {
    cargarWelcu()
    setAbierto(true)
  }, [])

  // Precarga del embed
  useEffect(() => {
    if (!ticketera) return
    const t = window.setTimeout(cargarWelcu, 1200)
    return () => window.clearTimeout(t)
  }, [])

  // Detecta cuándo Welcu terminó de dibujar el formulario
  useEffect(() => {
    const el = contenedor.current
    if (!el) return
    const revisar = () => setListo(!!el.querySelector('form'))
    revisar()
    const mo = new MutationObserver(revisar)
    mo.observe(el, { childList: true, subtree: true })
    return () => mo.disconnect()
  }, [])

  // Intercepta los clics en enlaces de inscripción de todo el sitio
  useEffect(() => {
    if (!ticketera) return
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a')
      if (!a || !URLS_INSCRIPCION.has(a.href)) return
      e.preventDefault()
      abrir()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [abrir])

  // Teclado, foco y scroll mientras está abierto
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

  if (!ticketera) return null
  const f = FECHA_DESTACADA

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-end justify-center bg-ink/70 backdrop-blur-sm transition-opacity duration-300 sm:items-center sm:p-6 ${abierto ? 'opacity-100' : 'pointer-events-none invisible opacity-0'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inscripcion-titulo"
      aria-hidden={!abierto}
      onClick={(e) => e.target === e.currentTarget && setAbierto(false)}
    >
      <div
        className={`relative flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:rounded-3xl md:flex-row ${abierto ? 'translate-y-0' : 'translate-y-8'}`}
      >
        {/* Resumen de la fecha */}
        <aside className="relative shrink-0 overflow-y-auto bg-snow p-6 md:w-[320px] md:p-8">
          <div className="relative">
            <p className="eyebrow text-brand">
              Inscripción · Fecha {f.n}
              {f.edicion ? ` · ${f.edicion}` : ''}
            </p>
            <h2 id="inscripcion-titulo" className="display mt-3 text-[2.6rem] md:text-5xl">
              {f.lugar}
            </h2>
            <p className="mt-2 font-mono text-sm">
              {fechaLarga(f.iso)}
              {f.largada && ` · ${f.largada} hrs`}
            </p>
            {f.distancias && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {f.distancias.map((d) => (
                  <li key={d} className="rounded-full bg-white px-3 py-1 text-xs font-semibold ring-1 ring-line">
                    {d}
                  </li>
                ))}
              </ul>
            )}
            <ol className="mt-6 hidden space-y-2 text-sm text-slate md:block">
              <li>
                <span className="font-mono text-brand">1.</span> Elige tu distancia y la cantidad de tickets.
              </li>
              <li>
                <span className="font-mono text-brand">2.</span> Presiona <strong className="text-ink">Pagar ahora</strong>.
              </li>
              <li>
                <span className="font-mono text-brand">3.</span> Completa tus datos y el pago en Welcu.
              </li>
            </ol>
            {f.afiche && <img src={f.afiche} alt="" aria-hidden="true" className="mt-6 hidden w-full rounded-2xl shadow-[0_20px_40px_-20px_rgba(10,27,42,0.4)] md:block" />}
          </div>
        </aside>

        {/* Ticketera */}
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
            <p className="font-semibold">Elige tus tickets</p>
            <button
              ref={cerrarRef}
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar inscripción"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full ring-1 ring-line transition-colors hover:bg-ink hover:text-white"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-6">
            {!listo && (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center" role="status">
                <span className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-brand" aria-hidden="true" />
                <p className="text-sm text-slate">Cargando tickets disponibles…</p>
              </div>
            )}
            {/* Welcu inserta aquí el formulario. No desmontar. */}
            <div ref={contenedor} id={ticketera.id} className={`welcu_embed ${listo ? '' : 'sr-only'}`} />
          </div>

          <p className="border-t border-line px-6 py-3 text-xs text-slate">
            Pago seguro a través de Welcu.{' '}
            <a href={ticketera.pagina} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-2">
              ¿No carga? Abre la inscripción en Welcu
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
