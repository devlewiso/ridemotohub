import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = join(__dirname, '../src/assets');
const outputDir = join(__dirname, '../public/images/blog');

// Crear directorio de salida si no existe
if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
    console.log(`✅ Created output directory: ${outputDir}`);
}

console.log('🔄 Starting image conversion to WebP...\n');

try {
    const files = await readdir(inputDir);
    let convertedCount = 0;

    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const inputPath = join(inputDir, file);
            const outputFilename = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            const outputPath = join(outputDir, outputFilename);

            try {
                await sharp(inputPath)
                    .webp({
                        quality: 85,
                        effort: 6 // 0-6, higher = better compression but slower
                    })
                    .toFile(outputPath);

                const inputStats = await sharp(inputPath).metadata();
                const outputStats = await sharp(outputPath).metadata();

                const inputSize = inputStats.size || 0;
                const outputSize = outputStats.size || 0;
                const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

                console.log(`✅ ${file} -> ${outputFilename}`);
                console.log(`   Size: ${(inputSize / 1024).toFixed(1)}KB -> ${(outputSize / 1024).toFixed(1)}KB (${savings}% reduction)\n`);

                convertedCount++;
            } catch (error) {
                console.error(`❌ Error converting ${file}:`, error.message);
            }
        }
    }

    console.log(`\n🎉 Conversion complete! ${convertedCount} images converted to WebP.`);
    console.log(`📁 Output directory: ${outputDir}`);
} catch (error) {
    console.error('❌ Error reading directory:', error.message);
    process.exit(1);
}
