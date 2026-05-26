import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const portraits = [
  {
    src: "/assets/right.jpeg",
    label: "Left portrait",
    title: "BINUS University",
    body: "Gua kuliah di BINUS University, majoring Computer Science, sekarang lagi semester 6.",
    meta: ["Computer Science", "Semester 6"],
  },
  {
    src: "/assets/front.jpeg",
    label: "Center portrait",
    title: "Andre Pradhit Rafi Alamsyah",
    body: "Umur gua 20 tahun, zodiak Leo. Basically anak frontend yang suka detail visual.",
    meta: ["20 YO", "Leo"],
  },
  {
    src: "/assets/left.jpeg",
    label: "Right portrait",
    title: "Barca & Messi",
    body: "Hobi gua nonton Barca, terus kadang nangisin Messi pas keinget moment dia cabut dari Barca #PutaMadrid.",
    meta: ["Barca", "Messi"],
  },
];

const getInfoSideCards = () => new Set(portraits.map((portrait) => portrait.label));

function getMobileStackOffset(index, activeIndex) {
  let offset = index - activeIndex;

  if (offset > 1) offset -= portraits.length;
  if (offset < -1) offset += portraits.length;

  return offset;
}

function getMobileStackStyle(offset, isSpread) {
  if (!isSpread) {
    return {
      transform: "translate3d(-50%, 6px, 0) rotate(0deg) scale(0.96)",
      opacity: 1,
    };
  }

  if (offset === 0) {
    return {
      transform: "translate3d(-50%, -8px, 0) rotate(-1deg) scale(1)",
      opacity: 1,
    };
  }

  if (offset < 0) {
    return {
      transform: "translate3d(-66%, 34px, 0) rotate(-8deg) scale(0.9)",
      opacity: 0.72,
    };
  }

  return {
    transform: "translate3d(-34%, 28px, 0) rotate(7deg) scale(0.88)",
    opacity: 0.74,
  };
}

function PortraitInfoBack({ portrait }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[20px] border border-neutral-200 bg-white p-2 text-left shadow-[0_18px_60px_rgba(0,0,0,0.16)] sm:rounded-[24px] sm:p-2.5 md:rounded-[32px] md:p-3 md:shadow-[0_28px_80px_rgba(0,0,0,0.18)]">
      <div className="relative flex h-full w-full flex-col justify-center gap-5 overflow-hidden rounded-[16px] bg-[#fafaf7] p-5 text-neutral-950 ring-1 ring-inset ring-black/5 sm:rounded-[20px] sm:gap-5 sm:p-5 md:rounded-[27px] md:p-6">
        <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.18),transparent_62%)]" />
        <div className="relative space-y-2.5 sm:space-y-3">
          <h3 className="text-[24px] font-bold leading-[1.02] tracking-tight text-neutral-950 sm:text-2xl md:text-[28px]">
            {portrait.title}
          </h3>
          <p className="text-[12px] font-medium leading-relaxed text-neutral-600 sm:text-sm md:text-[15px]">
            {portrait.body}
          </p>
        </div>

        <div className="relative flex flex-wrap gap-2">
          {portrait.meta.map((item) => (
            <span key={item} className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[10px] font-bold text-neutral-700 shadow-sm md:text-[11px]">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PortraitCard({ className = "", isFlipped, onClick, portrait, style }) {
  return (
    <button
      type="button"
      aria-pressed={isFlipped}
      onClick={onClick}
      className={`portrait-card group rounded-[22px] focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/40 ${className}`}
      style={style}
    >
      <div
        className="portrait-card-inner relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="portrait-photo-face absolute inset-0 rounded-[20px] bg-neutral-950 p-1 shadow-[0_18px_60px_rgba(0,0,0,0.16)] sm:rounded-[24px] sm:p-1.5 md:rounded-[32px] md:shadow-[0_28px_80px_rgba(0,0,0,0.18)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="portrait-photo-shell relative h-full w-full overflow-hidden rounded-[16px] bg-neutral-900 transition duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.015] sm:rounded-[20px] md:rounded-[27px]">
            <img
              src={portrait.src}
              alt={`${portrait.label} of Andre Pradhit`}
              onError={(event) => {
                event.currentTarget.src = "/assets/andre.jpeg";
              }}
              className="portrait-photo-img h-[106%] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_6%,rgba(255,255,255,0.28),transparent_28%),linear-gradient(to_top,rgba(0,0,0,0.26),transparent_36%,rgba(0,0,0,0.10))] opacity-80 transition-opacity duration-500 group-hover:opacity-65" />
            <div className="portrait-photo-shine pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 rotate-12 bg-white/40 blur-md" />
            <div className="pointer-events-none absolute inset-0 rounded-[16px] ring-1 ring-inset ring-white/25 sm:rounded-[20px] md:rounded-[27px]" />
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-[20px] sm:rounded-[24px] md:rounded-[32px]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <PortraitInfoBack portrait={portrait} />
        </div>
      </div>
    </button>
  );
}

export default function PortraitSection() {
  const sectionRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const suppressClickRef = useRef(false);
  const [flippedCards, setFlippedCards] = useState(getInfoSideCards);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMobileStackSpread, setIsMobileStackSpread] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".portrait-card-desktop", {
        autoAlpha: 0,
        y: 26,
        scale: 0.97,
        rotateZ: (index) => [-2, 0.8, 2][index] || 0,
        duration: 0.38,
        stagger: 0.045,
        ease: "power3.out",
        clearProps: "opacity,visibility,transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(".portrait-photo-img", {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: ".portrait-grid",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      ScrollTrigger.create({
        trigger: ".portrait-mobile-stack",
        start: "top 74%",
        once: true,
        onEnter: () => setIsMobileStackSpread(true),
      });

      ScrollTrigger.create({
        trigger: ".portrait-grid-desktop",
        start: "top 68%",
        once: true,
        onEnter: () => setFlippedCards(new Set()),
      });

      // Mobile: unflip cards once when scrolling into viewport
      ScrollTrigger.create({
        trigger: ".portrait-mobile-stack",
        start: "top 80%",
        once: true,
        onEnter: () => setFlippedCards(new Set()),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setActivePortrait = (nextIndex) => {
    const normalizedIndex = (nextIndex + portraits.length) % portraits.length;
    setActiveIndex(normalizedIndex);
  };

  const toggleCard = (label) => {
    if (suppressClickRef.current) {
      return;
    }

    const nextIndex = portraits.findIndex((portrait) => portrait.label === label);

    if (nextIndex !== -1) {
      setActivePortrait(nextIndex);
    }

    setFlippedCards((current) => {
      if (current.has(label)) {
        return new Set();
      } else {
        return new Set([label]);
      }
    });
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    suppressClickRef.current = true;

    if (deltaX < 0) {
      setActivePortrait(activeIndex + 1);
    } else {
      setActivePortrait(activeIndex - 1);
    }

    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 220);
  };

  return (
    <section ref={sectionRef} className="mt-32 w-full max-w-6xl mx-auto px-2 sm:px-6 md:mt-44" id="portraits">
      <div
        className="portrait-mobile-stack relative mx-auto h-[470px] w-full max-w-[360px] touch-pan-y select-none md:hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {portraits.map((portrait, index) => {
          const isFlipped = flippedCards.has(portrait.label);
          const mobileStackOffset = getMobileStackOffset(index, activeIndex);
          const mobileStyle = getMobileStackStyle(mobileStackOffset, isMobileStackSpread);

          return (
            <PortraitCard
              key={portrait.label}
              portrait={portrait}
              isFlipped={isFlipped}
              onClick={() => toggleCard(portrait.label)}
              className="absolute left-1/2 top-6 aspect-[9/16] w-[70vw] min-w-[250px] max-w-[280px] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:inset-x-8 before:-bottom-5 before:h-10 before:rounded-full before:bg-black/14 before:blur-2xl before:content-['']"
              style={{
                ...mobileStyle,
                perspective: "1400px",
                zIndex: mobileStackOffset === 0 ? 50 : 25 - Math.abs(mobileStackOffset),
              }}
            />
          );
        })}
      </div>

      <div className="portrait-grid-desktop mx-auto hidden w-full max-w-[900px] grid-cols-3 justify-items-center gap-5 md:grid lg:max-w-[980px] lg:gap-7 xl:max-w-[1040px]">
        {portraits.map((portrait, index) => {
          const isFlipped = flippedCards.has(portrait.label);

          return (
            <PortraitCard
              key={portrait.label}
              portrait={portrait}
              isFlipped={isFlipped}
              onClick={() => toggleCard(portrait.label)}
              className={`portrait-card-desktop relative aspect-[9/16] w-full max-w-[260px] rounded-[30px] before:absolute before:inset-x-8 before:-bottom-4 before:h-10 before:rounded-full before:bg-black/16 before:blur-2xl before:content-[''] lg:max-w-[292px] xl:max-w-[310px] ${
                index === 1 ? "mt-7" : index === 2 ? "mt-3" : ""
              }`}
              style={{
                perspective: "1400px",
              }}
            />
          );
        })}
      </div>

      <div className="relative z-[60] mt-8 flex flex-col items-center justify-center gap-2 sm:mt-12 md:mt-10">
        <p className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_30px_rgba(0,0,0,0.14)] backdrop-blur-xl md:hidden">
            swipe
        </p>
        <p className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_30px_rgba(0,0,0,0.14)] backdrop-blur-xl">
          Tap to reveal
        </p>
      </div>
    </section>
  );
}
