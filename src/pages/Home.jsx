import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import useLessonStore from '../store/lessonStore';
import './Home.css';

const UNITS = [
  { id: 1, title: 'C# and Unity Foundations',                   icon: '⬡', lessons: 15 },
  { id: 2, title: 'OOP and Unity Scripting',               icon: '⬡', lessons: 15 },
  { id: 3, title: '2D Game Systems',                 icon: '⬡', lessons: 15 },
  { id: 4, title: 'Polish and Advanced C#',                   icon: '⬡', lessons: 15 },
  { id: 5, title: 'Final Game Project',       icon: '⬡', lessons: 15 },
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
      "You're back. Good. We have work to do.",
      "Don't keep me waiting.",
      "Your code won't write itself.",
      "Ready when you are. ...Actually I've been ready.",
    ];
    const msg = greetings[Math.floor(Math.random() * greetings.length)];
    setDialogue(msg);
  }, []);

  return (
    <div className="home-page">

      {/* ── STAT ROW ── */}
      <div className="home-stats">
        <div className="stat-card">
          <span className="stat-value">{level}</span>
          <span className="stat-label">Level</span>
          <div className="stat-bar-track">
            <div className="stat-bar-fill" style={{ width: `${levelProgress}%` }} />
          </div>
          <span className="stat-sublabel">{xpToNextLevel} XP to next</span>
        </div>

        <div className="stat-card stat-card--xp">
          <span className="stat-value">{xp.toLocaleString()}</span>
          <span className="stat-label">Total XP</span>
          <span className="stat-icon">✦</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">{totalCompleted}<span className="stat-value-denom">/{totalLessons}</span></span>
          <span className="stat-label">Lessons Done</span>
          <div className="stat-bar-track">
            <div className="stat-bar-fill stat-bar-fill--cyan" style={{ width: `${overallPct}%` }} />
          </div>
          <span className="stat-sublabel">{overallPct}% complete</span>
        </div>

        <div
          className="stat-card stat-card--shop"
          onClick={() => navigate('/shop')}
          role="button"
          tabIndex={0}
        >
          <span className="stat-shop-icon">🛍️</span>
          <span className="stat-label">Closet</span>
          <span className="stat-sublabel">Lv.{level} unlocks</span>
          <span className="stat-shop-arrow">→</span>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="home-cta">
        {lastVisited ? (
          <button
            className="cta-btn cta-btn--primary"
            onClick={() => navigate(`/lesson/${lastVisited}`)}
          >
            <span className="cta-btn-icon">▶</span>
            Continue — Lesson {lastVisited}
          </button>
        ) : (
          <button
            className="cta-btn cta-btn--primary"
            onClick={() => navigate('/lesson/1.1')}
          >
            <span className="cta-btn-icon">▶</span>
            Begin Training
          </button>
        )}
        <p className="cta-sub">
          {totalCompleted === 0
            ? "No prior experience required. Just show up."
            : `${totalLessons - totalCompleted} lessons remaining.`}
        </p>
      </div>

      {/* ── UNIT GRID ── */}
      <div className="home-units">
        <h2 className="home-section-title">
          <span className="section-title-bar" />
          Curriculum
        </h2>
        <div className="unit-grid">
          {UNITS.map(unit => {
            const unlocked = isUnitUnlocked(unit.id);
            const unitCompleted = completedLessons
              ? Object.keys(completedLessons).filter(id => id.startsWith(`${unit.id}.`)).length
              : 0;
            const unitPct = Math.round((unitCompleted / unit.lessons) * 100);

            return (
              <div
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
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Home;