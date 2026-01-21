import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { X } from 'lucide-react';

const skills = [
  { name: 'React', color: '#61DAFB', description: 'Building dynamic, component-based user interfaces with React ecosystem including Redux, Next.js, and React Native.', level: 95 },
  { name: 'Node.js', color: '#339933', description: 'Server-side JavaScript development with Express, NestJS, and building RESTful APIs and GraphQL services.', level: 90 },
  { name: 'TypeScript', color: '#3178C6', description: 'Type-safe development for scalable applications with advanced type patterns and generics.', level: 88 },
  { name: 'Python', color: '#3776AB', description: 'Backend development, automation, data analysis with Django, FastAPI, and machine learning libraries.', level: 85 },
  { name: 'Figma', color: '#F24E1E', description: 'UI/UX design, prototyping, design systems, and collaborative design workflows.', level: 92 },
  { name: 'AWS', color: '#FF9900', description: 'Cloud architecture with EC2, Lambda, S3, DynamoDB, and serverless deployments.', level: 82 },
  { name: 'MongoDB', color: '#47A248', description: 'NoSQL database design, aggregation pipelines, and performance optimization.', level: 87 },
  { name: 'Three.js', color: '#000000', description: '3D graphics programming, WebGL shaders, and immersive web experiences.', level: 78 },
];

export default function Skills3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (!canvasRef.current || !isInView) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    
    const size = Math.min(400, window.innerWidth - 48);
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create icosahedron with glowing edges
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(wireframe);

    // Inner glowing sphere
    const innerGeometry = new THREE.IcosahedronGeometry(1.8, 1);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);

    // Floating particles around the shape
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      const radius = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    canvasRef.current.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      wireframe.rotation.x += 0.003;
      wireframe.rotation.y += 0.005;
      innerMesh.rotation.x -= 0.002;
      innerMesh.rotation.y -= 0.003;
      particles.rotation.y += 0.001;

      wireframe.rotation.x += mouseY * 0.01;
      wireframe.rotation.y += mouseX * 0.01;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, [isInView]);

  return (
    <section id="skills" className="relative py-32 bg-[#0a0a1a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative">
              <canvas 
                ref={canvasRef} 
                className="cursor-pointer"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-cyan-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <motion.button
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedSkill(skill)}
                className="group relative p-5 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 text-left overflow-hidden"
              >
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${skill.color}15 0%, transparent 70%)`
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}` }}
                    />
                    <span className="text-white font-medium">{skill.name}</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{skill.level}%</p>
                </div>

                {/* 3D hover effect */}
                <motion.div
                  className="absolute -bottom-1 -right-1 w-8 h-8 border-r-2 border-b-2 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ borderColor: skill.color }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedSkill(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.8, rotateY: -30 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: 30 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 p-8 shadow-2xl"
              style={{
                boxShadow: `0 0 60px ${selectedSkill.color}20`
              }}
            >
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${selectedSkill.color}20`,
                    boxShadow: `0 0 30px ${selectedSkill.color}30`
                  }}
                >
                  <div 
                    className="w-8 h-8 rounded-lg"
                    style={{ backgroundColor: selectedSkill.color }}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedSkill.name}</h3>
                  <p className="text-gray-400">Proficiency: {selectedSkill.level}%</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                {selectedSkill.description}
              </p>
              
              {/* Animated progress */}
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedSkill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: selectedSkill.color }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}