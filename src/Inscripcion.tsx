import { useCallback, useEffect, useRef, useState } from 'react'
import { FECHA_DESTACADA, FECHAS, nombreLugar, type Fecha } from '@/data'

/*
 * Modal de inscripción con la ticketera Welcu de cada fecha.
 *
 * - Cualquier enlace a la inscripción de una fecha (welcu.com/demaria/climbingN) abre este modal con la
 *   ticketera de ESA fecha. Ctrl/Cmd + clic sigue abriendo la página de Welcu en otra pestaña.
 * - Welcu tarda ~5 s en dibujar el formulario: se precarga la fecha destacada al entrar al sitio y las
 *   demás cuando se piden. Los contenedores nunca se desmontan, porque Welcu los busca por id una sola vez.
 */

const CON_TICKETERA = FECHAS.filter((f) => f.ticketera)
const POR_URL = new Map(CON_TICKETERA.flatMap((f) => [f.inscripcion, f.ticketera!.pagina].filter(Boolean).map((u) => [u as string, f] as const)))

function cargarWelcu(f: Fecha) {
  const t = f.ticketera
  if (!t || document.querySelector(`script[data-welcu="${t.id}"]`)) return
  const s = document.createElement('script')
  s.type = 'text/javascript'
  s.async = true
  s.src = t.script
  s.dataset.welcu = t.id
  document.body.appendChild(s)
}

const fechaLarga = (iso: string) => {
  const t = new Date(`${iso}T12:00:00`).toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  return t.charAt(0).toUpperCase() + t.slice(1)
}

export default function Inscripcion() {
  const [abierto, setAbierto] = useState(false)
  const [activa, setActiva] = useState<Fecha>(FECHA_DESTACADA)
  const [listos, setListos] = useState<Record<string, boolean>>({})
  const contenedores = useRef<HTMLDivElement>(null)
  const cerrarRef = useRef<HTMLButtonElement>(null)

  const abrir = useCallback((f: Fecha) => {
    cargarWelcu(f)
    setActiva(f)
    setAbierto(true)
  }, [])

  // Precarga de la ticketera de la fecha destacada
  useEffect(() => {
    const t = window.setTimeout(() => cargarWelcu(FECHA_DESTACADA), 1200)
    return () => window.clearTimeout(t)
  }, [])

  // Detecta qué formularios ya dibujó Welcu
  useEffect(() => {
    const el = contenedores.current
    if (!el) return
    const revisar = () =>
      setListos(Object.fromEntries(CON_TICKETERA.map((f) => [f.ticketera!.id, !!el.querySelector(`#${f.ticketera!.id} form`)])))
    revisar()
    const mo = new MutationObserver(revisar)
    mo.observe(el, { childList: true, subtree: true })
    return () => mo.disconnect()
  }, [])

  // Intercepta los clics en enlaces de inscripción de todo el sitio
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a')
      if (!a || a.closest('[data-modal-inscripcion]')) return
      const f = POR_URL.get(a.href)
      if (!f) return
      e.preventDefault()
      abrir(f)
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

  if (!CON_TICKETERA.length) return null
  const f = activa
  const listo = !!listos[f.ticketera?.id ?? '']

  return (
    <div
      data-modal-inscripcion
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
          <p className="eyebrow text-brand">
            Inscripción · Fecha {f.n}
            {f.edicion ? ` · ${f.edicion}` : ''}
          </p>
          <h2 id="inscripcion-titulo" className="display mt-3 text-[2.6rem] md:text-5xl">
            {f.lugar || `${f.dia} ${f.mes}`}
          </h2>
          <p className="mt-2 font-mono text-sm">
            {fechaLarga(f.iso)}
            {f.largada && ` · desde las ${f.largada} hrs`}
          </p>
          {!f.lugar && <p className="mt-1 text-sm text-slate">{nombreLugar(f)}: lo anunciaremos en este sitio.</p>}
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
            {/* Welcu inserta aquí cada formulario. No desmontar: solo se muestra el de la fecha activa. */}
            <div ref={contenedores}>
              {CON_TICKETERA.map((x) => (
                <div key={x.ticketera!.id} id={x.ticketera!.id} className={`welcu_embed ${x === f && listo ? '' : 'hidden'}`} />
              ))}
            </div>
          </div>

          <p className="border-t border-line px-6 py-3 text-xs text-slate">
            Pago seguro a través de Welcu.{' '}
            <a href={f.ticketera?.pagina} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-2">
              ¿No carga? Abre la inscripción en Welcu
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
