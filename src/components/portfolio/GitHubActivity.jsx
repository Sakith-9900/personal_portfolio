import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const GITHUB_USERNAME = 'Sakith-9900';

/* ─── Blue colour levels (matching photo 2 palette) ───────── */
const LEVEL_COLORS_MAPPED = {
  0: 'rgba(255,255,255,0.05)',
  1: '#cae8ff',
  2: '#79c0ff',
  3: '#1f6feb',
  4: '#0a3069',
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

/* ─── Build grid columns from flat list ─────────────────────── */
function buildColumns(contributions) {
  if (!contributions || contributions.length === 0) return [];
  const columns = [];
  let col = [];

  const firstDay = new Date(contributions[0].date).getDay();
  for (let i = 0; i < firstDay; i++) col.push(null);

  contributions.forEach(day => {
    col.push(day);
    if (new Date(day.date).getDay() === 6) {
      columns.push(col);
      col = [];
    }
  });
  if (col.length) {
    while (col.length < 7) col.push(null);
    columns.push(col);
  }
  return columns;
}

/* ─── Month label positions ──────────────────────────────────── */
function getMonthLabels(columns) {
  const labels = [];
  let lastMonth = -1;
  columns.forEach((col, ci) => {
    const first = col.find(d => d !== null);
    if (first) {
      const m = new Date(first.date).getMonth();
      if (m !== lastMonth) {
        labels.push({ month: MONTHS[m], col: ci });
        lastMonth = m;
      }
    }
  });
  return labels;
}

/* ─── Calculate max streak ─────────────────────────────────── */
function calcMaxStreak(contributions) {
  let max = 0, cur = 0;
  for (const d of contributions) {
    if (d.count > 0) { cur++; max = Math.max(max, cur); }
    else cur = 0;
  }
  return max;
}

/* ─── Tooltip ──────────────────────────────────────────────── */
function Tooltip({ data, pos }) {
  if (!data) return null;
  const d = new Date(data.date);
  const label = d.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
  return (
    <div className="gh-tooltip" style={{ left: pos.x, top: pos.y - 50 }}>
      <strong>{data.count}</strong> contribution{data.count !== 1 ? 's' : ''} on {label}
    </div>
  );
}

export default function GitHubActivity() {
  const ref        = useRef(null);
  const scrollRef  = useRef(null);
  const isInView   = useInView(ref, { once: true, margin: '-80px' });

  const [contributions, setContributions] = useState([]);
  const [totalContribs, setTotalContribs] = useState(0);
  const [maxStreak, setMaxStreak]         = useState(0);
  const [totalStars, setTotalStars]       = useState(0);
  const [loading, setLoading]             = useState(true);
  const [tooltip, setTooltip]             = useState({ data: null, pos: { x: 0, y: 0 } });

  /* ── Fetch real GitHub data ── */
  useEffect(() => {
    async function fetchData() {
      try {
        /* 1. Contribution heatmap via public proxy API */
        const contribRes = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        if (contribRes.ok) {
          const json = await contribRes.json();
          const contribs = json.contributions || [];
          setContributions(contribs);
          setTotalContribs(contribs.reduce((s, d) => s + d.count, 0));
          setMaxStreak(calcMaxStreak(contribs));
        }

        /* 2. Total stars from GitHub REST API */
        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`
        );
        if (reposRes.ok) {
          const repos = await reposRes.json();
          const stars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
          setTotalStars(stars);
        }
      } catch (err) {
        console.error('GitHub API error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /* ── Auto-scroll to most recent (right) ── */
  useEffect(() => {
    if (!loading && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [loading]);

  const columns     = buildColumns(contributions);
  const monthLabels = getMonthLabels(columns);
  const CELL = 13;
  const GAP  = 3;

  const handleMouseEnter = (day, e) => {
    if (!day) return;
    const rect       = e.currentTarget.getBoundingClientRect();
    const parentRect = scrollRef.current.getBoundingClientRect();
    setTooltip({
      data: day,
      pos: {
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top  - parentRect.top,
      },
    });
  };

  const stats = [
    { label: 'TOTAL CONTRIBUTIONS', value: loading ? '—' : totalContribs.toLocaleString() },
    { label: 'MAX STREAK',          value: loading ? '—' : `${maxStreak} days` },
    { label: 'TOTAL STARS',         value: loading ? '—' : `${totalStars}` },
  ];

  return (
    <section className="gh-section" id="github-activity">
      <div className="gh-bg-glow" />

      <div ref={ref} className="gh-container">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="gh-header"
        >
          <span className="gh-eyebrow">Open Source</span>
          <h2 className="gh-title">
            GitHub <span className="gh-title-accent">Activity</span>
          </h2>
          <p className="gh-subtitle">
            Real-time contribution heatmap from my GitHub profile.
          </p>
        </motion.div>

        {/* ── Main heatmap card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="gh-heatmap-card"
        >
          {/* Card header row */}
          <div className="gh-card-header">
            <div className="gh-profile-row">
              <div className="gh-avatar">
                <img
                  src={`https://avatars.githubusercontent.com/${GITHUB_USERNAME}`}
                  alt={GITHUB_USERNAME}
                  className="gh-avatar-img"
                  onError={e => {
                    e.currentTarget.src =
                      `https://ui-avatars.com/api/?name=SM&background=0d1117&color=79c0ff`;
                  }}
                />
              </div>
              <div>
                <div className="gh-username">@{GITHUB_USERNAME}</div>
                <div className="gh-contrib-sub">
                  {loading ? 'Loading…' : `${totalContribs.toLocaleString()} contributions in the last year`}
                </div>
              </div>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="gh-profile-btn"
            >
              View Profile →
            </a>
          </div>

          {/* ── Scrollable heatmap ── */}
          {loading ? (
            <div className="gh-loading">
              <div className="gh-spinner" />
              <span>Fetching GitHub data…</span>
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="gh-grid-scroll"
              onMouseLeave={() => setTooltip({ data: null, pos: { x: 0, y: 0 } })}
            >
              <div style={{ position: 'relative' }}>
                {/* Month labels */}
                <div className="gh-month-row">
                  <div style={{ width: 30, flexShrink: 0 }} />
                  <div style={{ position: 'relative', flex: 1 }}>
                    {monthLabels.map(({ month, col }) => (
                      <span
                        key={`${month}-${col}`}
                        className="gh-month-label"
                        style={{ left: col * (CELL + GAP) }}
                      >
                        {month}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Day labels + grid */}
                <div style={{ display: 'flex' }}>
                  <div className="gh-day-labels">
                    {DAYS.map((d, i) => (
                      <div key={i} className="gh-day-label" style={{ height: CELL, marginBottom: GAP }}>
                        {d}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: GAP }}>
                    {columns.map((col, ci) => (
                      <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
                        {col.map((day, di) => (
                          <div
                            key={di}
                            className={`gh-cell${day ? ' gh-cell-active' : ''}`}
                            style={{
                              width: CELL,
                              height: CELL,
                              backgroundColor: day
                                ? LEVEL_COLORS_MAPPED[day.level ?? 0]
                                : 'transparent',
                              border: day ? '1px solid rgba(255,255,255,0.06)' : 'none',
                            }}
                            onMouseEnter={e => handleMouseEnter(day, e)}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="gh-legend">
                  <span className="gh-legend-text">Less</span>
                  {Object.values(LEVEL_COLORS_MAPPED).map((c, i) => (
                    <div
                      key={i}
                      className="gh-cell"
                      style={{ width: CELL, height: CELL, backgroundColor: c, border: '1px solid rgba(255,255,255,0.06)' }}
                    />
                  ))}
                  <span className="gh-legend-text">More</span>
                </div>

                {/* Tooltip */}
                {tooltip.data && <Tooltip data={tooltip.data} pos={tooltip.pos} />}
              </div>
            </div>
          )}

          {/* ── Stats bar (photo 2 style) ── */}
          <div className="gh-stats-bar">
            {stats.map(s => (
              <div key={s.label} className="gh-stat-item">
                <div className="gh-stat-label">{s.label}</div>
                <div className="gh-stat-value">{s.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─────────── Styles ─────────── */}
      <style>{`
        .gh-section {
          position: relative;
          padding: 6rem 0 8rem;
          background: #0a0a1a;
          overflow: hidden;
        }
        .gh-bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 55% 50% at 50% 100%,
            rgba(31,111,235,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .gh-container {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* header */
        .gh-header { text-align: center; margin-bottom: 3rem; }
        .gh-eyebrow {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #79c0ff;
          margin-bottom: 0.75rem;
        }
        .gh-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #fff;
          margin: 0 0 0.75rem;
          line-height: 1.1;
        }
        .gh-title-accent {
          background: linear-gradient(90deg, #79c0ff, #1f6feb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gh-subtitle {
          color: #6b7280;
          font-size: 1rem;
          max-width: 36rem;
          margin: 0 auto;
        }

        /* card */
        .gh-heatmap-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.25rem;
          overflow: hidden;
        }
        .gh-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 1.5rem 1.75rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .gh-profile-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .gh-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(121,192,255,0.4);
          flex-shrink: 0;
        }
        .gh-avatar-img { width: 100%; height: 100%; object-fit: cover; }
        .gh-username {
          font-size: 0.95rem;
          font-weight: 700;
          color: #e2e8f0;
        }
        .gh-contrib-sub {
          font-size: 0.78rem;
          color: #6b7280;
          margin-top: 0.15rem;
        }
        .gh-profile-btn {
          font-size: 0.8rem;
          color: #79c0ff;
          border: 1px solid rgba(121,192,255,0.35);
          border-radius: 0.5rem;
          padding: 0.4rem 0.85rem;
          text-decoration: none;
          transition: all 0.25s;
          white-space: nowrap;
        }
        .gh-profile-btn:hover {
          background: rgba(121,192,255,0.1);
          border-color: rgba(121,192,255,0.7);
        }

        /* grid scroll */
        .gh-grid-scroll {
          overflow-x: auto;
          padding: 1.25rem 1.75rem 0.75rem;
          position: relative;
          scrollbar-width: thin;
          scrollbar-color: rgba(121,192,255,0.25) transparent;
        }
        .gh-grid-scroll::-webkit-scrollbar { height: 5px; }
        .gh-grid-scroll::-webkit-scrollbar-thumb {
          background: rgba(121,192,255,0.3);
          border-radius: 99px;
        }

        /* month row */
        .gh-month-row {
          display: flex;
          margin-bottom: 4px;
          height: 16px;
        }
        .gh-month-label {
          position: absolute;
          font-size: 0.68rem;
          color: #6b7280;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        /* day labels */
        .gh-day-labels {
          display: flex;
          flex-direction: column;
          margin-right: 6px;
          padding-top: 1px;
        }
        .gh-day-label {
          font-size: 0.65rem;
          color: #4b5563;
          width: 24px;
          text-align: right;
          line-height: 13px;
        }

        /* cells */
        .gh-cell {
          border-radius: 2px;
          transition: transform 0.12s, box-shadow 0.12s;
          flex-shrink: 0;
        }
        .gh-cell-active:hover {
          transform: scale(1.4);
          box-shadow: 0 0 8px rgba(121,192,255,0.55);
          z-index: 10;
        }

        /* legend */
        .gh-legend {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 10px;
          margin-bottom: 4px;
          justify-content: flex-end;
        }
        .gh-legend-text {
          font-size: 0.68rem;
          color: #4b5563;
          margin: 0 2px;
        }

        /* stats bar (photo 2 style) */
        .gh-stats-bar {
          display: flex;
          align-items: stretch;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .gh-stat-item {
          flex: 1;
          padding: 1.1rem 1.5rem;
          border-right: 1px solid rgba(255,255,255,0.06);
          transition: background 0.25s;
        }
        .gh-stat-item:last-child { border-right: none; }
        .gh-stat-item:hover { background: rgba(121,192,255,0.04); }
        .gh-stat-label {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 0.35rem;
        }
        .gh-stat-value {
          font-size: 1.7rem;
          font-weight: 800;
          color: #79c0ff;
          line-height: 1;
        }

        /* loading */
        .gh-loading {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: center;
          padding: 3rem;
          color: #6b7280;
          font-size: 0.9rem;
        }
        .gh-spinner {
          width: 20px; height: 20px;
          border: 2px solid rgba(121,192,255,0.2);
          border-top-color: #79c0ff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* tooltip */
        .gh-tooltip {
          position: absolute;
          background: rgba(10,10,26,0.97);
          border: 1px solid rgba(121,192,255,0.35);
          border-radius: 0.5rem;
          padding: 0.4rem 0.75rem;
          font-size: 0.72rem;
          color: #e2e8f0;
          white-space: nowrap;
          pointer-events: none;
          z-index: 50;
          transform: translateX(-50%);
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.6);
        }
        .gh-tooltip strong { color: #79c0ff; }
      `}</style>
    </section>
  );
}
