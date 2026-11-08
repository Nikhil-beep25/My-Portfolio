import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { createDefaultPortraitCanvas, sampleImageToParticles, ParticleData } from '../../utils/portraitSampler';

interface ParticlePortraitProps {
  accent: string;
  customImageSrc?: string | null;
  isReducedMotion?: boolean;
  tier?: 'HIGH' | 'MED' | 'SAVER';
}

export const ParticlePortrait: React.FC<ParticlePortraitProps> = ({
  customImageSrc, accent,
  isReducedMotion = false,
  tier = 'HIGH',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const particleDataRef = useRef<ParticleData | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Mouse & interaction tracking
  const raycasterRef = useRef(new THREE.Raycaster());
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const mouse3DRef = useRef(new THREE.Vector3(999, 999, 0));
  const isTabActiveRef = useRef(true);
  const ink = useRef(new THREE.Vector3(1, 1, 1));
  useEffect(() => {
    const rgb = parseInt(accent.slice(1), 16);
    ink.current.set((rgb >> 16) / 255, ((rgb >> 8) & 255) / 255, (rgb & 255) / 255);
    settleFrames.current = Math.max(1, settleFrames.current);
  }, [accent]);
  const settleFrames = useRef(1);

  // Handle document visibility to save GPU resources
  useEffect(() => {
    const handleVisibility = () => {
      isTabActiveRef.current = !document.hidden;

    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Update mouse position in normalized device coords
  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!containerRef.current || !cameraRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;

    const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

    // Project into 3D world space on plane Z=0
    raycasterRef.current.setFromCamera(new THREE.Vector2(normX, normY), cameraRef.current);
    const intersection = new THREE.Vector3();
    raycasterRef.current.ray.intersectPlane(planeRef.current, intersection);
    if (intersection) {
      mouse3DRef.current.copy(intersection);
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    mouse3DRef.current.set(999, 999, 0);
    settleFrames.current = 180;
  }, []);

  // Initialize or re-sample particles when image source changes
  const loadAndBuildParticles = useCallback(
    (source: HTMLImageElement | HTMLCanvasElement) => {
      const isMobile = window.innerWidth < 768;
      const targetH = isMobile || tier === 'SAVER' ? 165 : tier === 'MED' ? 215 : 280;
      const targetW = Math.round(targetH * source.width / source.height);
      const data = sampleImageToParticles(source, Math.min(targetW, 400), targetH, 0, 12.6 / targetH);

      particleDataRef.current = data;
      settleFrames.current = 1;

      if (geometryRef.current) {
        geometryRef.current.setAttribute('position', new THREE.BufferAttribute(data.positions, 3));
        geometryRef.current.setAttribute('color', new THREE.BufferAttribute(data.colors, 3));
        geometryRef.current.setAttribute('size', new THREE.BufferAttribute(data.sizes, 1));
        geometryRef.current.attributes.position.needsUpdate = true;
      }
      setIsLoading(false);
    },
    [tier]
  );

  // Setup Three.js scene
  useEffect(() => {
    if (!containerRef.current || !webglSupported || isReducedMotion) return;

    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);
    cameraRef.current = camera;

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      setWebglSupported(false);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: { ink: { value: ink.current }, scale: { value: height * renderer.getPixelRatio() / 280 } },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 tint;
        uniform float scale;
        uniform vec3 ink;
        void main() {
          tint = color * ink;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
          gl_PointSize = max(1., size * scale);
        }`,
      fragmentShader: `
        varying vec3 tint;
        void main() {
          float d = length(gl_PointCoord - .5);
          if (d > .5) discard;
          gl_FragColor = vec4(tint, 1. - smoothstep(.37, .5, d));
        }`,
      transparent: true, depthWrite: false,
    });

    const geometry = new THREE.BufferGeometry();
    geometryRef.current = geometry;

    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;
    scene.add(points);

    // Load user portrait particles source (Nikhil) or custom provided image
    const imgSrcToLoad = customImageSrc || '/assets/nikhil-bust.png';
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => loadAndBuildParticles(img);
    img.onerror = () => {
      const defaultCanvas = createDefaultPortraitCanvas();
      loadAndBuildParticles(defaultCanvas);
    };
    img.src = imgSrcToLoad;

    // Animation Loop
    let previousTime = performance.now();
    const animate = (now: number) => {
      const dt = Math.min(2, Math.max(.25, (now - previousTime) * .06));
      previousTime = now;
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (!isTabActiveRef.current) return;

      const data = particleDataRef.current;
      if (!data || !geometryRef.current || !pointsRef.current) return;

      const { positions, originPositions, velocities, count } = data;
      const mouse = mouse3DRef.current;

      if (mouse.x === 999) {
        if (settleFrames.current === 0) return;
        settleFrames.current -= 1;
      }

      const radius = 2.45;
      const damping = Math.pow(.79, dt);
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const dx = originPositions[idx] - mouse.x;
        const dy = originPositions[idx + 1] - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / radius);
        // Each stipple has a stable direction, so a sweep opens a soft cloud
        // rather than pushing every point onto the same circular boundary.
        const phase = i * 2.399963;
        const spread = influence * influence * (1.1 + (i % 19) * .13);
        const drift = now * .0015;
        const offsetX = spread * (Math.cos(phase + drift) + dx / radius);
        const offsetY = spread * (.8 * Math.sin(phase + drift) + dy / radius);
        const offsetZ = spread * Math.sin(phase * .63);
        velocities[idx] = (velocities[idx] + (originPositions[idx] + offsetX - positions[idx]) * .068 * dt) * damping;
        velocities[idx+1] = (velocities[idx+1] + (originPositions[idx+1] + offsetY - positions[idx+1]) * .068 * dt) * damping;
        velocities[idx+2] = (velocities[idx+2] + (originPositions[idx+2] + offsetZ - positions[idx+2]) * .068 * dt) * damping;
        positions[idx] += velocities[idx] * dt;
        positions[idx+1] += velocities[idx+1] * dt;
        positions[idx+2] += velocities[idx+2] * dt;
      }

      geometryRef.current.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // Resize listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      material.uniforms.scale.value = newH * renderer.getPixelRatio() / 280;
      renderer.setSize(newW, newH);
      settleFrames.current = Math.max(1, settleFrames.current);
    };

    window.addEventListener('resize', handleResize);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement.parentElement) {
          rendererRef.current.domElement.parentElement.removeChild(rendererRef.current.domElement);
        }
      }
      if (geometryRef.current) geometryRef.current.dispose();
      material.dispose();
      particleDataRef.current = null;
      img.onload = null;
      img.onerror = null;
    };
  }, [webglSupported, isReducedMotion, customImageSrc, loadAndBuildParticles, handlePointerMove, handlePointerLeave]);

  return (
    <div className="portrait-surface" onMouseLeave={handlePointerLeave}>
      {!webglSupported || isReducedMotion
        ? <img src={customImageSrc || '/assets/nikhil-bust.png'} alt="Nikhil Bhadauriya" />
        : <div role="img" aria-label="Interactive particle portrait" ref={containerRef} className="w-full h-full" style={{ opacity: isLoading ? 0 : 1 }} />}
    </div>
  );
};
