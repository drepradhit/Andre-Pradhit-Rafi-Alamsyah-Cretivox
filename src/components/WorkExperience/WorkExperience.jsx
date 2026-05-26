import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WorkExperience = ({ experience }) => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".experience-content-reveal:not(.experience-line)", {
        autoAlpha: 0,
        x: isMobile ? 0 : 14,
        y: 16,
      });
      gsap.set(".experience-line.experience-content-reveal", {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "left center",
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
          invalidateOnRefresh: true,
        },
        onComplete: () => {
          gsap.set(".experience-card, .experience-header button, .experience-header span", {
            autoAlpha: 1,
            clearProps: "transform,clipPath,filter",
          });
          gsap.set(".experience-content-reveal:not(.experience-line)", {
            autoAlpha: 1,
            y: 0,
          });
          gsap.set(".experience-line.experience-content-reveal", {
            autoAlpha: 1,
            scaleX: 1,
            transformOrigin: "left center",
          });
        },
      });

      timeline
        .fromTo(
          ".experience-card",
          {
            autoAlpha: 0,
            x: isMobile ? 0 : 36,
            y: 42,
            scale: 0.955,
            filter: "blur(10px)",
            clipPath: "inset(0% 0% 8% 0% round 32px)",
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            duration: 0.32,
            clearProps: "clipPath,filter",
          }
        )
        .fromTo(
          ".experience-header button, .experience-header span",
          {
            autoAlpha: 0,
            y: -8,
            scale: 0.8,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: 0.025,
            duration: 0.14,
            ease: "back.out(1.7)",
          },
          "-=0.28"
        )
        .to(
          ".experience-title.experience-content-reveal",
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.16,
          },
          "+=0.06"
        )
        .to(
          ".experience-item.experience-content-reveal",
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            stagger: 0.065,
            duration: 0.22,
          },
          "+=0.02"
        )
        .to(
          ".experience-line.experience-content-reveal",
          {
            autoAlpha: 1,
            scaleX: 1,
            transformOrigin: "left center",
            stagger: 0.035,
            duration: 0.16,
          },
          "-=0.66"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div ref={sectionRef} className="relative z-10 flex w-full flex-col items-center pt-0">
      <div className="relative mx-auto w-full max-w-2xl pb-8 pt-0">
        <div className="experience-card group relative cursor-default pt-0 transition duration-300 md:hover:-translate-y-2 md:hover:rotate-1">
          <div className="relative min-h-[400px] overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-300 md:rounded-[32px]">
            <div className="experience-header sticky top-0 z-20 flex items-center justify-between bg-white/80 px-6 pb-6 pt-7 backdrop-blur-sm sm:px-8 sm:pt-8">
              <div className="flex items-center gap-6">
                <button className="text-[#eab308] transition-opacity hover:opacity-70" aria-label="Kembali">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-5">
                <button className="hidden text-[#eab308] transition-opacity hover:opacity-70 sm:block" aria-label="Bagikan">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </button>
                <span className="ml-0 cursor-pointer text-[17px] font-semibold text-[#eab308] transition-opacity hover:opacity-70 sm:ml-2">Done</span>
              </div>
            </div>

            <div className="px-6 pb-12 pt-2 md:px-12">
              <div className="relative z-30 mb-10 flex w-full justify-start">
                <h2
                  className="experience-title experience-content-reveal text-3xl font-bold text-[#1a1a1a] md:text-5xl"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Experience
                </h2>
              </div>

              <div className="relative z-10 flex flex-col gap-6">
                {experience.map((item, index) => (
                  <div key={item.id} className="experience-item experience-content-reveal relative pb-6 last:pb-0">
                    <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="text-[17px] font-bold tracking-tight text-black">{item.company}</h3>
                      <span className="text-[12px] font-semibold uppercase tracking-tight text-neutral-400 sm:text-[13px]">{item.period}</span>
                    </div>

                    <div className="mb-2">
                      <span className="text-[15px] font-medium text-neutral-600">{item.role}</span>
                    </div>

                    <p className="text-[14px] font-normal leading-[1.45] text-neutral-500">{item.description}</p>
                    {index < experience.length - 1 && <div className="experience-line experience-content-reveal absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-neutral-100" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
