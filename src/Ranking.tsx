import { useMemo, useState } from 'react'
import data from '@/ranking.json'
import podio1 from '@/assets/mtb/podio-1.jpg'
import podio2 from '@/assets/mtb/podio-2.jpg'
import podio3 from '@/assets/mtb/podio-3.jpg'

type Entrada = { c: string; s: string; e: string; n: string; n2?: string; p: number }
type Fila = Entrada & { pos: number }
type Grupo = { sexo: string; edad: string; filas: Fila[]; max: number }

const ENTRADAS = data.entradas as Entrada[]
// Categorías presentes en los datos, en orden de exigencia (las no listadas van al final)
const ORDEN = ['Experto', 'Intermedio', 'Gravel', 'E-Bike', 'Familiar']
const posicion = (c: string) => (ORDEN.includes(c) ? ORDEN.indexOf(c) : ORDEN.length)
const CATEGORIAS = [...new Set(ENTRADAS.map((e) => e.c))].sort((a, b) => posicion(a) - posicion(b))
const SEXOS = ['Damas', 'Varones'] as const
const VISTA_PREVIA = 5

const edadOrden = (e: string) => (e === 'General' ? 0 : parseInt(e, 10))
const edadLabel = (e: string) => (e === 'General' ? 'General' : e.endsWith('+') ? `${parseInt(e, 10)} años o más` : `${e.replace('-', '–')} años`)
const sinTildes = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const fechaActualizacion = new Date(`${data.actualizado}T12:00:00`).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })

// Agrupa por sexo + tramo de edad y calcula la posición (empates comparten lugar)
function agrupar(categoria: string): Grupo[] {
  const map = new Map<string, Entrada[]>()
  for (const e of ENTRADAS) {
    if (e.c !== categoria) continue
    const key = `${e.s}|${e.e}`
    map.set(key, [...(map.get(key) ?? []), e])
  }
  return [...map.entries()]
    .map(([key, filas]) => {
      const [sexo, edad] = key.split('|')
      const orden = [...filas].sort((a, b) => b.p - a.p)
      let pos = 0
      return {
        sexo,
        edad,
        max: orden[0]?.p ?? 1,
        filas: orden.map((f, i) => {
          if (i === 0 || f.p !== orden[i - 1].p) pos = i + 1
          return { ...f, pos }
        }),
      }
    })
    .sort((a, b) => SEXOS.indexOf(a.sexo as never) - SEXOS.indexOf(b.sexo as never) || edadOrden(a.edad) - edadOrden(b.edad))
}

function Pill({ active, onClick, children, disabled }: { active: boolean; onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      disabled={disabled}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? 'bg-ink text-white' : 'bg-white text-ink ring-1 ring-line hover:ring-ink'
      }`}
    >
      {children}
    </button>
  )
}

function Posicion({ pos }: { pos: number }) {
  const estilo = pos === 1 ? 'bg-volt text-white' : pos <= 3 ? 'bg-ink text-white' : 'text-slate'
  return <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-sm font-semibold tabular-nums ${estilo}`}>{pos}</span>
}

function TablaGrupo({ grupo, titulo, completo, consulta }: { grupo: Grupo; titulo: string | null; completo: boolean; consulta: string }) {
  const [abierto, setAbierto] = useState(false)
  const mostrar = completo || abierto || consulta ? grupo.filas : grupo.filas.slice(0, VISTA_PREVIA)
  const ocultas = grupo.filas.length - mostrar.length

  return (
    <div className="rounded-3xl bg-white p-5 ring-1 ring-line md:p-6">
      {titulo && (
        <div className="mb-3 flex items-baseline justify-between gap-4 border-b border-line pb-3">
          <h3 className="display text-3xl">{titulo}</h3>
          <span className="font-mono text-xs text-slate">{grupo.filas.length} {grupo.sexo === 'Dupla' ? 'duplas' : 'personas'}</span>
        </div>
      )}
      <ol>
        {mostrar.map((f) => (
          <li key={f.n + f.e} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 py-2">
            <Posicion pos={f.pos} />
            <div className="min-w-0">
              <div className="font-semibold leading-tight">
                {f.n}
                {f.n2 && <span className="font-normal text-slate"> & {f.n2}</span>}
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-snow" aria-hidden="true">
                <div className={`h-full rounded-full ${f.pos === 1 ? 'bg-volt' : 'bg-brand/70'}`} style={{ width: `${(f.p / grupo.max) * 100}%` }} />
              </div>
            </div>
            <span className="text-right font-mono text-lg font-semibold tabular-nums">
              {f.p}
              <span className="ml-1 text-xs font-normal text-slate">pts</span>
            </span>
          </li>
        ))}
      </ol>
      {ocultas > 0 && (
        <button type="button" onClick={() => setAbierto(true)} className="mt-2 text-sm font-bold uppercase tracking-wide text-brand hover:text-ink">
          Ver los {grupo.filas.length} →
        </button>
      )}
    </div>
  )
}

export default function Ranking() {
  const [categoria, setCategoria] = useState(CATEGORIAS[0])
  const [sexo, setSexo] = useState<'Todos' | (typeof SEXOS)[number]>('Todos')
  const [edad, setEdad] = useState('Todas')
  const [consulta, setConsulta] = useState('')

  const grupos = useMemo(() => agrupar(categoria), [categoria])
  const edades = useMemo(() => [...new Set(grupos.map((g) => g.edad))].sort((a, b) => edadOrden(a) - edadOrden(b)), [grupos])
  const esDupla = categoria.startsWith('Duplas')
  const tieneEdades = edades.length > 1

  const q = sinTildes(consulta.trim())
  const visibles = grupos
    .filter((g) => esDupla || sexo === 'Todos' || g.sexo === sexo)
    .filter((g) => !tieneEdades || edad === 'Todas' || g.edad === edad)
    .map((g) => (q ? { ...g, filas: g.filas.filter((f) => sinTildes(`${f.n} ${f.n2 ?? ''}`).includes(q)) } : g))
    .filter((g) => g.filas.length > 0)

  const total = visibles.reduce((n, g) => n + g.filas.length, 0)
  const unGrupo = visibles.length === 1

  const tituloGrupo = (g: Grupo) => {
    if (esDupla) return null
    if (!tieneEdades) return g.sexo
    return `${g.sexo} · ${edadLabel(g.edad)}`
  }

  const cambiarCategoria = (c: string) => {
    setCategoria(c)
    setEdad('Todas')
  }

  return (
    <section id="ranking" className="bg-snow" aria-labelledby="ranking-t">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="reveal mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4 flex flex-wrap items-center gap-3 text-brand">
              Acumulado 2026
              {data.nota && <span className="rounded-full bg-sky px-3 py-1 normal-case tracking-normal text-ink">{data.nota}</span>}
            </p>
            <h2 id="ranking-t" className="display text-[clamp(3rem,7vw,6rem)]">
              Ranking <span className="text-brand">anual</span>
            </h2>
          </div>
          <div className="flex max-w-md flex-col gap-6 lg:col-span-5 lg:justify-self-end">
            {/* Fotos de premiación dispuestas como un podio */}
            <div className="flex items-end gap-3" aria-hidden="true">
              {[
                { src: podio1, h: 'h-40 md:h-48' },
                { src: podio2, h: 'h-52 md:h-64' },
                { src: podio3, h: 'h-32 md:h-40' },
              ].map((f, i) => (
                <img key={i} src={f.src} alt="" loading="lazy" className={`${f.h} w-1/3 rounded-2xl object-cover object-[50%_25%] ring-1 ring-line`} />
              ))}
            </div>
            <p className="text-lg leading-relaxed text-slate">
              En cada fecha, los 9 primeros de cada categoría suman puntaje (10, 8, 7, 6, 5, 4, 3, 2 y 1). El acumulado tiene premiación anual.
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="reveal rounded-3xl bg-sky p-4 md:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
            <fieldset className="min-w-0">
              <legend className="eyebrow mb-2 text-slate">Categoría</legend>
              <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
                {CATEGORIAS.map((c) => (
                  <Pill key={c} active={categoria === c} onClick={() => cambiarCategoria(c)}>
                    {c}
                  </Pill>
                ))}
              </div>
            </fieldset>
            <label className="block">
              <span className="eyebrow mb-2 block text-slate">Buscar</span>
              <span className="relative block">
                <svg viewBox="0 0 20 20" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" aria-hidden="true">
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="m14 14 4 4" stroke="currentColor" strokeWidth="2" />
                </svg>
                <input
                  type="search"
                  value={consulta}
                  onChange={(e) => setConsulta(e.target.value)}
                  placeholder="Nombre o apellido"
                  className="w-full rounded-full bg-white py-2.5 pl-10 pr-4 text-sm ring-1 ring-line placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-brand lg:w-72"
                />
              </span>
            </label>
          </div>

          <div className="mt-5 grid gap-5 border-t border-ink/10 pt-5 md:grid-cols-[auto_1fr]">
            <fieldset className="min-w-0">
              <legend className="eyebrow mb-2 text-slate">Sexo</legend>
              <div className="flex gap-2">
                {(['Todos', ...SEXOS] as const).map((s) => (
                  <Pill key={s} active={!esDupla && sexo === s} onClick={() => setSexo(s)} disabled={esDupla}>
                    {s}
                  </Pill>
                ))}
              </div>
            </fieldset>
            <fieldset className="min-w-0">
              <legend className="eyebrow mb-2 text-slate">Edad</legend>
              {tieneEdades ? (
                <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
                  {['Todas', ...edades].map((e) => (
                    <Pill key={e} active={edad === e} onClick={() => setEdad(e)}>
                      {e === 'Todas' ? 'Todas' : e.endsWith('+') ? e : e.replace('-', '–')}
                    </Pill>
                  ))}
                </div>
              ) : (
                <p className="py-2 text-sm text-slate">{esDupla ? 'Las duplas compiten en una sola tabla general.' : 'Esta categoría tiene premiación general, sin tramos de edad.'}</p>
              )}
            </fieldset>
          </div>
        </div>

        {/* Resultados del filtro */}
        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-slate" aria-live="polite">
          {categoria} · {total} {esDupla ? 'duplas' : 'personas'}
          {visibles.length > 1 && ` en ${visibles.length} tablas`}
        </p>

        {visibles.length === 0 ? (
          <div className="mt-4 rounded-3xl bg-white p-10 text-center ring-1 ring-line">
            <p className="display text-4xl">Sin coincidencias</p>
            <p className="mt-3 text-slate">
              No encontramos «{consulta}» en {categoria}
              {sexo !== 'Todos' && !esDupla ? ` · ${sexo}` : ''}
              {edad !== 'Todas' && tieneEdades ? ` · ${edadLabel(edad)}` : ''}. Revisa la ortografía o prueba con otra categoría.
            </p>
            <button
              type="button"
              onClick={() => {
                setConsulta('')
                setSexo('Todos')
                setEdad('Todas')
              }}
              className="mt-6 rounded-full border-2 border-ink px-5 py-2.5 text-sm font-bold uppercase tracking-wide hover:bg-ink hover:text-white"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className={`mt-4 grid gap-4 ${unGrupo ? 'max-w-3xl' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
            {visibles.map((g) => (
              <TablaGrupo key={`${categoria}|${g.sexo}|${g.edad}`} grupo={g} titulo={tituloGrupo(g)} completo={unGrupo} consulta={q} />
            ))}
          </div>
        )}

        <p className="mt-8 font-mono text-xs text-slate">
          {data.nota || `Actualizado el ${fechaActualizacion}`} · Fuente: {data.fuente}
        </p>
      </div>
    </section>
  )
}
