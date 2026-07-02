import { useRef, useCallback } from 'react';

/**
 * SpotlightCard
 *
 * Wraps any card content with a cursor-reactive neon glow.
 * Pairs with the `.spotlight` utility class in globals.css —
 * this component just handles the pointer tracking, the CSS
 * handles the actual gradient rendering.
 *
 * Usage:
 *   <SpotlightCard className="unit-card unit-card--active">
 *     ...card content...
 *   </SpotlightCard>
 */
const SpotlightCard = ({ as: Tag = 'div', className = '', children, style, ...rest }) => {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
    el.style.setProperty('--spot-opacity', '1');
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--spot-opacity', '0');
  }, []);

  return (
    <Tag
      ref={ref}
      className={`spotlight ${className}`}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default SpotlightCard;
