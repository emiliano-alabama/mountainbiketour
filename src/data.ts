// Contenido tomado de https://mountainbiketour.cl (octubre 2026), noticias 2026 y material de DMD

import fecha1 from '@/assets/mtb/fecha-1.jpg'
import fecha2 from '@/assets/mtb/fecha-2.jpg'
import fecha3 from '@/assets/mtb/fecha-3.jpg'
import fecha4 from '@/assets/mtb/fecha-4.jpg'
import fecha5 from '@/assets/mtb/fecha-5.jpg'
import fecha6 from '@/assets/mtb/fecha-6.jpg'
import catFamiliar from '@/assets/mtb/cat-familiar.jpg'
import catGravel from '@/assets/mtb/cat-gravel.jpg'
import catIntermedio from '@/assets/mtb/cat-intermedio.jpg'
import catEbike from '@/assets/mtb/cat-ebike.jpg'
import catExperto from '@/assets/mtb/cat-experto.jpg'
import catKids from '@/assets/mtb/cat-kids.jpg'
import camp1 from '@/assets/mtb/camp-1.jpg'
import camp2 from '@/assets/mtb/camp-2.jpg'
import camp3 from '@/assets/mtb/camp-3.jpg'
import camp4 from '@/assets/mtb/camp-4.jpg'
import camp5 from '@/assets/mtb/camp-5.jpg'
import camp6 from '@/assets/mtb/camp-6.jpg'
import camp7 from '@/assets/mtb/camp-7.jpg'
import camp8 from '@/assets/mtb/camp-8.jpg'
import noticia5 from '@/assets/mtb/noticia-5ta.jpg'
import noticia4 from '@/assets/mtb/noticia-4ta.jpg'
import noticia3 from '@/assets/mtb/noticia-3ra.jpg'
import logoDmd from '@/assets/mtb/logos/dmd.png'
import logoBci from '@/assets/mtb/logos/bci.png'
import logoSubaru from '@/assets/mtb/logos/subaru.png'
import logoPowerade from '@/assets/mtb/logos/powerade.png'
import logoDavila from '@/assets/mtb/logos/clinica.png'
import logoPreferida from '@/assets/mtb/logos/preferida.png'
import logoKunstmann from '@/assets/mtb/logos/kunstmann.jpg'
import logoGuallarauco from '@/assets/mtb/logos/guallarauco.webp'
import logoYoutopia from '@/assets/mtb/logos/youtopia.png'
import logoIansa from '@/assets/mtb/logos/iansa.jpeg'
import logoPapaJohns from '@/assets/mtb/logos/papajohns.png'
import logoCasablanca from '@/assets/mtb/logos/casablanca.jpg'
import logoMassiva from '@/assets/mtb/logos/massiva.jpeg'
import logoFdn from '@/assets/mtb/logos/fdn.png'

export const MARCA = {
  nombre: 'MTB Tour',
  nombreLargo: 'Mountainbike Tour',
  presentado: 'Bci · Subaru',
  temporada: 2026,
}

export const LINKS = {
  inscripcion: 'https://mountainbiketour.cl/inscripcion-6ta-fecha-2026/',
  eventos: 'https://welcu.com/demaria',
  video: 'HWdocvktQ7M',
  waze: 'https://waze.com/ul/h63vybdn1b',
  bases: 'https://mountainbiketour.cl/wp-content/uploads/2026/06/Bases-MTB.pdf',
  noticias: 'https://mountainbiketour.cl/noticias/',
  instagram: 'https://www.instagram.com/mountainbiketour/',
  facebook: '',
  youtube: 'https://www.youtube.com/@mtbtour6152',
  email: 'contacto@dmd.cl',
  direccion: 'Av. Vitacura 5250, Oficina 906, Vitacura',
}

export const NAV = [
  { label: 'Fechas', href: '#fechas' },
  { label: 'Circuitos', href: '#rutas' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Categorías', href: '#categorias' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Ranking', href: '#ranking' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'FAQ', href: '#faq' },
]

export type Fecha = {
  n: number
  iso: string // AAAA-MM-DD
  dia: string
  mes: string
  lugar: string
  img: string
  agotado: boolean
  resultados?: string
  // Opcionales, se usan en el hero cuando la fecha es la destacada
  edicion?: string
  largada?: string // HH:MM, hora de Chile
  inscripcion?: string
  fotos?: string
  distancias?: string[]
  afiche?: string // se muestra como popup una vez por visitante
  // Ticketera Welcu: los botones de inscripción abren un modal con este embed
  ticketera?: { id: string; script: string; pagina: string }
}

// Para cambiar de fecha: actualiza `agotado` y los datos de la fecha siguiente.
// El hero, la cuenta regresiva y los botones se ajustan solos.
export const FECHAS: Fecha[] = [
  { n: 1, iso: '2026-03-22', dia: '22', mes: 'Mar', lugar: 'Viña Matetic', img: fecha1, agotado: true, resultados: 'https://www.cronolap.cl/eventos/mountainbike-tour-1ra-fecha' },
  { n: 2, iso: '2026-05-03', dia: '3', mes: 'May', lugar: 'Viña Casas del Bosque', img: fecha2, agotado: true, resultados: 'https://www.cronolap.cl/eventos/mountainbike-tour-2da-fecha' },
  { n: 3, iso: '2026-06-14', dia: '14', mes: 'Jun', lugar: 'Viña López Pangue', img: fecha3, agotado: true, resultados: 'https://www.cronolap.cl/eventos/mountainbike-tour-3ra-fecha' },
  { n: 4, iso: '2026-08-09', dia: '9', mes: 'Ago', lugar: 'Parque Pitama', img: fecha4, agotado: true, resultados: 'https://www.cronolap.cl/eventos/mountainbike-tour-4ta-fecha' },
  { n: 5, iso: '2026-09-06', dia: '6', mes: 'Sep', lugar: 'Viña Veramonte', img: fecha5, agotado: true, resultados: 'https://www.cronolap.cl/eventos/mountainbike-tour-5ta-fecha', fotos: 'http://q.me-qr.com/2obtqul1' },
  {
    n: 6,
    iso: '2026-10-25',
    dia: '25',
    mes: 'Oct',
    lugar: 'Hacienda Picarquín',
    img: fecha6,
    agotado: false,
    edicion: 'Gran final',
    largada: '09:30',
    inscripcion: 'https://mountainbiketour.cl/inscripcion-6ta-fecha-2026/',
    distancias: ['Familiar 19K', 'Intermedio 25K', 'Gravel 25K', 'Experto 35K', 'E-Bike 35K', 'MTB Kids'],
    // Sin afiche 2026 todavía: los popups disponibles son de la temporada 2025
    ticketera: {
      id: 'welcu_embed_sale_7279973027',
      script: 'https://welcu.com/demaria/-1k67/sales/f5519505f4.embed?currency_id=clp&locale=es',
      pagina: 'https://welcu.com/demaria/mtbtour6',
    },
  },
]

// La fecha destacada es la primera con tickets disponibles (o la última de la temporada)
export const FECHA_DESTACADA = FECHAS.find((f) => !f.agotado) ?? FECHAS[FECHAS.length - 1]

// Chile continental: UTC-3 desde el primer domingo de septiembre hasta el primer domingo de abril; UTC-4 el resto
function offsetChile(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  const primerDomingo = (mes: number) => {
    const dow = new Date(Date.UTC(y, mes - 1, 1)).getUTCDay()
    return 1 + ((7 - dow) % 7)
  }
  const invierno = (m > 4 && m < 9) || (m === 4 && d >= primerDomingo(4)) || (m === 9 && d < primerDomingo(9))
  return invierno ? '-04:00' : '-03:00'
}

// Largada de la fecha destacada (alimenta la cuenta regresiva)
export const NEXT_RACE = new Date(`${FECHA_DESTACADA.iso}T${FECHA_DESTACADA.largada ?? '09:00'}:00${offsetChile(FECHA_DESTACADA.iso)}`)

export type Ruta = {
  nombre: string
  categorias: string[]
  km: number
  dmas: number
  desc: string
  kmz?: string
}

// Circuitos preliminares 6ta fecha (sujetos a modificaciones). Intermedio y Gravel comparten circuito, igual que Experto y E-Bike.
export const RUTAS: Ruta[] = [
  {
    nombre: 'Familiar',
    categorias: ['Familiar'],
    km: 19,
    dmas: 440,
    desc: 'El circuito para disfrutar en familia, con un enfoque recreativo y menos competitivo.',
  },
  {
    nombre: 'Intermedio',
    categorias: ['Intermedio', 'Gravel'],
    km: 25,
    dmas: 815,
    desc: 'Combina tramos técnicos y desafío físico, para ciclistas con experiencia moderada. Es también el circuito de la nueva categoría Gravel.',
  },
  {
    nombre: 'Experto',
    categorias: ['Experto', 'E-Bike'],
    km: 35,
    dmas: 1200,
    desc: 'El recorrido más exigente, con desniveles importantes, para ciclistas avanzados. Lo comparten Experto y E-Bike.',
  },
]

export const AGENDA = [
  { hora: '08:15', titulo: 'Abre el campamento base', detalle: 'Inicio de atenciones' },
  { hora: '08:15', titulo: 'Retiro de kits', detalle: 'Hasta las 09:15 hrs' },
  { hora: '08:30', titulo: 'Recepción MTB Kids', detalle: 'Hasta las 09:20 hrs' },
  { hora: '09:30', titulo: 'Largada Expertos y E-Bike', detalle: 'Primera salida del día', destacado: true },
  { hora: '09:50', titulo: 'Largada Intermedios y Gravel', detalle: '' },
  { hora: '10:00', titulo: 'Largada Familiar', detalle: '' },
  { hora: '12:00', titulo: 'Post carrera y premiación', detalle: 'Hasta las 14:00 hrs' },
  { hora: '13:30', titulo: 'Fin del evento', detalle: '' },
]

export const CATEGORIAS = [
  {
    nombre: 'Familiar',
    nivel: 'Para todos',
    img: catFamiliar,
    desc: 'Para disfrutar la experiencia en familia: un recorrido recreativo y menos competitivo, ideal para quienes se inician en el MTB.',
  },
  {
    nombre: 'Intermedio',
    nivel: 'Desafío moderado',
    img: catIntermedio,
    desc: 'Tramos técnicos y desafío físico para ciclistas con experiencia moderada. Premiación a los tres primeros por edad y género.',
  },
  {
    nombre: 'Experto',
    nivel: 'La más exigente',
    img: catExperto,
    desc: 'Desniveles importantes y la mayor distancia del día, para ciclistas avanzados que buscan una verdadera prueba de resistencia.',
  },
  {
    nombre: 'Gravel',
    nivel: 'Nueva categoría',
    img: catGravel,
    desc: 'Pensada para bicicletas gravel, con una mezcla de terrenos ideales para este tipo de ciclismo. Corre el circuito Intermedio.',
  },
  {
    nombre: 'E-Bike',
    nivel: 'Pedaleo asistido',
    img: catEbike,
    desc: 'Para bicicletas eléctricas de montaña. Recorre el circuito Experto, con largada junto a los Expertos.',
  },
  {
    nombre: 'MTB Kids',
    nivel: '2 a 14 años',
    img: catKids,
    desc: 'Un circuito especial para niñas y niños de 2 a 14 años, para que la familia completa sea parte del Tour.',
  },
]

export const CAMPAMENTO_INCLUYE = [
  'Cervezas Kunstmann (con y sin alcohol)',
  'Powerade',
  'Snackin La Preferida',
  'Listo Ya! de IANSA Agro (vegetariano, vegano y celíaco)',
  'Pizza Papa Johns',
  'Geles Zpeed',
  'Guallarauco',
  'Masajes',
  'Seguridad a cargo de Clínica Dávila',
]

export const CAMPAMENTO_IMGS = [camp2, camp1, camp3, camp6, camp4, camp5, camp7, camp8]

export type Noticia = {
  titulo: string
  fecha: string
  resumen: string
  img: string
  url: string
  cuerpo: string[]
  nota?: string // nota completa (RideChile): se muestra dentro del modal
  enlaces: { label: string; href: string }[]
}

export const NOTICIAS: Noticia[] = [
  {
    titulo: 'La 5ª fecha del Mountainbike Tour 2026 contó con 420 ciclistas en la Viña Veramonte',
    fecha: '2026-09-08',
    resumen: 'El domingo 6 de septiembre, Casablanca recibió a los ciclistas en las distancias Experto, E-Bike, Intermedio, Gravel y Familiar.',
    img: noticia5,
    url: 'https://mountainbiketour.cl/%f0%9f%9a%b5%e2%99%80%ef%b8%8f-la-5a-fecha-del-mountainbike-tour-2026-conto-con-420-ciclistas-en-la-vina-veramonte/',
    cuerpo: [
      'Este domingo 6 de septiembre la comuna de Casablanca recibió a los ciclistas en las distancias Experto, E-Bike, Intermedio, Gravel y Familiar.',
      'Ya cargamos nuestro álbum de fotos en nuestro Facebook.',
      'Inscríbete para ser parte de la 6ª y última fecha: podrás contar con un 20% de descuento utilizando el código “MTB20”.',
    ],
    nota: 'https://www.ridechile.cl/2026/09/la-5a-fecha-del-mountainbike-tour-2026-conto-con-420-ciclistas-en-la-vina-veramonte/',
    enlaces: [],
  },
  {
    titulo: 'Pitama recibió a 520 ciclistas en la 4ª fecha del Mountainbike Tour 2026',
    fecha: '2026-08-12',
    resumen: 'El domingo 9 de agosto se corrió en el Parque Bienestar Pitama, con las distancias Experto, E-Bike, Intermedio, Gravel y Familiar.',
    img: noticia4,
    url: 'https://mountainbiketour.cl/%f0%9f%9a%b5%e2%99%80%ef%b8%8f%f0%9f%9a%b5%e2%99%82%ef%b8%8f-pitama-recibio-a-520-ciclistas-en-la-4a-fecha-del-mountainbike-tour-2026/',
    cuerpo: [
      'Este domingo 9 de agosto se desarrolló el evento de MTB organizado por Demaria Marketing Deportivo en el Parque Bienestar Pitama, con las distancias Experto (43K), E-Bike (43K), Intermedio (32K), Gravel (32K) y Familiar (18K).',
      'Ya cargamos nuestro álbum de fotos en nuestro Facebook.',
      'Utiliza el código “MTB20” y tendrás un 20% de descuento en la inscripción para la 5ª fecha del Mountainbike Tour en la Viña Veramonte, el domingo 6 de septiembre.',
    ],
    nota: 'https://www.ridechile.cl/2026/08/pitama-recibio-a-520-ciclistas-en-la-4a-fecha-del-mountainbike-tour-2026/',
    enlaces: [
      { label: 'Ver en Instagram', href: 'https://www.instagram.com/p/Db1h0AQkb3w/' },
    ],
  },
  {
    titulo: 'El MTB Tour se tomó la Viña López Pangue',
    fecha: '2026-06-26',
    resumen: 'Más de 600 ciclistas llegaron a la tercera fecha para competir en Experto, Intermedio, Gravel, E-Bike, Familiar y Kids.',
    img: noticia3,
    url: 'https://mountainbiketour.cl/el-mtb-tour-se-tomo-la-vina-lopez-pangue/',
    cuerpo: [
      'Más de 600 ciclistas llegaron hasta la Viña López Pangue para la tercera fecha del MTB Tour, donde disfrutaron de una carrera y un lugar espectacular para las competencias Experto, Intermedio, Gravel, E-Bike, Familiar y Kids.',
      'Ya cargamos nuestro álbum de fotos.',
    ],
    nota: 'https://www.ridechile.cl/2026/06/el-mtb-tour-se-tomo-la-vina-lopez-pangue/',
    enlaces: [
      { label: 'Ver en Instagram', href: 'https://www.instagram.com/p/DZlVez5jUVj/' },
    ],
  },
]

export const FAQ = [
  {
    q: '¿Cuándo y dónde se realiza el MTB Tour?',
    a: 'Son 6 fechas al año. En 2026: 22 de marzo (Viña Matetic), 3 de mayo (Viña Casas del Bosque), 14 de junio (Viña López Pangue), 9 de agosto (Parque Pitama), 6 de septiembre (Viña Veramonte) y 25 de octubre (Hacienda Picarquín).',
  },
  {
    q: '¿Hay categorías para distintos niveles?',
    a: 'Sí: Familiar, Intermedio, Experto, Gravel, E-Bike y MTB Kids (2 a 14 años). Las distancias cambian según la fecha; revisa los circuitos de la próxima fecha en este sitio.',
  },
  {
    q: '¿Cuál es la agenda del día de la carrera?',
    a: 'Varía según la fecha. Una jornada habitual: 8:15 abre el campamento base y comienza la entrega de kits, recepción de MTB Kids, 9:30 largada Expertos y E-Bike, luego Intermedios y Gravel, y Familiar. Post carrera y premiación desde las 12:00.',
  },
  {
    q: '¿Cuándo se cierran las inscripciones?',
    a: 'El viernes previo a cada fecha a las 09:00, o antes si se completan los cupos. Los precios suben a medida que se acerca la carrera, así que conviene inscribirse con anticipación.',
  },
  {
    q: '¿Si compro el ticket ahora, tengo precio preferencial?',
    a: 'Sí. El precio varía según la fecha de inscripción: mientras antes te inscribas, más económico. Aprovecha la preventa.',
  },
  {
    q: '¿Qué incluye el kit de competencia?',
    a: 'Polera oficial del evento, número de competidor, chip de competencia y acceso a todas las prestaciones del campamento base (cervezas, comida, masajes, frutas, entre otros).',
  },
  {
    q: '¿Hay medallas para quienes terminan?',
    a: 'Sí, todos los participantes reciben medalla. Además se premia a los tres primeros lugares de cada categoría, por distancia y rango de edad.',
  },
  {
    q: '¿Qué equipamiento me recomiendan?',
    a: 'Ropa técnica y cómoda, calzado para ciclismo, polera y short de ciclismo, guantes, casco y cortaviento. Trae ropa de recambio para disfrutar el post carrera.',
  },
  {
    q: '¿Qué otras actividades hay?',
    a: 'El campamento base incluye comida, hidratación, jugos, helados, barras de cereal, frutas, cervezas y masajes. Todo incluido en la inscripción.',
  },
  {
    q: '¿Los estacionamientos son gratuitos?',
    a: 'Sí, hay estacionamiento gratuito cerca del campamento base.',
  },
  {
    q: '¿Cuánta gente participa?',
    a: 'En 2026 cada fecha ha reunido entre 400 y más de 600 ciclistas, considerando todas las categorías.',
  },
  {
    q: '¿Hay premios para los ganadores?',
    a: 'Sí, para los tres primeros lugares de Intermedio y Experto, por edad y género.',
  },
  {
    q: '¿Se venden accesorios en el evento?',
    a: 'Sí: poleras, primeras capas, bandanas, jockeys, caramagiolas y otros accesorios deportivos en el campamento base.',
  },
  {
    q: '¿Puedo ir con acompañantes?',
    a: 'Sí. Los acompañantes compran una pulsera de acceso que les da las mismas prestaciones del campamento base que a los competidores.',
  },
  {
    q: '¿La ruta está marcada?',
    a: 'Sí, completamente señalizada, con puntos de hidratación y personal de asistencia.',
  },
  {
    q: '¿Hay servicio médico?',
    a: 'Sí: ambulancias, puesto médico y personal de rescate en ruta.',
  },
  {
    q: '¿Hay ranking anual?',
    a: 'Sí. En cada fecha los 9 primeros de cada categoría suman puntaje (10, 8, 7, 6, 5, 4, 3, 2 y 1) y el acumulado se premia al final de la temporada.',
  },
]

export const SPONSORS = [
  { grupo: 'Organiza', logos: [{ nombre: 'Demaria Marketing Deportivo', img: logoDmd, href: 'https://dmd.cl/' }] },
  {
    grupo: 'Presentan',
    logos: [
      { nombre: 'Bci', img: logoBci, href: 'https://www.bci.cl/personas' },
      { nombre: 'Subaru', img: logoSubaru },
    ],
  },
  { grupo: 'Hidratador oficial', logos: [{ nombre: 'Powerade', img: logoPowerade, href: 'https://andina.micoca-cola.cl/deportivas-y-energeticas/powerade' }] },
  { grupo: 'Partner médico', logos: [{ nombre: 'Clínica Dávila', img: logoDavila, href: 'https://www.davila.cl/' }] },
  {
    grupo: 'Colaboran',
    logos: [
      { nombre: 'Youtopia', img: logoYoutopia, href: 'https://youtopia.company/' },
      { nombre: 'Kunstmann', img: logoKunstmann, href: 'https://www.cerveza-kunstmann.cl/' },
      { nombre: 'Guallarauco', img: logoGuallarauco, href: 'https://www.guallarauco.cl/' },
      { nombre: 'IANSA Agro', img: logoIansa },
      { nombre: 'Papa Johns', img: logoPapaJohns },
      { nombre: 'La Preferida', img: logoPreferida },
      { nombre: 'Municipalidad de Casablanca', img: logoCasablanca, href: 'https://municipalidadcasablanca.cl/' },
    ],
  },
  { grupo: 'Media partner', logos: [{ nombre: 'Massiva', img: logoMassiva, href: 'https://massiva.cl/' }] },
  { grupo: 'Patrocina', logos: [{ nombre: 'Federación Deportiva Nacional de Ciclismo de Chile', img: logoFdn, href: 'https://fdnciclismochile.cl/' }] },
]
