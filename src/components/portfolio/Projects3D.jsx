import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Bus, ShoppingCart, FileText, TrendingDown } from 'lucide-react';

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
    githubUrl: 'https://github.com/bxnxrx/Vango_Driver_App',
    liveUrl: null,
    color: '#22d3ee',
    accentColor: '#0891b2',
    icon: Bus,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=700&h=420&fit=crop',
    tagColor: 'rgba(34,211,238,0.12)',
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
    githubUrl: 'https://github.com/Sakith-9900/PR-File-Movement-Tracking-System',
    liveUrl: null,
    color: '#a855f7',
    accentColor: '#7c3aed',
    icon: ShoppingCart,
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=700&h=420&fit=crop',
    tagColor: 'rgba(168,85,247,0.12)',
    tagBorder: 'rgba(168,85,247,0.35)',
  },
  {
    id: 3,
    title: 'Syncra',
    subtitle: 'Cloud-Powered Note Ecosystem',
    description:
      'A cross-platform mobile note-taking application built with Flutter that offers seamless cloud synchronization, offline support, and a clean minimal interface for capturing and organising ideas.',
    highlights: [
      'Cross-platform mobile app (iOS & Android) with Flutter/Dart',
      'Cloud sync with Firebase Firestore',
      'Offline-first with SQLite local database',
      'Bloc state management for predictable UI state',
    ],
    techStack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'SQLite', 'Bloc'],
    githubUrl: 'https://github.com/Sakith-9900/Note_sharing_app',
    liveUrl: null,
    color: '#34d399',
    accentColor: '#059669',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=700&h=420&fit=crop',
    tagColor: 'rgba(52,211,153,0.12)',
    tagBorder: 'rgba(52,211,153,0.35)',
  },
  {
    id: 4,
    title: 'ChurnPulse',
    subtitle: 'SaaS Churn Prediction Dashboard',
    description:
      'A SaaS churn prediction dashboard engineered for Customer Success Managers to surface ML-driven customer risk scores and actionable metrics. Features an automated background ML pipeline, a secure RESTful API, and interactive data visualisations.',
    highlights: [
      'Responsive frontend with sortable account risk tables, real-time KPI components, and interactive data visualisations for account login patterns',
      'Secure RESTful API using FastAPI with JWT authentication and an optimised relational schema across user records, billing history, and prediction vectors',
      'Soft-Voting Ensemble Classifier and Pruned Regression Decision Tree to classify churn risk and forecast customer lifetime value',
      'Automated background ML pipeline with a scheduler to trigger weekly batch predictions and asynchronously commit outputs to the database',
    ],
    techStack: ['FastAPI', 'React', 'PostgreSQL', 'scikit-learn', 'JWT Auth', 'Python'],
    githubUrl: 'https://github.com/Sakith-9900/churnpulse',
    liveUrl: null,
    color: '#f97316',
    accentColor: '#ea580c',
    icon: TrendingDown,
    inProgress: true,
    year: '2026',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=420&fit=crop',
    tagColor: 'rgba(249,115,22,0.12)',
    tagBorder: 'rgba(249,115,22,0.35)',
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
                    x: isActive ? 0 : isRight ? '58%' : '-58%',
                    scale: isActive ? 1 : 0.80,
                    opacity: isActive ? 1 : visible ? 0.38 : 0,
                    rotateY: isActive ? 0 : isRight ? -14 : 14,
                    zIndex: isActive ? 10 : 1,
                  }}
                  transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                  className="proj-card"
                  style={{ '--accent': p.color }}
                  onClick={() => isActive && setModal(p)}
                >
                  {/* Accent top border */}
                  <div className="proj-card-accent-bar" style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}44)` }} />

                  {/* Image area */}
                  <div className="proj-card-img-wrap">
                    <img src={p.image} alt={p.title} className="proj-card-img" />
                    <div className="proj-card-img-overlay" style={{ background: `linear-gradient(to top, #0d0d20 15%, transparent 70%)` }} />

                    {/* Top-right: number badge */}
                    <div className="proj-badge" style={{ background: `${p.color}cc` }}>
                      {String(i + 1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}
                    </div>

                    {/* Top-left: In Progress badge OR icon */}
                    {p.inProgress ? (
                      <div className="proj-inprogress-badge">
                        <span className="proj-inprogress-dot" />
                        In Progress
                      </div>
                    ) : (
                      <div className="proj-icon-badge" style={{ background: `${p.color}22`, border: `1px solid ${p.color}55` }}>
                        <p.icon size={16} color={p.color} />
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="proj-card-body">
                    {/* Title row */}
                    <div className="proj-card-title-row">
                      {p.inProgress && (
                        <div className="proj-icon-inline" style={{ background: `${p.color}22`, border: `1px solid ${p.color}44` }}>
                          <p.icon size={14} color={p.color} />
                        </div>
                      )}
                      <div>
                        <h3 className="proj-card-title">{p.title}</h3>
                        <p className="proj-card-sub">{p.subtitle}</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="proj-card-divider" style={{ background: `linear-gradient(90deg, ${p.color}50, transparent)` }} />

                    {/* Tech tags */}
                    <div className="proj-tags">
                      {p.techStack.slice(0, 4).map(t => (
                        <span key={t} className="proj-tag" style={{ background: p.tagColor, border: `1px solid ${p.tagBorder}`, color: p.color }}>
                          {t}
                        </span>
                      ))}
                      {p.techStack.length > 4 && (
                        <span className="proj-tag" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#6b7280' }}>
                          +{p.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="proj-cta"
                        style={{ color: p.color, borderColor: `${p.color}30` }}
                      >
                        <span>View details</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </motion.div>
                    )}
                  </div>

                  {/* Hover glow border */}
                  <div className="proj-card-glow" style={{ boxShadow: `inset 0 0 0 1px ${p.color}35, 0 24px 64px ${p.color}15` }} />
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
                  background: i === active ? p.color : 'rgba(255,255,255,0.18)',
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
              initial={{ scale: 0.88, opacity: 0, y: 32 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 32 }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              onClick={e => e.stopPropagation()}
              style={{ '--accent': modal.color, borderColor: `${modal.color}30` }}
            >
              {/* Accent top bar */}
              <div className="proj-modal-accent-bar" style={{ background: `linear-gradient(90deg, ${modal.color}, ${modal.color}33)` }} />

              {/* Close */}
              <button className="proj-modal-close" onClick={() => setModal(null)}>
                <X size={18} />
              </button>

              {/* Modal image */}
              <div className="proj-modal-img-wrap">
                <img src={modal.image} alt={modal.title} className="proj-modal-img" />
                <div className="proj-modal-img-overlay" style={{ background: `linear-gradient(to top, #0d0d20 25%, ${modal.color}08 100%)` }} />
                {/* Icon overlay on image */}
                <div className="proj-modal-img-icon" style={{ background: `${modal.color}22`, border: `1px solid ${modal.color}55` }}>
                  <modal.icon size={20} color={modal.color} />
                </div>
              </div>

              <div className="proj-modal-body">

                {/* ── Title block ── */}
                <div className="proj-modal-title-block">
                  <div className="proj-modal-title-row">
                    <h3 className="proj-modal-title">{modal.title}</h3>
                    {modal.inProgress && (
                      <span className="proj-modal-inprogress-tag">
                        <span className="proj-inprogress-dot" />
                        In Progress · {modal.year}
                      </span>
                    )}
                  </div>
                  <p className="proj-modal-subtitle">{modal.subtitle}</p>
                </div>

                {/* ── Description ── */}
                <p className="proj-modal-desc">{modal.description}</p>

                {/* ── Highlights ── */}
                <div className="proj-modal-section">
                  <h4 className="proj-modal-section-label" style={{ color: modal.color }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 6, verticalAlign: 'middle' }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    Key Highlights
                  </h4>
                  <ul className="proj-modal-list">
                    {modal.highlights.map((h, i) => (
                      <li key={i} className="proj-modal-list-item">
                        <span className="proj-modal-bullet" style={{ background: modal.color }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ── Tech Stack ── */}
                <div className="proj-modal-section">
                  <h4 className="proj-modal-section-label" style={{ color: modal.color }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 6, verticalAlign: 'middle' }}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                    Tech Stack
                  </h4>
                  <div className="proj-modal-tags">
                    {modal.techStack.map(t => (
                      <span key={t} className="proj-tag" style={{ background: modal.tagColor, border: `1px solid ${modal.tagBorder}`, color: modal.color, fontSize: '0.75rem', padding: '4px 12px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Actions ── */}
                <div className="proj-modal-actions">
                  <a
                    href={modal.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="proj-modal-btn proj-modal-btn-secondary"
                  >
                    <Github size={15} /> View on GitHub
                  </a>
                  {modal.liveUrl && (
                    <a
                      href={modal.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="proj-modal-btn proj-modal-btn-primary"
                      style={{ background: modal.color, color: '#0a0a1a' }}
                    >
                      <ExternalLink size={15} /> Live Demo
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
        /* ── Section ── */
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
        .proj-glow-tr { top: -100px; right: -200px; background: rgba(168,85,247,0.07); }
        .proj-glow-bl { bottom: -100px; left: -200px; background: rgba(34,211,238,0.07); }

        .proj-container {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* ── Header ── */
        .proj-header { text-align: center; margin-bottom: 4rem; }
        .proj-eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #22d3ee;
          margin-bottom: 0.75rem;
        }
        .proj-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #fff;
          margin: 0 0 0.75rem;
          line-height: 1.15;
        }
        .proj-title-accent {
          background: linear-gradient(90deg, #22d3ee, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .proj-subtitle { color: #6b7280; font-size: 1rem; margin: 0; }

        /* ── Carousel ── */
        .proj-carousel-wrapper {
          position: relative;
          padding: 2rem 0 4.5rem;
        }
        .proj-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-60%);
          z-index: 20;
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.25s;
        }
        .proj-nav:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.25);
          color: #fff;
          transform: translateY(-60%) scale(1.08);
        }
        .proj-nav-prev { left: 0; }
        .proj-nav-next { right: 0; }

        .proj-track {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 480px;
          perspective: 1200px;
        }

        /* ── Card ── */
        .proj-card {
          position: absolute;
          width: 100%;
          max-width: 400px;
          border-radius: 1.25rem;
          background: #0d0d22;
          border: 1px solid rgba(255,255,255,0.07);
          overflow: hidden;
          cursor: pointer;
          will-change: transform;
          transition: border-color 0.3s;
        }
        .proj-card:hover {
          border-color: rgba(255,255,255,0.14);
        }
        .proj-card-accent-bar {
          height: 3px;
          width: 100%;
          flex-shrink: 0;
        }
        .proj-card-img-wrap {
          position: relative;
          height: 190px;
          overflow: hidden;
        }
        .proj-card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.55s ease;
        }
        .proj-card:hover .proj-card-img { transform: scale(1.06); }
        .proj-card-img-overlay {
          position: absolute; inset: 0;
        }
        .proj-badge {
          position: absolute;
          top: 12px; right: 12px;
          font-size: 0.68rem;
          font-weight: 700;
          color: #fff;
          padding: 3px 10px;
          border-radius: 99px;
          letter-spacing: 0.06em;
          backdrop-filter: blur(4px);
        }
        .proj-icon-badge {
          position: absolute;
          top: 12px; left: 12px;
          padding: 7px;
          border-radius: 0.55rem;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(4px);
        }
        .proj-card-body {
          padding: 1.1rem 1.4rem 1.4rem;
        }
        .proj-card-title-row {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          margin-bottom: 0.6rem;
        }
        .proj-icon-inline {
          padding: 6px;
          border-radius: 0.45rem;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .proj-card-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #f1f5f9;
          margin: 0 0 0.15rem;
          letter-spacing: -0.01em;
        }
        .proj-card-sub {
          font-size: 0.76rem;
          color: #64748b;
          margin: 0;
          line-height: 1.4;
        }
        .proj-card-divider {
          height: 1px;
          margin: 0.85rem 0;
          border-radius: 99px;
        }
        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-bottom: 0.9rem;
        }
        .proj-tag {
          font-size: 0.68rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 99px;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }
        .proj-cta {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          font-weight: 600;
          margin: 0;
          letter-spacing: 0.03em;
          border-top: 1px solid;
          padding-top: 0.75rem;
          width: 100%;
        }
        .proj-card-glow {
          position: absolute; inset: 0;
          border-radius: 1.25rem;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s;
        }
        .proj-card:hover .proj-card-glow { opacity: 1; }

        /* ── Dots ── */
        .proj-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          position: absolute;
          bottom: 0; left: 0; right: 0;
        }
        .proj-dot {
          height: 7px;
          border-radius: 99px;
          transition: all 0.35s ease;
          cursor: pointer;
          border: none;
        }

        /* ── In-progress badge (card image) ── */
        .proj-inprogress-badge {
          position: absolute;
          top: 12px; left: 12px;
          display: flex; align-items: center; gap: 5px;
          background: rgba(249,115,22,0.15);
          border: 1px solid rgba(249,115,22,0.4);
          color: #fb923c;
          font-size: 0.63rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 99px;
          backdrop-filter: blur(6px);
        }
        .proj-inprogress-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #fb923c;
          flex-shrink: 0;
          animation: ipPulse 1.6s ease-in-out infinite;
        }
        @keyframes ipPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.65); }
        }

        /* ── Modal ── */
        .proj-modal-backdrop {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(5,5,18,0.85);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
        }
        .proj-modal {
          position: relative;
          width: 100%; max-width: 580px;
          max-height: 92vh;
          overflow-y: auto;
          background: #0d0d22;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1.5rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.08) transparent;
        }
        .proj-modal-accent-bar {
          height: 3px;
          width: 100%;
          border-radius: 1.5rem 1.5rem 0 0;
          flex-shrink: 0;
        }
        .proj-modal-close {
          position: absolute; top: 1rem; right: 1rem; z-index: 10;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .proj-modal-close:hover { background: rgba(255,255,255,0.12); color: #fff; }

        .proj-modal-img-wrap {
          position: relative; height: 210px; overflow: hidden; flex-shrink: 0;
        }
        .proj-modal-img { width: 100%; height: 100%; object-fit: cover; }
        .proj-modal-img-overlay { position: absolute; inset: 0; }
        .proj-modal-img-icon {
          position: absolute;
          bottom: 14px; left: 16px;
          width: 40px; height: 40px;
          border-radius: 0.65rem;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(6px);
        }

        .proj-modal-body {
          padding: 1.5rem 1.75rem 2rem;
        }

        /* Title block */
        .proj-modal-title-block {
          margin-bottom: 1rem;
        }
        .proj-modal-title-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
          margin-bottom: 0.3rem;
        }
        .proj-modal-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #f1f5f9;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .proj-modal-subtitle {
          font-size: 0.82rem;
          color: #64748b;
          margin: 0;
          line-height: 1.4;
        }
        .proj-modal-inprogress-tag {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(249,115,22,0.12);
          border: 1px solid rgba(249,115,22,0.38);
          color: #fb923c;
          font-size: 0.63rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 99px;
          flex-shrink: 0;
        }

        /* Description */
        .proj-modal-desc {
          font-size: 0.875rem;
          color: #94a3b8;
          line-height: 1.75;
          margin: 0 0 1.5rem;
          text-align: left;
        }

        /* Section blocks */
        .proj-modal-section {
          margin-bottom: 1.5rem;
          padding: 1rem 1.1rem;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.85rem;
        }
        .proj-modal-section-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin: 0 0 0.85rem;
          display: flex;
          align-items: center;
        }

        /* Highlights list */
        .proj-modal-list {
          list-style: none;
          margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 0.65rem;
        }
        .proj-modal-list-item {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
          font-size: 0.85rem;
          color: #cbd5e1;
          line-height: 1.6;
          text-align: left;
        }
        .proj-modal-bullet {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 7px;
        }

        /* Tech tags in modal */
        .proj-modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        /* Action buttons */
        .proj-modal-actions {
          display: flex; gap: 0.75rem; flex-wrap: wrap;
          padding-top: 0.5rem;
        }
        .proj-modal-btn {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.6rem 1.3rem;
          border-radius: 0.65rem;
          font-size: 0.83rem; font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          border: 1px solid transparent;
        }
        .proj-modal-btn-secondary {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.1);
          color: #e2e8f0;
        }
        .proj-modal-btn-secondary:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.22);
          color: #fff;
          transform: translateY(-1px);
        }
        .proj-modal-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
      `}</style>
    </section>
  );
}