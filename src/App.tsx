import { useEffect, useRef, useState } from 'react'
import logoColor from '@/assets/mtb/logos/mtb-logo-1.png'
import fotoCierre from '@/assets/mtb/cat-experto.jpg'
import avisoFotos from '@/assets/mtb/aviso-fotos.jpg'
import comunidad1 from '@/assets/mtb/comunidad-1.jpg'
import comunidad2 from '@/assets/mtb/comunidad-2.jpg'
import comunidad3 from '@/assets/mtb/comunidad-3.jpg'
import comunidad4 from '@/assets/mtb/comunidad-4.jpg'
import comunidad5 from '@/assets/mtb/comunidad-5.jpg'
import comunidad6 from '@/assets/mtb/comunidad-6.jpg'
import rutasImg from '@/assets/mtb/rutas.jpg'
import Ranking from '@/Ranking'
import Hero, { Header } from '@/Hero'
import Popup from '@/Popup'
import Inscripcion from '@/Inscripcion'
import { Arrow, CtaButton, PROFILE_SHAPES, ridgePoints, toPath } from '@/ui'
import {
  AGENDA,
  CAMPAMENTO_IMGS,
  CAMPAMENTO_INCLUYE,
  CATEGORIAS,
  FAQ,
  FECHAS,
  FECHA_DESTACADA,
  LINKS,
  MARCA,
  NOTICIAS,
  NAV,
  RUTAS,
  SPONSORS,
  type Noticia,
  type Ruta,
} from '@/data'

/* ───────────────────────── utilidades ───────────────────────── */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return p
}

function SectionHead({ eyebrow, title, intro, id }: { eyebrow: string; title: React.ReactNode; intro?: string; id?: string }) {
  return (
    <div className="reveal mb-12 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p className="eyebrow mb-4 text-brand">{eyebrow}</p>
        <h2 id={id} className="display text-[clamp(3rem,7vw,6rem)]">
          {title}
        </h2>
      </div>
      {intro && <p className="max-w-md text-lg leading-relaxed text-slate lg:col-span-5 lg:justify-self-end">{intro}</p>}
    </div>
  )
}

/* ───────────────────────── intro + aviso fotos ───────────────────────── */

function Intro() {
  const facts = [
    { v: '6', l: 'Fechas al año' },
    { v: '6', l: 'Categorías' },
    { v: '600+', l: 'Ciclistas en López Pangue' },
    { v: '2–14', l: 'Años en MTB Kids' },
  ]
  const conFotos = FECHAS.filter((f) => f.fotos).at(-1)
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <p className="reveal text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.2] tracking-tight lg:col-span-8">
            El tour de carreras de <span className="text-brand">bicicletas de montaña</span> más importante de Chile. Seis fechas al año en viñas, parques y haciendas, con categorías para expertos, familias y niños.
          </p>
          <dl className="reveal grid grid-cols-2 gap-px self-end overflow-hidden rounded-2xl border border-line bg-line lg:col-span-4">
            {facts.map((f) => (
              <div key={f.l} className="bg-white p-5">
                <dt className="eyebrow text-[0.65rem] text-slate">{f.l}</dt>
                <dd className="display mt-2 text-5xl">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {conFotos?.fotos && (
        <a
          href={conFotos.fotos}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal group mt-16 flex flex-col gap-6 overflow-hidden rounded-3xl bg-sky sm:flex-row sm:items-stretch"
        >
          <img src={avisoFotos} alt="" className="h-48 w-full object-cover sm:h-auto sm:w-64 md:w-80" loading="lazy" />
          <div className="flex flex-1 flex-col justify-center gap-3 px-6 pb-6 sm:py-6 sm:pl-0 md:pr-10">
            <p className="eyebrow text-brand">
              {conFotos.n}ª fecha · {conFotos.lugar}
            </p>
            <p className="display text-4xl md:text-5xl">Busca tus fotos en alta resolución</p>
          </div>
          <span className="mx-6 mb-6 inline-flex items-center gap-3 self-start rounded-full bg-ink px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors group-hover:bg-brand sm:m-0 sm:mr-8 sm:self-center">
            Ver fotos <Arrow className="transition-transform group-hover:translate-x-1" />
          </span>
        </a>
        )}
      </div>
    </section>
  )
}

/* ───────────────────────── calendario ───────────────────────── */

// Alturas de cada fecha en el perfil de temporada: termina en la cumbre (la final)
const SEASON_PEAKS = [62, 48, 54, 36, 30, 8]

function Calendario() {
  const W = 1200
  const H = 120
  const col = W / 6
  const pts: [number, number][] = [[0, 112]]
  SEASON_PEAKS.forEach((y, i) => {
    const cx = col * i + col / 2
    pts.push([cx - col * 0.32, y + 34], [cx, y])
    if (i < 5) pts.push([cx + col * 0.32, y + 30])
  })
  pts.push([W, 30])

  return (
    <section id="fechas" className="bg-snow" aria-labelledby="fechas-t">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <SectionHead
          id="fechas-t"
          eyebrow="Calendario 2026"
          title={
            <>
              Seis fechas,
              <br />
              <span className="text-brand">una temporada</span> sobre dos ruedas
            </>
          }
          intro="Cada fecha en una viña, parque o hacienda distinta. La temporada cierra el 25 de octubre con la gran final en Hacienda Picarquín."
        />

        <div className="reveal relative">
          <svg viewBox={`0 0 ${W} ${H}`} className="mb-4 hidden h-[120px] w-full lg:block" aria-hidden="true" preserveAspectRatio="none">
            <defs>
              <linearGradient id="seasonFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--color-brand)" stopOpacity="0.16" />
                <stop offset="1" stopColor="var(--color-brand)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${toPath(pts)} L${W},${H} L0,${H} Z`} fill="url(#seasonFill)" />
            <path d={toPath(pts)} fill="none" stroke="var(--color-brand)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
          {/* Marcadores de cumbre, fuera del SVG para que no se deformen */}
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[120px] lg:block" aria-hidden="true">
            {SEASON_PEAKS.map((y, i) => (
              <span
                key={i}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${i === 5 ? 'h-5 w-5 bg-volt ring-4 ring-ink' : 'h-3 w-3 bg-white ring-2 ring-brand'}`}
                style={{ left: `${((col * i + col / 2) / W) * 100}%`, top: `${(y / H) * 100}%` }}
              />
            ))}
          </div>

          <ol className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-6">
            {FECHAS.map((f) => {
              const final = !f.agotado
              return (
                <li
                  key={f.n}
                  className={`group relative w-[72vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-white sm:w-[44vw] md:w-auto ${final ? 'ring-[3px] ring-ink' : 'ring-1 ring-line'}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={f.img} alt="Ciclistas en una fecha del MTB Tour" loading="lazy" className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${final ? '' : 'saturate-[0.85]'}`} />
                    <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[0.7rem] font-semibold ${final ? 'bg-volt text-white' : 'bg-white/90 text-white'}`}>
                      Fecha {f.n}
                    </span>
                    {final && <span className="absolute right-3 top-3 rounded-full bg-ink px-2.5 py-1 font-mono text-[0.7rem] font-semibold text-volt-soft">Gran final</span>}
                  </div>
                  <div className="p-4">
                    <div className="display text-4xl">
                      {f.dia} <span className="text-brand">{f.mes}</span>
                    </div>
                    <div className="mt-1 min-h-[2.5rem] text-sm font-semibold leading-tight">{f.lugar}</div>
                    <div className="mt-3 border-t border-line pt-3">
                      {final ? (
                        <a href={LINKS.inscripcion} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm font-bold uppercase text-brand after:absolute after:inset-0 hover:text-ink">
                          Comprar tickets <Arrow />
                        </a>
                      ) : (
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono uppercase text-slate">Agotado</span>
                          {f.resultados && (
                            <a href={f.resultados} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline-offset-4 hover:underline">
                              Resultados
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── rutas ───────────────────────── */

function Profile({ ruta, max }: { ruta: Ruta; max: number }) {
  const W = 300
  const H = 110
  const shape = PROFILE_SHAPES[ruta.nombre] ?? [0, 1, 0]
  const peak = (ruta.dmas / max) * (H - 14)
  const pts: [number, number][] = shape.map((v, i) => [(i / (shape.length - 1)) * W, H - 4 - v * peak])
  const d = toPath(pts)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-28 w-full" role="img" aria-label={`Perfil ilustrativo: ${ruta.km} km con ${ruta.dmas} m de desnivel positivo`}>
      <path d={`${d} L${W},${H} L0,${H} Z`} fill="var(--color-sky)" />
      <path d={d} fill="none" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinejoin="round" />
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="var(--color-line)" strokeDasharray="2 4" />
      ))}
    </svg>
  )
}

function Rutas() {
  const max = Math.max(...RUTAS.map((r) => r.dmas))
  return (
    <section id="rutas" className="relative bg-white" aria-labelledby="rutas-t">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <SectionHead
          id="rutas-t"
          eyebrow="Circuitos 6ta fecha · Hacienda Picarquín"
          title={
            <>
              Elige tu <span className="text-brand">circuito</span>
            </>
          }
          intro="Tres circuitos para seis categorías. Son preliminares y pueden cambiar antes de la carrera."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {RUTAS.map((r, i) => (
            <article key={r.nombre} className="reveal flex flex-col rounded-3xl border border-line bg-snow p-6 md:p-7" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="flex flex-wrap gap-1.5">
                  {r.categorias.map((c) => (
                    <span key={c} className="rounded-full bg-white px-3 py-1 text-sm font-bold ring-1 ring-line">
                      {c}
                    </span>
                  ))}
                </h3>
                <span className="font-mono text-xs text-slate">≈{Math.round(r.dmas / r.km)} m/km</span>
              </div>
              <div className="mt-4 flex items-end gap-4">
                <span className="display text-[6.5rem] leading-[0.75]">{r.km}K</span>
                <span className="mb-1 rounded-md bg-ink px-2 py-1 font-mono text-sm font-semibold text-volt-soft">D+{r.dmas.toLocaleString('es-CL')} m</span>
              </div>
              <div className="mt-6">
                <Profile ruta={r} max={max} />
              </div>
              <p className="mt-5 flex-1 leading-relaxed text-slate">{r.desc}</p>
              {r.kmz && (
              <a href={r.kmz} className="mt-6 inline-flex items-center gap-2 self-start rounded-full border-2 border-ink px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-ink hover:text-white" download>
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                  <path d="M10 3v10m0 0-4-4m4 4 4-4M4 17h12" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                Descargar KMZ
              </a>
              )}
            </article>
          ))}
        </div>
        <p className="mt-4 font-mono text-xs text-slate">Perfiles ilustrativos, escalados según el desnivel positivo de cada circuito.</p>

        <div className="reveal mt-8 flex flex-col gap-4 rounded-3xl bg-sky p-6 sm:flex-row sm:items-center md:p-8">
          <span className="display shrink-0 text-5xl text-brand">MTB Kids</span>
          <p className="leading-relaxed text-ink/80">
            Circuito especial para niñas y niños de <strong>2 a 14 años</strong>. La recepción es de 08:30 a 09:20 hrs, el mismo día de la carrera.
          </p>
        </div>

        <div className="reveal relative mt-16 overflow-hidden rounded-3xl">
          <img src={rutasImg} alt="Largada del MTB Tour en Hacienda Picarquín" loading="lazy" className="h-[340px] w-full object-cover object-[50%_45%] md:h-[420px]" />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/75 to-transparent p-6 md:p-10">
            <p className="display max-w-2xl text-5xl text-white md:text-7xl">¿Listo para la gran final en Picarquín?</p>
            <CtaButton href={LINKS.inscripcion} className="mt-6 self-start">
              Inscríbete aquí
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── agenda + información ───────────────────────── */

function Agenda() {
  return (
    <section id="agenda" className="bg-snow" aria-labelledby="agenda-t">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <SectionHead
          id="agenda-t"
          eyebrow="Agenda preliminar · 6ta fecha"
          title={
            <>
              Una mañana
              <br />
              <span className="text-brand">sobre ruedas</span>
            </>
          }
          intro="Largadas escalonadas desde las 09:30, post carrera y premiación al mediodía."
        />

        <div className="grid gap-10 lg:grid-cols-12">
          <ol className="reveal relative lg:col-span-7">
            {/* Línea del día: luz de mañana → cielo despejado → azul MTB */}
            <span className="absolute bottom-3 left-[5.25rem] top-3 w-[3px] rounded-full bg-gradient-to-b from-[#ffc857] via-[#7cc6f2] to-brand md:left-[6.25rem]" aria-hidden="true" />
            {AGENDA.map((a, i) => (
              <li key={i} className="relative grid grid-cols-[4.5rem_1fr] items-start gap-6 py-3 md:grid-cols-[5.5rem_1fr] md:gap-8">
                <span className={`pt-0.5 text-right font-mono text-lg font-semibold tabular-nums ${a.destacado ? 'text-brand' : ''}`}>{a.hora}</span>
                <span className="absolute left-[5.25rem] top-[1.15rem] h-3 w-3 -translate-x-[4.5px] rounded-full border-2 border-snow bg-ink md:left-[6.25rem]" aria-hidden="true" />
                <div className={a.destacado ? '-my-1 rounded-2xl bg-volt px-4 py-2.5 text-white' : ''}>
                  <div className={a.destacado ? 'display text-3xl' : 'font-semibold'}>{a.titulo}</div>
                  {a.detalle && <div className={`text-sm ${a.destacado ? 'font-medium text-white/90' : 'text-slate'}`}>{a.detalle}</div>}
                </div>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-4 lg:col-span-5">
            <article className="reveal rounded-3xl bg-white p-6 ring-1 ring-line md:p-7">
              <p className="eyebrow text-brand">Cómo llegar</p>
              <h3 className="display mt-2 text-4xl">Hacienda Picarquín</h3>
              <p className="mt-3 leading-relaxed text-slate">
                Abre la ubicación en Waze para llegar directo al campamento base. El estacionamiento es gratuito.
              </p>
              <a href={LINKS.waze} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#33ccff] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-white">
                Abrir ruta en Waze <Arrow />
              </a>
            </article>
            <article className="reveal rounded-3xl bg-white p-6 ring-1 ring-line md:p-7">
              <p className="eyebrow text-brand">Entrega de kits</p>
              <p className="mt-3 leading-relaxed">
                Número y chip se retiran <strong>el día de la carrera, de 08:15 a 09:15 hrs</strong>, en el campamento base. Incluye la polera oficial del evento.
              </p>
            </article>
            <article className="reveal rounded-3xl bg-ink p-6 text-white md:p-7">
              <p className="eyebrow text-volt-soft">Importante</p>
              <p className="mt-3 leading-relaxed text-white/85">
                Inscríbete en la categoría que vaya con tu nivel y revisa tu hora de largada: cada categoría sale en un horario distinto. Los circuitos son <strong className="text-white">preliminares</strong> y pueden cambiar; la ruta está señalizada, con puntos de hidratación y asistencia.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── categorías ───────────────────────── */

function Categorias() {
  return (
    <section id="categorias" className="bg-white" aria-labelledby="cat-t">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <SectionHead
          id="cat-t"
          eyebrow="Categorías"
          title={
            <>
              Seis categorías,
              <br />
              <span className="text-brand">un mismo tour</span>
            </>
          }
          intro="De MTB Kids a Experto, hay una categoría para cada nivel. Todos los participantes reciben medalla."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIAS.map((c, i) => (
            <article key={c.nombre} className="reveal group overflow-hidden rounded-3xl bg-snow" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <div className="aspect-[4/5] overflow-hidden">
                <img src={c.img} alt={`Participantes en la categoría ${c.nombre}`} loading="lazy" className="h-full w-full object-cover object-[50%_25%] transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="eyebrow text-[0.7rem] text-brand">{c.nivel}</p>
                <h3 className="display mt-2 text-4xl">{c.nombre}</h3>
                <p className="mt-3 leading-relaxed text-slate">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── campamento base ───────────────────────── */

function Campamento() {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * (track.current.clientWidth * 0.8), behavior: 'smooth' })
  return (
    <section id="campamento" className="overflow-hidden bg-sky" aria-labelledby="camp-t">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <p className="eyebrow mb-4 text-brand">Incluido en tu inscripción</p>
            <h2 id="camp-t" className="display text-[clamp(3rem,7vw,6rem)]">
              El mejor <span className="text-brand">campamento base</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate">
              Cada fecha tiene un campamento base con marcas, servicios y experiencias para disfrutar mucho más allá de la competencia. Un punto de encuentro para participantes, familias y amigos, que convierte cada fecha en un panorama para quedarse.
            </p>
            <h3 className="eyebrow mt-10 text-ink">¿Qué incluye?</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {CAMPAMENTO_INCLUYE.map((x) => (
                <li key={x} className="rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-line">
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate">¿Vienes con acompañantes? Pueden comprar una pulsera de acceso con las mismas prestaciones.</p>
          </div>

          <div className="reveal relative lg:col-span-7">
            <div ref={track} className="no-scrollbar -mr-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-5 md:-mr-8 md:pr-8" tabIndex={0} aria-label="Marcas del campamento base">
              {CAMPAMENTO_IMGS.map((src, i) => (
                <img key={i} src={src} alt="" loading="lazy" className="aspect-[3/4] w-[62%] shrink-0 snap-start rounded-3xl object-cover shadow-[0_20px_40px_-20px_rgba(10,27,42,0.35)] sm:w-[42%]" />
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              {[-1, 1].map((d) => (
                <button key={d} type="button" onClick={() => scroll(d)} aria-label={d < 0 ? 'Anterior' : 'Siguiente'} className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink transition-colors hover:bg-ink hover:text-white">
                  <Arrow className={d < 0 ? 'rotate-180' : ''} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── resultados + ranking ───────────────────────── */

function Resultados() {
  return (
    <section id="resultados" className="bg-white" aria-labelledby="res-t">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-4 text-brand">Resultados 2026</p>
          <h2 id="res-t" className="display reveal text-[clamp(3rem,6vw,5rem)]">
            Revisa tus tiempos
          </h2>
          <ul className="reveal mt-10 divide-y divide-line border-y border-line">
            {FECHAS.map((f) => (
              <li key={f.n}>
                {f.resultados ? (
                  <a href={f.resultados} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[3rem_5.5rem_1fr_auto] items-center gap-3 py-4 transition-colors hover:bg-snow md:gap-4">
                    <span className="font-mono text-sm text-slate">{f.n}ª</span>
                    <span className="display text-2xl">
                      {f.dia} {f.mes}
                    </span>
                    <span className="font-semibold">{f.lugar}</span>
                    <span className="flex items-center gap-2 text-sm font-bold uppercase text-brand">
                      <span className="hidden sm:inline">Ver</span> <Arrow className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>
                ) : (
                  <div className="grid grid-cols-[3rem_5.5rem_1fr_auto] items-center gap-3 py-4 text-slate md:gap-4">
                    <span className="font-mono text-sm">{f.n}ª</span>
                    <span className="display text-2xl">
                      {f.dia} {f.mes}
                    </span>
                    <span className="font-semibold">{f.lugar}</span>
                    <span className="font-mono text-xs uppercase">Próximamente</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <a href="#ranking" className="reveal group flex h-full flex-col justify-between gap-10 rounded-3xl bg-ink p-7 text-white md:p-9">
            <div>
              <p className="eyebrow text-volt-soft">Acumulado 2026</p>
              <p className="display mt-4 text-[clamp(3rem,6vw,5rem)]">Ranking anual</p>
              <p className="mt-4 leading-relaxed text-white/75">Revisa tu posición y tus puntos. Filtra por categoría, sexo y edad, o busca tu nombre.</p>
            </div>
            <span className="inline-flex items-center gap-3 self-start rounded-full bg-volt px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white">
              Ver ranking <Arrow className="transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── noticias ───────────────────────── */

const fechaNoticia = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })

function Noticias() {
  const [abierta, setAbierta] = useState<Noticia | null>(null)
  return (
    <section id="noticias" className="bg-snow" aria-labelledby="not-t">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4 text-brand">Noticias</p>
            <h2 id="not-t" className="display text-[clamp(3rem,6vw,5rem)]">
              Así se vivió la temporada
            </h2>
          </div>
          <a href={LINKS.noticias} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-ink hover:text-white">
            Todas las noticias <Arrow />
          </a>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {NOTICIAS.map((n, i) => (
            <article
              key={n.url}
              className="reveal group relative flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow hover:shadow-[0_20px_40px_-20px_rgba(10,27,42,0.35)]"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={n.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-xs uppercase text-slate">{fechaNoticia(n.fecha)}</p>
                <h3 className="mt-2 text-xl font-bold leading-snug">{n.titulo}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-slate">{n.resumen}</p>
                {/* El botón cubre toda la tarjeta (after:inset-0) para que cualquier clic la abra */}
                <button
                  type="button"
                  onClick={() => setAbierta(n)}
                  className="mt-5 inline-flex items-center gap-2 self-start text-sm font-bold uppercase tracking-wide text-brand after:absolute after:inset-0 after:rounded-3xl"
                  aria-label={`Leer noticia: ${n.titulo}`}
                >
                  Leer noticia <Arrow className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <NoticiaModal noticia={abierta} onClose={() => setAbierta(null)} />
    </section>
  )
}

function NoticiaModal({ noticia, onClose }: { noticia: Noticia | null; onClose: () => void }) {
  const cerrarRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!noticia) return
    const previo = document.activeElement as HTMLElement | null
    cerrarRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previo?.focus()
    }
  }, [noticia, onClose])

  if (!noticia) return null
  return (
    <div className="popup-fondo fixed inset-0 z-[75] flex items-end justify-center bg-ink/70 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="noticia-titulo" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <article className="popup-caja relative flex max-h-[94svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] sm:rounded-3xl">
        <button
          ref={cerrarRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar noticia"
          className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-ink shadow-lg ring-1 ring-line transition-colors hover:bg-ink hover:text-white"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>
        <div className="overflow-y-auto">
          <img src={noticia.img} alt="" className="aspect-[16/9] w-full object-cover" />
          <div className="p-6 md:p-10">
            <p className="font-mono text-xs uppercase text-brand">{fechaNoticia(noticia.fecha)}</p>
            <h2 id="noticia-titulo" className="display mt-3 text-[clamp(2.2rem,5vw,3.6rem)]">
              {noticia.titulo}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/85">
              {noticia.cuerpo.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
              {noticia.enlaces.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-ink hover:text-white">
                  {l.label} <Arrow />
                </a>
              ))}
              {/* Al abrir la ticketera se cierra la noticia, para no apilar dos modales */}
              <span onClick={onClose} className="contents">
                <CtaButton href={FECHA_DESTACADA.inscripcion ?? LINKS.inscripcion}>Inscríbete a la {FECHA_DESTACADA.n}ª fecha</CtaButton>
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

/* ───────────────────────── FAQ ───────────────────────── */

function Faq() {
  return (
    <section id="faq" className="bg-white" aria-labelledby="faq-t">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4 text-brand">FAQ</p>
            <h2 id="faq-t" className="display text-[clamp(3rem,6vw,5rem)]">
              Preguntas frecuentes
            </h2>
            <p className="mt-6 leading-relaxed text-slate">
              ¿No encuentras lo que buscas? Escríbenos a{' '}
              <a href={`mailto:${LINKS.email}`} className="font-semibold text-brand underline underline-offset-4">
                {LINKS.email}
              </a>{' '}
              o revisa las{' '}
              <a href={LINKS.bases} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-4">
                bases del evento
              </a>
              .
            </p>
          </div>
        </div>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {FAQ.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold transition-colors hover:text-brand">
                {f.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-white transition-transform duration-300 group-open:rotate-45 group-open:bg-volt group-open:text-white" aria-hidden="true">
                  <svg viewBox="0 0 14 14" className="h-3 w-3">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-slate">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── comunidad + auspiciadores ───────────────────────── */

function Comunidad() {
  const imgs = [comunidad1, comunidad2, comunidad3, comunidad4, comunidad5, comunidad6]
  return (
    <section className="bg-snow pb-0" aria-labelledby="ig-t">
      <div className="mx-auto max-w-[1400px] px-5 pt-20 md:px-8 md:pt-28">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4 text-brand">Comunidad</p>
            <h2 id="ig-t" className="display text-[clamp(2.2rem,9vw,5rem)] [overflow-wrap:anywhere]">
              @mountainbiketour
            </h2>
          </div>
          <div className="flex gap-2">
            {REDES.map((s) => (
              <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition-colors hover:bg-ink hover:text-white">
                {s.l}
              </a>
            ))}
          </div>
        </div>
      </div>
      <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="reveal mt-10 grid grid-cols-3 gap-1 md:grid-cols-6" aria-label="Ver más fotos en Instagram">
        {imgs.map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden">
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover object-[50%_30%] transition-transform duration-700 hover:scale-105" />
          </div>
        ))}
      </a>
    </section>
  )
}

const REDES = [
  { l: 'Instagram', h: LINKS.instagram },
  { l: 'Facebook', h: LINKS.facebook },
  { l: 'YouTube', h: LINKS.youtube },
].filter((r) => r.h)

function Sponsors() {
  return (
    <section className="bg-white" aria-labelledby="sp-t">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24">
        <h2 id="sp-t" className="sr-only">
          Auspiciadores
        </h2>
        <div className="grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {SPONSORS.slice(0, 4).map((g) => (
            <div key={g.grupo}>
              <p className="eyebrow text-slate">{g.grupo}</p>
              {g.logos.map((l) => (
                <SponsorLogo key={l.nombre} {...l} big />
              ))}
            </div>
          ))}
        </div>
        {SPONSORS.slice(4).map((g) => (
          <div key={g.grupo} className="mt-12 border-t border-line pt-8">
            <p className="eyebrow text-slate">{g.grupo}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {g.logos.map((l) => (
                <SponsorLogo key={l.nombre} {...l} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function SponsorLogo({ nombre, img, href, big }: { nombre: string; img: string; href?: string; big?: boolean }) {
  const inner = <img src={img} alt={nombre} loading="lazy" className={`max-w-full object-contain mix-blend-multiply ${big ? 'max-h-16' : 'max-h-12'}`} />
  const cls = `mt-4 flex items-center justify-center rounded-2xl bg-snow p-4 ${big ? 'h-28' : 'h-24'}`
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} transition-colors hover:bg-sky`}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

/* ───────────────────────── cierre + footer ───────────────────────── */

function FinalCta() {
  const ridge = ridgePoints(23, 1440, 76, 64, 56)
  const fill = `M0,0 L1440,0 L1440,${ridge[ridge.length - 1][1]} ${ridge
    .slice()
    .reverse()
    .map(([x, y]) => `L${x},${y}`)
    .join(' ')} Z`
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[50px] w-full md:h-[80px]" aria-hidden="true">
        <path d={fill} fill="var(--color-white, #fff)" />
      </svg>
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pb-20 pt-28 md:px-8 md:pb-24 md:pt-36 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-volt-soft">
            {FECHA_DESTACADA.edicion ? `${FECHA_DESTACADA.edicion} · ` : ''}
            {FECHA_DESTACADA.dia} {FECHA_DESTACADA.mes} · {FECHA_DESTACADA.lugar}
          </p>
          <p className="display mt-4 text-[clamp(4rem,10vw,9rem)]">
            Nos vemos
            <br />
            en la meta
          </p>
          <p className="mt-6 max-w-md text-lg text-white/80">Las inscripciones cierran el viernes antes de la carrera a las 09:00, o antes si se completan los cupos.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href={LINKS.inscripcion}>Comprar tickets</CtaButton>
            <a href={LINKS.bases} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full border-2 border-white px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-white hover:text-brand">
              Bases del evento
            </a>
          </div>
        </div>
        <div className="lg:col-span-5">
          <img src={FECHA_DESTACADA.afiche ?? fotoCierre} alt={FECHA_DESTACADA.afiche ? `Afiche ${FECHA_DESTACADA.lugar}` : 'Ciclista en un descenso del MTB Tour'} loading="lazy" className="mx-auto aspect-[4/5] w-full max-w-sm rotate-2 rounded-2xl object-cover shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]" />
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-snow text-ink">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <img src={logoColor} alt={`${MARCA.nombre} ${MARCA.presentado} Powerade`} className="h-16 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate">El tour de mountain bike más importante de Chile: 6 fechas al año. Organiza Demaria Marketing Deportivo.</p>
        </div>
        <div className="lg:col-span-2">
          <p className="eyebrow text-brand">Páginas</p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-ink/80 hover:text-brand">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="eyebrow text-brand">Links</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={LINKS.inscripcion} target="_blank" rel="noopener noreferrer" className="text-ink/80 hover:text-brand">Inscripciones</a></li>
            <li><a href={LINKS.eventos} target="_blank" rel="noopener noreferrer" className="text-ink/80 hover:text-brand">Todos los eventos</a></li>
            <li><a href={LINKS.bases} target="_blank" rel="noopener noreferrer" className="text-ink/80 hover:text-brand">Bases del evento (PDF)</a></li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="eyebrow text-brand">Contacto</p>
          <address className="mt-4 space-y-2 text-sm not-italic text-ink/80">
            <p>{LINKS.direccion}</p>
            <p><a href={`mailto:${LINKS.email}`} className="hover:text-brand">{LINKS.email}</a></p>
          </address>
          <div className="mt-5 flex gap-3 text-sm font-semibold">
            {REDES.map((r) => (
              <a key={r.l} href={r.h} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                {r.l}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-[1400px] px-5 py-6 font-mono text-xs text-slate md:px-8">© {MARCA.temporada} {MARCA.nombreLargo} · Demaria Marketing Deportivo</p>
      </div>
    </footer>
  )
}

/* ───────────────────────── extras flotantes ───────────────────────── */

// Altímetro: el scroll de la página es el desnivel del circuito más largo
function Altimetro({ progress }: { progress: number }) {
  const ruta = RUTAS[RUTAS.length - 1]
  const total = ruta.dmas
  const m = Math.round(progress * total)
  const top = progress > 0.985
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full bg-white/90 py-2 pl-2 pr-4 shadow-[0_10px_30px_-10px_rgba(10,27,42,0.3)] ring-1 ring-line backdrop-blur lg:flex" aria-hidden="true">
      <div className="relative h-9 w-9">
        <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
          <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-line)" strokeWidth="3" />
          <circle cx="18" cy="18" r="15" fill="none" stroke={top ? 'var(--color-volt)' : 'var(--color-brand)'} strokeWidth="3" strokeDasharray={`${progress * 94.2} 94.2`} strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 20 20" className="absolute inset-0 m-auto h-3.5 w-3.5 text-ink">
          <path d="M2 16 8 6l3 5 2-3 5 8z" fill="currentColor" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="font-mono text-sm font-semibold tabular-nums">{top ? '¡Meta!' : `D+ ${m.toLocaleString('es-CL')} m`}</div>
        <div className="font-mono text-[0.65rem] uppercase text-slate">
          {ruta.nombre} {ruta.km}K
        </div>
      </div>
    </div>
  )
}

function MobileBar({ show }: { show: boolean }) {
  return (
    <div className={`fixed inset-x-3 bottom-3 z-40 transition-all duration-300 sm:hidden ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}>
      <a href={LINKS.inscripcion} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-full bg-ink py-2 pl-5 pr-2 text-white shadow-lg">
        <span className="font-mono text-xs">
          {FECHA_DESTACADA.dia} {FECHA_DESTACADA.mes.toUpperCase()} · {FECHA_DESTACADA.lugar.split(' ').at(-1)}
        </span>
        <span className="flex items-center gap-2 rounded-full bg-volt px-4 py-2.5 text-sm font-bold uppercase text-white">
          Inscríbete <Arrow />
        </span>
      </a>
    </div>
  )
}

function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`Video ${MARCA.nombre}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-5xl">
        <button type="button" onClick={onClose} autoFocus className="absolute -top-12 right-0 rounded-full bg-white px-4 py-2 text-sm font-bold" aria-label="Cerrar video">
          Cerrar ✕
        </button>
        <div className="aspect-video overflow-hidden rounded-2xl bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${LINKS.video}?autoplay=1&rel=0`}
            title={MARCA.nombre}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── app ───────────────────────── */

export default function App() {
  const [video, setVideo] = useState(false)
  const progress = useScrollProgress()
  useReveal()

  const abrirVideo = () => setVideo(true)

  return (
    <>
      <Header />
      <main>
        <Hero onVideo={abrirVideo} />
        <Intro />
        <Calendario />
        <Rutas />
        <Agenda />
        <Categorias />
        <Campamento />
        <Resultados />
        <Ranking />
        <Noticias />
        <Faq />
        <Comunidad />
        <Sponsors />
        <FinalCta />
      </main>
      <Footer />
      <Altimetro progress={progress} />
      <MobileBar show={progress > 0.06 && progress < 0.93} />
      <VideoModal open={video} onClose={() => setVideo(false)} />
      <Popup />
      <Inscripcion />
    </>
  )
}
