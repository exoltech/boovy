'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AnimatedBackgroundProps {
  theme: string;
}

export default function AnimatedBackground({ theme }: AnimatedBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create particles based on theme
    const particles = createParticles(theme);
    scene.add(particles);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Rotate particles
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;

      // Update particle positions based on theme
      updateParticles(particles, theme);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme]);

  const createParticles = (theme: string) => {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Set colors based on theme
      const color = getThemeColor(theme, i);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    return new THREE.Points(geometry, material);
  };

  const getThemeColor = (theme: string, index: number) => {
    switch (theme) {
      case 'neon':
        return index % 3 === 0 
          ? { r: 0.2, g: 0.6, b: 1.0 }  // Blue
          : index % 3 === 1
          ? { r: 1.0, g: 0.2, b: 0.8 }  // Pink
          : { r: 0.6, g: 0.2, b: 1.0 }; // Purple
      
      case 'retro':
        return { r: 0.0, g: 1.0, b: 0.2 }; // Green
      
      case 'lofi':
        return index % 2 === 0
          ? { r: 0.8, g: 0.7, b: 0.5 }  // Beige
          : { r: 0.4, g: 0.7, b: 0.4 }; // Soft green
      
      default:
        return { r: 0.5, g: 0.5, b: 0.5 };
    }
  };

  const updateParticles = (particles: THREE.Points, theme: string) => {
    const positions = particles.geometry.attributes.position.array as Float32Array;
    const time = Date.now() * 0.001;

    for (let i = 0; i < positions.length; i += 3) {
      switch (theme) {
        case 'neon':
          // Flowing wave motion
          positions[i + 1] += Math.sin(time + positions[i] * 0.1) * 0.001;
          break;
        
        case 'retro':
          // Grid-like movement
          positions[i] += Math.sin(time * 0.5) * 0.001;
          positions[i + 2] += Math.cos(time * 0.5) * 0.001;
          break;
        
        case 'lofi':
          // Gentle floating motion
          positions[i + 1] += Math.sin(time * 0.3 + i * 0.01) * 0.0005;
          break;
      }
    }

    particles.geometry.attributes.position.needsUpdate = true;
  };

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

