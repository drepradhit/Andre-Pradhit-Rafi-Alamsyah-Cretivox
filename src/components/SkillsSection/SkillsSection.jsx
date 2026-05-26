import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { listTools } from "../../data";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    id: "01",
    title: "UI/UX Design",
    note: "Bikin design ui yang jelas dulu biar ga ngaco pas ngoding.",
    tools: ["Figma"],
    skills: ["User Flow", "Wireframe", "Testing manual"],
  },
  {
    id: "02",
    title: "Frontend Development",
    note: "Slicing design ui ke codingan.",
    tools: ["HTML", "CSS", "Javascript", "React JS", "Next JS", "Tailwind"],
    skills: ["Layout responsif", "Mikir komponen"],
  },
  {
    id: "03",
    title: "Motion & Interaction",
    note: "Bikin animasi biar website yang gua develop lebih hidup dan interaktif.",
    tools: ["GSAP"],
    skills: ["ScrollTrigger", "Interaksi kecil", "Timing"],
  },
  {
    id: "04",
    title: "Testing Mindset",
    note: "Ngecek keseluruhan website mulai dari state, spacing, flow, sampai tampilan mobile.",
    tools: [],
    skills: ["Testing manual", "Responsive QA", "Review interaksi"],
  },
];

const featuredTools = ["Figma", "HTML", "CSS", "Javascript", "React JS", "Next JS", "Tailwind", "GSAP"];

const findTool = (name) =>
  listTools.find((tool) => tool.nama.toLowerCase() === name.toLowerCase());

const toolIconClass = (toolName, size = "default") => {
  if (toolName === "GSAP") {
    return size === "small" ? "h-8 w-8 scale-[1.65]" : "h-12 w-12 scale-[1.55]";
  }

  return size === "small" ? "h-5 w-5" : "h-8 w-8";
};

export default function SkillsSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-heading", {
        autoAlpha: 0,
        y: 18,
        filter: "blur(6px)",
        duration: 0.4,
        ease: "power3.out",
        clearProps: "opacity,visibility,transform,filter",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".skill-group-content", {
        autoAlpha: 0,
        y: 18,
        scale: 0.96,
        filter: "blur(7px)",
        duration: 0.38,
        stagger: {
          each: 0.05,
          from: "start",
        },
        ease: "back.out(1.12)",
        clearProps: "opacity,visibility,transform,filter",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 62%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".skill-visual", {
        autoAlpha: 0,
        filter: "blur(8px)",
        transformOrigin: "center top",
        duration: 0.34,
        ease: "expo.out",
        clearProps: "opacity,visibility,filter",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 64%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".tool-card-content, .skill-chip", {
        autoAlpha: 0,
        y: 12,
        scale: 0.9,
        filter: "blur(5px)",
        duration: 0.28,
        stagger: 0.018,
        ease: "back.out(1.2)",
        clearProps: "opacity,visibility,transform,filter",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 54%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mt-36 md:mt-52 w-full max-w-[1380px] mx-auto px-3 sm:px-6 xl:px-8" id="skills">
      <div className="skills-heading mx-auto mb-8 w-full max-w-[1240px]">
        <h2
          className="max-w-xl text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          What I keep practicing.
        </h2>
      </div>

      <div className="skill-visual mx-auto w-full max-w-[1240px] overflow-hidden rounded-[26px] border border-neutral-200 bg-white shadow-[0_22px_70px_rgba(0,0,0,0.055)] md:rounded-[30px] xl:max-w-none">
        <div className="flex items-center justify-between rounded-t-[26px] border-b border-neutral-200 bg-neutral-50/70 px-4 py-4 md:rounded-t-[30px] md:px-6">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400 sm:text-[10px] sm:tracking-[0.22em]">
            Design to Frontend
          </span>
        </div>

        <div className="p-4 pb-8 md:p-7 md:pb-12">
          <div className="grid gap-5 xl:grid-cols-[0.86fr_1.14fr] xl:items-stretch">
            <div className="min-w-0 rounded-[22px] border border-neutral-200 bg-neutral-50/60 p-4 md:rounded-[24px] md:p-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
                Current Stack
              </span>
              <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 xl:grid-cols-4 xl:gap-4">
                {featuredTools.map((toolName) => {
                  const tool = findTool(toolName);

                  return (
                    <div
                      key={toolName}
                      className="group relative flex aspect-square min-w-0 flex-col items-center justify-center gap-1.5 rounded-[16px] border border-neutral-200 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.035)] transition-transform duration-300 hover:-translate-y-1 sm:gap-2 sm:rounded-[18px] xl:min-h-[118px]"
                    >
                      <div className="tool-card-content flex flex-col items-center justify-center gap-1.5 sm:gap-2">
                        {tool ? (
                          <img
                            src={tool.gambar}
                            alt={tool.nama}
                            className={`${toolIconClass(toolName)} object-contain`}
                          />
                        ) : (
                          <span className="text-xs font-bold text-neutral-400">{toolName}</span>
                        )}
                        <span className="max-w-full truncate px-1 text-[9px] font-bold text-neutral-400 transition-colors duration-200 group-hover:text-neutral-700 sm:text-[10px]">
                          {tool?.nama || toolName}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar sm:gap-2 xl:justify-between">
                {["Observe", "Design", "Build", "Test", "Polish"].map((step, index) => (
                  <div key={step} className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                    <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-neutral-500 sm:px-3 sm:py-2 sm:text-[10px] sm:tracking-[0.14em]">
                      {step}
                    </span>
                    {index < 4 && <span className="h-px w-3 bg-neutral-200 sm:w-5 xl:w-8" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid min-w-0 gap-3 md:grid-cols-2 xl:gap-4">
              {skillGroups.map((group) => (
                <article
                  key={group.title}
                  className="skill-group rounded-[22px] border border-neutral-200 bg-white p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(0,0,0,0.055)] xl:min-h-[220px] xl:p-5"
                >
                  <div className="skill-group-content">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-black text-white">
                        {group.id}
                      </span>
                      {group.tools.length > 0 && (
                        <div className="flex -space-x-2">
                          {group.tools.slice(0, 3).map((toolName) => {
                            const tool = findTool(toolName);
                            return tool ? (
                              <span
                                key={`${group.title}-${toolName}`}
                                className="skill-chip flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm"
                              >
                                <img
                                  src={tool.gambar}
                                  alt={tool.nama}
                                  className={`${toolIconClass(toolName, "small")} object-contain`}
                                />
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>

                    <h3
                      className="text-lg font-bold tracking-tight text-neutral-900"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {group.title}
                    </h3>
                    <p className="mt-2 min-h-[38px] text-[12px] leading-relaxed text-neutral-500">
                      {group.note}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {[...group.skills, ...group.tools.slice(3)].slice(0, 2).map((skill) => (
                        <span
                          key={`${group.title}-${skill}`}
                          className="skill-chip rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[10px] font-bold text-neutral-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
