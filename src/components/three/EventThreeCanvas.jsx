'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * EventThreeCanvas
 * High-performance, client-side Three.js interactive 3D visualizer.
 * Renders custom 3D animations for each wedding celebration event:
 * - 'mata-pujan': Sacred golden diya flame & rising ember particles
 * - 'sneh-bhoj': Floating golden & saffron floral petal vortex
 * - 'lagna-sagaai': Interlocking 3D metallic gold rings with diamond sparkles
 * - 'baraat': Dynamic celebratory firework burst & confetti particles
 * - 'ashirwad': Champagne starlight celestial vortex
 * - 'vidai': Floating lotus blossom geometry with reflective ripples
 */
export default function EventThreeCanvas({ activeEventId = 'lagna-sagaai' }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const objectsGroupRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xd4af37, 3, 20);
    pointLight.position.set(3, 4, 4);
    scene.add(pointLight);

    const secondaryLight = new THREE.PointLight(0xe8b4b8, 2, 20);
    secondaryLight.position.set(-3, -3, 3);
    scene.add(secondaryLight);

    // 3. Dynamic Objects Group
    const group = new THREE.Group();
    scene.add(group);
    objectsGroupRef.current = group;

    // Mouse listener
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.4;
      mouseRef.current.targetY = y * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let startTime = performance.now();
    let lastTime = startTime;
    const animate = (now = performance.now()) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const time = (now - startTime) / 1000;

      // Smooth mouse tracking
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (objectsGroupRef.current) {
        objectsGroupRef.current.rotation.y = time * 0.35 + mouseRef.current.x;
        objectsGroupRef.current.rotation.x = Math.sin(time * 0.25) * 0.15 + mouseRef.current.y;

        // Custom per-child animation hooks
        objectsGroupRef.current.children.forEach((child) => {
          if (child.userData.onUpdate) {
            child.userData.onUpdate(time, delta);
          }
        });
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.replaceChildren();
    };
  }, []);

  // Update 3D elements whenever activeEventId changes
  useEffect(() => {
    const group = objectsGroupRef.current;
    if (!group) return;

    // Clean old objects
    while (group.children.length > 0) {
      const obj = group.children[0];
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
      group.remove(obj);
    }

    // Build Event Specific 3D Artwork
    switch (activeEventId) {
      case 'mata-pujan': {
        // ── 1. Sacred Diya & Spiritual Embers ──
        // Diya bowl
        const bowlGeo = new THREE.CylinderGeometry(1.2, 0.4, 0.6, 32);
        const goldMat = new THREE.MeshStandardMaterial({
          color: 0xd4af37,
          metalness: 0.85,
          roughness: 0.25,
        });
        const bowl = new THREE.Mesh(bowlGeo, goldMat);
        bowl.position.y = -0.6;
        group.add(bowl);

        // Diya flame (Teardrop shape)
        const flameGeo = new THREE.ConeGeometry(0.35, 1.1, 16);
        const flameMat = new THREE.MeshStandardMaterial({
          color: 0xf28c28,
          emissive: 0xffaa33,
          emissiveIntensity: 1.5,
          roughness: 0.1,
        });
        const flame = new THREE.Mesh(flameGeo, flameMat);
        flame.position.y = 0.2;
        flame.userData.onUpdate = (t) => {
          flame.scale.y = 1 + Math.sin(t * 8) * 0.12;
          flame.scale.x = 1 + Math.cos(t * 7) * 0.08;
          flame.scale.z = 1 + Math.sin(t * 6) * 0.08;
        };
        group.add(flame);

        // Sacred rising embers particles
        const emberCount = 120;
        const emberGeo = new THREE.BufferGeometry();
        const emberPositions = new Float32Array(emberCount * 3);
        const emberSpeeds = new Float32Array(emberCount);

        for (let i = 0; i < emberCount; i++) {
          emberPositions[i * 3] = (Math.random() - 0.5) * 1.5;
          emberPositions[i * 3 + 1] = Math.random() * 2.5 - 0.5;
          emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
          emberSpeeds[i] = 0.5 + Math.random() * 0.8;
        }

        emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
        const emberMat = new THREE.PointsMaterial({
          color: 0xffd700,
          size: 0.07,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
        });
        const embers = new THREE.Points(emberGeo, emberMat);
        embers.userData.onUpdate = (_, delta) => {
          const pos = emberGeo.attributes.position.array;
          for (let i = 0; i < emberCount; i++) {
            pos[i * 3 + 1] += emberSpeeds[i] * delta;
            if (pos[i * 3 + 1] > 2.5) {
              pos[i * 3 + 1] = -0.5;
              pos[i * 3] = (Math.random() - 0.5) * 1.2;
              pos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
            }
          }
          emberGeo.attributes.position.needsUpdate = true;
        };
        group.add(embers);
        break;
      }

      case 'sneh-bhoj': {
        // ── 2. Festive Saffron & Golden Petals Swarm ──
        const petalCount = 80;
        const petalGroup = new THREE.Group();
        const petalMat1 = new THREE.MeshStandardMaterial({
          color: 0xf28c28,
          roughness: 0.4,
          side: THREE.DoubleSide,
        });
        const petalMat2 = new THREE.MeshStandardMaterial({
          color: 0xd4af37,
          metalness: 0.5,
          roughness: 0.3,
          side: THREE.DoubleSide,
        });

        const petalGeo = new THREE.CylinderGeometry(0.08, 0.22, 0.03, 8);

        for (let i = 0; i < petalCount; i++) {
          const mesh = new THREE.Mesh(petalGeo, i % 2 === 0 ? petalMat1 : petalMat2);
          const angle = (i / petalCount) * Math.PI * 2;
          const radius = 0.8 + (i % 5) * 0.35;
          const y = (Math.random() - 0.5) * 2.2;
          mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
          mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
          mesh.userData.baseAngle = angle;
          mesh.userData.radius = radius;
          mesh.userData.speed = 0.4 + Math.random() * 0.4;
          mesh.userData.rotSpeed = 1 + Math.random() * 2;
          petalGroup.add(mesh);
        }

        petalGroup.userData.onUpdate = (t) => {
          petalGroup.children.forEach((p) => {
            p.userData.baseAngle += p.userData.speed * 0.015;
            p.position.x = Math.cos(p.userData.baseAngle) * p.userData.radius;
            p.position.z = Math.sin(p.userData.baseAngle) * p.userData.radius;
            p.position.y += Math.sin(t + p.userData.radius) * 0.005;
            p.rotation.x += p.userData.rotSpeed * 0.01;
            p.rotation.y += p.userData.rotSpeed * 0.015;
          });
        };
        group.add(petalGroup);
        break;
      }

      case 'lagna-sagaai': {
        // ── 3. Interlocking 3D Golden Wedding Rings with Diamond Sparkle ──
        const ringGeo = new THREE.TorusGeometry(1.1, 0.12, 24, 64);
        const ringMatGold = new THREE.MeshStandardMaterial({
          color: 0xd4af37,
          metalness: 0.95,
          roughness: 0.15,
        });
        const ringMatRose = new THREE.MeshStandardMaterial({
          color: 0xe8b4b8,
          metalness: 0.9,
          roughness: 0.18,
        });

        const ring1 = new THREE.Mesh(ringGeo, ringMatGold);
        ring1.position.set(-0.45, 0, 0);
        ring1.rotation.set(Math.PI / 4, Math.PI / 6, 0);

        const ring2 = new THREE.Mesh(ringGeo, ringMatRose);
        ring2.position.set(0.45, 0, 0);
        ring2.rotation.set(-Math.PI / 4, -Math.PI / 6, 0);

        group.add(ring1);
        group.add(ring2);

        // Diamond Solitaire on Ring 1
        const gemGeo = new THREE.OctahedronGeometry(0.28, 2);
        const gemMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.1,
          roughness: 0.05,
          emissive: 0x99ccff,
          emissiveIntensity: 0.8,
        });
        const gem = new THREE.Mesh(gemGeo, gemMat);
        gem.position.set(0, 1.2, 0);
        ring1.add(gem);

        // Diamond Sparkle Particles
        const sparkleCount = 60;
        const sparkleGeo = new THREE.BufferGeometry();
        const sparklePos = new Float32Array(sparkleCount * 3);
        for (let i = 0; i < sparkleCount; i++) {
          const theta = Math.random() * Math.PI * 2;
          const r = 0.5 + Math.random() * 1.5;
          sparklePos[i * 3] = Math.cos(theta) * r;
          sparklePos[i * 3 + 1] = (Math.random() - 0.5) * 1.8;
          sparklePos[i * 3 + 2] = Math.sin(theta) * r;
        }
        sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePos, 3));
        const sparkleMat = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 0.06,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
        });
        const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
        group.add(sparkles);
        break;
      }

      case 'baraat': {
        // ── 4. Celebratory Fireworks & Golden Confetti Burst ──
        const count = 180;
        const burstGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colGold = new THREE.Color(0xd4af37);
        const colSaffron = new THREE.Color(0xf28c28);
        const colRose = new THREE.Color(0xff4466);

        for (let i = 0; i < count; i++) {
          // Spherical distribution
          const u = Math.random();
          const v = Math.random();
          const theta = u * 2.0 * Math.PI;
          const phi = Math.acos(2.0 * v - 1.0);
          const speed = 0.8 + Math.random() * 1.6;

          velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
          velocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
          velocities[i * 3 + 2] = Math.cos(phi) * speed;

          positions[i * 3] = 0;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = 0;

          const chosenCol = i % 3 === 0 ? colGold : i % 3 === 1 ? colSaffron : colRose;
          colors[i * 3] = chosenCol.r;
          colors[i * 3 + 1] = chosenCol.g;
          colors[i * 3 + 2] = chosenCol.b;
        }

        burstGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        burstGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const burstMat = new THREE.PointsMaterial({
          size: 0.08,
          vertexColors: true,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
        });

        const burstPoints = new THREE.Points(burstGeo, burstMat);
        burstPoints.userData.onUpdate = (t) => {
          const pos = burstGeo.attributes.position.array;
          const cycle = (t * 0.8) % 2.5; // loop explosion every 2.5s
          for (let i = 0; i < count; i++) {
            pos[i * 3] = velocities[i * 3] * cycle;
            pos[i * 3 + 1] = velocities[i * 3 + 1] * cycle - 0.3 * (cycle * cycle); // gravity
            pos[i * 3 + 2] = velocities[i * 3 + 2] * cycle;
          }
          burstGeo.attributes.position.needsUpdate = true;
        };
        group.add(burstPoints);
        break;
      }

      case 'ashirwad': {
        // ── 5. Starlight Galaxy & Champagne Shimmer Vortex ──
        const starCount = 220;
        const starGeo = new THREE.BufferGeometry();
        const starPos = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
          const rad = 0.5 + Math.pow(Math.random(), 2) * 2.2;
          const theta = Math.random() * Math.PI * 2;
          starPos[i * 3] = Math.cos(theta) * rad;
          starPos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
          starPos[i * 3 + 2] = Math.sin(theta) * rad;
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const starMat = new THREE.PointsMaterial({
          color: 0xf4ebd9,
          size: 0.065,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
        });
        const starVortex = new THREE.Points(starGeo, starMat);
        starVortex.userData.onUpdate = (t) => {
          starVortex.rotation.y = t * 0.4;
          starVortex.rotation.z = Math.sin(t * 0.3) * 0.2;
        };
        group.add(starVortex);

        // Core Golden Orb
        const orbGeo = new THREE.SphereGeometry(0.5, 32, 32);
        const orbMat = new THREE.MeshStandardMaterial({
          color: 0xd4af37,
          metalness: 0.9,
          roughness: 0.1,
          emissive: 0x443300,
        });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        group.add(orb);
        break;
      }

      case 'vidai': {
        // ── 6. Sacred Floating Lotus Blossom ──
        const lotusGroup = new THREE.Group();
        const petalShapeGeo = new THREE.ConeGeometry(0.35, 1.2, 5);
        const petalMat = new THREE.MeshStandardMaterial({
          color: 0xffe4e8,
          roughness: 0.3,
          metalness: 0.2,
        });

        // 8 outer petals
        for (let i = 0; i < 8; i++) {
          const p = new THREE.Mesh(petalShapeGeo, petalMat);
          const angle = (i / 8) * Math.PI * 2;
          p.position.set(Math.cos(angle) * 0.7, 0, Math.sin(angle) * 0.7);
          p.rotation.set(0.6, 0, 0);
          p.rotation.y = -angle + Math.PI / 2;
          lotusGroup.add(p);
        }

        // 6 inner petals
        const innerPetalMat = new THREE.MeshStandardMaterial({
          color: 0xd4af37,
          metalness: 0.8,
          roughness: 0.2,
        });
        for (let i = 0; i < 6; i++) {
          const p = new THREE.Mesh(petalShapeGeo, innerPetalMat);
          p.scale.set(0.7, 0.7, 0.7);
          const angle = (i / 6) * Math.PI * 2;
          p.position.set(Math.cos(angle) * 0.4, 0.1, Math.sin(angle) * 0.4);
          p.rotation.set(0.4, 0, 0);
          p.rotation.y = -angle + Math.PI / 2;
          lotusGroup.add(p);
        }

        // Lotus Center Seed Pod
        const podGeo = new THREE.CylinderGeometry(0.3, 0.2, 0.25, 16);
        const podMat = new THREE.MeshStandardMaterial({ color: 0xf28c28, roughness: 0.2 });
        const pod = new THREE.Mesh(podGeo, podMat);
        pod.position.y = 0.1;
        lotusGroup.add(pod);

        lotusGroup.userData.onUpdate = (t) => {
          lotusGroup.position.y = Math.sin(t * 1.5) * 0.15;
          lotusGroup.rotation.y = t * 0.2;
        };

        group.add(lotusGroup);
        break;
      }

      default:
        break;
    }
  }, [activeEventId]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[340px] md:min-h-[420px] relative flex items-center justify-center pointer-events-none select-none"
    />
  );
}
