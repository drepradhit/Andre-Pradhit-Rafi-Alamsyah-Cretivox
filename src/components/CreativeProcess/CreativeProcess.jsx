import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiCheckCircle, FiCode, FiEye, FiPenTool, FiSliders } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: FiEye,
    title: "Observe",
    text: "Gua pahamin dulu masalahnya, user-nya, dan bagian mana yang harus langsung kebaca.",
    offset: "md:translate-y-8 md:-rotate-2",
  },
  {
    icon: FiPenTool,
    title: "Design",
    text: "Gua beresin alur, layout, spacing, dan feel visualnya sebelum buka code editor.",
    offset: "md:-translate-y-4 md:rotate-1",
  },
  {
    icon: FiCode,
    title: "Build",
    text: "Desainnya gua ubah jadi komponen React yang responsif dan state-nya jelas.",
    offset: "md:translate-y-10 md:-rotate-1",
  },
  {
    icon: FiCheckCircle,
    title: "Test",
    text: "Gua cek edge case, tampilan mobile, dan apakah halaman masih enak dipakai.",
    offset: "md:-translate-y-2 md:rotate-2",
  },
  {
    icon: FiSliders,
    title: "Polish",
    text: "Terakhir gua rapihin motion, copy, contrast, dan detail kecil biar berasa jadi.",
    offset: "md:translate-y-7 md:-rotate-1",
  },
];

export default function CreativeProcess() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      gsap.from(".process-heading", {
        autoAlpha: 0,
        y: 22,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      mm.add("(min-width: 768px)", () => {
        gsap.set(".process-line", { scaleX: 0, transformOrigin: "left center" });
        gsap.set(".process-card", {
          x: (index) => (2 - index) * 205,
          y: (index) => [-10, 8, 0, -8, 10][index],
          rotate: (index) => [-8, -4, 0, 5, 9][index],
          scale: (index) => (index === 2 ? 1 : 0.96),
          zIndex: (index) => 10 - Math.abs(2 - index),
        });

        gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: ".process-panel",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
          .to(".process-card", {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            zIndex: 1,
            duration: 0.22,
            stagger: {
              each: 0.012,
              from: "center",
            },
            overwrite: "auto",
          }, 0)
          .to(".process-line", {
            scaleX: 1,
            duration: 0.18,
          }, 0.04)
          .fromTo(
            ".process-tape",
            { autoAlpha: 0.4, y: -6, scaleX: 0.8 },
            {
              autoAlpha: 1,
              y: 0,
              scaleX: 1,
              duration: 0.12,
              stagger: {
                each: 0.012,
                from: "center",
              },
              clearProps: "transform,opacity,visibility",
            },
            0.1
          )
          .fromTo(
            ".process-footer",
            { autoAlpha: 0, y: 10 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.16,
              clearProps: "transform,opacity,visibility",
            },
            0.18
          );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(".process-card", { clearProps: "transform,zIndex" });
        gsap.set(".process-line", { clearProps: "transform" });
        gsap.set(".process-tape, .process-footer", { clearProps: "opacity,visibility,transform" });

        gsap.from(".process-card", {
          autoAlpha: 0,
          y: 14,
          duration: 0.24,
          stagger: 0.05,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "opacity,visibility,transform",
          scrollTrigger: {
            trigger: ".process-panel",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="mt-36 md:mt-52 w-full max-w-6xl mx-auto px-3 sm:px-4" id="process">
      <div className="process-heading mb-10 md:mb-12 text-center">
        <h2
          className="text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          How I build things.
        </h2>
      </div>

      <div className="process-panel relative overflow-visible rounded-[28px] border border-neutral-200 bg-neutral-50/70 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.045)] md:overflow-hidden md:rounded-[36px] md:p-7">
        <div className="process-line absolute left-10 right-10 top-1/2 hidden h-px -translate-y-1/2 bg-neutral-300 md:block" />
        <div className="process-line absolute left-10 right-10 top-1/2 hidden -translate-y-1/2 border-t border-dashed border-neutral-400/40 md:block" />

        <div className="grid gap-4 md:grid-cols-5 md:gap-5 md:py-10">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className={`process-step relative ${step.offset}`}
              >
                <div className="process-card group relative rounded-[22px] border border-neutral-200 bg-white p-5 shadow-[0_14px_38px_rgba(0,0,0,0.055)] transition duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_22px_50px_rgba(0,0,0,0.08)] md:rounded-[24px]">
                  <div className="process-tape absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-white/70 shadow-[0_3px_12px_rgba(0,0,0,0.08)] ring-1 ring-neutral-200/70" />

                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-950 text-[12px] font-black text-white">
                      {index + 1}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-800">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>

                  <h3
                    className="text-lg font-bold text-neutral-900"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
                    {step.text}
                  </p>

                  <div className="mt-5 h-px w-full bg-neutral-200" />
                  <span className="mt-3 block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                    {index === 0 && "User Interview"}
                    {index === 1 && "Design Thinking"}
                    {index === 2 && "Slicing to code"}
                    {index === 3 && "Feature Testing"}
                    {index === 4 && "Polishing UI/UX"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="process-footer mt-4 flex flex-col gap-3 border-t border-neutral-200 pt-5 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-sm font-medium leading-relaxed text-neutral-500">
            Intinya bukan bikin proses keliatan ribet. Yang penting terus dirapihin sampai interface-nya terasa jelas dan enak.
          </p>
          <div className="flex gap-2">
            {["flow", "interface", "motion"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
