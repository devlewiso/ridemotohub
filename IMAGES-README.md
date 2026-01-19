# 🖼️ Gestión de Imágenes - RideMotoHub Guatemala

## 📋 Resumen Rápido

Este proyecto utiliza **formato WebP** para todas las imágenes para optimizar el rendimiento y la velocidad de carga.

---

## 🚀 Inicio Rápido

### **Convertir Imágenes Existentes a WebP**

```bash
npm run convert-images
```

Este comando convierte automáticamente todas las imágenes JPG/PNG de `src/assets/` a formato WebP y las guarda en `public/images/blog/`.

---

## 📁 Estructura de Imágenes

```
public/images/
├── blog/              # Imágenes de blog (convertidas automáticamente)
├── hero/              # Imágenes hero de páginas
├── features/          # Imágenes de features/características
├── rutas/             # Imágenes de rutas
├── eventos/           # Imágenes de eventos
│   └── pasados/       # Eventos pasados
├── tips/              # Imágenes de tips y consejos
└── comunidad/         # Imágenes de comunidad
```

---

## 🎨 Imágenes Necesarias

### **Prioridad Alta (Homepage)**
1. `hero-motos-guatemala.webp` (1920x1080px)
2. 6 imágenes para feature cards (400x300px cada una)

### **Prioridad Media (Páginas Principales)**
3. 6 imágenes para rutas (800x500px cada una)
4. 1 imagen hero para evento Caravana del Zorro (900x400px)
5. 3 imágenes para eventos pasados (400x250px cada una)

### **Prioridad Baja (Contenido)**
6. 4 imágenes para categorías de tips (600x300px cada una)
7. 1 imagen de comunidad (1200x600px)

**Ver `IMAGES-WEBP-GUIDE.md` para lista completa y especificaciones.**

---

## 🔧 Cómo Agregar Nuevas Imágenes

### **Opción 1: Conversión Automática**

1. Coloca tus imágenes JPG/PNG en `src/assets/`
2. Ejecuta: `npm run convert-images`
3. Las imágenes WebP aparecerán en `public/images/blog/`

### **Opción 2: Conversión Manual**

**Usando herramientas online:**
- [Squoosh](https://squoosh.app/) - Recomendado
- [CloudConvert](https://cloudconvert.com/jpg-to-webp)
- [TinyPNG](https://tinypng.com/)

**Configuración recomendada:**
- Calidad: 85%
- Effort: 6 (máxima compresión)

---

## 💻 Uso en Código

### **En Componentes Astro:**

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero-motos-guatemala.webp';
---

<Image 
    src={heroImage} 
    alt="Motociclistas en Guatemala"
    width={1920}
    height={1080}
    format="webp"
    quality={85}
    loading="lazy"
/>
```

### **En HTML Directo:**

```html
<picture>
    <source srcset="/images/hero/hero-motos-guatemala.webp" type="image/webp">
    <img 
        src="/images/hero/hero-motos-guatemala.jpg" 
        alt="Motociclistas en Guatemala"
        loading="lazy"
        width="1920"
        height="1080"
    >
</picture>
```

### **Como Fondo CSS:**

```css
.hero {
    background-image: url('/images/hero/hero-motos-guatemala.webp');
    background-size: cover;
    background-position: center;
}
```

---

## 🎯 Efectos Hover Implementados

### **1. Cards con Elevación**
```css
.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

### **2. Imágenes con Zoom**
```css
.card:hover img {
    transform: scale(1.05);
}
```

### **3. Overlay en Hover**
```css
.card::before {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.card:hover::before {
    opacity: 1;
}
```

---

## 📊 Especificaciones Técnicas

### **Dimensiones por Tipo:**

| Tipo | Dimensiones | Ratio | Uso |
|------|-------------|-------|-----|
| Hero | 1920x1080px | 16:9 | Fondos principales |
| Event Hero | 1920x600px | 3.2:1 | Headers de eventos |
| Route Card | 800x500px | 16:10 | Tarjetas de rutas |
| Feature Card | 400x300px | 4:3 | Features homepage |
| Past Event | 400x250px | 16:10 | Eventos pasados |
| Blog Post | 800x450px | 16:9 | Posts de blog |
| Category Header | 600x300px | 2:1 | Headers de categorías |
| Community | 1200x600px | 2:1 | Fotos de grupo |

### **Calidad WebP:**
- **Hero/Grandes:** 85-90%
- **Cards/Medianas:** 80-85%
- **Thumbnails/Pequeñas:** 75-80%

---

## 🔍 Dónde Encontrar Imágenes

### **Sitios Gratuitos (Licencia Libre):**
1. **[Unsplash](https://unsplash.com/)**
   - Buscar: "motorcycle", "guatemala", "riding", "adventure bike"
   
2. **[Pexels](https://www.pexels.com/)**
   - Buscar: "motorcycle group", "biker", "mountain road"
   
3. **[Pixabay](https://pixabay.com/)**
   - Buscar: "motorbike", "rider", "highway"

### **Sitios Premium:**
1. **[Shutterstock](https://www.shutterstock.com/)**
2. **[Adobe Stock](https://stock.adobe.com/)**
3. **[Getty Images](https://www.gettyimages.com/)**

### **Fotografía Local:**
- Contactar fotógrafos de eventos moteros en Guatemala
- Solicitar fotos a miembros de la comunidad
- Organizar sesiones fotográficas en rodadas

---

## ✅ Checklist de Optimización

Antes de subir una imagen, verifica:

- [ ] Formato WebP
- [ ] Dimensiones correctas según especificación
- [ ] Calidad 80-90%
- [ ] Nombre descriptivo en español (ej: `ruta-antigua-atitlan.webp`)
- [ ] Tamaño de archivo < 200KB (idealmente < 100KB)
- [ ] Incluye `alt` text descriptivo al usarla
- [ ] Usa `loading="lazy"` si no está en viewport inicial

---

## 🛠️ Herramientas Útiles

### **Conversión:**
- **Squoosh** - https://squoosh.app/ (Recomendado)
- **Sharp CLI** - `npm install -g sharp-cli`
- **cwebp** - Google WebP tools

### **Edición:**
- **Photopea** - https://www.photopea.com/ (Photoshop online gratis)
- **GIMP** - https://www.gimp.org/ (Software libre)
- **Canva** - https://www.canva.com/ (Diseño fácil)

### **Optimización:**
- **TinyPNG** - https://tinypng.com/
- **ImageOptim** - https://imageoptim.com/ (Mac)
- **Squoosh** - https://squoosh.app/

---

## 📝 Notas Importantes

### **Rendimiento:**
- WebP reduce el tamaño de archivo en 30-50% vs JPEG
- Usa `loading="lazy"` para imágenes fuera del viewport
- Considera usar `srcset` para responsive images

### **Compatibilidad:**
- WebP es soportado por 95%+ de navegadores modernos
- Siempre incluye fallback JPG/PNG en `<picture>` tags
- Safari (iOS/macOS) soporta WebP desde 2020

### **SEO:**
- Incluye `alt` text descriptivo en español
- Usa nombres de archivo descriptivos
- Optimiza tamaño sin sacrificar calidad visible

---

## 🆘 Problemas Comunes

### **"La imagen no se muestra"**
- Verifica que la ruta sea correcta
- Asegúrate de que el archivo esté en `public/images/`
- Revisa la consola del navegador para errores

### **"La imagen se ve borrosa"**
- Aumenta la calidad WebP (85-90%)
- Verifica que las dimensiones sean correctas
- Asegúrate de no estar escalando la imagen demasiado

### **"El script de conversión falla"**
- Verifica que Sharp esté instalado: `npm install sharp`
- Asegúrate de que las imágenes fuente existan en `src/assets/`
- Revisa los permisos de escritura en `public/images/`

---

## 📞 Soporte

Si tienes problemas con las imágenes:
1. Revisa `IMAGES-WEBP-GUIDE.md` para especificaciones completas
2. Verifica la consola del navegador para errores
3. Contacta al equipo de desarrollo

---

**Última actualización:** Enero 18, 2026  
**Mantenido por:** RideMotoHub Guatemala Team
