"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * HeroLight — lightweight WebGL daybreak shader.
 * Soft green light, grain, slow flow, gentle cursor + scroll reaction.
 * Lazy-loaded via next/dynamic (ssr: false) so LCP stays text.
 * Caps DPR at 2, pauses when off-screen (IntersectionObserver).
 */

interface HeroLightProps {
  className?: string;
}

export function HeroLight({ className }: HeroLightProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isVisible = useRef(true);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  // Cap DPR at 2 for performance.
  const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0xffffff, 0); // transparent; parent paints white
    container.appendChild(renderer.domElement);

    // Soft green daybreak glow.
    const ambientLight = new THREE.AmbientLight(0x00c853, 0.12);
    scene.add(ambientLight);

    // Cursor-reactive point light.
    const pointLight = new THREE.PointLight(0x00c853, 1.8, 12);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Gentle orb — the "sun"/dawn heart.
    const geometry = new THREE.SphereGeometry(1.1, 60, 60);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00c853,
      transparent: true,
      opacity: 0.14,
      roughness: 0.85,
    });
    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    // Grain plane (subtle noise texture).
    const grainCanvas = document.createElement("canvas");
    grainCanvas.width = 256;
    grainCanvas.height = 256;
    const ctx = grainCanvas.getContext("2d")!;
    const imageData = ctx.createImageData(256, 256);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.random() * 40;
      imageData.data[i] = v;
      imageData.data[i + 1] = v;
      imageData.data[i + 2] = v;
      imageData.data[i + 3] = 22;
    }
    ctx.putImageData(imageData, 0, 0);
    const grainTexture = new THREE.CanvasTexture(grainCanvas);
    grainTexture.wrapS = THREE.RepeatWrapping;
    grainTexture.wrapT = THREE.RepeatWrapping;
    grainTexture.repeat.set(5, 5);

    const grainPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.MeshBasicMaterial({
        map: grainTexture,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
      })
    );
    grainPlane.position.z = -2;
    scene.add(grainPlane);

    // Pause when off-screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x =
        (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mouseRef.current.y =
        -(e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    };
    window.addEventListener("mousemove", handleMove);

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    const animate = (t: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      if (isVisible.current) {
        const dt = (t - timeRef.current) * 0.001;
        timeRef.current = t;

        // Slow flow.
        orb.rotation.y += dt * 0.12;
        orb.rotation.x += dt * 0.07;
        orb.scale.setScalar(1 + Math.sin(t * 0.0012) * 0.035);

        // Light drifts gently toward cursor.
        pointLight.position.x +=
          (mouseRef.current.x * 1.8 - pointLight.position.x) * dt * 1.5;
        pointLight.position.y +=
          (mouseRef.current.y * 1.8 - pointLight.position.y) * dt * 1.5;

        grainPlane.rotation.y += dt * 0.04;

        renderer.render(scene, camera);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    timeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [dpr]);

  return (
    <div ref={containerRef} className={className} style={{ pointerEvents: "none" }} />
  );
}

export default HeroLight;
