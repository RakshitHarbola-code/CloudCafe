import React, { useEffect, useRef, useState } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function OrbitalScene() {
  const mount = useRef(null);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    const host = mount.current;
    if (!host) return undefined;
    let disposed = false;
    let frame = 0;
    let renderer;
    let scene;
    let camera;
    let cloudRig;
    let orbitRig;
    let resizeObserver;
    const geometries = [];
    const materials = [];
    let targetProgress = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let draw = () => {};
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const onScroll = () => {
      if (reducedMotion) return;
      const hero = host.closest('.hero');
      if (!hero) return;
      const bounds = hero.getBoundingClientRect();
      targetProgress = clamp(-bounds.top / Math.max(bounds.height, 1), 0, 1);
    };
    const onPointerMove = (event) => {
      if (!finePointer || reducedMotion) return;
      const bounds = host.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 0.48;
      targetY = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 0.32;
    };
    const onPointerLeave = () => { targetX = 0; targetY = 0; };
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      } else if (!reducedMotion && !frame) {
        frame = requestAnimationFrame(draw);
      }
    };
    const resizeScene = () => {
      if (!renderer || !camera || disposed) return;
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (reducedMotion && scene) renderer.render(scene, camera);
    };
    const cleanupRenderer = () => {
      resizeObserver?.disconnect();
      resizeObserver = undefined;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resizeScene);
      host.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
        renderer = undefined;
      }
    };

    Promise.resolve().then(async () => {
      const THREE = await import('three');
      if (disposed) return;
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 40);
      camera.position.set(0, 0, 6.5);
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
      renderer.setSize(width, height, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.setAttribute('aria-hidden', 'true');
      host.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xf3e9d7, 1.4));
      const keyLight = new THREE.DirectionalLight(0xffedcf, 4.2);
      keyLight.position.set(-3, 4, 5);
      scene.add(keyLight);
      const brassLight = new THREE.PointLight(0xb99a65, 18, 11, 1.8);
      brassLight.position.set(2.2, -0.8, 2.5);
      scene.add(brassLight);

      cloudRig = new THREE.Group();
      cloudRig.position.set(0, 0.1, 0);
      scene.add(cloudRig);
      const cloudMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xe8dfd0, roughness: 0.32, metalness: 0.09, clearcoat: 0.48, clearcoatRoughness: 0.29,
      });
      const pearlGeometry = new THREE.SphereGeometry(0.39, 32, 24);
      geometries.push(pearlGeometry);
      materials.push(cloudMaterial);
      const cloudParts = [
        [-0.82, -0.12, -0.02, 0.69, 0.64, 0.69],
        [-0.48, 0.20, 0.03, 0.78, 0.91, 0.72],
        [-0.07, 0.31, 0.02, 1.04, 1.17, 0.78],
        [0.40, 0.21, -0.02, 0.82, 0.91, 0.73],
        [0.74, -0.08, -0.04, 0.64, 0.62, 0.66],
        [0.0, -0.17, -0.03, 1.36, 0.61, 0.76],
      ];
      for (const [x, y, z, sx, sy, sz] of cloudParts) {
        const pearl = new THREE.Mesh(pearlGeometry, cloudMaterial);
        pearl.position.set(x, y, z);
        pearl.scale.set(sx, sy, sz);
        cloudRig.add(pearl);
      }

      const baseGeometry = new THREE.CylinderGeometry(0.48, 0.48, 0.014, 80, 1, true);
      const brassMaterial = new THREE.MeshStandardMaterial({ color: 0xb99a65, metalness: 0.84, roughness: 0.27, transparent: true, opacity: 0.84 });
      geometries.push(baseGeometry);
      materials.push(brassMaterial);
      const halo = new THREE.Mesh(baseGeometry, brassMaterial);
      halo.rotation.x = Math.PI / 2;
      halo.scale.set(2.2, 1.1, 1);
      halo.position.set(0, -0.31, 0);
      cloudRig.add(halo);

      orbitRig = new THREE.Group();
      cloudRig.add(orbitRig);
      const ringGeometry = new THREE.TorusGeometry(1.4, 0.009, 8, 144);
      const fineRingGeometry = new THREE.TorusGeometry(1.72, 0.004, 6, 144);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xc8a66b, metalness: 0.9, roughness: 0.23, transparent: true, opacity: 0.72 });
      const lightRingMat = new THREE.MeshBasicMaterial({ color: 0xe5c995, transparent: true, opacity: 0.32 });
      geometries.push(ringGeometry, fineRingGeometry);
      materials.push(ringMat, lightRingMat);
      const ringA = new THREE.Mesh(ringGeometry, ringMat);
      ringA.rotation.set(1.13, -0.24, -0.21);
      orbitRig.add(ringA);
      const ringB = new THREE.Mesh(ringGeometry, ringMat);
      ringB.scale.set(0.85, 1, 1);
      ringB.rotation.set(0.44, 0.8, 0.68);
      orbitRig.add(ringB);
      const outerRing = new THREE.Mesh(fineRingGeometry, lightRingMat);
      outerRing.rotation.set(1.28, 0.2, 0.1);
      orbitRig.add(outerRing);

      const starPositions = [];
      for (let index = 0; index < 70; index += 1) {
        const angle = index * 2.399963;
        const radius = 1.81 + ((index * 37) % 19) / 90;
        starPositions.push(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.68, ((index * 13) % 17 - 8) / 30);
      }
      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
      const starMaterial = new THREE.PointsMaterial({ color: 0xe4c78f, size: 0.022, transparent: true, opacity: 0.72, sizeAttenuation: true });
      geometries.push(starGeometry);
      materials.push(starMaterial);
      const stars = new THREE.Points(starGeometry, starMaterial);
      stars.rotation.set(0.9, -0.1, 0.2);
      cloudRig.add(stars);

      if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(resizeScene);
        resizeObserver.observe(host);
      } else {
        window.addEventListener('resize', resizeScene, { passive: true });
      }
      draw = (now = 0) => {
        if (disposed || !renderer || !scene || !camera) return;
        const seconds = now / 1000;
        const easing = reducedMotion ? 1 : 0.055;
        pointerX += (targetX - pointerX) * easing;
        pointerY += (targetY - pointerY) * easing;
        cloudRig.rotation.y = targetProgress * 1.52 + pointerX * 0.3 + (reducedMotion ? 0 : seconds * 0.09);
        cloudRig.rotation.x = 0.05 + targetProgress * 0.48 + pointerY * 0.22;
        cloudRig.position.y = 0.09 + (reducedMotion ? 0 : Math.sin(seconds * 0.72) * 0.045);
        orbitRig.rotation.z = -targetProgress * 1.15 + (reducedMotion ? 0 : seconds * 0.035);
        renderer.render(scene, camera);
        if (!reducedMotion && !document.hidden) frame = requestAnimationFrame(draw);
        else frame = 0;
      };

      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      host.addEventListener('pointerleave', onPointerLeave, { passive: true });
      document.addEventListener('visibilitychange', onVisibilityChange);
      setWebglReady(true);
      if (reducedMotion) draw(0);
      else frame = requestAnimationFrame(draw);
    }).catch(() => {
      cleanupRenderer();
      if (!disposed) setWebglReady(false);
    });

    return () => {
      disposed = true;
      cleanupRenderer();
    };
  }, []);

  return (
    <div className="hero-three-layer" aria-hidden="true">
      <div ref={mount} className={`orbital-scene${webglReady ? ' is-webgl' : ''}`}>
        <div className="orbital-scene-fallback"><span className="fallback-cloud" /><span className="fallback-ring fallback-ring-a" /><span className="fallback-ring fallback-ring-b" /><i className="fallback-star">✳</i></div>
      </div>
    </div>
  );
}
