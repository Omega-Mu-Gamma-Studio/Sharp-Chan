import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import useLessonStore from '../store/lessonStore';
import SpotlightCard from '../components/ui/SpotlightCard';
import './Home.css';

const UNITS = [
  { id: 1, title: 'C# and Unity Foundations', icon: '⬡', lessons: 15 },
  { id: 2, title: 'OOP and Unity Scripting',   icon: '⬡', lessons: 15 },
  { id: 3, title: '2D Game Systems',           icon: '⬡', lessons: 15 },
  { id: 4, title: 'Polish and Advanced C#',    icon: '⬡', lessons: 15 },
  { id: 5, title: 'Final Game Project',        icon: '⬡', lessons: 15 },
];

const SIBLINGS = [
  { name: 'Java-chan',      lang: 'Java',   glyph: '☕', href: 'https://java-chan.vercel.app',     hue: '#ff8a3d' },
  { name: 'PlusPlus-chan',  lang: 'C++',    glyph: '➕', href: 'https://plusplus-chan.vercel.app', hue: '#6e9bff' },
  { name: 'Rust-chan',      lang: 'Rust',   glyph: '⚙',  href: 'https://rust-chan.vercel.app',     hue: '#ff6e4a' },
  { name: 'Go-chan',        lang: 'Go',     glyph: '◈',  href: 'https://go-chan.vercel.app',       hue: '#4ad7ff' },
  { name: 'Kotlin-chan',    lang: 'Kotlin', glyph: '◆',  href: 'https://kotlin-chan.vercel.app',   hue: '#b46eff' },
  { name: 'Sharp-chan',     lang: 'C#',     glyph: '♯',  href: 'https://sharp-chan.vercel.app',    hue: '#ff2ecb', self: true },
];

const Home = () => {
  const navigate = useNavigate();
  const { lastVisited, xp, level, levelProgress, xpToNextLevel, isUnitUnlocked, completedLessons } = useProgress();
  const { setExpression, setDialogue } = useLessonStore();

  const totalCompleted = completedLessons ? Object.keys(completedLessons).length : 0;
  const totalLessons = 75;
  const overallPct = Math.round((totalCompleted / totalLessons) * 100);

  useEffect(() => {
    setExpression('idle');
    const greetings = [
      "You're back! I was just playtesting your progress.",
      "I've been waiting. The sprites are getting lonely.",
      "Ready to build something amazing? I thought so.",
      "You're here. Good. I was about to start without you. ...Kidding. Mostly.",
      "I've been sketching ideas. You're going to love this one.",
      "Welcome back! I saved you a seat — and a bug to fix.",
      "You're right on time. I was just about to ship something.",
    ];
    const msg = greetings[Math.floor(Math.random() * greetings.length)];
    setDialogue(msg);
  }, []);

  return (
    <div className="home-page">
      <div className="home-grid">

        {/* ══════════════ MAIN COLUMN ══════════════ */}
        <div className="home-main">

          {/* ── HERO ── */}
          <div className="hero-panel">
            <div className="hero-glow" aria-hidden="true" />
            <span className="hero-kicker">// SESSION ACTIVE</span>
            <h1 className="hero-title">
              Welcome back, <span className="text-gradient">operator</span>.
            </h1>
            <p className="hero-sub">Sharp-chan has your next build queued up.</p>

            <div className="home-cta">
              {lastVisited ? (
                <button className="cta-btn cta-btn--primary" onClick={() => navigate(`/lesson/${lastVisited}`)}>
                  <span className="cta-btn-icon">▶</span>
                  Continue — Lesson {lastVisited}
                </button>
              ) : (
                <button className="cta-btn cta-btn--primary" onClick={() => navigate('/lesson/1.1')}>
                  <span className="cta-btn-icon">▶</span>
                  Begin Training
                </button>
              )}
              <p className="cta-sub">
                {totalCompleted === 0
                  ? 'No prior experience required. Just show up.'
                  : `${totalLessons - totalCompleted} lessons remaining.`}
              </p>
            </div>
          </div>

          {/* ── STAT HUD ── */}
          <div className="home-stats">
            <SpotlightCard className="stat-card">
              <span className="stat-value">{level}</span>
              <span className="stat-label">Level</span>
              <div className="stat-bar-track">
                <div className="stat-bar-fill" style={{ width: `${levelProgress}%` }} />
              </div>
              <span className="stat-sublabel">{xpToNextLevel} XP to next</span>
            </SpotlightCard>

            <SpotlightCard className="stat-card stat-card--xp">
              <span className="stat-value">{xp.toLocaleString()}</span>
              <span className="stat-label">Total XP</span>
              <span className="stat-icon">✦</span>
            </SpotlightCard>

            <SpotlightCard className="stat-card">
              <span className="stat-value">{totalCompleted}<span className="stat-value-denom">/{totalLessons}</span></span>
              <span className="stat-label">Lessons Done</span>
              <div className="stat-bar-track">
                <div className="stat-bar-fill stat-bar-fill--cyan" style={{ width: `${overallPct}%` }} />
              </div>
              <span className="stat-sublabel">{overallPct}% complete</span>
            </SpotlightCard>

            <SpotlightCard
              as="div"
              className="stat-card stat-card--shop"
              onClick={() => navigate('/shop')}
              role="button"
              tabIndex={0}
            >
              <span className="stat-shop-icon">🛍️</span>
              <span className="stat-label">Closet</span>
              <span className="stat-sublabel">Lv.{level} unlocks</span>
              <span className="stat-shop-arrow">→</span>
            </SpotlightCard>
          </div>

          {/* ── MISSION GRID ── */}
          <div className="home-units">
            <h2 className="home-section-title">
              <span className="section-title-bar" />
              Curriculum
            </h2>
            <div className="unit-grid">
              {UNITS.map((unit) => {
                const unlocked = isUnitUnlocked(unit.id);
                const unitCompleted = completedLessons
                  ? Object.keys(completedLessons).filter(id => id.startsWith(`${unit.id}.`)).length
                  : 0;
                const unitPct = Math.round((unitCompleted / unit.lessons) * 100);

                return (
                  <SpotlightCard
                    key={unit.id}
                    className={`unit-card ${unlocked ? 'unit-card--active' : 'unit-card--locked'}`}
                    onClick={() => unlocked && navigate(`/unit/${unit.id}`)}
                    role={unlocked ? 'button' : undefined}
                    tabIndex={unlocked ? 0 : undefined}
                  >
                    <div className="unit-card-head">
                      <span className="unit-card-num">U{unit.id}</span>
                      {unlocked ? (
                        <span className="unit-card-pct">{unitPct}%</span>
                      ) : (
                        <span className="unit-card-lock">🔒</span>
                      )}
                    </div>
                    <span className="unit-card-title">{unit.title}</span>
                    <span className="unit-card-meta">{unit.lessons} lessons</span>
                    {unlocked && (
                      <div className="unit-card-bar-track">
                        <div className="unit-card-bar-fill" style={{ width: `${unitPct}%` }} />
                      </div>
                    )}
                  </SpotlightCard>
                );
              })}
            </div>
          </div>

        </div>

        {/* ══════════════ SIDE COLUMN — MEET MY SISTERS ══════════════ */}
        <aside className="siblings-panel">
          <h2 className="home-section-title">
            <span className="section-title-bar" />
            Meet My Sisters
          </h2>
          <p className="siblings-intro">Same studio, different language cores. Say hi.</p>

          <div className="siblings-list">
            {SIBLINGS.map((sib, i) => (
              <motion.a
                key={sib.name}
                href={sib.self ? undefined : sib.href}
                target={sib.self ? undefined : '_blank'}
                rel={sib.self ? undefined : 'noopener noreferrer'}
                className={`sibling-card ${sib.self ? 'sibling-card--self' : ''}`}
                style={{ '--sib-hue': sib.hue }}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35, ease: 'easeOut' }}
              >
                <span className="sibling-glyph">{sib.glyph}</span>
                <span className="sibling-info">
                  <span className="sibling-name">{sib.name}</span>
                  <span className="sibling-lang">{sib.lang}</span>
                </span>
                {sib.self ? (
                  <span className="sibling-tag">You're here</span>
                ) : (
                  <span className="sibling-arrow">↗</span>
                )}
              </motion.a>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Home;
