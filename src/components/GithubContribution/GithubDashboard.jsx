import React, { useLayoutEffect, useRef } from "react";
import CustomGithubCalendar from "./CustomGithubCalendar";
import GithubActivityTimeline from "./GithubActivityTimeline";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiFlutter, SiJavascript, SiTypescript, SiTailwindcss } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { name: "React JS", percentage: 92, color: "#61DAFB", icon: <FaReact /> },
  { name: "Next JS", percentage: 45, color: "#171717", icon: <SiNextdotjs /> },
  { name: "Flutter", percentage: 80, color: "#02569B", icon: <SiFlutter /> },
  { name: "JavaScript", percentage: 65, color: "#F7DF1E", icon: <SiJavascript /> },
  { name: "TypeScript", percentage: 70, color: "#3178C6", icon: <SiTypescript /> },
  { name: "Tailwind CSS", percentage: 55, color: "#06B6D4", icon: <SiTailwindcss /> },
];

function CircularProficiency() {
  const radius = 65; 
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  
  const totalProficiency = techStack.reduce((acc, tech) => acc + tech.percentage, 0);
  
  let currentAccumulatedPercentage = 0;
  const gapVisual = 5; 
  const segments = techStack.map((tech) => {
    const percentage = tech.percentage / totalProficiency;
    const arcLength = percentage * circumference;
    const accumulatedArc = currentAccumulatedPercentage * circumference;
    const midAngle = (currentAccumulatedPercentage + percentage / 2) * 2 * Math.PI;
    
    currentAccumulatedPercentage += percentage;
    return { ...tech, percentage, arcLength, accumulatedArc, midAngle };
  });

  const appleFontStack = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4" style={appleFontStack}>
      <div className="github-orbit relative h-44 w-44 md:h-52 md:w-52">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth={strokeWidth}
          />
          <g transform="rotate(-90 100 100)">
            {segments.map((segment) => {
              const dashLength = Math.max(0, segment.arcLength - gapVisual);
              const dashOffset = segment.accumulatedArc + (gapVisual / 2);
              return (
                <circle
                  key={`arc-${segment.name}`}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="butt"
                  strokeDasharray={`${dashLength} ${circumference}`}
                  strokeDashoffset={-dashOffset}
                />
              );
            })}
          </g>
        </svg>
        {segments.map((segment) => {
          const angle = segment.midAngle - (Math.PI / 2);
          const radiusPercent = 32.5; 
          const left = 50 + radiusPercent * Math.cos(angle);
          const top = 50 + radiusPercent * Math.sin(angle);
          return (
            <div
              key={`icon-${segment.name}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 shadow-sm z-10 overflow-hidden"
              style={{ left: `${left}%`, top: `${top}%`, borderColor: segment.color, color: segment.color }}
            >
              <div className="w-1/2 h-1/2 flex items-center justify-center">
                {React.cloneElement(segment.icon, { className: "w-full h-full" })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ResponsiveGitHubCalendar = () => {
  return (
    <CustomGithubCalendar username="drepradhit" months={5} />
  );
};

export default function GithubDashboard() {
  const sectionRef = useRef(null);
  const appleFontStack = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".github-window", {
        autoAlpha: 0,
        y: 34,
        scale: 0.985,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      gsap.from(".github-panel", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      gsap.from(".github-stack-item", {
        autoAlpha: 0,
        x: 16,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 48%",
          toggleActions: "restart reverse restart reverse",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="mt-36 md:mt-52 w-full max-w-6xl mx-auto px-4 sm:px-0" id="github" style={appleFontStack}>
      <div className="github-window bg-white rounded-2xl border border-neutral-200 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        <div className="w-full md:w-56 bg-neutral-50/50 border-b md:border-b-0 md:border-r border-neutral-100 p-4 shrink-0">
          <div className="github-sidebar-item flex gap-1.5 mb-8">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
          </div>

          <p className="github-sidebar-item text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4 ml-2">Activity</p>
          <div className="space-y-1">
            <div className="github-sidebar-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer font-semibold bg-[#007aff] text-white shadow-sm">
                <div className="text-white"><FaGithub /></div>
                Github
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="github-panel md:col-span-2 bg-white rounded-xl border border-neutral-200/60 p-6 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Contributions</h3>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div className="w-full overflow-x-auto py-2 flex flex-col items-center justify-center flex-1">
              <div className="w-fit mx-auto">
                <ResponsiveGitHubCalendar />
              </div>
            </div>
          </div>

          <div className="github-panel md:col-span-1 bg-white rounded-xl border border-neutral-200/60 p-6 shadow-sm flex flex-col items-center h-full justify-center min-h-[250px]">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest self-start mb-0">Focus Areas</h3>
            <CircularProficiency />
          </div>

          <div className="github-panel md:col-span-2 flex flex-col h-full">
            <GithubActivityTimeline />
          </div>

          <div className="github-panel md:col-span-1 bg-white rounded-xl border border-neutral-200/60 p-6 shadow-sm flex flex-col h-full">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-6">Stack Breakdown</h3>
            <div className="grid gap-x-4 gap-y-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))' }}>
              {techStack.map(tech => (
                <div key={tech.name} className="github-stack-item flex items-center gap-2.5">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: tech.color, minWidth: '10px', minHeight: '10px' }} />
                  <span className="text-xs font-semibold text-neutral-800 sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
