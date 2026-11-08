/**
 * High-precision Particle Sampler for Axevia-style Stipple Particle Engine.
 * Converts high-contrast portrait luminance into planar, crystal-clear 3D reactive particles.
 */

export interface ParticleData {
  positions: Float32Array;
  originPositions: Float32Array;
  velocities: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  count: number;
}

export function createDefaultPortraitCanvas(width = 160, height = 200): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
  return canvas;
}

/**
 * Samples an image into a planar, high-density particle point cloud.
 * Maintains exact photorealistic facial geometry without topological warping.
 */
export function sampleImageToParticles(
  source: HTMLImageElement | HTMLCanvasElement,
  targetWidth = 150,
  targetHeight = 180,
  _depthScale = 0.5,
  pointSpacing = 0.075
): ParticleData {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return {
      positions: new Float32Array(0),
      originPositions: new Float32Array(0),
      velocities: new Float32Array(0),
      colors: new Float32Array(0),
      sizes: new Float32Array(0),
      count: 0,
    };
  }

  // Draw source image centered
  ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
  const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
  const pixels = imgData.data;

  const validPoints: {
    x: number;
    y: number;
    z: number;
    r: number;
    g: number;
    b: number;
    size: number;
  }[] = [];

  const halfW = targetWidth / 2;
  const halfH = targetHeight / 2;

  // Stipple thresholding: higher luminance = higher probability of particle + larger particle
  for (let y = 0; y < targetHeight; y++) {
    for (let x = 0; x < targetWidth; x++) {
      const idx = (y * targetWidth + x) * 4;
      const r = pixels[idx] / 255;
      const g = pixels[idx + 1] / 255;
      const b = pixels[idx + 2] / 255;
      const a = pixels[idx + 3] / 255;

      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      // Keep pixels above darkness threshold
      if (a > 0.15 && lum > 0.018 && Math.random() < 0.28 + lum * 0.54) {
        // Compute planar coordinates
        const posX = (x - halfW + Math.random() - 0.5) * pointSpacing;
        const posY = -(y - halfH + Math.random() - 0.5) * pointSpacing;
        // Keep planar Z=0 with tiny natural jitter to avoid z-fighting
        const posZ = (Math.random() - 0.5) * 0.04;

        // Particle size modulated by brightness (larger dots on highlights)
        const pointSize = (0.44 + Math.sqrt(lum) * 1.42) * (0.75 + Math.random() * 0.6) * 280 / targetHeight;
        const tone = Math.min(1, 0.15 + Math.pow(lum, .76) * 1.05);
        validPoints.push({
          x: posX, y: posY, z: posZ,
          r: tone, g: tone, b: tone,
          size: pointSize,
        });
      }
    }
  }

  const count = validPoints.length;
  const positions = new Float32Array(count * 3);
  const originPositions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const pt = validPoints[i];
    const idx = i * 3;

    // Slight initial scatter for smooth formation on load
    positions[idx] = pt.x;
    positions[idx + 1] = pt.y;
    positions[idx + 2] = pt.z;

    originPositions[idx] = pt.x;
    originPositions[idx + 1] = pt.y;
    originPositions[idx + 2] = pt.z;

    velocities[idx] = 0;
    velocities[idx + 1] = 0;
    velocities[idx + 2] = 0;

    colors[idx] = pt.r;
    colors[idx + 1] = pt.g;
    colors[idx + 2] = pt.b;

    sizes[i] = pt.size;
  }

  return {
    positions,
    originPositions,
    velocities,
    colors,
    sizes,
    count,
  };
}
