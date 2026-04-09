import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   Tech-stack icon list – using Simple Icons CDN SVGs
   ───────────────────────────────────────────────────────────── */
const row1 = [
  { name: 'Next.js',     icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
  { name: 'Tailwind',    icon: 'https://cdn.simpleicons.org/tailwindcss/38BDF8' },
  { name: 'HTML5',       icon: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'CSS3',        icon: 'https://cdn.simpleicons.org/css3/1572B6' },
  { name: 'JavaScript',  icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'TypeScript',  icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Three.js',    icon: 'https://cdn.simpleicons.org/threedotjs/ffffff' },
  { name: 'Python',      icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'React',       icon: 'https://cdn.simpleicons.org/react/61DAFB' },
];

const row2 = [
  { name: 'Docker',      icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'Bash',        icon: 'https://cdn.simpleicons.org/gnubash/ffffff' },
  { name: 'Git',         icon: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'GitHub',      icon: 'https://cdn.simpleicons.org/github/ffffff' },
  { name: 'Arduino',     icon: 'https://cdn.simpleicons.org/arduino/00979D' },
  { name: 'Java',        icon: 'https://cdn.simpleicons.org/openjdk/ffffff' },
  { name: 'MySQL',       icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
  { name: 'Firebase',    icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
  { name: 'Flutter',     icon: 'https://cdn.simpleicons.org/flutter/02569B' },
];

/* Duplicate items so the infinite scroll loop is seamless */
const doubled = (arr) => [...arr, ...arr];

function MarqueeRow({ items, reverse = false, speed = 40 }) {
  return (
    <div className="marquee-wrapper">
      <div
        className="marquee-track"
        style={{
          animationDirection: reverse ? 'reverse' : 'normal',
          animationDuration: `${speed}s`,
        }}
      >
        {doubled(items).map((item, i) => (
          <div key={`${item.name}-${i}`} className="marquee-item group">
            <div className="skill-icon-card">
              <img
                src={item.icon}
                alt={item.name}
                className="skill-icon-img"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <span className="skill-icon-label">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills3D() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="skills-section">
      {/* background glow */}
      <div className="skills-bg-glow" />

      <div ref={ref} className="skills-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="skills-header"
        >
          <span className="skills-eyebrow">Tech Stack</span>
          <h2 className="skills-title">
            Skills &amp; <span className="skills-title-accent">Technologies</span>
          </h2>
          <p className="skills-subtitle">
            Technologies I've worked with across front-end, back-end, and embedded systems.
          </p>
        </motion.div>

        {/* Marquee rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="marquee-section"
        >
          <MarqueeRow items={row1} speed={38} />
          <MarqueeRow items={row2} speed={45} reverse />
        </motion.div>
      </div>

      <style>{`
        /* ── section ── */
        .skills-section {
          position: relative;
          padding: 7rem 0 5rem;
          background: #0a0a1a;
          overflow: hidden;
        }
        .skills-bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .skills-container {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        /* ── header ── */
        .skills-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .skills-eyebrow {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #22d3ee;
          margin-bottom: 1rem;
        }
        .skills-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #fff;
          margin: 0 0 1rem;
          line-height: 1.1;
        }
        .skills-title-accent {
          background: linear-gradient(90deg, #22d3ee, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .skills-subtitle {
          color: #6b7280;
          font-size: 1rem;
          max-width: 38rem;
          margin: 0 auto;
        }
        /* ── marquee ── */
        .marquee-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          overflow: hidden;
        }
        .marquee-wrapper {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .marquee-track {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          animation: marquee-scroll linear infinite;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: default;
          flex-shrink: 0;
        }
        .skill-icon-card {
          width: 72px;
          height: 72px;
          border-radius: 1rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .marquee-item:hover .skill-icon-card {
          background: rgba(34,211,238,0.08);
          border-color: rgba(34,211,238,0.35);
          transform: translateY(-4px) scale(1.08);
          box-shadow: 0 8px 32px rgba(34,211,238,0.18);
        }
        .skill-icon-img {
          width: 36px;
          height: 36px;
          object-fit: contain;
          filter: grayscale(60%) brightness(0.85);
          transition: filter 0.3s ease;
        }
        .marquee-item:hover .skill-icon-img {
          filter: grayscale(0%) brightness(1.1);
        }
        .skill-icon-label {
          font-size: 0.65rem;
          color: #6b7280;
          font-weight: 500;
          letter-spacing: 0.04em;
          transition: color 0.3s;
        }
        .marquee-item:hover .skill-icon-label {
          color: #22d3ee;
        }
      `}</style>
    </section>
  );
}