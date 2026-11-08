import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface SkillItem {
  name: string;
  category: 'core' | 'frontend3d' | 'backend' | 'cloud';
  level: string;
  experience: string;
}

const SKILLS_LIST: SkillItem[] = [
  { name: 'TypeScript', category: 'core', level: 'Architectural Mastery', experience: '5+ Years' },
  { name: 'React.js', category: 'frontend3d', level: 'Production Core', experience: '5+ Years' },
  { name: 'Three.js', category: 'frontend3d', level: 'Advanced WebGL', experience: '3+ Years' },
  { name: 'GLSL Shaders', category: 'frontend3d', level: 'Mathematical Shading', experience: '2+ Years' },
  { name: 'Node.js', category: 'backend', level: 'High Concurrency', experience: '5+ Years' },
  { name: 'Python', category: 'core', level: 'Systems & Data', experience: '4+ Years' },
  { name: 'PostgreSQL', category: 'backend', level: 'Relational Design', experience: '4+ Years' },
  { name: 'Redis', category: 'backend', level: 'In-Memory Cache & Streams', experience: '3+ Years' },
  { name: 'Docker', category: 'cloud', level: 'Container Orchestration', experience: '4+ Years' },
  { name: 'Kubernetes', category: 'cloud', level: 'Cluster Architecture', experience: '2+ Years' },
  { name: 'GCP / Cloud', category: 'cloud', level: 'Enterprise Cloud', experience: '3+ Years' },
  { name: 'Tailwind CSS', category: 'frontend3d', level: 'Modern Design Systems', experience: '4+ Years' },
  { name: 'GSAP Motion', category: 'frontend3d', level: 'Cinematic Sequencing', experience: '3+ Years' },
  { name: 'Distributed Systems', category: 'backend', level: 'Fault-Tolerant Patterns', experience: '4+ Years' },
  { name: 'Microservices', category: 'backend', level: 'Domain-Driven Design', experience: '4+ Years' },
  { name: 'WebCrypto API', category: 'core', level: 'Asymmetric Cryptography', experience: '2+ Years' },
  { name: 'GraphQL / REST', category: 'backend', level: 'API Governance', experience: '4+ Years' },
  { name: 'Vite & Tooling', category: 'frontend3d', level: 'Build Optimizations', experience: '3+ Years' },
  { name: 'Go / Golang', category: 'core', level: 'Microservices & CLI', experience: '2+ Years' },
  { name: 'CI/CD Automation', category: 'cloud', level: 'Pipeline Architecture', experience: '4+ Years' },
  { name: 'Lenis Smooth Scroll', category: 'frontend3d', level: 'Inertial Physics', experience: '2+ Years' },
  { name: 'WebSockets', category: 'backend', level: 'Real-Time Streaming', experience: '4+ Years' },
];

interface SkillsGlobeProps {
  isReducedMotion?: boolean;
}

export const SkillsGlobe: React.FC<SkillsGlobeProps> = ({ isReducedMotion = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(SKILLS_LIST[0]);
  const [isDragging, setIsDragging] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const spritesRef = useRef<{ sprite: THREE.Sprite; skill: SkillItem }[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  const rotationSpeedRef = useRef({ x: 0.002, y: 0.003 });
  const mousePosRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });

  // Helper to generate a sharp canvas texture for each skill label
  const createTextTexture = useCallback((text: string, isHighlighted: boolean) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 72;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Pill background
    ctx.clearRect(0, 0, 256, 72);
    ctx.fillStyle = isHighlighted ? 'rgba(34, 211, 238, 0.25)' : 'rgba(13, 13, 20, 0.85)';
    ctx.strokeStyle = isHighlighted ? '#22d3ee' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.roundRect(6, 6, 244, 60, 30);
    ctx.fill();
    ctx.stroke();

    // Text label
    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isHighlighted ? '#ffffff' : '#e2e8f0';
    ctx.fillText(text, 128, 36);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // Filter skills based on category
  const filteredSkills = SKILLS_LIST.filter(
    (s) => selectedCategory === 'all' || s.category === selectedCategory
  );

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current || isReducedMotion) return;

    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 18;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // Add ambient glowing wireframe sphere in center
    const sphereGeo = new THREE.SphereGeometry(6.5, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(sphereMesh);

    // Distribute skills along Fibonacci Sphere
    const N = filteredSkills.length;
    const radius = 6.8;
    const sprites: { sprite: THREE.Sprite; skill: SkillItem }[] = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < N; i++) {
      const skill = filteredSkills[i];
      const y = 1 - (i / (N - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const texture = createTextTexture(skill.name, false);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(x * radius, y * radius, z * radius);
      sprite.scale.set(3.2, 0.9, 1.0);

      group.add(sprite);
      sprites.push({ sprite, skill });
    }

    spritesRef.current = sprites;

    // Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (!groupRef.current) return;

      // Autospin when not dragging
      if (!isDragging) {
        groupRef.current.rotation.y += rotationSpeedRef.current.y;
        groupRef.current.rotation.x += rotationSpeedRef.current.x * 0.4;
      }

      // Modulate sprite opacity based on distance to camera (z-depth)
      sprites.forEach(({ sprite }) => {
        const worldPos = new THREE.Vector3();
        sprite.getWorldPosition(worldPos);
        const distZ = worldPos.z;
        // Fade out sprites facing the back of the globe
        const alpha = THREE.MathUtils.clamp((distZ + 6) / 12, 0.2, 1.0);
        sprite.material.opacity = alpha;
        // Scale slightly based on depth
        const scale = THREE.MathUtils.lerp(2.2, 3.4, (distZ + 6) / 12);
        sprite.scale.set(scale, scale * 0.28, 1);
      });

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement.parentElement) {
          rendererRef.current.domElement.parentElement.removeChild(rendererRef.current.domElement);
        }
      }
      sphereGeo.dispose();
      sphereMat.dispose();
      sprites.forEach(({ sprite }) => {
        if (sprite.material.map) sprite.material.map.dispose();
        sprite.material.dispose();
      });
    };
  }, [filteredSkills, isReducedMotion, createTextTexture, isDragging]);

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    mousePosRef.current.lastX = e.clientX;
    mousePosRef.current.lastY = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !groupRef.current) return;
    const deltaX = e.clientX - mousePosRef.current.lastX;
    const deltaY = e.clientY - mousePosRef.current.lastY;

    groupRef.current.rotation.y += deltaX * 0.005;
    groupRef.current.rotation.x += deltaY * 0.005;

    mousePosRef.current.lastX = e.clientX;
    mousePosRef.current.lastY = e.clientY;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full rounded-2xl bg-carbon-950/80 border border-white/10 p-6 sm:p-10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-cyan/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header & Category Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan tracking-widest uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span>3D TYPOGRAPHY LATTICE</span>
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white uppercase">
            TECHNICAL REPERTOIRE
          </h3>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'ALL SKILLS' },
            { id: 'frontend3d', label: '3D & CREATIVE' },
            { id: 'backend', label: 'DISTRIBUTED ARCHITECTURE' },
            { id: 'cloud', label: 'CLOUD & DEVOPS' },
            { id: 'core', label: 'CORE & CRYPTO' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase transition-all ${
                selectedCategory === cat.id
                  ? 'bg-accent-cyan text-carbon-950 font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                  : 'bg-carbon-900 border border-white/10 text-slate-400 hover:text-white hover:border-white/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Globe Viewport or Accessible Static Grid */}
      {isReducedMotion ? (
        /* Accessible 2D Grid fallback */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-8">
          {filteredSkills.map((s) => (
            <div
              key={s.name}
              onClick={() => setActiveSkill(s)}
              className="p-4 rounded-xl bg-carbon-900 border border-white/10 hover:border-accent-cyan transition-all cursor-pointer"
            >
              <div className="font-mono text-sm font-bold text-white mb-1">{s.name}</div>
              <div className="font-mono text-[10px] text-accent-cyan uppercase">{s.level}</div>
              <div className="font-mono text-[9px] text-slate-500 mt-2">{s.experience}</div>
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
        >
          {/* Interaction Instruction Overlay */}
          <div className="absolute bottom-4 left-6 z-10 pointer-events-none font-mono text-[10px] text-slate-400 tracking-widest uppercase">
            CLICK & DRAG SPHERE TO ROTATE // FIBONACCI 3D MESH
          </div>
        </div>
      )}

      {/* Selected Skill Quick Inspector Strip */}
      {activeSkill && (
        <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-500 uppercase tracking-wider">SELECTED DOMAIN:</span>
            <span className="text-white font-bold">{activeSkill.name}</span>
            <span className="text-white/20">|</span>
            <span className="text-accent-cyan">{activeSkill.level}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>EXPERIENCE: {activeSkill.experience}</span>
            <span className="text-white/20">|</span>
            <span className="uppercase text-emerald-400">PRODUCTION VERIFIED</span>
          </div>
        </div>
      )}
    </div>
  );
};

