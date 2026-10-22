'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Checks whether WebGL is supported by the client browser.
 */
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Static Sacred Kalash Fallback for prefers-reduced-motion or unsupported WebGL
 */
function StaticKalashFallback() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center select-none py-6"
      aria-label="Sacred Welcome Kalash"
    >
      <div className="relative flex flex-col items-center">
        {/* Golden Aura Glow */}
        <div className="w-36 h-36 rounded-full bg-radial from-[#ffb300]/30 via-[#c5a059]/15 to-transparent blur-2xl" />

        {/* Kalash SVG */}
        <svg
          width="160"
          height="190"
          viewBox="0 0 160 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] -mt-24 z-10"
        >
          {/* Coconut (Shriphal) */}
          <ellipse cx="80" cy="46" rx="22" ry="26" fill="url(#coconutGrad)" stroke="#c5a059" strokeWidth="1.5" />
          <path d="M80 18 L76 34 L84 34 Z" fill="#9e6931" />
          {/* Sacred Tilak on Coconut */}
          <circle cx="80" cy="46" r="4.5" fill="#d93856" />
          <circle cx="80" cy="46" r="2" fill="#ffd700" />

          {/* Mango Leaves (Amra Pallava) */}
          <path d="M80 62 C65 48 42 50 34 68 C48 70 68 68 80 62 Z" fill="#2d6a4f" stroke="#c5a059" strokeWidth="1.2" />
          <path d="M80 62 C95 48 118 50 126 68 C112 70 92 68 80 62 Z" fill="#2d6a4f" stroke="#c5a059" strokeWidth="1.2" />
          <path d="M80 62 C70 38 58 30 52 42 C62 52 72 58 80 62 Z" fill="#40916c" stroke="#c5a059" strokeWidth="1.2" />
          <path d="M80 62 C90 38 102 30 108 42 C98 52 88 58 80 62 Z" fill="#40916c" stroke="#c5a059" strokeWidth="1.2" />

          {/* Neck & Sacred Mauli Band */}
          <rect x="62" y="66" width="36" height="8" rx="3" fill="#d93856" stroke="#c5a059" strokeWidth="1.2" />
          <line x1="62" y1="70" x2="98" y2="70" stroke="#ffd700" strokeWidth="1.5" strokeDasharray="3 2" />

          {/* Pot Rim */}
          <ellipse cx="80" cy="66" rx="26" ry="6" fill="url(#goldRimGrad)" stroke="#ffd700" strokeWidth="1.5" />

          {/* Kalash Main Pot */}
          <path
            d="M58 72 C42 84 32 108 34 130 C36 148 56 156 80 156 C104 156 124 148 126 130 C128 108 118 84 102 72 Z"
            fill="url(#brassPotGrad)"
            stroke="#e5b85c"
            strokeWidth="1.8"
          />

          {/* Swastika Emblem on Kalash */}
          <g stroke="#d93856" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
            <line x1="80" y1="102" x2="80" y2="126" />
            <line x1="68" y1="114" x2="92" y2="114" />
            <line x1="80" y1="102" x2="90" y2="102" />
            <line x1="80" y1="126" x2="70" y2="126" />
            <line x1="68" y1="114" x2="68" y2="104" />
            <line x1="92" y1="114" x2="92" y2="124" />
          </g>

          {/* Pedestal Base */}
          <path d="M54 156 L106 156 L114 168 L46 168 Z" fill="url(#goldRimGrad)" stroke="#c5a059" strokeWidth="1.2" />
          <ellipse cx="80" cy="170" rx="42" ry="7" fill="url(#brassPotGrad)" stroke="#c5a059" strokeWidth="1.2" />

          <defs>
            <linearGradient id="brassPotGrad" x1="34" y1="72" x2="126" y2="156" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f3d07a" />
              <stop offset="0.3" stopColor="#c5a059" />
              <stop offset="0.7" stopColor="#8a6225" />
              <stop offset="1" stopColor="#c5a059" />
            </linearGradient>
            <linearGradient id="goldRimGrad" x1="46" y1="60" x2="114" y2="170" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff1b8" />
              <stop offset="0.5" stopColor="#dfc07a" />
              <stop offset="1" stopColor="#9b7028" />
            </linearGradient>
            <linearGradient id="coconutGrad" x1="58" y1="20" x2="102" y2="72" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8b5a2b" />
              <stop offset="0.5" stopColor="#633c16" />
              <stop offset="1" stopColor="#3d210b" />
            </linearGradient>
          </defs>
        </svg>

        {/* Sacred Subtext */}
        <div className="flex items-center gap-3 mt-3">
          <span className="w-8 h-[1px] bg-[#c5a059]/60" />
          <span className="text-[11px] font-serif tracking-[0.3em] uppercase text-[#dfc07a]">
            ॥ शुभ स्वागतम् ॥
          </span>
          <span className="w-8 h-[1px] bg-[#c5a059]/60" />
        </div>
      </div>
    </div>
  );
}

/**
 * WelcomeThreeCanvas
 * High-performance, client-side Three.js interactive 3D visualizer.
 * Renders an auspicious Royal Golden Kalash, sacred mango leaves, coconut,
 * dual rotating celestial rings, and floating marigold & rose petals.
 */
export default function WelcomeThreeCanvas({ className = '' }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    // 1. Accessibility & WebGL check
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !isWebGLAvailable()) {
      setUseFallback(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 380;
    const isMobile = width < 768;

    // 2. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.7, 5.2);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.85);
    scene.add(ambientLight);

    const keyGoldLight = new THREE.DirectionalLight(0xffdf88, 2.2);
    keyGoldLight.position.set(3, 4, 3);
    scene.add(keyGoldLight);

    const rimWarmLight = new THREE.DirectionalLight(0xe84a5f, 1.2);
    rimWarmLight.position.set(-3, -2, -2);
    scene.add(rimWarmLight);

    const diyaPointLight = new THREE.PointLight(0xffa126, 2.5, 8, 1.5);
    diyaPointLight.position.set(0, -0.6, 1.2);
    scene.add(diyaPointLight);

    // 4. Master Interactive Pivot Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Materials
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xc8963e,
      roughness: 0.22,
      metalness: 0.88,
    });

    const polishedGoldMat = new THREE.MeshStandardMaterial({
      color: 0xf0c868,
      roughness: 0.15,
      metalness: 0.94,
    });

    const rubyRedMat = new THREE.MeshStandardMaterial({
      color: 0xb51737,
      roughness: 0.35,
      metalness: 0.3,
    });

    const coconutMat = new THREE.MeshStandardMaterial({
      color: 0x5a3818,
      roughness: 0.75,
      metalness: 0.1,
    });

    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x245838,
      roughness: 0.3,
      metalness: 0.45,
      side: THREE.DoubleSide,
    });

    // ─── 5. Ceremonial Kalash Geometry ───
    const kalashGroup = new THREE.Group();
    kalashGroup.position.set(0, -0.25, 0);
    masterGroup.add(kalashGroup);

    // Pedestal base tier 1
    const base1Geo = new THREE.CylinderGeometry(0.9, 1.1, 0.14, 32);
    const base1 = new THREE.Mesh(base1Geo, brassMat);
    base1.position.y = -0.92;
    kalashGroup.add(base1);

    // Pedestal base tier 2 (gold rim)
    const base2Geo = new THREE.CylinderGeometry(0.7, 0.88, 0.12, 32);
    const base2 = new THREE.Mesh(base2Geo, polishedGoldMat);
    base2.position.y = -0.8;
    kalashGroup.add(base2);

    // Main Kalash Pot Body (lathed / layered profile)
    const potBellyGeo = new THREE.SphereGeometry(0.82, 32, 24);
    potBellyGeo.scale(1, 0.95, 1);
    const potBelly = new THREE.Mesh(potBellyGeo, brassMat);
    potBelly.position.y = -0.15;
    kalashGroup.add(potBelly);

    // Kalash Neck Ring
    const potNeckGeo = new THREE.CylinderGeometry(0.42, 0.65, 0.35, 32);
    const potNeck = new THREE.Mesh(potNeckGeo, brassMat);
    potNeck.position.y = 0.48;
    kalashGroup.add(potNeck);

    // Sacred Mauli String (Red banded ring around neck)
    const mauliGeo = new THREE.TorusGeometry(0.46, 0.045, 12, 32);
    mauliGeo.rotateX(Math.PI / 2);
    const mauli = new THREE.Mesh(mauliGeo, rubyRedMat);
    mauli.position.y = 0.46;
    kalashGroup.add(mauli);

    // Flared Upper Rim
    const potRimGeo = new THREE.TorusGeometry(0.56, 0.065, 16, 36);
    potRimGeo.rotateX(Math.PI / 2);
    const potRim = new THREE.Mesh(potRimGeo, polishedGoldMat);
    potRim.position.y = 0.66;
    kalashGroup.add(potRim);

    // ─── 6. Mango Leaves (Amra Pallava) ───
    const leafGroup = new THREE.Group();
    leafGroup.position.set(0, 0.65, 0);
    kalashGroup.add(leafGroup);

    const leafCount = 7;
    for (let i = 0; i < leafCount; i++) {
      const angle = (i / leafCount) * Math.PI * 2;
      const leafGeo = new THREE.ConeGeometry(0.2, 0.75, 5);
      leafGeo.scale(1, 1, 0.2);
      leafGeo.translate(0, 0.35, 0);

      const leafMesh = new THREE.Mesh(leafGeo, leafMat);
      leafMesh.rotation.y = angle;
      leafMesh.rotation.z = -0.55; // Splay outward
      leafMesh.rotation.x = 0.2;
      leafGroup.add(leafMesh);
    }

    // ─── 7. Sacred Coconut (Shriphal) ───
    const coconutGeo = new THREE.SphereGeometry(0.38, 24, 20);
    coconutGeo.scale(0.9, 1.15, 0.9);
    const coconut = new THREE.Mesh(coconutGeo, coconutMat);
    coconut.position.set(0, 0.98, 0);
    kalashGroup.add(coconut);

    // Sacred Tilak Dot on Coconut
    const tilakGeo = new THREE.SphereGeometry(0.065, 12, 12);
    const tilak = new THREE.Mesh(tilakGeo, rubyRedMat);
    tilak.position.set(0, 1.0, 0.34);
    kalashGroup.add(tilak);

    // ─── 8. Auspicious Diya at the Foot ───
    const diyaBaseGeo = new THREE.CylinderGeometry(0.28, 0.12, 0.16, 24);
    const diyaBase = new THREE.Mesh(diyaBaseGeo, brassMat);
    diyaBase.position.set(0, -0.78, 1.0);
    kalashGroup.add(diyaBase);

    // Diya Flame
    const flameGeo = new THREE.ConeGeometry(0.08, 0.35, 16);
    flameGeo.translate(0, 0.17, 0);
    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xfff2a0,
      emissive: 0xff9900,
      emissiveIntensity: 2.5,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9,
    });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.set(0, -0.68, 1.0);
    kalashGroup.add(flame);

    // ─── 9. Dual Celestial Rings (Rotating Toruses) ───
    const ring1Geo = new THREE.TorusGeometry(1.85, 0.016, 12, 64);
    const ring1 = new THREE.Mesh(ring1Geo, polishedGoldMat);
    ring1.rotation.x = Math.PI / 2.3;
    masterGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.15, 0.014, 12, 64);
    const ring2 = new THREE.Mesh(ring2Geo, polishedGoldMat);
    ring2.rotation.x = Math.PI / 1.7;
    ring2.rotation.y = 0.4;
    masterGroup.add(ring2);

    // Decorative diamond beads along ring1
    const beadCount = 8;
    const beadGroup = new THREE.Group();
    masterGroup.add(beadGroup);
    const beadGeo = new THREE.OctahedronGeometry(0.05, 0);
    const beads = [];
    for (let i = 0; i < beadCount; i++) {
      const bead = new THREE.Mesh(beadGeo, polishedGoldMat);
      beadGroup.add(bead);
      beads.push(bead);
    }

    // ─── 10. Swirling Marigold & Rose Petals System ───
    const totalPetals = isMobile ? 32 : 55;
    const petalGroup = new THREE.Group();
    masterGroup.add(petalGroup);

    const marigoldColor = new THREE.Color(0xffa026);
    const roseColor = new THREE.Color(0xd93856);
    const goldColor = new THREE.Color(0xfad06c);

    const petalMeshList = [];
    const petalData = [];

    const basePetalGeo = new THREE.SphereGeometry(0.08, 6, 6);
    basePetalGeo.scale(1.2, 0.3, 0.7);

    for (let i = 0; i < totalPetals; i++) {
      const isRose = i % 3 === 0;
      const isGold = i % 3 === 1;
      const pColor = isRose ? roseColor : isGold ? goldColor : marigoldColor;

      const pMat = new THREE.MeshStandardMaterial({
        color: pColor,
        roughness: 0.4,
        metalness: isGold ? 0.7 : 0.1,
        transparent: true,
        opacity: 0.85,
      });

      const pMesh = new THREE.Mesh(basePetalGeo, pMat);
      const radius = 0.8 + Math.random() * 1.6;
      const angle = Math.random() * Math.PI * 2;
      const y = -1.2 + Math.random() * 2.8;

      pMesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      petalGroup.add(pMesh);
      petalMeshList.push(pMesh);

      petalData.push({
        radius,
        angle,
        y,
        speedY: 0.006 + Math.random() * 0.008,
        speedAngle: 0.01 + Math.random() * 0.015,
        rotX: Math.random() * 0.04,
        rotY: Math.random() * 0.04,
      });
    }

    // ─── 11. Starlight Embers Particles ───
    const embersCount = isMobile ? 50 : 90;
    const emberPos = new Float32Array(embersCount * 3);
    for (let i = 0; i < embersCount; i++) {
      emberPos[i * 3] = (Math.random() - 0.5) * 4.5;
      emberPos[i * 3 + 1] = (Math.random() - 0.5) * 3.8;
      emberPos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
    }
    const emberGeo = new THREE.BufferGeometry();
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xffd97d,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const emberPoints = new THREE.Points(emberGeo, emberMat);
    masterGroup.add(emberPoints);

    // ─── 12. Interaction Handlers ───
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.45;
      mouseRef.current.targetY = y * 0.3;
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.current.targetX = x * 0.4;
        mouseRef.current.targetY = y * 0.25;
      }
    };

    let pulseEnergy = 0;
    const onClick = () => {
      pulseEnergy = 1.0;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('click', onClick);

    // ─── 13. Visibility & Intersection Observers ───
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // ─── 14. Resize Handler ───
    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 360;
      const newHeight = container.clientHeight || 380;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', onResize);

    // ─── 15. Main Animation Loop ───
    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (!isVisible) return;
      time += 0.016;

      // Mouse Lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      masterGroup.rotation.y = mouseRef.current.x * 0.8 + Math.sin(time * 0.4) * 0.08;
      masterGroup.rotation.x = -mouseRef.current.y * 0.6;

      // Ring rotations
      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.004;

      // Orbiting beads on ring 1
      for (let i = 0; i < beadCount; i++) {
        const bAngle = time * 0.3 + (i / beadCount) * Math.PI * 2;
        beads[i].position.set(
          Math.cos(bAngle) * 1.85,
          Math.sin(bAngle) * 1.85 * Math.sin(Math.PI / 2.3),
          Math.sin(bAngle) * 1.85 * Math.cos(Math.PI / 2.3)
        );
      }

      // Kalash gentle floating levitation
      kalashGroup.position.y = -0.25 + Math.sin(time * 1.2) * 0.03;

      // Diya flicker
      const flicker = Math.sin(time * 18) * 0.1 + Math.cos(time * 26) * 0.08;
      diyaPointLight.intensity = 2.4 + flicker + pulseEnergy * 1.5;
      flame.scale.set(1 + flicker * 0.5, 1 + flicker * 0.8 + pulseEnergy * 0.4, 1 + flicker * 0.5);

      // Pulse decay
      if (pulseEnergy > 0.01) {
        pulseEnergy *= 0.94;
      }

      // Petal vortex physics
      for (let i = 0; i < totalPetals; i++) {
        const p = petalData[i];
        const mesh = petalMeshList[i];

        p.angle += p.speedAngle * (1 + pulseEnergy * 1.2);
        p.y += p.speedY * (1 + pulseEnergy * 1.5);
        if (p.y > 1.8) {
          p.y = -1.2;
        }

        mesh.position.x = Math.cos(p.angle) * p.radius;
        mesh.position.z = Math.sin(p.angle) * p.radius;
        mesh.position.y = p.y;

        mesh.rotation.x += p.rotX;
        mesh.rotation.y += p.rotY;
      }

      // Embers slow rotation
      emberPoints.rotation.y = time * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // ─── 16. Cleanup on Unmount ───
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      observer.disconnect();

      // Dispose Three.js assets
      base1Geo.dispose();
      base2Geo.dispose();
      potBellyGeo.dispose();
      potNeckGeo.dispose();
      mauliGeo.dispose();
      potRimGeo.dispose();
      coconutGeo.dispose();
      tilakGeo.dispose();
      diyaBaseGeo.dispose();
      flameGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      beadGeo.dispose();
      basePetalGeo.dispose();
      emberGeo.dispose();

      brassMat.dispose();
      polishedGoldMat.dispose();
      rubyRedMat.dispose();
      coconutMat.dispose();
      leafMat.dispose();
      flameMat.dispose();
      emberMat.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (useFallback) {
    return <StaticKalashFallback />;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[340px] sm:min-h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden ${className}`}
      style={{ touchAction: 'pan-y' }}
      role="img"
      aria-label="Interactive 3D Sacred Welcome Kalash Altar"
    />
  );
}
