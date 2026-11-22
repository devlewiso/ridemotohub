// NeuralCodeLab · el camaleón. Firma de marca: visto desde arriba, entra por cualquier orilla de la pantalla
// (en un punto al azar), se detiene un rato en algún lugar a mirar y cambiar de color, y sale por cualquier orilla.
// Uso: <script src="/camaleon.js" defer></script>. Semitransparente, no captura clics, no cambia el layout,
// respeta prefers-reduced-motion, se pausa con la pestaña oculta y funciona con CSP estricta (sin <style> en línea).
(() => {
  if (window.__nclCamaleon) return
  window.__nclCamaleon = true

  const NS = 'http://www.w3.org/2000/svg'
  const COLORES = ['#19d39a', '#13b6c9', '#7a6cf0', '#ffc22e'] // plumaje, turquesa, violeta, amarillo
  const OSCURO = '#090c0b'
  const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches
  const ancho = () => (innerWidth < 640 ? 48 : 68)
  const alto = () => ancho() * 1.5

  const el = (tag, attrs, padre) => {
    const e = document.createElementNS(NS, tag)
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v)
    if (padre) padre.appendChild(e)
    return e
  }
  const origen = (n, x, y) => { n.style.transformBox = 'view-box'; n.style.transformOrigin = `${x}px ${y}px` }

  // ───────── Dibujo (vista superior, la cabeza apunta hacia arriba) ─────────
  const svg = el('svg', { viewBox: '-10 -30 120 180', 'aria-hidden': 'true', focusable: 'false' })
  const g = el('g', {}, svg)
  origen(g, 50, 70)
  const relleno = []
  const pata = (d, dedos, hx, hy) => {
    const p = el('g', {}, g)
    el('path', { d, fill: 'none', 'stroke-width': '6', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p)
    el('path', { d: dedos, fill: 'none', 'stroke-width': '3.4', 'stroke-linecap': 'round' }, p)
    origen(p, hx, hy)
    relleno.push(...p.children)
    return p
  }
  // patas con codo y pie en pinza (dos dedos, como los camaleones)
  const patas = [
    pata('M40 50 L 25 46 L 19 33', 'M19 33 l -6 -3 M19 33 l 0 -7', 40, 50), // delantera izq.
    pata('M60 50 L 75 46 L 81 33', 'M81 33 l 6 -3 M81 33 l 0 -7', 60, 50), // delantera der.
    pata('M41 88 L 26 94 L 22 108', 'M22 108 l -6 2 M22 108 l 1 7', 41, 88), // trasera izq.
    pata('M59 88 L 74 94 L 78 108', 'M78 108 l 6 2 M78 108 l -1 7', 59, 88), // trasera der.
  ]
  // cola enrollada
  const cola = el('path', { d: 'M50 100 C 51 116, 46 127, 38 131 C 29 135, 24 126, 30 121 C 34 118, 39 123, 35 127', fill: 'none', 'stroke-width': '7', 'stroke-linecap': 'round' }, g)
  origen(cola, 50, 100); relleno.push(cola)
  // cuerpo
  relleno.push(el('path', { d: 'M50 36 C 62 38, 67 54, 65 72 C 63 89, 57 101, 50 105 C 43 101, 37 89, 35 72 C 33 54, 38 38, 50 36 Z' }, g))
  // cabeza con casco: la punta del casco sobresale hacia atrás sobre el cuello
  relleno.push(el('path', { d: 'M50 4 C 60 6, 65 16, 63 27 C 62 34, 58 38, 56 40 L 50 50 L 44 40 C 42 38, 38 34, 37 27 C 35 16, 40 6, 50 4 Z' }, g))
  // cresta dorsal: pequeños dientes más oscuros a lo largo del lomo
  const cresta = el('g', { fill: OSCURO, 'fill-opacity': '0.28' }, g)
  for (let y = 54; y <= 94; y += 8) el('path', { d: `M50 ${y} l -3 5 l 3 -1.6 l 3 1.6 Z` }, cresta)
  // ojos de torreta a los lados de la cabeza
  const pupilas = []
  for (const cx of [39, 61]) {
    el('circle', { cx, cy: 19, r: 8.5, fill: '#ffffff' }, g)
    pupilas.push(el('circle', { cx, cy: 18, r: 3.6, fill: OSCURO }, g))
  }
  // lengua
  const lengua = el('path', { d: 'M50 6 L 50 -20 C 50 -26, 56 -26, 56 -21', fill: 'none', stroke: '#ff4d4f', 'stroke-width': '3', 'stroke-linecap': 'round' }, g)
  origen(lengua, 50, 6)
  lengua.style.transform = 'scaleY(0)'

  const pintar = (c) => relleno.forEach((n) => (n.getAttribute('fill') === 'none' ? n.setAttribute('stroke', c) : n.setAttribute('fill', c)))
  pintar(COLORES[0])

  // ───────── Contenedor fijo: semitransparente, nunca recibe clics ─────────
  const caja = document.createElement('div')
  caja.setAttribute('aria-hidden', 'true')
  const medir = () => Object.assign(caja.style, { width: ancho() + 'px', height: alto() + 'px' })
  Object.assign(caja.style, { position: 'fixed', left: '0', top: '0', pointerEvents: 'none', zIndex: '40', opacity: '0.5', willChange: 'transform' })
  medir()
  Object.assign(svg.style, { width: '100%', height: '100%', overflow: 'visible', display: 'block' })
  caja.appendChild(svg)

  // ───────── Movimiento ─────────
  let x = 0, y = 0, rot = 45
  const tf = () => `translate(${x}px, ${y}px) rotate(${rot}deg)`
  const pausa = (ms) => new Promise((ok) => setTimeout(ok, ms))
  const visible = () => document.hidden ? new Promise((ok) => document.addEventListener('visibilitychange', function f() { if (!document.hidden) { document.removeEventListener('visibilitychange', f); ok() } })) : null

  let pasos = []
  const caminar = (on) => {
    pasos.forEach((a) => a.cancel())
    pasos = []
    if (!on) return
    // marcha cruzada: delantera izq. con trasera der., y al revés
    const fase = [0, 1, 1, 0]
    pasos = patas.map((p, i) => p.animate([{ transform: 'rotate(-16deg)' }, { transform: 'rotate(16deg)' }], {
      duration: 420, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out', delay: fase[i] * -420,
    }))
    pasos.push(g.animate([{ transform: 'rotate(-4deg)' }, { transform: 'rotate(4deg)' }], { duration: 420, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }))
    pasos.push(cola.animate([{ transform: 'rotate(8deg)' }, { transform: 'rotate(-8deg)' }], { duration: 840, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }))
  }
  const ir = (nx, ny, velocidad = 70) => {
    const desde = tf()
    const ms = (Math.hypot(nx - x, ny - y) / velocidad) * 1000
    x = nx; y = ny
    return caja.animate([{ transform: desde }, { transform: tf() }], { duration: ms, easing: 'linear', fill: 'forwards' }).finished.then(() => { caja.style.transform = tf() })
  }
  const girar = (r, ms = 600) => {
    const desde = tf()
    rot = r
    return caja.animate([{ transform: desde }, { transform: tf() }], { duration: ms, easing: 'cubic-bezier(.3,.7,.2,1)', fill: 'forwards' }).finished.then(() => { caja.style.transform = tf() })
  }
  const mirar = async () => {
    for (const [dx, dy] of [[-2, -1], [2, -1], [0, 1.5], [-2, 0], [0, -1]]) {
      pupilas.forEach((p, i) => { p.setAttribute('cx', (i ? 61 : 39) + dx); p.setAttribute('cy', 18 + dy) })
      await pausa(450 + Math.random() * 350)
    }
  }
  let ci = 0
  const cambiarColor = async () => {
    const de = COLORES[ci]; ci = (ci + 1) % COLORES.length; const a = COLORES[ci]
    const mez = (t) => '#' + [1, 3, 5].map((k) => Math.round(parseInt(de.slice(k, k + 2), 16) * (1 - t) + parseInt(a.slice(k, k + 2), 16) * t).toString(16).padStart(2, '0')).join('')
    for (let k = 1; k <= 20; k++) { pintar(mez(k / 20)); await pausa(60) }
  }
  const lenguazo = () => lengua.animate(
    [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)', offset: 0.3 }, { transform: 'scaleY(1)', offset: 0.55 }, { transform: 'scaleY(0)' }],
    { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)' },
  ).finished

  async function vida() {
    await pausa(1500)
    for (;;) {
      await visible()
      const w = innerWidth, h = innerHeight, aw = ancho(), ah = alto()
      // Entra por cualquier orilla (arriba, derecha, abajo o izquierda), en un punto al azar,
      // se detiene en algún lugar de la pantalla y sale por cualquier orilla (puede ser la misma, de regreso).
      const azar = (a, b) => a + Math.random() * (b - a)
      const fuera = Math.max(aw, ah) * 1.4
      const orilla = (lado) => [
        { x: azar(0, w - aw), y: -fuera },        // arriba
        { x: w + fuera * 0.4, y: azar(0, h - ah) }, // derecha
        { x: azar(0, w - aw), y: h + fuera * 0.4 }, // abajo
        { x: -fuera, y: azar(0, h - ah) },         // izquierda
      ][lado]
      const ladoEntrada = Math.floor(Math.random() * 4)
      const inicio = orilla(ladoEntrada)
      const medio = { x: azar(w * 0.15, w * 0.85 - aw), y: azar(h * 0.2, h * 0.8 - ah) }
      let fin = orilla(Math.floor(Math.random() * 4))
      // que la salida no quede pegada a la entrada (así no da media vuelta en el mismo lugar)
      for (let n = 0; n < 5 && Math.hypot(fin.x - inicio.x, fin.y - inicio.y) < Math.min(w, h) * 0.4; n++) fin = orilla(Math.floor(Math.random() * 4))
      const angulo = (a, b) => (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 90 // la cabeza apunta hacia arriba
      x = inicio.x; y = inicio.y; rot = angulo(inicio, medio); caja.style.transform = tf()
      caja.style.visibility = 'visible'

      caminar(true); await ir(medio.x, medio.y); caminar(false)
      // se queda un rato en el centro: mira, cambia de color, gira un poco la cabeza, saca la lengua
      await mirar()
      await cambiarColor()
      await girar(rot - 18, 900); await mirar(); await girar(rot + 30, 1100)
      if (Math.random() < 0.7) await lenguazo()
      await pausa(2500 + Math.random() * 2500)
      await girar(angulo(medio, fin), 700)
      caminar(true); await ir(fin.x, fin.y); caminar(false)

      caja.style.visibility = 'hidden'
      await pausa(12000 + Math.random() * 18000) // descansa fuera de la pantalla antes de volver
    }
  }

  const arrancar = () => {
    document.body.appendChild(caja)
    addEventListener('resize', medir)
    if (reducir) {
      // Sin movimiento: queda quieto en la esquina inferior izquierda, como firma.
      x = 16; y = innerHeight - alto() - 16; rot = 45; caja.style.transform = tf(); return
    }
    caja.style.visibility = 'hidden'
    vida()
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrancar)
  else arrancar()
})()
