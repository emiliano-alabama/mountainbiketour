#!/usr/bin/env python3
"""
Genera src/ranking.json desde el Excel del ranking acumulado del MTB Tour.

Uso:
  python3 scripts/sync-ranking.py "/ruta/RANKING ACUMULADO MTB 2026.xlsx" "1ª fecha (Viña Matetic)"

Lee SOLO la hoja "RESULTADOS WEB" (nombre, apellidos y puntaje por categoría).
Las demás hojas tienen RUT y fecha de nacimiento: nunca se leen ni se publican.
"""

import json
import re
import sys
from datetime import date
from pathlib import Path

import openpyxl

OUT = Path(__file__).resolve().parent.parent / 'src' / 'ranking.json'
HOJA = 'RESULTADOS WEB'

CATEGORIAS = {
    'EXPERTO': 'Experto',
    'GENERAL EXPERTO': 'Experto',
    'INTERMEDIO': 'Intermedio',
    'GENERAL INTERMEDIO': 'Intermedio',
    'FAMILIAR': 'Familiar',
    'GRAVEL': 'Gravel',
    'DUPLAS PADRE HIJO': 'Duplas padre hij@',
}


def limpio(v) -> str:
    return re.sub(r'\s+', ' ', str(v or '')).strip()


def titulo(s: str) -> str:
    # "hugo pino lucero" -> "Hugo Pino Lucero" sin romper "de", "del", "los"
    menores = {'de', 'del', 'la', 'las', 'los', 'y'}
    return ' '.join(p if (p.lower() in menores and i) else p[:1].upper() + p[1:].lower() for i, p in enumerate(s.split()))


def edad(txt: str) -> str:
    t = txt.lower().replace('años', '').strip()
    m = re.search(r'(\d+)\s*(?:o|y)\s*m[aá]s', t)
    if m:
        return f'{m.group(1)}+'
    m = re.search(r'(\d+)\s*-\s*(\d+)', t)
    return f'{m.group(1)}-{m.group(2)}' if m else 'General'


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    xlsx = Path(sys.argv[1])
    nota = sys.argv[2] if len(sys.argv) > 2 else ''
    ws = openpyxl.load_workbook(xlsx, data_only=True, read_only=True)[HOJA]

    entradas, avisos = [], []
    cat, sexo, ed = None, None, 'General'
    pendiente = None  # primer integrante de una dupla

    for fila in ws.iter_rows(min_row=2, values_only=True):
        a, b, c = (list(fila) + [None] * 3)[:3]
        a_txt, b_txt = limpio(a), limpio(b)
        if not a_txt:
            continue
        if not b_txt and c is None:  # fila de título
            up = a_txt.upper()
            if up in CATEGORIAS:
                cat, sexo, ed = CATEGORIAS[up], None, 'General'
                if cat.startswith('Duplas'):
                    sexo = 'Dupla'
            elif 'E - BIKE' in up or 'E-BIKE' in up:
                cat, ed = 'E-Bike', 'General'
                sexo = 'Damas' if up.startswith('DAMAS') else 'Varones'
            elif up.startswith(('DAMAS', 'VARONES')):
                sexo = 'Damas' if up.startswith('DAMAS') else 'Varones'
                ed = edad(a_txt)
            continue

        # Apellido numérico: error de planilla, se publica solo el nombre
        if b_txt and not re.search(r'[A-Za-zÁÉÍÓÚÑáéíóúñ]', b_txt):
            avisos.append(f'«{a_txt} {b_txt}» ({cat}): apellido no válido, se publica solo el nombre')
            b_txt = ''
        nombre = titulo(f'{a_txt} {b_txt}'.strip())

        if sexo == 'Dupla':
            if c is not None:
                pendiente = {'c': cat, 's': 'Dupla', 'e': 'General', 'n': nombre, 'p': int(c)}
            elif pendiente:
                pendiente['n2'] = nombre
                entradas.append(pendiente)
                pendiente = None
            continue

        if c is None or cat is None or sexo is None:
            avisos.append(f'Fila sin categoría o puntaje: {a_txt} {b_txt}')
            continue
        entradas.append({'c': cat, 's': sexo, 'e': ed, 'n': nombre, 'p': int(c)})

    OUT.write_text(json.dumps({
        'actualizado': date.today().isoformat(),
        'nota': nota,
        'fuente': 'Ranking acumulado MTB Tour 2026 (Demaria)',
        'entradas': entradas,
    }, ensure_ascii=False, indent=0))

    for a in avisos:
        print('  !', a)
    resumen = {}
    for e in entradas:
        resumen[e['c']] = resumen.get(e['c'], 0) + 1
    print(f'✓ {len(entradas)} entradas → src/ranking.json')
    for k, v in resumen.items():
        print(f'   {k}: {v}')


if __name__ == '__main__':
    main()
