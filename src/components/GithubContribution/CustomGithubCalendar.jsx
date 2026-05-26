import React, { useState, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const THEME = ['#f0f0f0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export default function CustomGithubCalendar({ username = "drepradhit", months = 5 }) {
  const calendarRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
      .then(res => res.json())
      .then(json => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [username]);

  const { weeks, totalCount, monthLabels } = useMemo(() => {
    if (!data?.contributions) return { weeks: [], totalCount: 0, monthLabels: [] };

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const cutoff = new Date(today);
    cutoff.setMonth(cutoff.getMonth() - months);
    cutoff.setHours(0, 0, 0, 0);

    const startDay = cutoff.getDay();
    if (startDay !== 0) {
      cutoff.setDate(cutoff.getDate() - startDay);
    }

    const filtered = data.contributions
      .filter(c => {
        const d = new Date(c.date + 'T00:00:00');
        return d >= cutoff && d <= today;
      })
      .sort((a, b) => a.date.localeCompare(b.date));

    let total = 0;
    const weekMap = [];
    let currentWeek = [];

    filtered.forEach(c => {
      const d = new Date(c.date + 'T00:00:00');
      const dayOfWeek = d.getDay();

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weekMap.push(currentWeek);
        currentWeek = [];
      }

      currentWeek.push({ ...c, dateObj: d });
      total += c.count;
    });

    if (currentWeek.length > 0) {
      weekMap.push(currentWeek);
    }

    const labels = [];
    let lastMonth = -1;
    weekMap.forEach((week, weekIdx) => {
      const firstDay = week[0];
      if (firstDay) {
        const m = new Date(firstDay.date + 'T00:00:00').getMonth();
        if (m !== lastMonth) {
          labels.push({ month: MONTHS[m], weekIdx });
          lastMonth = m;
        }
      }
    });

    return { weeks: weekMap, totalCount: total, monthLabels: labels };
  }, [data, months]);

  const [blockSize, setBlockSize] = useState(16);
  const [blockMargin, setBlockMargin] = useState(4);
  const [showDayLabels, setShowDayLabels] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setBlockSize(11);
        setBlockMargin(3);
        setShowDayLabels(false);
      } else if (w < 1024) {
        setBlockSize(14);
        setBlockMargin(4);
        setShowDayLabels(true);
      } else {
        setBlockSize(16);
        setBlockMargin(4);
        setShowDayLabels(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (!data?.contributions || loading || error || !calendarRef.current) return;

    const cells = calendarRef.current.querySelectorAll(".github-cell");
    if (!cells.length) return;

    gsap.from(cells, {
      autoAlpha: 0,
      scale: 0.35,
      transformOrigin: "center center",
      duration: 0.32,
      stagger: {
        amount: 0.55,
        grid: "auto",
        from: "start",
      },
      ease: "back.out(1.6)",
    });
  }, [data, loading, error]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-sm text-red-500 text-center py-8">Failed to load contributions</div>;
  }

  const cellSize = blockSize + blockMargin;
  const dayLabelWidth = showDayLabels ? 36 : 0;
  const svgWidth = dayLabelWidth + weeks.length * cellSize;
  const svgHeight = 20 + 7 * cellSize;

  return (
    <div ref={calendarRef} className="w-full flex flex-col items-center gap-3">
      <div className="w-full overflow-x-auto pt-8 -mt-8 pb-4">
        <div className="w-fit mx-auto relative" onMouseLeave={() => setTooltip(null)}>
          <svg width={svgWidth} height={svgHeight} style={{ display: 'block' }}>
            {monthLabels.map((label, i) => (
              <text
                key={`month-${i}`}
                x={dayLabelWidth + label.weekIdx * cellSize}
                y={12}
                fill="#8b8b8b"
                fontSize={10}
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {label.month}
              </text>
            ))}

            {showDayLabels && DAYS.map((day, i) => (
              day && (
                <text
                  key={`day-${i}`}
                  x={0}
                  y={20 + i * cellSize + blockSize * 0.75}
                  fill="#8b8b8b"
                  fontSize={10}
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  {day}
                </text>
              )
            ))}

            {weeks.map((week, weekIdx) =>
              week.map((day) => {
                const dayOfWeek = new Date(day.date + 'T00:00:00').getDay();
                const x = dayLabelWidth + weekIdx * cellSize;
                const y = 20 + dayOfWeek * cellSize;
                const color = THEME[day.level] || THEME[0];

                return (
                  <rect
                    key={day.date}
                    className="github-cell"
                    x={x}
                    y={y}
                    width={blockSize}
                    height={blockSize}
                    rx={3}
                    ry={3}
                    fill={color}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => {
                      const rect = e.target.getBoundingClientRect();
                      setTooltip({
                        text: `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${day.date}`,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      });
                    }}
                  />
                );
              })
            )}
          </svg>

          {tooltip && createPortal(
            <div
              style={{
                position: 'fixed',
                left: tooltip.x,
                top: tooltip.y - 36,
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
                zIndex: 9999,
              }}
              className="bg-neutral-800 text-white text-[11px] px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-lg"
            >
              {tooltip.text}
            </div>,
            document.body
          )}
        </div>
      </div>

      <div className="flex items-center justify-between w-full px-1 flex-wrap gap-2">
        <span className="text-xs text-neutral-500">
          {totalCount} contributions in the last {months} months
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-neutral-400">Less</span>
          {THEME.map((color, i) => (
            <div
              key={i}
              style={{ backgroundColor: color, width: blockSize * 0.75, height: blockSize * 0.75, borderRadius: 2 }}
            />
          ))}
          <span className="text-[10px] text-neutral-400">More</span>
        </div>
      </div>
    </div>
  );
}
