import { useEffect, useRef, useState } from "react"
import logoBlue from "@/assets/mtb/logos/mtb-logo-1.png"
import { FECHA_DESTACADA, FECHAS, LINKS, NAV, NEXT_RACE } from "@/data"
import { Arrow, Countdown, CtaButton, useCountdown } from "@/ui"

const PlayIcon = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
    <path fill="currentColor" d="M5 3.5v13l11-6.5z" />
  </svg>
)

// Franja superior con la cuenta regresiva a la fecha destacada
function BarraCuenta() {
  const t = useCountdown(NEXT_RACE)
  return (
    <a
      href={FECHA_DESTACADA.inscripcion ?? LINKS.inscripcion}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-volt text-white"
    >
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between gap-4 px-5 font-mono text-xs md:px-8">
        <span className="min-w-0 truncate">
          <span className="font-semibold uppercase">
            {FECHA_DESTACADA.edicion ?? `Fecha ${FECHA_DESTACADA.n}`}
          </span>
          <span className="hidden sm:inline">
            {" "}
            · {FECHA_DESTACADA.dia} {FECHA_DESTACADA.mes.toLowerCase()} ·{" "}
            {FECHA_DESTACADA.lugar}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="tabular-nums">
            Faltan {t.dias}d {String(t.horas).padStart(2, "0")}h{" "}
            {String(t.min).padStart(2, "0")}m
          </span>
          <span className="hidden items-center gap-1 font-semibold uppercase sm:flex">
            Inscríbete{" "}
            <Arrow className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
        </span>
      </div>
    </a>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <BarraCuenta />
      <div className="px-3 pt-3 md:px-6 md:pt-4">
        <nav
          className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between rounded-full bg-white/80 pl-5 pr-2 md:h-20 md:pl-7 md:pr-3 shadow-[0_10px_30px_-12px_rgba(10,27,42,0.35)] ring-1 ring-white/70 backdrop-blur-xl"
          aria-label="Principal"
        >
          <a href="#top" aria-label="MTB Tour, inicio">
            <img
              src={logoBlue}
              alt="MTB Tour Bci Subaru Powerade"
              className="h-11 w-auto md:h-14"
            />
          </a>
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-ink/80 transition-colors hover:bg-sky hover:text-brand"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href={FECHA_DESTACADA.inscripcion ?? LINKS.inscripcion}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-12 items-center rounded-full bg-volt px-5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink hover:text-white sm:inline-flex"
            >
              Inscríbete
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-d"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
        {open && (
          <div
            id="menu-d"
            className="mx-auto mt-2 max-w-[1400px] rounded-3xl bg-white p-5 shadow-xl lg:hidden"
          >
            <ul className="divide-y divide-line">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-center justify-between py-3 text-4xl"
                  >
                    {l.label}
                    <Arrow className="h-5 w-5 text-brand" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

const DURACION_SLIDE = 6500
const fechaLarga = (iso: string) => {
  const t = new Date(`${iso}T12:00:00`).toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
  return t.charAt(0).toUpperCase() + t.slice(1)
}

export default function Hero({ onVideo }: { onVideo: () => void }) {
  const inicio = FECHAS.indexOf(FECHA_DESTACADA)
  const [i, setI] = useState(inicio)
  const [pausa, setPausa] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const [sobreLinea, setSobreLinea] = useState(false)
  const linea = useRef<HTMLOListElement>(null)
  const f = FECHAS[i]

  // En móvil la línea de fechas hace scroll: mantener visible la fecha activa
  useEffect(() => {
    const ol = linea.current
    const item = ol?.children[i] as HTMLElement | undefined
    if (ol && item && ol.scrollWidth > ol.clientWidth)
      ol.scrollTo({
        left: item.offsetLeft - ol.offsetLeft - 16,
        behavior: "smooth",
      })
  }, [i])
  const esDestacada = f === FECHA_DESTACADA
  const corriendo = !pausa && !sobreLinea
  const ir = (n: number) => setI((n + FECHAS.length) % FECHAS.length)
  const [linea1, ...resto] = f.lugar.split(" ")
  const estado = esDestacada
    ? f.agotado
      ? "Última fecha"
      : "Próxima fecha"
    : f.agotado
      ? "Finalizada"
      : "Próximamente"

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[680px] overflow-hidden bg-snow"
      aria-roledescription="carrusel"
      aria-label="Fechas de la temporada"
    >
      <h1 className="sr-only">
        MTB Tour 2026, el tour de mountain bike más importante de Chile
      </h1>

      {/* Fondos: una foto por fecha, con fundido y zoom lento */}
      {FECHAS.map((s, k) => (
        <img
          key={s.n}
          src={s.img}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-[50%_30%] transition-opacity duration-[1400ms] ${
            k === i ? "kenburns opacity-100" : "opacity-0"
          }`}
          fetchPriority={k === inicio ? "high" : "low"}
        />
      ))}
      <div
        className="absolute inset-0 hidden bg-[linear-gradient(90deg,var(--color-snow)_0%,rgba(244,247,249,0.88)_30%,rgba(244,247,249,0.2)_52%,rgba(244,247,249,0)_64%)] md:block"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[90%] bg-gradient-to-t from-snow from-50% via-snow/85 to-transparent md:hidden"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-[132px] pt-44 md:justify-center md:px-8 md:pb-[120px]">
        <div key={f.n} className="relative max-w-[680px]" aria-live="polite">
          <span
            className="display pointer-events-none absolute -left-2 -top-[0.42em] -z-10 select-none text-[clamp(9rem,24vw,22rem)] leading-none text-transparent opacity-30 [-webkit-text-stroke:2px_var(--color-brand)]"
            aria-hidden="true"
          >
            {String(f.n).padStart(2, "0")}
          </span>

          <div className="rise flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1.5 font-mono text-xs font-semibold uppercase ${
                esDestacada && !f.agotado
                  ? "bg-volt text-white"
                  : "bg-ink text-white"
              }`}
            >
              {estado}
            </span>
            <span className="eyebrow text-slate">
              Fecha {f.n} de {FECHAS.length} · Temporada 2026
            </span>
            {f.edicion && (
              <span className="rounded-full bg-gradient-to-r from-[#ff6a2b] to-[#e2462f] px-3 py-1.5 font-mono text-xs font-semibold uppercase text-white">
                {f.edicion}
              </span>
            )}
          </div>

          <h2 className="mt-5">
            <span
              className="display rise block text-[clamp(2.4rem,5vw,4.6rem)]"
              style={{ animationDelay: "0.06s" }}
            >
              {linea1}
            </span>
            <span
              className="display rise block text-[clamp(3.6rem,8.6vw,8.4rem)] text-brand"
              style={{ animationDelay: "0.14s" }}
            >
              {resto.join(" ")}
            </span>
          </h2>

          <p
            className="rise mt-5 font-mono text-sm md:text-base"
            style={{ animationDelay: "0.22s" }}
          >
            {fechaLarga(f.iso)}
            {f.largada && ` · Largada ${f.largada} hrs`}
          </p>

          {f.distancias && (
            <ul
              className="rise mt-4 flex flex-wrap gap-2"
              style={{ animationDelay: "0.28s" }}
            >
              {f.distancias.map((d) => (
                <li
                  key={d}
                  className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold ring-1 ring-line"
                >
                  {d}
                </li>
              ))}
            </ul>
          )}

          <div
            className="rise mt-7 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "0.34s" }}
          >
            {!f.agotado ? (
              <>
                <CtaButton href={f.inscripcion ?? LINKS.inscripcion}>
                  Inscríbete aquí
                </CtaButton>
                <button
                  type="button"
                  onClick={onVideo}
                  className="inline-flex items-center gap-3 rounded-full border-2 border-ink bg-white/60 px-5 py-3 text-sm font-bold uppercase tracking-wide backdrop-blur transition-colors hover:bg-ink hover:text-white"
                >
                  <PlayIcon /> Ver video
                </button>
              </>
            ) : (
              <>
                {f.resultados && (
                  <CtaButton href={f.resultados} variant="ink">
                    Ver resultados
                  </CtaButton>
                )}
                {f.fotos && (
                  <a
                    href={f.fotos}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border-2 border-ink bg-white/60 px-5 py-3 text-sm font-bold uppercase tracking-wide backdrop-blur transition-colors hover:bg-ink hover:text-white"
                  >
                    Ver fotos
                  </a>
                )}
                <span className="font-mono text-xs uppercase text-slate">
                  Tickets agotados
                </span>
              </>
            )}
          </div>

          {esDestacada && !f.agotado && (
            <div
              className="rise mt-7 hidden max-w-md md:block"
              style={{ animationDelay: "0.4s" }}
            >
              <Countdown />
            </div>
          )}
        </div>

        {/* Atajo a la próxima fecha cuando se mira otra */}
        {!esDestacada && (
          <div className="absolute bottom-[140px] right-8 hidden w-[340px] rounded-3xl bg-white/90 p-5 shadow-[0_30px_60px_-30px_rgba(10,27,42,0.5)] ring-1 ring-white backdrop-blur-md lg:block">
            <p className="eyebrow text-brand">Próxima fecha</p>
            <p className="display mt-2 text-3xl">
              {FECHA_DESTACADA.dia} {FECHA_DESTACADA.mes} ·{" "}
              {FECHA_DESTACADA.lugar}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <CtaButton
                href={FECHA_DESTACADA.inscripcion ?? LINKS.inscripcion}
                className="px-5 py-3"
              >
                Inscríbete
              </CtaButton>
              <button
                type="button"
                onClick={() => setI(inicio)}
                className="text-sm font-bold uppercase tracking-wide text-brand hover:text-ink"
              >
                Ver fecha
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Línea de temporada: navegación + progreso del slide */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 border-t border-white/70 bg-white/80 backdrop-blur-md"
        onMouseEnter={() => setSobreLinea(true)}
        onMouseLeave={() => setSobreLinea(false)}
        onFocus={() => setSobreLinea(true)}
        onBlur={() => setSobreLinea(false)}
      >
        <div className="mx-auto flex max-w-[1400px] items-stretch gap-3 px-5 md:px-8">
          <div className="flex shrink-0 items-center gap-1 py-3">
            <button
              type="button"
              onClick={() => ir(i - 1)}
              aria-label="Fecha anterior"
              className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-line transition-colors hover:bg-ink hover:text-white"
            >
              <Arrow className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => setPausa((p) => !p)}
              aria-label={pausa ? "Reproducir" : "Pausar"}
              className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-line transition-colors hover:bg-ink hover:text-white"
            >
              {pausa ? (
                <PlayIcon />
              ) : (
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M5 4h3.5v12H5zM11.5 4H15v12h-3.5z"
                  />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={() => ir(i + 1)}
              aria-label="Fecha siguiente"
              className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-line transition-colors hover:bg-ink hover:text-white"
            >
              <Arrow />
            </button>
          </div>
          <ol
            ref={linea}
            className="no-scrollbar flex flex-1 gap-2 overflow-x-auto md:grid md:grid-cols-6"
          >
            {FECHAS.map((s, k) => {
              const activa = k === i
              return (
                <li key={s.n} className="min-w-[132px] md:min-w-0">
                  <button
                    type="button"
                    onClick={() => setI(k)}
                    aria-current={activa ? "step" : undefined}
                    className="group block w-full py-3 text-left"
                  >
                    <span className="block h-1 overflow-hidden rounded-full bg-ink/10">
                      {activa && (
                        <span
                          key={`${s.n}-${i}`}
                          className="progreso block h-full origin-left rounded-full bg-brand"
                          style={{
                            animationDuration: `${DURACION_SLIDE}ms`,
                            animationPlayState: corriendo
                              ? "running"
                              : "paused",
                          }}
                          onAnimationEnd={() => ir(i + 1)}
                        />
                      )}
                    </span>
                    <span
                      className={`mt-2 flex items-baseline gap-2 font-mono text-xs ${
                        activa ? "text-ink" : "text-slate group-hover:text-ink"
                      }`}
                    >
                      <span
                        className={
                          s === FECHA_DESTACADA
                            ? "rounded bg-volt px-1 font-semibold text-white"
                            : ""
                        }
                      >
                        {s.dia} {s.mes}
                      </span>
                    </span>
                    <span
                      className={`mt-0.5 block truncate text-sm ${
                        activa
                          ? "font-bold text-ink"
                          : "font-medium text-slate group-hover:text-ink"
                      }`}
                    >
                      {s.lugar}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
