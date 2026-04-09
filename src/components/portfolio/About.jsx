import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Palette, Sparkles, Zap, GraduationCap, MapPin, Coffee } from 'lucide-react';

/* ── What I do cards ─────────────────────────────────────────── */
const traits = [
  {
    icon: Code2,
    label: 'Clean Code',
    description: 'Writing readable, maintainable solutions with a focus on best practices.',
    color: '#22d3ee',
  },
  {
    icon: Palette,
    label: 'UI / UX Design',
    description: 'Crafting pixel-perfect interfaces that feel intuitive and delightful.',
    color: '#a855f7',
  },
  {
    icon: Sparkles,
    label: 'Always Learning',
    description: 'Exploring new technologies and pushing my skills further every day.',
    color: '#f59e0b',
  },
  {
    icon: Zap,
    label: 'Performance',
    description: 'Optimising apps for speed, efficiency and the best user experience.',
    color: '#34d399',
  },
];

/* ── Quick facts ─────────────────────────────────────────────── */
const facts = [
  { icon: GraduationCap, text: 'Undergraduate Software Engineering Student' },
  { icon: MapPin,        text: 'Based in Sri Lanka 🇱🇰' },
  { icon: Coffee,        text: 'Fuelled by curiosity — and a lot of coffee' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="about-section">
      {/* Subtle background */}
      <div className="about-bg-line" />
      <div className="about-bg-glow-left" />
      <div className="about-bg-glow-right" />

      <div ref={ref} className="about-container">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="about-header"
        >
          <span className="about-eyebrow">About Me</span>
          <h2 className="about-title">
            Turning Ideas Into{' '}
            <span className="about-title-accent">Digital Reality</span>
          </h2>
        </motion.div>

        {/* ── Main content layout ── */}
        <div className="about-body">

          {/* LEFT: Bio + facts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="about-bio-col"
          >
            {/* Decorative tag */}
            <div className="about-tag">
              <span className="about-tag-dot" />
              Open to Internships &amp; Opportunities
            </div>

            <p className="about-bio-text">
              I'm a passionate software engineering undergraduate with a love for building
              full-stack web and mobile applications. I enjoy turning complex problems
              into clean, intuitive solutions — from crafting pixel-perfect frontends to
              designing robust backend architectures.
            </p>
            <p className="about-bio-text">
              Whether it's a mobile app, a desktop tool, or a web platform, I approach
              every project with a focus on user experience, performance, and writing code
              that actually makes sense to read.
            </p>

            {/* Quick facts */}
            <div className="about-facts">
              {facts.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="about-fact"
                >
                  <Icon size={15} className="about-fact-icon" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Animated terminal / code block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="about-terminal"
          >
            {/* Terminal chrome */}
            <div className="term-bar">
              <span className="term-dot" style={{ background: '#ff5f57' }} />
              <span className="term-dot" style={{ background: '#febc2e' }} />
              <span className="term-dot" style={{ background: '#28c840' }} />
              <span className="term-title">about_me.js</span>
            </div>

            <div className="term-body">
              <TermLine delay={0.5} color="#6b7280">{'// Sakith Gunarathna'}</TermLine>
              <TermLine delay={0.6} color="#a855f7">const </TermLine>
              <TermLine delay={0.6} color="#e2e8f0">developer = {'{'}</TermLine>
              <TermLine delay={0.7} color="#22d3ee" indent>name: </TermLine>
              <TermLine delay={0.7} color="#34d399" inline>"Sakith Gunarathna"</TermLine>
              <TermLine delay={0.8} color="#22d3ee" indent>role: </TermLine>
              <TermLine delay={0.8} color="#34d399" inline>"Full-Stack Developer"</TermLine>
              <TermLine delay={0.9} color="#22d3ee" indent>status: </TermLine>
              <TermLine delay={0.9} color="#34d399" inline>"Undergraduate Student"</TermLine>
              <TermLine delay={1.0} color="#22d3ee" indent>passions: </TermLine>
              <TermLine delay={1.0} color="#f59e0b" inline>["Web", "Mobile", "UI/UX"]</TermLine>
              <TermLine delay={1.1} color="#22d3ee" indent>available: </TermLine>
              <TermLine delay={1.1} color="#34d399" inline>true</TermLine>
              <TermLine delay={1.2} color="#e2e8f0">{'}'}</TermLine>
              <div className="term-cursor-line">
                <span className="term-cursor" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Trait cards ── */}
        <div className="about-traits">
          {traits.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="about-trait-card"
              style={{ '--trait-color': t.color }}
            >
              <div className="trait-icon-wrap">
                <t.icon size={20} color={t.color} />
              </div>
              <h4 className="trait-label">{t.label}</h4>
              <p className="trait-desc">{t.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Styles ─── */}
      <style>{`
        /* section */
        .about-section {
          position: relative;
          padding: 7rem 0 8rem;
          background: #0a0a1a;
          overflow: hidden;
        }
        .about-bg-line {
          position: absolute; top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(34,211,238,0.2), transparent);
        }
        .about-bg-glow-left {
          position: absolute; top: 20%; left: -10%;
          width: 500px; height: 500px; border-radius: 50%;
          background: rgba(168,85,247,0.06);
          filter: blur(120px); pointer-events: none;
        }
        .about-bg-glow-right {
          position: absolute; bottom: 10%; right: -10%;
          width: 500px; height: 500px; border-radius: 50%;
          background: rgba(34,211,238,0.06);
          filter: blur(120px); pointer-events: none;
        }
        .about-container {
          max-width: 72rem; margin: 0 auto; padding: 0 1.5rem;
        }

        /* header */
        .about-header { text-align: center; margin-bottom: 4rem; }
        .about-eyebrow {
          display: inline-block;
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #22d3ee; margin-bottom: 0.75rem;
        }
        .about-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800; color: #fff;
          margin: 0; line-height: 1.15;
        }
        .about-title-accent {
          background: linear-gradient(90deg, #22d3ee, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* body layout */
        .about-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
        }
        @media (min-width: 768px) {
          .about-body { grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: start; }
        }

        /* bio column */
        .about-bio-col {}
        .about-tag {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.04em;
          color: #34d399;
          border: 1px solid rgba(52,211,153,0.3);
          background: rgba(52,211,153,0.08);
          border-radius: 99px; padding: 0.3rem 0.85rem;
          margin-bottom: 1.5rem;
        }
        .about-tag-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #34d399;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .about-bio-text {
          font-size: 1rem; color: #9ca3af; line-height: 1.8;
          margin-bottom: 1.25rem;
        }
        .about-facts {
          display: flex; flex-direction: column; gap: 0.75rem;
          margin-top: 1.75rem;
          padding-top: 1.75rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .about-fact {
          display: flex; align-items: center; gap: 0.65rem;
          font-size: 0.875rem; color: #6b7280;
        }
        .about-fact-icon { color: #22d3ee; flex-shrink: 0; }

        /* terminal */
        .about-terminal {
          border-radius: 1rem;
          overflow: hidden;
          background: rgba(13,13,32,0.9);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,211,238,0.06);
        }
        .term-bar {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.85rem 1.25rem;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .term-dot { width: 12px; height: 12px; border-radius: 50%; }
        .term-title {
          margin-left: auto;
          font-size: 0.72rem; color: #4b5563; font-family: monospace;
        }
        .term-body {
          padding: 1.5rem 1.75rem 1.75rem;
          font-family: 'Fira Code', 'Cascadia Code', 'Courier New', monospace;
          font-size: 0.85rem;
          line-height: 1.9;
        }
        .term-line { display: flex; flex-wrap: wrap; }
        .term-indent { padding-left: 1.5rem; }
        .term-cursor-line {
          margin-top: 0.25rem;
          display: flex; align-items: center;
        }
        .term-cursor {
          display: inline-block;
          width: 9px; height: 1.1em;
          background: #22d3ee;
          border-radius: 1px;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        /* trait cards */
        .about-traits {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .about-traits { grid-template-columns: repeat(4, 1fr); }
        }
        .about-trait-card {
          padding: 1.5rem 1.25rem;
          border-radius: 1rem;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.3s ease;
          cursor: default;
        }
        .about-trait-card:hover {
          background: rgba(255,255,255,0.045);
          border-color: var(--trait-color, #22d3ee);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }
        .trait-icon-wrap {
          width: 42px; height: 42px; border-radius: 0.75rem;
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
          transition: background 0.3s;
        }
        .about-trait-card:hover .trait-icon-wrap {
          background: color-mix(in srgb, var(--trait-color) 15%, transparent);
        }
        .trait-label {
          font-size: 0.9rem; font-weight: 700; color: #e2e8f0;
          margin: 0 0 0.4rem;
        }
        .trait-desc {
          font-size: 0.78rem; color: #6b7280; line-height: 1.6; margin: 0;
        }
      `}</style>
    </section>
  );
}

/* ── Terminal line helper ───────────────────────────────────── */
function TermLine({ children, color, delay = 0, indent = false, inline = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35 }}
      className={`term-line${indent ? ' term-indent' : ''}`}
      style={{ color, display: inline ? 'inline' : undefined }}
    >
      {inline ? <>&nbsp;{children},</> : children}
    </motion.div>
  );
}