import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { ChevronDown } from 'lucide-react';

export default function Hero3D() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add floating geometric shapes
    const shapes = [];
    const geometries = [
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.OctahedronGeometry(0.25, 0),
      new THREE.TetrahedronGeometry(0.2, 0),
    ];

    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00d4ff : 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 2
      );
      mesh.userData = {
        rotationSpeed: Math.random() * 0.02,
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2,
      };
      shapes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 3;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = mouseY * 0.1;
      particlesMesh.rotation.z = mouseX * 0.1;

      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotationSpeed;
        shape.rotation.y += shape.userData.rotationSpeed * 0.5;
        shape.position.y += Math.sin(elapsedTime * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.002;
      });

      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a1a]">
      <div ref={containerRef} className="absolute inset-0 z-0" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a1a] z-10 pointer-events-none" />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none z-5"
        style={{
          background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)',
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />

      <div className="relative z-20 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-cyan-400 font-medium tracking-[0.3em] uppercase text-sm mb-6"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Welcome to my universe
          </motion.p>
          
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Sakith Mandira
            </span>
          </motion.h1>
          
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400" />
            <p className="text-lg md:text-xl text-gray-400 font-light">
              Full-Stack Developer & UI/UX Designer
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400" />
          </motion.div>
          
          <motion.p
            className="text-gray-500 max-w-xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Crafting digital experiences that blend stunning visuals with powerful functionality
          </motion.p>

          <motion.button
            onClick={scrollToProjects}
            className="group relative px-8 py-4 overflow-hidden rounded-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-[1px] bg-[#0a0a1a] rounded-full" />
            <span className="relative z-10 flex items-center gap-2 text-white font-medium">
              View My Work
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}