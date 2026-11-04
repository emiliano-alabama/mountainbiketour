// Contenido tomado de https://mountainbiketour.cl (noviembre 2026), noticias 2026 y material de DMD

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
import noticiaCampeones from '@/assets/mtb/noticia-campeones.jpg'
import noticia5 from '@/assets/mtb/noticia-5ta.jpg'
import noticia4 from '@/assets/mtb/noticia-4ta.jpg'
import noticia3 from '@/assets/mtb/noticia-3ra.jpg'
import noticia2 from '@/assets/mtb/noticia-2da.jpg'
import noticia1 from '@/assets/mtb/noticia-1ra.jpg'
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
  temporada: 2027,
}

export const LINKS = {
  // Se reemplaza por la inscripción de la fecha destacada (ver más abajo)
  inscripcion: 'https://welcu.com/demaria/mountainbiketour1',
  eventos: 'https://welcu.com/demaria',
  video: 'HWdocvktQ7M',
  resultadosAnteriores: 'https://www.cronolap.cl/eventos',
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
  lugar: string // vacío = sede por confirmar
  img: string
  agotado: boolean
  resultados?: string
  // Opcionales, se usan en el hero cuando la fecha es la destacada
  edicion?: string
  largada?: string // HH:MM, hora de Chile
  inscripcion?: string
  fotos?: string
  distancias?: string[]
  // Ubicación para "Cómo llegar" (Waze y Google Maps)
  ubicacion?: { lat: number; lng: number }
  foco?: string // encuadre de la foto en el hero (CSS object-position), p. ej. '75% 30%'
  afiche?: string // se muestra como popup una vez por visitante
  // Ticketera Welcu: los botones de inscripción abren un modal con este embed
  ticketera?: { id: string; script: string; pagina: string }
}

// Temporada 2027. Cada fecha tiene su propia ticketera Welcu.
// Al pasar una fecha: marca `agotado: true` y agrega `resultados`. Cuando se confirme la sede, completa `lugar` y `ubicacion`.
// El hero, la cuenta regresiva y los botones toman la primera fecha no agotada que aún no pasa.
const DISTANCIAS = ['Familiar', 'Intermedio', 'Experto', 'Gravel', 'E-Bike', 'MTB Kids']

export const FECHAS: Fecha[] = [
  {
    n: 1,
    iso: '2027-03-07',
    foco: '72% 40%',
    dia: '7',
    mes: 'Mar',
    lugar: '',
    img: fecha1,
    agotado: false,
    largada: '09:30',
    inscripcion: 'https://welcu.com/demaria/mountainbiketour1',
    distancias: DISTANCIAS,
    ticketera: {
      id: 'welcu_embed_sale_7894779443',
      script: 'https://welcu.com/demaria/mountainbiketour1/sales/58f3c2a08c.embed?currency_id=clp&locale=es',
      pagina: 'https://welcu.com/demaria/mountainbiketour1',
    },
  },
  {
    n: 2,
    iso: '2027-04-25',
    dia: '25',
    mes: 'Abr',
    lugar: '',
    img: fecha2,
    agotado: false,
    largada: '09:30',
    inscripcion: 'https://welcu.com/demaria/mountainbiketour2',
    distancias: DISTANCIAS,
    ticketera: {
      id: 'welcu_embed_sale_7896879464',
      script: 'https://welcu.com/demaria/mountainbiketour2/sales/64d55a4272.embed?currency_id=clp&locale=es',
      pagina: 'https://welcu.com/demaria/mountainbiketour2',
    },
  },
  {
    n: 3,
    iso: '2027-06-13',
    dia: '13',
    mes: 'Jun',
    lugar: '',
    img: fecha3,
    agotado: false,
    largada: '09:30',
    inscripcion: 'https://welcu.com/demaria/mountainbiketour3',
    distancias: DISTANCIAS,
    ticketera: {
      id: 'welcu_embed_sale_7896979465',
      script: 'https://welcu.com/demaria/mountainbiketour3/sales/a7242391fb.embed?currency_id=clp&locale=es',
      pagina: 'https://welcu.com/demaria/mountainbiketour3',
    },
  },
  {
    n: 4,
    iso: '2027-07-25',
    dia: '25',
    mes: 'Jul',
    lugar: '',
    img: fecha4,
    agotado: false,
    largada: '09:30',
    inscripcion: 'https://welcu.com/demaria/mountainbiketour4',
    distancias: DISTANCIAS,
    ticketera: {
      id: 'welcu_embed_sale_7897079466',
      script: 'https://welcu.com/demaria/mountainbiketour4/sales/6679d18b9c.embed?currency_id=clp&locale=es',
      pagina: 'https://welcu.com/demaria/mountainbiketour4',
    },
  },
  {
    n: 5,
    iso: '2027-10-03',
    dia: '3',
    mes: 'Oct',
    lugar: '',
    img: fecha5,
    agotado: false,
    largada: '09:30',
    inscripcion: 'https://welcu.com/demaria/mountainbiketour5',
    distancias: DISTANCIAS,
    ticketera: {
      id: 'welcu_embed_sale_7897179467',
      script: 'https://welcu.com/demaria/mountainbiketour5/sales/f30e42aee9.embed?currency_id=clp&locale=es',
      pagina: 'https://welcu.com/demaria/mountainbiketour5',
    },
  },
  {
    n: 6,
    iso: '2027-11-21',
    dia: '21',
    mes: 'Nov',
    lugar: '',
    img: fecha6,
    agotado: false,
    largada: '09:30',
    inscripcion: 'https://welcu.com/demaria/mountainbiketour6',
    distancias: DISTANCIAS,
    edicion: 'Gran final',
    ticketera: {
      id: 'welcu_embed_sale_7897279468',
      script: 'https://welcu.com/demaria/mountainbiketour6/sales/b28ef9d0b5.embed?currency_id=clp&locale=es',
      pagina: 'https://welcu.com/demaria/mountainbiketour6',
    },
  },
]

// Nombre visible de la sede
export const nombreLugar = (f: Fecha) => f.lugar || 'Lugar por confirmar'

// La fecha destacada es la primera con tickets disponibles (o la última de la temporada)
const hoy = new Date().toISOString().slice(0, 10)
export const FECHA_DESTACADA = FECHAS.find((f) => !f.agotado && f.iso >= hoy) ?? FECHAS[FECHAS.length - 1]

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

// Los botones generales de inscripción llevan a la fecha destacada
LINKS.inscripcion = FECHA_DESTACADA.inscripcion ?? LINKS.eventos

export type Ruta = {
  nombre: string
  categorias: string[]
  km: string // rango de distancia, p. ej. '25–36'
  escala: number // altura relativa del perfil ilustrativo (0 a 1)
  desc: string
  dmas?: number // desnivel exacto, cuando se publique el circuito de la fecha
  kmz?: string
}

// Distancias de referencia (rangos corridos en la temporada 2026). Intermedio y Gravel comparten circuito, igual que Experto y E-Bike.
// El circuito exacto de cada fecha se publica antes de la carrera.
export const RUTAS: Ruta[] = [
  {
    nombre: 'Familiar',
    categorias: ['Familiar'],
    km: '18–26',
    escala: 0.4,
    desc: 'El circuito para disfrutar en familia, con un enfoque recreativo y menos competitivo. Incluye la modalidad padres e hij@s en dupla.',
  },
  {
    nombre: 'Intermedio',
    categorias: ['Intermedio', 'Gravel'],
    km: '25–36',
    escala: 0.7,
    desc: 'Combina tramos técnicos y desafío físico, para ciclistas que ya pedalean con frecuencia. Es también el circuito de la categoría Gravel.',
  },
  {
    nombre: 'Experto',
    categorias: ['Experto', 'E-Bike'],
    km: '35–44',
    escala: 1,
    desc: 'Máxima exigencia en kilometraje y altimetría, para ciclistas avanzados y de élite. Lo comparten Experto y E-Bike.',
  },
]

// Agenda típica (basada en la temporada 2026). La de cada fecha se confirma antes de la carrera.
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
    nivel: '4 a 12 años',
    img: catKids,
    desc: 'Un espacio para niñas y niños de 4 a 12 años, guiados por monitores especializados, para que la familia completa sea parte del Tour.',
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
  url: string // nota original en mountainbiketour.cl
  // Texto de la nota. Prefijos: '## ' título, '### ' subtítulo, '- ' ítem de lista; el resto son párrafos
  cuerpo: string[]
  enlaces: { label: string; href: string }[]
}

// Texto tomado de https://mountainbiketour.cl/noticias/ (noviembre 2026)
export const NOTICIAS: Noticia[] = [
  {
    titulo: 'Conoce a los campeones por categoría del Mountainbike Tour 2026',
    fecha: '2026-11-02',
    resumen: 'La Hacienda Picarquín fue el escenario de la 6ª y última fecha. Estos son los podios por categoría de la temporada en cada modalidad.',
    img: noticiaCampeones,
    url: 'https://mountainbiketour.cl/conoce-a-los-campeones-por-categoria-del-mountainbike-tour-2026/',
    cuerpo: [
      'La Hacienda Picarquín fue el escenario principal de la 6ª y última fecha del Mountainbike Tour 2026, y acá en RideChile te mostraremos a los mejores ciclistas por categorías en cada modalidad.',
      'Te presentamos los podios por categoría de las distancias Experto e Intermedio, además de los podios generales en las modalidades Familiar, Duplas Padre e hijo, E-Bike y Gravel, considerando que estas no contemplaban premiación por categoría:',
      '## Expertos 15-20 años',
      '### Varones',
      '- Vicente Pino – 40 puntos',
      '- Rodrigo Ledezma – 39 puntos',
      '- José Vergara – 20 puntos',
      '### Damas',
      '- Magdalena Carrasco – 10 puntos',
      '## Expertos 21-30 años',
      '### Varones',
      '- Ramón Sandoval – 49 puntos',
      '- Matías Urzua – 32 puntos',
      '- Cristóbal Torrealba – 42 puntos',
      '### Damas',
      '- Bárbara Palma – 20 puntos',
      '- Catalina Escudero – 10 puntos',
      '- María González – 10 puntos',
      '## Expertos 31-39 años',
      '### Varones',
      '- Emmanuel Soto – 40 puntos',
      '- Cristián Correa – 26 puntos',
      '- David Ríos – 22 puntos',
      '### Damas',
      '- María Araya – 40 puntos',
      '- Daniela Costa – 38 puntos',
      '- Carolina Biehl – 29 puntos',
      '## Expertos 40-49 años',
      '### Varones',
      '- Patricio Osses – 46 puntos',
      '- Aníbal Ramírez – 27 puntos',
      '- Hernán Soto – 23 puntos',
      '### Damas',
      '- Magdalena Eluchans – 50 puntos',
      '- Elizabeth Flores – 23 puntos',
      '- Marianela Barraza – 8 puntos',
      '## Expertos 50-59 años',
      '### Varones',
      '- Luis Pino – 56 puntos',
      '- Aníbal Debandi – 35 puntos',
      '- Rodrigo Ibáñez – 23 puntos',
      '### Damas',
      '- Ximena Cárcamo – 20 puntos',
      '- Alexa Reinarz – 10 puntos',
      '## Expertos 60-69 años',
      '### Varones',
      '- Francisco Tocornal – 58 puntos',
      '- Álvaro Fernández – 44 puntos',
      '- Hernán Águila – 33 puntos',
      '## Expertos 70 o más años',
      '### Varones',
      '- Pedro Durán – 30 puntos',
      '## Intermedios 21-30 años',
      '### Varones',
      '- Joaquín Cabrera – 46 puntos',
      '- Vicente Carrasco – 29 puntos',
      '- Mateo Smith – 28 puntos',
      '### Damas',
      '- Constanza Herrera – 24 puntos',
      '- Francisca González – 10 puntos',
      '- Macarena Tralma – 10 puntos',
      '## Intermedios 31-40 años',
      '### Varones',
      '- Eduardo Infiesta – 55 puntos',
      '- José Salinas – 43 puntos',
      '- Matías Oyarzún – 43 puntos',
      '### Damas',
      '- Julissa Santis – 47 puntos',
      '- Isadora Bórquez – 40 puntos',
      '- Yaritza Silva – 35 puntos',
      '## Intermedios 40-49 años',
      '### Varones',
      '- Franco Swidersky – 50 puntos',
      '- Ricardo Martínez – 35 puntos',
      '- Juan Vidal – 35 puntos',
      '### Damas',
      '- Carola Villanueva – 41 puntos',
      '- Nelly Gutiérrez – 36 puntos',
      '- Laura Cerón – 35 puntos',
      '## Intermedios 50-59 años',
      '### Varones',
      '- José Pacheco – 42 puntos',
      '- Francisco Matus – 42 puntos',
      '- Nicolás Bernier – 36 puntos',
      '### Damas',
      '- Lorena Herrera – 50 puntos',
      '- Alejandra Álvarez – 35 puntos',
      '- Haydee González – 30 puntos',
      '## Intermedios 60-69 años',
      '- Jaime Mateluna – 54 puntos',
      '- Sergio Goñi – 44 puntos',
      '- Hugo Velasco – 31 puntos',
      '## Intermedios 70 o más años',
      '- Gabriel Contreras – 58 puntos',
      '- Fernando Ramírez – 10 puntos',
      '- Sergio Valencia – 6 puntos',
      '## Podio Familiar',
      '### Varones',
      '- Lionel Valladares – 32 puntos',
      '- Luis Arancibia – 31 puntos',
      '- Brian Muñoz – 30 puntos',
      '### Damas',
      '- Constanza Aguirre – 47 puntos',
      '- Isabel Maureira – 42 puntos',
      '- Carolina Carrasco – 28 puntos',
      '## Podio Dupla Padre e Hijo',
      '- Marc y Rafael Jux – 53 puntos',
      '- José y Antonio Vergara – 51 puntos',
      '- Francisco y Renato Garate – 31 puntos',
      '## Podio E-Bike',
      '- José Muñoz – 42 puntos',
      '- Ricardo Lillo – 36 puntos',
      '- Héctor Tobar – 32 puntos',
      '## Podio Gravel',
      '### Varones',
      '- Mauricio Valdés – 44 puntos',
      '- Ian Mackinnon – 44 puntos',
      '- Romain Babin – 40 puntos',
      '### Damas',
      '- Sarai León – 46 puntos',
      '- Francisca Coffre – 25 puntos',
      '- Mane Parra – 20 puntos',
      'Para más información sobre el evento consulte con Demaria Marketing Deportivo o en la página web de MTB Tour 2026.',
      'Nota: Las fotos faltantes de las categorías mencionadas se deben a que las deportistas no estuvieron presentes durante la última fecha, es decir, la 6ª fecha en la Hacienda Picarquín.',
      'Viernes 30 de octubre de 2026 · Fuente: RideChile',
    ],
    enlaces: [{ label: 'Ver ranking 2026', href: '#ranking' }],
  },
  {
    titulo: 'La 5ª fecha del Mountainbike Tour 2026 contó con 420 ciclistas en la Viña Veramonte',
    fecha: '2026-09-08',
    resumen: 'El domingo 6 de septiembre la comuna de Casablanca recibió a los ciclistas en las distancias Experto, E-Bike, Intermedio, Gravel y Familiar.',
    img: noticia5,
    url: 'https://mountainbiketour.cl/%f0%9f%9a%b5%e2%99%80%ef%b8%8f-la-5a-fecha-del-mountainbike-tour-2026-conto-con-420-ciclistas-en-la-vina-veramonte/',
    cuerpo: [
      'Este domingo 6 de septiembre la comuna de Casablanca recibió a los ciclistas en las distancias de Experto, E-Bike, Intermedios, Gravel y Familiar.',
      'Ya cargamos nuestro álbum de fotos en nuestro Facebook.',
      'Inscríbete para ser parte de la 6ª y última fecha, podrás contar con un 20% de descuento utilizando el código “MTB20”.',
    ],
    enlaces: [
      { label: 'Más información en RideChile', href: 'https://www.ridechile.cl/2026/09/la-5a-fecha-del-mountainbike-tour-2026-conto-con-420-ciclistas-en-la-vina-veramonte/' },
    ],
  },
  {
    titulo: 'Pitama recibió a 520 ciclistas en la 4ª fecha del Mountainbike Tour 2026',
    fecha: '2026-08-12',
    resumen: 'El domingo 9 de agosto se corrió en el Parque Bienestar Pitama, con las distancias Experto, E-Bike, Intermedio, Gravel y Familiar.',
    img: noticia4,
    url: 'https://mountainbiketour.cl/%f0%9f%9a%b5%e2%99%80%ef%b8%8f%f0%9f%9a%b5%e2%99%82%ef%b8%8f-pitama-recibio-a-520-ciclistas-en-la-4a-fecha-del-mountainbike-tour-2026/',
    cuerpo: [
      'Este domingo 9 de agosto se desarrolló el evento de MTB organizado por Demaria Marketing Deportivo en el Parque Bienestar Pitama y con las distancias de Experto (43K), E-Bike (43K), Intermedio (32K), Gravel (32K) y Familiar (18K).',
      'Ya cargamos nuestro álbum de fotos a nuestro Facebook.',
      'Utiliza el código “MTB20” y tendrás un 20% de descuento en la inscripción para la 5ª fecha del Mountainbike Tour en la Viña Veramonte el domingo 6 de septiembre.',
    ],
    enlaces: [
      { label: 'Más información en RideChile', href: 'https://www.ridechile.cl/2026/08/pitama-recibio-a-520-ciclistas-en-la-4a-fecha-del-mountainbike-tour-2026/' },
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
      'Más de 600 ciclistas llegaron hasta la Viña López Pangue para la tercera fecha del MTB Tour, donde disfrutaron de una carrera y lugar espectacular para las competencias de Experto, Intermedio, Gravel, E-Bike, Familiar y Kids.',
      'Revisa todos los detalles de la jornada en nuestra nota en RideChile.',
      'Ya cargamos nuestro álbum de fotos.',
    ],
    enlaces: [
      { label: 'Nota en RideChile', href: 'https://www.ridechile.cl/2026/06/el-mtb-tour-se-tomo-la-vina-lopez-pangue/' },
      { label: 'Ver en Instagram', href: 'https://www.instagram.com/p/DZlVez5jUVj/' },
    ],
  },
  {
    titulo: 'Pato Farías y Feña Castro repiten como ganadores en la 2ª fecha del Mountainbike Tour 2026',
    fecha: '2026-05-07',
    resumen: 'Cerca de 600 ciclistas corrieron en la Viña Casas del Bosque. Patricio Farías y Fernanda Castro volvieron a ganar la distancia Experto.',
    img: noticia2,
    url: 'https://mountainbiketour.cl/pato-farias-y-fena-castro-repiten-como-ganadores-en-la-2a-fecha-del-mountainbike-tour-2026/',
    cuerpo: [
      'Los destacados ciclistas nacionales Patricio Farías y Fernanda Castro se quedaron nuevamente con el primer lugar de la distancia Experto del MTB Tour 2026, en lo que fue la segunda fecha que se llevó a cabo en la Viña Casas del Bosque, comuna de Casablanca, este domingo 3 de mayo.',
      'El evento organizado por Demaria Marketing Deportivo comenzó con una soleada mañana en la Viña Casas del Bosque y contempló cerca de 600 ciclistas que vibraron con el deporte en la 2ª Fecha del MTB Tour 2026 con las distancias Experto, E-Bike, Gravel (46K), Intermedio (30K) y Familiar (23K).',
      'La primera largada fue para la distancia Experto, que contempló un circuito de 46K y con dos (2) vueltas. Los ganadores de la máxima distancia fueron Patricio Farías (1:51:38) y Fernanda Castro (2:21:36).',
      '### Podio Varones Experto',
      '- Patricio Farías – 1:51:38',
      '- Pedro Quiroga – 1:52:21',
      '- Raúl Aguilera – 1:56:37',
      '### Podio Damas Experto',
      '- Fernanda Castro – 2:21:36',
      '- María de Los Ángeles González – 2:22:44',
      '- Daniela Costa – 2:34:45',
      '20 minutos más tarde fue el turno de la distancia Intermedio, que contó con un circuito de 30K. Los ganadores de la segunda mayor distancia fueron Eduardo Infiesta (1:03:44) e Isadora Bórquez (1:22:16).',
      '### Podio Varones Intermedio',
      '- Eduardo Infiesta – 1:03:44',
      '- Joaquín Tapia – 1:04:33',
      '- Matías Oyarzún – 1:04:35',
      '### Podio Damas Intermedio',
      '- Isadora Bórquez – 1:22:16',
      '- Francisca Soto – 1:22:31',
      '- Laura Fuentealba – 1:30:18',
      'Finalmente, la distancia menor (Familiar) contó con un circuito de 23K, en la cual los mejores ciclistas fueron Cesar Guaico (43:53) y Constanza Aguirre (47:34).',
      '### Podio Varones Familiar',
      '- Cesar Guaico – 43:53',
      '- Jorge Pavez – 43:55',
      '- Lionel Valladares – 44:18',
      '### Podio Damas Familiar',
      '- Constanza Aguirre – 47:34',
      '- Isabel Maureira – 50:51',
      '- Ana Karen – 51:19',
      'Al igual que en todos los eventos organizados por Demaria Marketing Deportivo, el tercer tiempo estuvo agradable, con la presencia de los participantes junto con sus familiares y los stands de las distintas marcas que estuvieron presentes en la 2ª Fecha del MTB Tour 2026 como Powerade, Marley Coffee, Clínica Dávila, Iansa, Guayarauco, La Preferida, Kunstmann, entre otros.',
      'Antes del inicio de las premiaciones se dio un pequeño espacio para premiar a los niños y niñas que estuvieron presentes en el evento y que sueñan con seguir los pasos de los referentes del ciclismo en el país.',
      'Cobertura realizada por Sebastián Valladares · Domingo 3 de mayo de 2026 · Fuente: RideChile',
    ],
    enlaces: [
      { label: 'Resultados', href: 'https://resultados.cronosur.cl/eventos/420' },
      { label: 'Álbum de fotos', href: 'https://www.facebook.com/media/set/?set=a.1573062148157485&type=3&locale=es_LA' },
    ],
  },
  {
    titulo: 'Gran inicio de temporada en Viña Matetic',
    fecha: '2026-05-07',
    resumen: 'El 22 de marzo partió el Mountainbike Tour Bci Subaru 2026 con más de 600 corredores y el debut de la categoría Gravel.',
    img: noticia1,
    url: 'https://mountainbiketour.cl/gran-inicio-de-temporada-en-vina-matetic/',
    cuerpo: [
      'El 22 de marzo se dio el puntapié inicial del Mountainbike Tour Bci Subaru 2026. Más de 600 corredores se dieron cita para competir en los desafiantes circuitos de Viña Matetic. Como novedad para este año 2026 debutó la categoría Gravel, que estará presente en todas las fechas de esta temporada. Los ganadores over all fueron los siguientes:',
      '- Damas Familiar: Isabel Maureira',
      '- Varones Familiar: Rubén Orellana',
      '- Damas Intermedio: Isadora Bórquez',
      '- Varones Intermedio: Matías Oyarzún',
      '- Damas Experto: Fernanda Castro',
      '- Varones Experto: Patricio Farías',
      '- Damas Gravel: Mane Parra',
      '- Varones Gravel: Romain Babin',
      '- Varones E-Bike: Manuel Echeverría',
      '## Viña Casas del Bosque será la sede de la segunda fecha del Tour',
      'El domingo 3 de mayo se disputará la segunda fecha del Mountainbike Tour Bci Subaru en los maravillosos terrenos de la Viña Casas del Bosque. Más de 600 corredores estarán en la largada en las distintas categorías:',
      '- Mountainbike Kids para niños de 2 a 14 años',
      '- Familiar y Duplas Padres e Hijos: 23K, D+ 315',
      '- Intermedios: 30K, D+ 620',
      '- Expertos / E-Bike / Gravel: 46K, D+ 1.350',
      'La actividad comienza con el retiro de kits de 8:15 a 9:15 y finaliza a las 14 horas, después del post carrera y la premiación.',
    ],
    enlaces: [],
  },
]

export const FAQ = [
  {
    q: '¿Cuándo y dónde se realiza el MTB Tour?',
    a: 'Son 6 fechas al año, entre marzo y noviembre. En 2027: 7 de marzo, 25 de abril, 13 de junio, 25 de julio, 3 de octubre y 21 de noviembre. Los lugares se anunciarán en este sitio y en Instagram @mountainbiketour.',
  },
  {
    q: '¿Hay categorías para distintos niveles?',
    a: 'Sí: Familiar, Intermedio, Experto, Gravel, E-Bike y MTB Kids (4 a 12 años). Las distancias cambian según la fecha; revisa los circuitos de la próxima fecha en este sitio.',
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
    a: 'En la temporada 2026 cada fecha reunió entre 400 y más de 600 ciclistas, considerando todas las categorías.',
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
