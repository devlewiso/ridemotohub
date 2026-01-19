# Guía de Imágenes WebP - RideMotoHub Guatemala

## 📋 Resumen
Este documento detalla todas las imágenes necesarias para el proyecto RideMotoHub Guatemala, organizadas por página y sección. Todas las imágenes deben estar en formato **WebP** para optimización.

---

## 🎨 Imágenes Necesarias por Página

### **1. Homepage (`/`)**

#### **Hero Section**
- **Archivo:** `hero-motos-guatemala.webp`
- **Dimensiones:** 1920x1080px
- **Descripción:** Grupo de motociclistas en ruta guatemalteca con volcanes al fondo
- **Uso:** Fondo del hero con overlay
- **Hover:** Efecto parallax sutil

#### **Features Cards (6 cards con hover)**
1. **`feature-todas-cilindradas.webp`** (400x300px)
   - Diferentes tipos de motos juntas
   
2. **`feature-rutas-epicas.webp`** (400x300px)
   - Carretera panorámica en Guatemala
   
3. **`feature-eventos-rodadas.webp`** (400x300px)
   - Grupo de riders en evento
   
4. **`feature-tips-consejos.webp`** (400x300px)
   - Herramientas y mantenimiento
   
5. **`feature-comparte-experiencias.webp`** (400x300px)
   - Riders tomando fotos
   
6. **`feature-red-apoyo.webp`** (400x300px)
   - Riders ayudándose mutuamente

---

### **2. Rutas (`/rutas`)**

#### **Route Cards (6 rutas con hover)**
1. **`ruta-antigua-atitlan.webp`** (800x500px)
   - Lago de Atitlán con volcanes
   
2. **`ruta-guatemala-monterrico.webp`** (800x500px)
   - Playa de arena negra
   
3. **`ruta-coban-semuc.webp`** (800x500px)
   - Piscinas naturales de Semuc Champey
   
4. **`ruta-interamericana-norte.webp`** (800x500px)
   - Carretera Interamericana
   
5. **`ruta-volcanes.webp`** (800x500px)
   - Circuito de volcanes
   
6. **`ruta-peten-tikal.webp`** (800x500px)
   - Ruinas mayas de Tikal

---

### **3. Eventos (`/eventos`)**

#### **Event Card**
- **`evento-caravana-zorro-2026.webp`** (900x400px)
- **Descripción:** Caravana masiva de motos en Guatemala
- **Uso:** Hero de la tarjeta de evento
- **Hover:** Zoom sutil (scale 1.05)

#### **Past Events (3 eventos con hover)**
1. **`evento-pasado-antigua.webp`** (400x250px)
2. **`evento-pasado-encuentro-2025.webp`** (400x250px)
3. **`evento-pasado-monterrico.webp`** (400x250px)

---

### **4. Evento Individual (`/eventos/caravana-del-zorro-2026`)**

#### **Hero Background**
- **`evento-hero-caravana-zorro.webp`** (1920x600px)
- **Descripción:** Panorámica de evento masivo de motos
- **Uso:** Fondo del hero con overlay de gradiente

#### **Highlights Icons (6 items con hover)**
- Usar iconos emoji (no requieren imágenes)
- Hover: Animación bounce

---

### **5. Tips & Consejos (`/tips`)**

#### **Category Headers (4 categorías)**
1. **`tips-mantenimiento.webp`** (600x300px)
   - Taller de motos profesional
   
2. **`tips-seguridad.webp`** (600x300px)
   - Equipo de protección completo
   
3. **`tips-tecnicas.webp`** (600x300px)
   - Rider en curva con técnica correcta
   
4. **`tips-preparacion-viaje.webp`** (600x300px)
   - Moto cargada para viaje

---

### **6. Nosotros (`/about`)**

#### **Values Cards (6 valores con hover)**
- Usar iconos emoji (no requieren imágenes)
- Hover: Elevación y cambio de borde

#### **Team/Community Photo**
- **`comunidad-ridemotohub.webp`** (1200x600px)
- **Descripción:** Grupo grande de riders de RideMotoHub
- **Uso:** Sección de comunidad

---

### **7. Blog (`/blog`)**

#### **Blog Post Placeholders (ya existen, convertir a WebP)**
- `blog-placeholder-1.webp` (800x450px)
- `blog-placeholder-2.webp` (800x450px)
- `blog-placeholder-3.webp` (800x450px)
- `blog-placeholder-4.webp` (800x450px)
- `blog-placeholder-5.webp` (800x450px)
- `blog-placeholder-about.webp` (800x450px)

---

## 🎯 Efectos Hover por Tipo de Elemento

### **Cards con Imagen de Fondo**
```css
.card {
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card img {
    transition: transform 0.3s ease;
}

.card:hover img {
    transform: scale(1.05);
}
```

### **Feature Cards**
```css
.feature-card {
    overflow: hidden;
}

.feature-card:hover {
    transform: translateY(-5px);
    border-color: hsl(220, 90%, 56%);
}

.feature-icon {
    transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
    animation: bounce 0.6s;
}
```

### **Route Cards**
```css
.route-card {
    position: relative;
    overflow: hidden;
}

.route-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.route-card:hover::before {
    opacity: 1;
}
```

---

## 📦 Estructura de Carpetas Recomendada

```
public/
└── images/
    ├── hero/
    │   └── hero-motos-guatemala.webp
    ├── features/
    │   ├── feature-todas-cilindradas.webp
    │   ├── feature-rutas-epicas.webp
    │   └── ... (6 total)
    ├── rutas/
    │   ├── ruta-antigua-atitlan.webp
    │   ├── ruta-guatemala-monterrico.webp
    │   └── ... (6 total)
    ├── eventos/
    │   ├── evento-caravana-zorro-2026.webp
    │   ├── evento-hero-caravana-zorro.webp
    │   └── pasados/
    │       ├── evento-pasado-antigua.webp
    │       └── ... (3 total)
    ├── tips/
    │   ├── tips-mantenimiento.webp
    │   ├── tips-seguridad.webp
    │   └── ... (4 total)
    └── comunidad/
        └── comunidad-ridemotohub.webp
```

---

## 🔧 Conversión de Imágenes Existentes a WebP

### **Usando Sharp (ya instalado en el proyecto)**

```javascript
// scripts/convert-to-webp.js
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const inputDir = './src/assets';
const outputDir = './public/images';

const files = await readdir(inputDir);

for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
        const inputPath = join(inputDir, file);
        const outputPath = join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
        
        await sharp(inputPath)
            .webp({ quality: 85 })
            .toFile(outputPath);
        
        console.log(`Converted: ${file} -> ${outputPath}`);
    }
}
```

### **Comando para ejecutar:**
```bash
node scripts/convert-to-webp.js
```

---

## 🎨 Especificaciones Técnicas

### **Calidad WebP Recomendada:**
- **Hero images:** 85-90%
- **Cards/Thumbnails:** 80-85%
- **Icons/Small images:** 75-80%

### **Dimensiones Estándar:**
- **Hero:** 1920x1080px (16:9)
- **Event Hero:** 1920x600px (panorámico)
- **Route Cards:** 800x500px (16:10)
- **Feature Cards:** 400x300px (4:3)
- **Past Events:** 400x250px (16:10)
- **Blog Posts:** 800x450px (16:9)

### **Optimización:**
- Usar `loading="lazy"` para imágenes fuera del viewport inicial
- Usar `srcset` para responsive images
- Incluir `alt` text descriptivo en español

---

## 📝 Ejemplo de Implementación

### **HTML con WebP y Fallback:**
```html
<picture>
    <source srcset="/images/rutas/ruta-antigua-atitlan.webp" type="image/webp">
    <img 
        src="/images/rutas/ruta-antigua-atitlan.jpg" 
        alt="Ruta de Antigua a Lago de Atitlán"
        loading="lazy"
        width="800"
        height="500"
    >
</picture>
```

### **Astro Component:**
```astro
---
import { Image } from 'astro:assets';
import rutaImage from '../assets/ruta-antigua-atitlan.webp';
---

<Image 
    src={rutaImage} 
    alt="Ruta de Antigua a Lago de Atitlán"
    width={800}
    height={500}
    format="webp"
    quality={85}
    loading="lazy"
/>
```

---

## ✅ Checklist de Implementación

### **Fase 1: Conversión de Existentes**
- [ ] Convertir blog-placeholder-1.jpg a .webp
- [ ] Convertir blog-placeholder-2.jpg a .webp
- [ ] Convertir blog-placeholder-3.jpg a .webp
- [ ] Convertir blog-placeholder-4.jpg a .webp
- [ ] Convertir blog-placeholder-5.jpg a .webp
- [ ] Convertir blog-placeholder-about.jpg a .webp

### **Fase 2: Imágenes Nuevas - Homepage**
- [ ] hero-motos-guatemala.webp
- [ ] 6 feature cards images

### **Fase 3: Imágenes Nuevas - Rutas**
- [ ] 6 route images

### **Fase 4: Imágenes Nuevas - Eventos**
- [ ] evento-caravana-zorro-2026.webp
- [ ] evento-hero-caravana-zorro.webp
- [ ] 3 past events images

### **Fase 5: Imágenes Nuevas - Tips**
- [ ] 4 category header images

### **Fase 6: Imágenes Nuevas - Comunidad**
- [ ] comunidad-ridemotohub.webp

### **Fase 7: Actualizar Referencias**
- [ ] Actualizar imports en componentes
- [ ] Actualizar paths en páginas
- [ ] Verificar lazy loading
- [ ] Probar en diferentes dispositivos

---

## 🔗 Recursos Útiles

### **Herramientas de Conversión:**
- **Online:** https://squoosh.app/
- **CLI:** `sharp-cli` (npm package)
- **Bulk:** `cwebp` (Google WebP tools)

### **Optimización:**
- **TinyPNG:** https://tinypng.com/ (también soporta WebP)
- **ImageOptim:** https://imageoptim.com/

### **Generación de Imágenes:**
- **Unsplash:** https://unsplash.com/ (buscar: motorcycle, guatemala, riding)
- **Pexels:** https://www.pexels.com/
- **Pixabay:** https://pixabay.com/

---

## 📊 Beneficios de WebP

- ✅ **30-50% menor tamaño** que JPEG/PNG
- ✅ **Mejor compresión** sin pérdida de calidad
- ✅ **Soporte de transparencia** (como PNG)
- ✅ **Soporte de animación** (como GIF)
- ✅ **Amplio soporte** en navegadores modernos

---

**Última actualización:** Enero 18, 2026  
**Mantenido por:** RideMotoHub Guatemala Team
