import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Bus, ShoppingCart, FileText } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'VanGo',
    subtitle: 'School Transport Management System',
    description:
      'A full-featured school transport management platform that streamlines route planning, real-time tracking, parent notifications, and driver coordination. Built as a group software development project.',
    highlights: [
      'Real-time GPS tracking via Google Maps API',
      'Parent-to-driver communication & notifications (Firebase)',
      'Backend REST API with Node.js & PostgreSQL (Supabase)',
      'Git-based team collaboration across 5+ contributors',
    ],
    techStack: ['Flutter', 'Node.js', 'PostgreSQL', 'Supabase', 'Firebase', 'Google Maps API'],
    githubUrl: 'https://github.com/Sakith-9900',
    liveUrl: null,
    color: '#22d3ee',
    accentColor: '#0891b2',
    icon: Bus,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=420&fit=crop',
    tagColor: 'rgba(34,211,238,0.15)',
    tagBorder: 'rgba(34,211,238,0.35)',
  },
  {
    id: 2,
    title: 'ProcurePath',
    subtitle: 'Desktop Procurement Management App',
    description:
      'A cross-platform desktop application for managing procurement workflows — from purchase requests to supplier management. Features a clean React UI wrapped in Electron with a Supabase PostgreSQL backend.',
    highlights: [
      'Cross-platform desktop support via Electron',
      'Full CRUD with Supabase (PostgreSQL) database',
      'Responsive UI with React & Tailwind CSS',
      'Role-based access control for procurement teams',
    ],
    techStack: ['React', 'Electron', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Sakith-9900',
    liveUrl: null,
    color: '#a855f7',
    accentColor: '#7c3aed',
    icon: ShoppingCart,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=420&fit=crop',
    tagColor: 'rgba(168,85,247,0.15)',
    tagBorder: 'rgba(168,85,247,0.35)',
  },
  {
    id: 3,
    title: 'Syncra',
    subtitle: 'The Cloud-Powered Note Ecosystem',
    description:
      'A cross-platform mobile note-taking application built with Flutter that offers seamless cloud synchronization, offline support, and a clean minimal interface for capturing and organising ideas.',
    highlights: [
      'Cross-platform mobile app (iOS & Android) with Flutter/Dart',
      'Cloud sync with Firebase Firestore',
      'Offline-first with SQLite local database',
      'Bloc state management for predictable UI state',
    ],
    techStack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'SQLite', 'Bloc'],
    githubUrl: 'https://github.com/Sakith-9900',
    liveUrl: null,
    color: '#34d399',
    accentColor: '#059669',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=700&h=420&fit=crop',
    tagColor: 'rgba(52,211,153,0.15)',
    tagBorder: 'rgba(52,211,153,0.35)',
  },
];

export default function Projects3D() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState(null);

  const prev = () => setActive(i => (i - 1 + projects.length) % projects.length);
  const next = () => setActive(i => (i + 1) % projects.length);

  return (
    <section id="projects" className="proj-section">
      {/* Background glows */}
      <div className="proj-glow proj-glow-tr" />
      <div className="proj-glow proj-glow-bl" />

      <div ref={ref} className="proj-container">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="proj-header"
        >
          <span className="proj-eyebrow">Portfolio</span>
          <h2 className="proj-title">
            Featured <span className="proj-title-accent">Projects</span>
          </h2>
          <p className="proj-subtitle">Real-world projects built with modern tech stacks.</p>
        </motion.div>

        {/* ── Cards carousel ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="proj-carousel-wrapper"
        >
          {/* Nav buttons */}
          <button className="proj-nav proj-nav-prev" onClick={prev} aria-label="previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="proj-nav proj-nav-next" onClick={next} aria-label="next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          {/* Card track */}
          <div className="proj-track">
            {projects.map((p, i) => {
              const offset = i - active;
              const isActive = offset === 0;
              const isLeft = offset === -1 || (active === 0 && i === projects.length - 1);
              const isRight = offset === 1 || (active === projects.length - 1 && i === 0);
              const visible = isActive || isLeft || isRight;

              return (
                <motion.div
                  key={p.id}
                  animate={{
                    x: isActive ? 0 : isRight ? '55%' : '-55%',
                    scale: isActive ? 1 : 0.82,
                    opacity: isActive ? 1 : visible ? 0.45 : 0,
                    rotateY: isActive ? 0 : isRight ? -12 : 12,
                    zIndex: isActive ? 10 : 1,
                  }}
                  transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                  className="proj-card"
                  style={{ '--accent': p.color }}
                  onClick={() => isActive && setModal(p)}
                >
                  {/* Image area */}
                  <div className="proj-card-img-wrap">
                    <img src={p.image} alt={p.title} className="proj-card-img" />
                    <div className="proj-card-img-overlay" style={{ background: `linear-gradient(to top, #0d0d20 20%, ${p.color}15 100%)` }} />
                    {/* Number badge */}
                    <div className="proj-badge" style={{ background: `${p.color}cc` }}>
                      {i + 1}/{projects.length}
                    </div>
                    {/* Icon */}
                    <div className="proj-icon-badge" style={{ background: `${p.color}22`, border: `1px solid ${p.color}55` }}>
                      <p.icon size={18} color={p.color} />
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="proj-card-body">
                    <h3 className="proj-card-title">{p.title}</h3>
                    <p className="proj-card-sub">{p.subtitle}</p>

                    {/* Tech tags */}
                    <div className="proj-tags">
                      {p.techStack.slice(0, 4).map(t => (
                        <span key={t} className="proj-tag" style={{ background: p.tagColor, border: `1px solid ${p.tagBorder}`, color: p.color }}>
                          {t}
                        </span>
                      ))}
                      {p.techStack.length > 4 && (
                        <span className="proj-tag" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#9ca3af' }}>
                          +{p.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="proj-cta"
                        style={{ color: p.color }}
                      >
                        Click card to see details →
                      </motion.p>
                    )}
                  </div>

                  {/* Glow border on hover */}
                  <div className="proj-card-glow" style={{ boxShadow: `0 0 0 1px ${p.color}30, 0 20px 60px ${p.color}18` }} />
                </motion.div>
              );
            })}
          </div>

          {/* Dot indicators */}
          <div className="proj-dots">
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="proj-dot"
                style={{
                  width: i === active ? 28 : 8,
                  background: i === active ? p.color : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="proj-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
          >
            <motion.div
              className="proj-modal"
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 22, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
              style={{ '--accent': modal.color, boxShadow: `0 0 80px ${modal.color}22, 0 40px 80px rgba(0,0,0,0.6)` }}
            >
              {/* Close */}
              <button className="proj-modal-close" onClick={() => setModal(null)}>
                <X size={20} />
              </button>

              {/* Modal image */}
              <div className="proj-modal-img-wrap">
                <img src={modal.image} alt={modal.title} className="proj-modal-img" />
                <div className="proj-modal-img-overlay" style={{ background: `linear-gradient(to top, #0d0d20 30%, transparent 100%)` }} />
              </div>

              <div className="proj-modal-body">
                {/* Title row */}
                <div className="proj-modal-title-row">
                  <div className="proj-modal-icon" style={{ background: `${modal.color}20`, border: `1px solid ${modal.color}50` }}>
                    <modal.icon size={22} color={modal.color} />
                  </div>
                  <div>
                    <h3 className="proj-modal-title">{modal.title}</h3>
                    <p className="proj-modal-subtitle">{modal.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="proj-modal-desc">{modal.description}</p>

                {/* Highlights */}
                <div className="proj-modal-highlights">
                  <h4 className="proj-modal-section-label">Key Highlights</h4>
                  <ul className="proj-modal-list">
                    {modal.highlights.map((h, i) => (
                      <li key={i} className="proj-modal-list-item">
                        <span className="proj-modal-bullet" style={{ background: modal.color }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack */}
                <div className="proj-modal-tech">
                  <h4 className="proj-modal-section-label">Tech Stack</h4>
                  <div className="proj-tags" style={{ flexWrap: 'wrap' }}>
                    {modal.techStack.map(t => (
                      <span key={t} className="proj-tag" style={{ background: modal.tagColor, border: `1px solid ${modal.tagBorder}`, color: modal.color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="proj-modal-actions">
                  <a
                    href={modal.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="proj-modal-btn proj-modal-btn-secondary"
                  >
                    <Github size={16} /> View on GitHub
                  </a>
                  {modal.liveUrl && (
                    <a
                      href={modal.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="proj-modal-btn proj-modal-btn-primary"
                      style={{ background: modal.color, color: '#0a0a1a' }}
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Styles ─── */}
      <style>{`
        /* section */
        .proj-section {
          position: relative;
          padding: 7rem 0 8rem;
          background: #0a0a1a;
          overflow: hidden;
        }
        .proj-glow {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          filter: blur(160px);
          pointer-events: none;
        }
        .proj-glow-tr { top: -100px; right: -200px; background: rgba(168,85,247,0.06); }
        .proj-glow-bl { bottom: -100px; left: -200px; background: rgba(34,211,238,0.06); }

        .proj-container {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* header */
        .proj-header { text-align: center; margin-bottom: 4rem; }
        .proj-eyebrow {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #22d3ee;
          margin-bottom: 0.75rem;
        }
        .proj-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #fff;
          margin: 0 0 0.75rem;
        }
        .proj-title-accent {
          background: linear-gradient(90deg, #22d3ee, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .proj-subtitle { color: #6b7280; font-size: 1rem; }

        /* carousel */
        .proj-carousel-wrapper {
          position: relative;
          padding: 2rem 0 4rem;
        }
        .proj-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-60%);
          z-index: 20;
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.25s;
        }
        .proj-nav:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.3);
          transform: translateY(-60%) scale(1.08);
        }
        .proj-nav-prev { left: 0; }
        .proj-nav-next { right: 0; }

        .proj-track {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 520px;
          perspective: 1000px;
        }

        /* card */
        .proj-card {
          position: absolute;
          width: 100%;
          max-width: 420px;
          border-radius: 1.25rem;
          background: rgba(13,13,32,0.95);
          overflow: hidden;
          cursor: pointer;
          will-change: transform;
        }
        .proj-card-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .proj-card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .proj-card:hover .proj-card-img { transform: scale(1.05); }
        .proj-card-img-overlay {
          position: absolute; inset: 0;
        }
        .proj-badge {
          position: absolute;
          top: 14px; right: 14px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #fff;
          padding: 3px 10px;
          border-radius: 99px;
          letter-spacing: 0.05em;
        }
        .proj-icon-badge {
          position: absolute;
          bottom: 14px; left: 14px;
          padding: 8px;
          border-radius: 0.6rem;
          display: flex; align-items: center; justify-content: center;
        }
        .proj-card-body { padding: 1.25rem 1.5rem 1.5rem; }
        .proj-card-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 0.2rem;
        }
        .proj-card-sub {
          font-size: 0.8rem;
          color: #6b7280;
          margin: 0 0 1rem;
        }
        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }
        .proj-tag {
          font-size: 0.68rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 99px;
          letter-spacing: 0.03em;
        }
        .proj-cta {
          font-size: 0.78rem;
          font-weight: 600;
          margin: 0;
          letter-spacing: 0.02em;
        }
        .proj-card-glow {
          position: absolute; inset: 0;
          border-radius: 1.25rem;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .proj-card:hover .proj-card-glow { opacity: 1; }

        /* dots */
        .proj-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          position: absolute;
          bottom: 0; left: 0; right: 0;
        }
        .proj-dot {
          height: 8px;
          border-radius: 99px;
          transition: all 0.35s ease;
          cursor: pointer;
          border: none;
        }

        /* modal */
        .proj-modal-backdrop {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
        }
        .proj-modal {
          position: relative;
          width: 100%; max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          background: #0d0d20;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1.5rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        .proj-modal-close {
          position: absolute; top: 1rem; right: 1rem; z-index: 10;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: #9ca3af;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .proj-modal-close:hover { background: rgba(255,255,255,0.15); color: #fff; }
        .proj-modal-img-wrap { position: relative; height: 200px; overflow: hidden; flex-shrink: 0; }
        .proj-modal-img { width: 100%; height: 100%; object-fit: cover; }
        .proj-modal-img-overlay { position: absolute; inset: 0; }
        .proj-modal-body { padding: 1.5rem 1.75rem 2rem; }
        .proj-modal-title-row {
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .proj-modal-icon {
          width: 48px; height: 48px; border-radius: 0.75rem;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .proj-modal-title {
          font-size: 1.4rem; font-weight: 800; color: #fff; margin: 0 0 0.2rem;
        }
        .proj-modal-subtitle { font-size: 0.8rem; color: #6b7280; margin: 0; }
        .proj-modal-desc {
          font-size: 0.9rem; color: #9ca3af; line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .proj-modal-section-label {
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #4b5563; margin: 0 0 0.75rem;
        }
        .proj-modal-highlights { margin-bottom: 1.5rem; }
        .proj-modal-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; }
        .proj-modal-list-item {
          display: flex; align-items: flex-start; gap: 0.6rem;
          font-size: 0.875rem; color: #d1d5db; line-height: 1.5;
        }
        .proj-modal-bullet {
          width: 6px; height: 6px; border-radius: 50%;
          flex-shrink: 0; margin-top: 7px;
        }
        .proj-modal-tech { margin-bottom: 2rem; }
        .proj-modal-actions {
          display: flex; gap: 0.75rem; flex-wrap: wrap;
        }
        .proj-modal-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          border-radius: 0.6rem;
          font-size: 0.85rem; font-weight: 600;
          text-decoration: none; transition: all 0.2s;
        }
        .proj-modal-btn-secondary {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: #e2e8f0;
        }
        .proj-modal-btn-secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.25);
        }
        .proj-modal-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
      `}</style>
    </section>
  );
}