import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function SproutingHeroCanvas() {
  const mountRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3.8, 12);
    camera.lookAt(0, 2.2, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0x8cb974, 2.8);
    sunLight.position.set(7, 16, 9);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const warmLight = new THREE.PointLight(0xffeedd, 2.0, 20);
    warmLight.position.set(-6, 6, 5);
    scene.add(warmLight);

    // 5. Tree Group
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);

    // A. Soil Mound
    const soilGeo = new THREE.CylinderGeometry(3.2, 3.8, 1.0, 32);
    const soilMat = new THREE.MeshStandardMaterial({
      color: 0x241711,
      roughness: 0.95,
      metalness: 0.05
    });
    const soilMesh = new THREE.Mesh(soilGeo, soilMat);
    soilMesh.position.set(0, -0.5, 0);
    soilMesh.receiveShadow = true;
    treeGroup.add(soilMesh);

    // Pebbles
    const pebbleGeo = new THREE.DodecahedronGeometry(0.1, 0);
    const pebbleMat = new THREE.MeshStandardMaterial({ color: 0x3d271d, roughness: 0.9 });
    for (let i = 0; i < 50; i++) {
      const pebble = new THREE.Mesh(pebbleGeo, pebbleMat);
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 2.8;
      pebble.position.set(Math.cos(angle) * r, -0.05 + Math.random() * 0.1, Math.sin(angle) * r);
      pebble.rotation.set(Math.random(), Math.random(), Math.random());
      treeGroup.add(pebble);
    }

    // B. Seed Pod
    const seedGeo = new THREE.SphereGeometry(0.42, 16, 16);
    seedGeo.scale(1, 1.4, 0.85);
    const seedMat = new THREE.MeshStandardMaterial({ color: 0x3a2e1d, roughness: 0.8 });
    const seedMesh = new THREE.Mesh(seedGeo, seedMat);
    seedMesh.position.set(0, 0.15, 0);
    seedMesh.castShadow = true;
    treeGroup.add(seedMesh);

    // C. Main Growing Tree Trunk
    const trunkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.15, 0),
      new THREE.Vector3(0.12, 1.4, 0.06),
      new THREE.Vector3(-0.08, 2.8, -0.05),
      new THREE.Vector3(0, 4.2, 0)
    ]);
    const trunkGeo = new THREE.TubeGeometry(trunkCurve, 48, 0.16, 16, false);
    const barkMat = new THREE.MeshStandardMaterial({
      color: 0x4a3525,
      roughness: 0.85,
      metalness: 0.05
    });
    const trunkMesh = new THREE.Mesh(trunkGeo, barkMat);
    trunkMesh.castShadow = true;
    treeGroup.add(trunkMesh);

    // D. Tree Branches
    const branches = [];
    const branchConfigs = [
      { startRatio: 0.35, dir: new THREE.Vector3(1.2, 0.6, 0.4), length: 1.4, radius: 0.09 },
      { startRatio: 0.45, dir: new THREE.Vector3(-1.3, 0.7, -0.3), length: 1.5, radius: 0.09 },
      { startRatio: 0.55, dir: new THREE.Vector3(0.4, 0.8, -1.2), length: 1.3, radius: 0.08 },
      { startRatio: 0.65, dir: new THREE.Vector3(-0.5, 0.9, 1.1), length: 1.2, radius: 0.07 }
    ];

    branchConfigs.forEach((cfg) => {
      const bCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(cfg.dir.x * 0.5, cfg.dir.y * 0.5, cfg.dir.z * 0.5),
        new THREE.Vector3(cfg.dir.x, cfg.dir.y, cfg.dir.z)
      ]);
      const bGeo = new THREE.TubeGeometry(bCurve, 20, cfg.radius, 10, false);
      const bMesh = new THREE.Mesh(bGeo, barkMat);
      bMesh.castShadow = true;
      bMesh.scale.set(0.01, 0.01, 0.01);
      treeGroup.add(bMesh);
      branches.push({ mesh: bMesh, startRatio: cfg.startRatio, dir: cfg.dir });
    });

    // E. Full Tree Leaf Canopy Clusters
    const leafClusters = [];
    const leafGeo = new THREE.DodecahedronGeometry(0.75, 1);
    const leafMat1 = new THREE.MeshStandardMaterial({ color: 0x8cb974, roughness: 0.4 });
    const leafMat2 = new THREE.MeshStandardMaterial({ color: 0x6e9f55, roughness: 0.45 });
    const leafMat3 = new THREE.MeshStandardMaterial({ color: 0x5a8744, roughness: 0.5 });

    const canopyPositions = [
      { pos: new THREE.Vector3(0, 4.4, 0), scale: 1.6, mat: leafMat1 },
      { pos: new THREE.Vector3(1.2, 3.8, 0.4), scale: 1.3, mat: leafMat2 },
      { pos: new THREE.Vector3(-1.3, 3.9, -0.3), scale: 1.4, mat: leafMat1 },
      { pos: new THREE.Vector3(0.4, 4.0, -1.2), scale: 1.2, mat: leafMat3 },
      { pos: new THREE.Vector3(-0.5, 4.1, 1.1), scale: 1.25, mat: leafMat2 },
      { pos: new THREE.Vector3(0.8, 4.6, -0.6), scale: 1.1, mat: leafMat1 },
      { pos: new THREE.Vector3(-0.7, 4.7, 0.5), scale: 1.15, mat: leafMat3 }
    ];

    canopyPositions.forEach((c) => {
      const cMesh = new THREE.Mesh(leafGeo, c.mat);
      cMesh.position.copy(c.pos);
      cMesh.scale.set(0.01, 0.01, 0.01);
      cMesh.castShadow = true;
      treeGroup.add(cMesh);
      leafClusters.push({ mesh: cMesh, targetScale: c.scale, basePos: c.pos });
    });

    // F. Golden Pollen Particles
    const pollenGeo = new THREE.BufferGeometry();
    const pollenCount = 80;
    const pPositions = new Float32Array(pollenCount * 3);
    for (let i = 0; i < pollenCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 8;
      pPositions[i + 1] = Math.random() * 5.5;
      pPositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    pollenGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pollenMat = new THREE.PointsMaterial({
      color: 0x8cb974,
      size: 0.1,
      transparent: true,
      opacity: 0.85
    });
    const pollenParticles = new THREE.Points(pollenGeo, pollenMat);
    scene.add(pollenParticles);

    // 6. Rapid Growth Scroll Sync (starts growing immediately!)
    let progress = 0;
    let targetProgress = 0;

    const handleScroll = () => {
      if (!container) return;
      const isMobile = window.innerWidth <= 992;

      if (isMobile) {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Start animation when top of canvas is 85% down the viewport (fully in view on mobile)
        const startPoint = windowHeight * 0.85;
        const scrollDistance = 220;
        const distScrolled = startPoint - rect.top;
        const p = Math.min(Math.max(distScrolled / scrollDistance, 0), 1);
        targetProgress = p;
        setScrollProgress(Math.round(p * 100));
      } else {
        const scrollY = window.scrollY;
        const p = Math.min(Math.max(scrollY / 200, 0), 1);
        targetProgress = p;
        setScrollProgress(Math.round(p * 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Faster lerp factor (0.22) for immediate rapid response
      progress += (targetProgress - progress) * 0.22;

      treeGroup.rotation.y = elapsedTime * 0.12 + mouseX;
      treeGroup.rotation.x = mouseY * 0.35;

      // 1. Higher base trunk growth (0.35 baseline even before scroll starts!)
      const trunkGrowth = Math.max(progress, 0.35 + Math.sin(elapsedTime * 0.9) * 0.03);
      trunkMesh.scale.y = trunkGrowth;
      trunkMesh.position.y = (1 - trunkGrowth) * -0.15;

      // 2. Branch Growth starts earlier
      branches.forEach((b) => {
        const bProgress = Math.min(Math.max((trunkGrowth - b.startRatio) / 0.25, 0), 1);
        b.mesh.scale.set(bProgress, bProgress, bProgress);
        b.mesh.position.set(0, trunkGrowth * (b.startRatio * 4.2), 0);
      });

      // 3. Full Canopy Expansion starts earlier
      leafClusters.forEach((c, idx) => {
        const cProgress = Math.min(Math.max((trunkGrowth - 0.3) / 0.7, 0), 1);
        const s = cProgress * c.targetScale;
        c.mesh.scale.set(
          s + Math.sin(elapsedTime * 1.2 + idx) * 0.04,
          s + Math.cos(elapsedTime * 1.4 + idx) * 0.04,
          s
        );
        c.mesh.position.y = c.basePos.y * Math.max(trunkGrowth, 0.35);
      });

      // Particles
      const pArr = pollenParticles.geometry.attributes.position.array;
      for (let i = 1; i < pollenCount * 3; i += 3) {
        pArr[i] += 0.004;
        if (pArr[i] > 5.5) pArr[i] = 0;
      }
      pollenParticles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="canvas-container-3d" ref={mountRef}>
      <div className="canvas-scroll-hint">
        <span>🌳 Tree Growth:</span>
        <span style={{ fontWeight: 800, color: '#8CB974', fontSize: '0.88rem' }}>
          {scrollProgress === 100 ? '100% Full Canopy Tree ✨' : `${scrollProgress}%`}
        </span>
      </div>
    </div>
  );
}
