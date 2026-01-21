import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero3D from '../components/portfolio/Hero3D';
import About from '../components/portfolio/About';
import Skills3D from '../components/portfolio/Skills3D';
import Projects3D from '../components/portfolio/Projects3D';
import Contact3D from '../components/portfolio/Contact3D';
import Footer3D from '../components/portfolio/Footer3D';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-[#0a0a1a] flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  SM
                </h1>
              </motion.div>
              
              <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 text-sm mt-4"
              >
                Loading experience...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#0a0a1a] min-h-screen">
        {/* Fixed Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: isLoading ? -100 : 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <motion.a 
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              SM
            </motion.a>
            
            <div className="hidden md:flex items-center gap-8">
              {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ y: -2 }}
                  className="text-sm text-gray-400 hover:text-white transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2 rounded-full border border-gray-700 text-sm text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
            >
              Let's Talk
            </motion.a>
          </div>
        </motion.nav>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Hero3D />
          <About />
          <Skills3D />
          <Projects3D />
          <Contact3D />
          <Footer3D />
        </motion.main>

        {/* Cursor glow effect (desktop only) */}
        <div className="hidden lg:block">
          <CursorGlow />
        </div>
      </div>
    </>
  );
}

function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed w-64 h-64 pointer-events-none z-40 mix-blend-screen"
      animate={{
        x: position.x - 128,
        y: position.y - 128,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    >
      <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl" />
    </motion.div>
  );
}