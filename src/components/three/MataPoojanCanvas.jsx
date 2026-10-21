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
 * Static Diya Fallback for prefers-reduced-motion or unsupported WebGL
 */
function StaticDiyaFallback() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center select-none"
      aria-label="Sacred Akhand Jyoti"
    >
      <div className="relative flex flex-col items-center">
        {/* Flame glow aura */}
        <div className="w-24 h-24 rounded-full bg-radial from-[#ffb300]/40 via-[#ff6f00]/20 to-transparent blur-xl" />
        
        {/* Flame shape */}
        <div
          className="w-8 h-14 bg-gradient-to-t from-[#ff6f00] via-[#ffa000] to-[#fff3cc] rounded-[50%_50%_35%_35%/60%_60%_40%_40%] shadow-[0_0_20px_#ff9d26] -mb-1 z-10"
        />

        {/* Diya Bowl (SVG) */}
        <svg
          width="130"
          height="70"
          viewBox="0 0 130 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
        >
          {/* Oil surface */}
          <ellipse cx="65" cy="20" rx="46" ry="10" fill="#4a2800" stroke="#c8963e" strokeWidth="1.5" />
          {/* Main bowl */}
          <path
            d="M19 20C19 44 42 54 65 54C88 54 111 44 111 20H19Z"
            fill="url(#brassGrad)"
            stroke="#e5b85c"
            strokeWidth="1.5"
          />
          {/* Stem & base */}
          <rect x="56" y="52" width="18" height="6" fill="#c8963e" />
          <ellipse cx="65" cy="62" rx="32" ry="6" fill="url(#brassGrad)" stroke="#c8963e" strokeWidth="1.2" />
          <defs>
            <linearGradient id="brassGrad" x1="19" y1="20" x2="111" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e5b85c" />
              <stop offset="0.5" stopColor="#c8963e" />
              <stop offset="1" stopColor="#8a6225" />
            </linearGradient>
          </defs>
        </svg>

        {/* Lotus base petals */}
        <div className="flex items-center gap-2 mt-2">
          <span className="w-8 h-[1px] bg-[#c5a059]/40" />
          <span className="text-[10px] tracking-widest uppercase text-[#c5a059]">॥ शुभ लाभ ॥</span>
          <span className="w-8 h-[1px] bg-[#c5a059]/40" />
        </div>
      </div>
    </div>
  );
}

/**
 * MataPoojanCanvas
 * ─────────────────────────────────────────────────────────────────────────────
 * Interactive 3D Sacred Akhand Diya & Vedic Marigold Petal Visualizer
 *
 * Hygiene & Engineering Compliance:
 * - Automatically falls back to StaticDiyaFallback if prefers-reduced-motion is active
 *   or WebGL is unsupported.
 * - IntersectionObserver: pauses rendering when card is scrolled off-screen.
 * - document.visibilityState: pauses render loop when browser tab is inactive.
 * - Caps devicePixelRatio at min(window.devicePixelRatio, 2).
 * - touch-action: pan-y on the canvas wrapper prevents touch drag from locking page scrolling.
 * - Dynamic petal & particle count reduction on mobile devices.
 * - Complete resource disposal on unmount.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function MataPoojanCanvas({ className = '' }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isInteractingRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    // 1. Check for reduced motion or lack of WebGL support
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

    let width = container.clientWidth || 340;
    let height = container.clientHeight || 340;
    const isMobile = width < 700;

    // 2. Scene, Camera, WebGLRenderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.1, 4.8);
    camera.lookAt(0, 0.25, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0xfff6e5, 0.65);
    scene.add(ambientLight);

    const flameLight = new THREE.PointLight(0xff9d26, 3.2, 10, 1.5);
    flameLight.position.set(0, 0.55, 0);
    scene.add(flameLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.2);
    rimLight.position.set(3, 4, 2);
    scene.add(rimLight);

    const softFillLight = new THREE.DirectionalLight(0xb38b47, 0.8);
    softFillLight.position.set(-3, -1, -2);
    scene.add(softFillLight);

    // 4. Master group for tilt interaction
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 5. Ceremonial Brass & Gold Diya
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xc8963e,
      roughness: 0.28,
      metalness: 0.88,
    });

    const polishedGoldMat = new THREE.MeshStandardMaterial({
      color: 0xe5b85c,
      roughness: 0.18,
      metalness: 0.95,
    });

    const diyaGroup = new THREE.Group();
    diyaGroup.position.set(0, -0.35, 0);
    masterGroup.add(diyaGroup);

    // Stepped Base Tier 1
    const base1Geo = new THREE.CylinderGeometry(0.85, 1.05, 0.14, 32);
    const base1 = new THREE.Mesh(base1Geo, brassMat);
    base1.position.y = -0.32;
    diyaGroup.add(base1);

    // Stepped Base Tier 2
    const base2Geo = new THREE.CylinderGeometry(0.55, 0.78, 0.12, 32);
    const base2 = new THREE.Mesh(base2Geo, polishedGoldMat);
    base2.position.y = -0.2;
    diyaGroup.add(base2);

    // Stem / Pedestal
    const stemGeo = new THREE.CylinderGeometry(0.3, 0.42, 0.22, 24);
    const stem = new THREE.Mesh(stemGeo, brassMat);
    stem.position.y = -0.05;
    diyaGroup.add(stem);

    // Main Diya Chalice Bowl
    const bowlGeo = new THREE.CylinderGeometry(1.15, 0.35, 0.5, 36);
    const bowl = new THREE.Mesh(bowlGeo, brassMat);
    bowl.position.y = 0.22;
    diyaGroup.add(bowl);

    // Polished Golden Beaded Rim
    const rimGeo = new THREE.TorusGeometry(1.15, 0.065, 16, 48);
    rimGeo.rotateX(Math.PI / 2);
    const rim = new THREE.Mesh(rimGeo, polishedGoldMat);
    rim.position.y = 0.47;
    diyaGroup.add(rim);

    // Inner Sacred Oil Surface
    const oilGeo = new THREE.CircleGeometry(1.1, 32);
    oilGeo.rotateX(-Math.PI / 2);
    const oilMat = new THREE.MeshStandardMaterial({
      color: 0x4a2800,
      roughness: 0.1,
      metalness: 0.4,
    });
    const oil = new THREE.Mesh(oilGeo, oilMat);
    oil.position.y = 0.42;
    diyaGroup.add(oil);

    // Cotton Wick
    const wickGeo = new THREE.CylinderGeometry(0.045, 0.06, 0.22, 12);
    const wickMat = new THREE.MeshStandardMaterial({
      color: 0x221a15,
      roughness: 0.9,
    });
    const wick = new THREE.Mesh(wickGeo, wickMat);
    wick.position.set(0, 0.52, 0);
    diyaGroup.add(wick);

    // 6. Sacred Akhand Flame (Natural warm amber & saffron glow)
    const flameGroup = new THREE.Group();
    flameGroup.position.set(0, 0.62, 0);
    diyaGroup.add(flameGroup);

    // Core Flame
    const coreFlameGeo = new THREE.ConeGeometry(0.2, 0.9, 24);
    coreFlameGeo.translate(0, 0.45, 0);
    const coreFlameMat = new THREE.MeshStandardMaterial({
      color: 0xffe082,
      emissive: 0xffb300,
      emissiveIntensity: 2.2,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const coreFlame = new THREE.Mesh(coreFlameGeo, coreFlameMat);
    flameGroup.add(coreFlame);

    // Outer Saffron Flame Aura
    const outerFlameGeo = new THREE.ConeGeometry(0.34, 1.15, 24);
    outerFlameGeo.translate(0, 0.57, 0);
    const outerFlameMat = new THREE.MeshStandardMaterial({
      color: 0xff6f00,
      emissive: 0xe65100,
      emissiveIntensity: 1.6,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      roughness: 0.3,
    });
    const outerFlame = new THREE.Mesh(outerFlameGeo, outerFlameMat);
    flameGroup.add(outerFlame);

    // Base Ember Glow near wick
    const baseGlowGeo = new THREE.SphereGeometry(0.12, 16, 16);
    baseGlowGeo.scale(1, 0.6, 1);
    const baseGlowMat = new THREE.MeshBasicMaterial({
      color: 0xff9100,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const baseGlow = new THREE.Mesh(baseGlowGeo, baseGlowMat);
    baseGlow.position.set(0, 0.05, 0);
    flameGroup.add(baseGlow);

    // 7. Rotating Sacred Mandala Ring on the Floor
    const mandalaGroup = new THREE.Group();
    mandalaGroup.position.y = -0.7;
    masterGroup.add(mandalaGroup);

    const ringCount = 3;
    const rings = [];
    for (let r = 0; r < ringCount; r++) {
      const radius = 1.35 + r * 0.45;
      const ringGeo = new THREE.RingGeometry(radius, radius + 0.02, 48);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x8a6f2e,
        transparent: true,
        opacity: 0.35 - r * 0.08,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      mandalaGroup.add(ringMesh);
      rings.push(ringMesh);
    }

    // 8. Floating Marigold Petals (adaptive count)
    const petalCount = isMobile ? 24 : 52;
    const petals = [];
    const petalColors = [0xff8c00, 0xffa500, 0xffc107, 0xe65100, 0xf59e0b];

    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.quadraticCurveTo(0.08, 0.12, 0.06, 0.24);
    petalShape.quadraticCurveTo(0, 0.32, -0.06, 0.24);
    petalShape.quadraticCurveTo(-0.08, 0.12, 0, 0);
    const petalGeo = new THREE.ShapeGeometry(petalShape);

    for (let i = 0; i < petalCount; i++) {
      const color = petalColors[i % petalColors.length];
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.4,
        metalness: 0.1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.88,
      });

      const petal = new THREE.Mesh(petalGeo, mat);
      const orbitRadius = 1.1 + Math.random() * 1.5;
      const angle = (i / petalCount) * Math.PI * 2 + Math.random() * 0.5;
      const heightOffset = -0.4 + Math.random() * 2.2;
      const rotSpeedX = 0.5 + Math.random() * 1.2;
      const rotSpeedY = 0.4 + Math.random() * 1.0;
      const orbitSpeed = 0.25 + Math.random() * 0.35;

      petal.position.set(
        Math.cos(angle) * orbitRadius,
        heightOffset,
        Math.sin(angle) * orbitRadius
      );
      petal.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      petal.scale.setScalar(0.7 + Math.random() * 0.6);

      petal.userData = {
        radius: orbitRadius,
        baseAngle: angle,
        orbitSpeed,
        rotSpeedX,
        rotSpeedY,
        baseY: heightOffset,
        flutterFreq: 1.5 + Math.random() * 2.0,
      };

      masterGroup.add(petal);
      petals.push(petal);
    }

    // 9. Ascending Golden Spiritual Embers (adaptive count)
    const emberCount = isMobile ? 55 : 125;
    const emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);
    const emberSpeeds = new Float32Array(emberCount);
    const emberOffsets = new Float32Array(emberCount * 2);

    for (let i = 0; i < emberCount; i++) {
      emberPos[i * 3] = (Math.random() - 0.5) * 0.4;
      emberPos[i * 3 + 1] = 0.3 + Math.random() * 2.4;
      emberPos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      emberSpeeds[i] = 0.4 + Math.random() * 0.7;
      emberOffsets[i * 2] = Math.random() * Math.PI * 2;
      emberOffsets[i * 2 + 1] = 0.2 + Math.random() * 0.5;
    }

    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xffd166,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    masterGroup.add(embers);

    // 10. Pointer Move & Sway
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = normX * 0.35;
      mouseRef.current.targetY = normY * 0.25;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove, { passive: true });

    const handleClick = () => {
      isInteractingRef.current = true;
      setTimeout(() => {
        isInteractingRef.current = false;
      }, 900);
    };
    container.addEventListener('click', handleClick);

    // 11. IntersectionObserver & Tab Visibility (Hygiene: pause when offscreen or hidden)
    let isElementVisible = true;
    let isTabVisible = !document.hidden;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries || entries.length === 0) return;
        isElementVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const newWidth = entry.contentRect.width;
      const newHeight = entry.contentRect.height;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    });
    resizeObserver.observe(container);

    // 12. Animation Loop
    let startTime = performance.now();
    let lastTime = startTime;

    const renderLoop = (now) => {
      animationFrameRef.current = requestAnimationFrame(renderLoop);

      // Only perform compute & render if visible and active
      if (!isElementVisible || !isTabVisible) {
        lastTime = now;
        return;
      }

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      masterGroup.rotation.y = elapsed * 0.18 + mouseRef.current.x;
      masterGroup.rotation.x = Math.sin(elapsed * 0.4) * 0.04 + mouseRef.current.y;

      // Flame flicker
      const pulseMultiplier = isInteractingRef.current ? 1.4 : 1.0;
      const flicker1 = Math.sin(elapsed * 9.5) * 0.09;
      const flicker2 = Math.cos(elapsed * 15.2) * 0.06;
      const flicker3 = Math.sin(elapsed * 21.0) * 0.03;
      const totalFlicker = (flicker1 + flicker2 + flicker3) * pulseMultiplier;

      coreFlame.scale.y = 1 + totalFlicker * 1.5;
      coreFlame.scale.x = 1 - totalFlicker * 0.6;
      coreFlame.scale.z = 1 - totalFlicker * 0.6;

      outerFlame.scale.y = 1 + (flicker1 * 1.2 + flicker2 * 0.8) * pulseMultiplier;
      outerFlame.scale.x = 1 - (flicker1 * 0.5) * pulseMultiplier;
      outerFlame.scale.z = 1 - (flicker1 * 0.5) * pulseMultiplier;

      flameLight.intensity = (3.0 + totalFlicker * 2.2) * pulseMultiplier;
      mandalaGroup.rotation.y = -elapsed * 0.08;

      petals.forEach((p) => {
        const d = p.userData;
        const currentAngle = d.baseAngle + elapsed * d.orbitSpeed;
        p.position.x = Math.cos(currentAngle) * d.radius;
        p.position.z = Math.sin(currentAngle) * d.radius;
        p.position.y = d.baseY + Math.sin(elapsed * d.flutterFreq + d.baseAngle) * 0.18;

        p.rotation.x += delta * d.rotSpeedX;
        p.rotation.y += delta * d.rotSpeedY;
        p.rotation.z = Math.sin(elapsed * 1.5 + d.baseAngle) * 0.4;
      });

      const positions = emberGeo.attributes.position.array;
      for (let i = 0; i < emberCount; i++) {
        const idx = i * 3;
        const speed = emberSpeeds[i] * (isInteractingRef.current ? 1.6 : 1.0);
        positions[idx + 1] += delta * speed;

        const angle = emberOffsets[i * 2] + elapsed * 1.5;
        const amp = emberOffsets[i * 2 + 1];
        positions[idx] += Math.sin(angle) * amp * delta * 0.2;
        positions[idx + 2] += Math.cos(angle) * amp * delta * 0.2;

        if (positions[idx + 1] > 2.6) {
          positions[idx + 1] = 0.25;
          positions[idx] = (Math.random() - 0.5) * 0.3;
          positions[idx + 2] = (Math.random() - 0.5) * 0.3;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animationFrameRef.current = requestAnimationFrame(renderLoop);

    // 13. Clean disposal of all geometries, materials, renderer
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('touchmove', handlePointerMove);
      container.removeEventListener('click', handleClick);

      [
        base1Geo,
        base2Geo,
        stemGeo,
        bowlGeo,
        rimGeo,
        oilGeo,
        wickGeo,
        coreFlameGeo,
        outerFlameGeo,
        baseGlowGeo,
        petalGeo,
        emberGeo,
      ].forEach((g) => g.dispose());

      [
        brassMat,
        polishedGoldMat,
        oilMat,
        wickMat,
        coreFlameMat,
        outerFlameMat,
        baseGlowMat,
        emberMat,
      ].forEach((m) => m.dispose());

      rings.forEach((r) => {
        r.geometry.dispose();
        r.material.dispose();
      });
      petals.forEach((p) => {
        p.material.dispose();
      });

      renderer.dispose();
      container.replaceChildren();
    };
  }, []);

  if (useFallback) {
    return <StaticDiyaFallback />;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none ${className}`}
      style={{ touchAction: 'pan-y' }}
      aria-label="3D Sacred Akhand Diya and Marigold Petals"
      role="img"
    />
  );
}
