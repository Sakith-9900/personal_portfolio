import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Hero3D from '../components/portfolio/Hero3D';
import About from '../components/portfolio/About';
import Skills3D from '../components/portfolio/Skills3D';
import GitHubActivity from '../components/portfolio/GitHubActivity';
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
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: '#050510' }}
          >
            <InteractiveSignature />

            {/* Gradient progress bar */}
            <div
              style={{
                width: '140px', height: '1px',
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '999px', overflow: 'hidden',
                marginTop: '56px',
                animation: 'fadeInSign 0.6s ease 0.4s both',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg,rgba(103,232,249,0.85),rgba(168,85,247,0.85))',
                  borderRadius: '999px',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#0a0a1a] min-h-screen">
        {/* Fixed Navigation */}
        <HamburgerNav isLoading={isLoading} />

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Hero3D />
          <About />
          <Projects3D />
          <Skills3D />
          <GitHubActivity />
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

function InteractiveSignature() {
  const [animKey, setAnimKey] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const replay = () => {
    setAnimKey(k => k + 1);
    setShowHint(false);
  };

  return (
    <div
      onClick={replay}
      style={{ cursor: showHint ? 'pointer' : 'default', userSelect: 'none', textAlign: 'center' }}
    >
      <svg
        key={animKey}
        viewBox="0 0 680 175"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 'clamp(280px, 58vw, 560px)', overflow: 'visible', display: 'block' }}
      >
        <defs>
          {/* Wide soft glow */}
          <filter id="sig-glow-wide" x="-30%" y="-60%" width="160%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur8" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur3" />
            <feMerge>
              <feMergeNode in="blur8" />
              <feMergeNode in="blur3" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Tight crisp glow */}
          <filter id="sig-glow-crisp" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Ghost trace — faint full signature always visible */}
        <text x="340" y="122" textAnchor="middle"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '90px', fontWeight: 700,
            fill: 'none',
            stroke: 'rgba(255,255,255,0.04)',
            strokeWidth: '1.5px',
          }}
        >Sakith Mandira</text>

        {/* 2. Outer cyan glow layer */}
        <text x="340" y="122" textAnchor="middle"
          filter="url(#sig-glow-wide)"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '90px', fontWeight: 700,
            fill: 'none',
            stroke: 'rgba(103,232,249,0.3)',
            strokeWidth: '2.5px',
            strokeDasharray: '3200',
            strokeDashoffset: '3200',
            animation: 'drawSign 3.2s cubic-bezier(0.4,0,0.2,1) 0.2s forwards',
          }}
        >Sakith Mandira</text>

        {/* 3. Crisp white stroke with soft glow */}
        <text x="340" y="122" textAnchor="middle"
          filter="url(#sig-glow-crisp)"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '90px', fontWeight: 700,
            fill: 'none',
            stroke: 'rgba(255,255,255,0.90)',
            strokeWidth: '1.3px',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeDasharray: '3200',
            strokeDashoffset: '3200',
            animation: 'drawSign 3.2s cubic-bezier(0.4,0,0.2,1) 0.2s forwards',
          }}
          onAnimationEnd={() => setTimeout(() => setShowHint(true), 400)}
        >Sakith Mandira</text>

        {/* 4. Curved underline flourish */}
        <path d="M 115,148 Q 200,162 340,155 Q 480,148 565,155"
          style={{
            fill: 'none',
            stroke: 'rgba(255,255,255,0.22)',
            strokeWidth: '0.9px',
            strokeLinecap: 'round',
            strokeDasharray: '480',
            strokeDashoffset: '480',
            animation: 'drawSign 1s ease 3.4s forwards',
          }}
        />
      </svg>

      {/* Tap-to-replay hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: showHint ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          marginTop: '18px',
          color: 'rgba(255,255,255,0.22)',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontFamily: 'sans-serif',
        }}
      >
        tap to replay ↺
      </motion.p>
    </div>
  );
}

const NAV_LINKS = [
  { label: 'HOME',     href: '#' },
  { label: 'ABOUT',    href: '#about' },
  { label: 'SKILLS',   href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'GITHUB',   href: '#github-activity' },
  { label: 'CONTACT',  href: '#contact' },
  { label: 'RESUME',   href: '/sakith_cv.pdf', external: true },
];

function HamburgerNav({ isLoading }) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } },
    exit:   { opacity: 0, transition: { duration: 0.35, ease: 'easeInOut', delay: 0.15 } },
  };

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
    exit:   { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    exit:   { opacity: 0, y: -20, transition: { duration: 0.25, ease: 'easeIn' } },
  };

  return (
    <>
      {/* Hamburger button — top-left */}
      <motion.button
        id="hamburger-menu-btn"
        aria-label="Open navigation menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-[60] flex flex-col gap-[6px] p-2 group"
        style={{ display: isOpen ? 'none' : undefined }}
      >
        <span className="block w-7 h-[2px] bg-white transition-all duration-300 group-hover:w-9" />
        <span className="block w-7 h-[2px] bg-white transition-all duration-300 group-hover:w-5" />
        <span className="block w-7 h-[2px] bg-white transition-all duration-300 group-hover:w-7" />
      </motion.button>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="nav-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[70] bg-black flex items-center justify-center"
          >
            {/* Close button — top-right */}
            <motion.button
              id="close-menu-btn"
              aria-label="Close navigation menu"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-8 text-white hover:text-gray-300 transition-colors"
            >
              <X size={30} strokeWidth={1.5} />
            </motion.button>

            {/* Nav links */}
            <motion.nav
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center gap-6"
            >
              {NAV_LINKS.map(({ label, href, external }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  variants={itemVariants}
                  onClick={external ? undefined : handleLinkClick}
                  className="relative text-white font-black uppercase tracking-wide text-center group"
                  style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)', letterSpacing: '0.05em' }}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Hover underline */}
                  <span className="absolute -bottom-1 left-0 h-[3px] w-0 bg-white group-hover:w-full transition-all duration-300 ease-out" />
                  {label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
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