"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import { listExperience, listTools } from "./data";
import TerminalRoles from "./components/TerminalRoles/TerminalRoles";
import FinderWindow from "./components/FinderWindow/FinderWindow";
import WorkExperience from "./components/WorkExperience/WorkExperience";
import PortraitSection from "./components/PortraitSection/PortraitSection";
import SkillsSection from "./components/SkillsSection/SkillsSection";
import CreativeProcess from "./components/CreativeProcess/CreativeProcess";
import { LOGIN_ENDPOINT, STORAGE_KEY, initialCredentials } from "./authConfig";
import GithubDashboard from "./components/GithubContribution/GithubDashboard";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiKey, FiLock, FiShield } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function PortfolioLoginScreen({ credentials, status, message, onCredentialChange, onSubmit }) {
  const isLoading = status === "loading";

  return (
    <div className="site-shell relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f7f7f2] px-4 py-8 sm:px-6">
      <div className="site-background" aria-hidden="true" />
      <main className="relative z-10 w-full max-w-[500px]">
        <section className="overflow-hidden rounded-[30px] border border-neutral-200 bg-white/95 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-md">
          <div className="flex items-center justify-between px-6 pb-4 pt-6 sm:px-8 sm:pt-8">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[16px] font-semibold text-[#eab308]">Locked</span>
          </div>

          <form onSubmit={onSubmit} className="px-6 pb-7 sm:px-8 sm:pb-8">
            <div className="mb-7 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-sm">
                <FiLock className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <h1
                className="text-[34px] font-extrabold leading-none tracking-tight text-neutral-950 sm:text-[38px]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Login dulu, ya.
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
                Portfolio gua baru kebuka setelah token login-nya masuk.
              </p>
            </div>

            <div className="mb-5">
              <p className="mb-2 px-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-400">
                Demo account
              </p>
              <div className="overflow-hidden rounded-[18px] border border-neutral-200 bg-[#fafafa]">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-[14px] font-medium text-neutral-500">Username</span>
                  <span className="text-[14px] font-semibold text-neutral-950">{initialCredentials.username}</span>
                </div>
                <div className="mx-4 h-px bg-neutral-200/80" />
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-[14px] font-medium text-neutral-500">Password</span>
                  <span className="text-[14px] font-semibold text-neutral-950">{initialCredentials.password}</span>
                </div>
              </div>
            </div>

            <label className="mb-4 block">
              <span className="mb-2 block px-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-400">Username</span>
              <input
                type="text"
                value={credentials.username}
                onChange={(event) => onCredentialChange("username", event.target.value)}
                className="h-12 w-full rounded-[18px] border border-neutral-200 bg-white px-4 text-[15px] font-semibold text-neutral-950 outline-none transition focus:border-neutral-900"
                autoComplete="username"
              />
            </label>

            <label className="mb-5 block">
              <span className="mb-2 block px-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-400">Password</span>
              <input
                type="password"
                value={credentials.password}
                onChange={(event) => onCredentialChange("password", event.target.value)}
                className="h-12 w-full rounded-[18px] border border-neutral-200 bg-white px-4 text-[15px] font-semibold text-neutral-950 outline-none transition focus:border-neutral-900"
                autoComplete="current-password"
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-black px-5 text-[15px] font-bold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiKey className="h-4 w-4" />
              {isLoading ? "Lagi login..." : "Gas buka portfolio"}
            </button>

            {message && (
              <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                {message}
              </p>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}

function App() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [authSession, setAuthSession] = useState(null);
  const [authCredentials, setAuthCredentials] = useState(initialCredentials);
  const [authStatus, setAuthStatus] = useState("idle");
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    const syncAuthSession = () => {
      const savedSession = sessionStorage.getItem(STORAGE_KEY);

      if (!savedSession) {
        setAuthSession(null);
        setAuthChecked(true);
        return;
      }

      try {
        setAuthSession(JSON.parse(savedSession));
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
        setAuthSession(null);
      } finally {
        setAuthChecked(true);
      }
    };

    syncAuthSession();
    window.addEventListener("portfolio-auth-updated", syncAuthSession);

    return () => window.removeEventListener("portfolio-auth-updated", syncAuthSession);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const restoreHome = sessionStorage.getItem("should_restore_home_scroll");
    const restoreMobileHome = sessionStorage.getItem("should_restore_mobile_home_scroll");
    const savedPosHome = sessionStorage.getItem("home_scroll_pos");
    const savedPosMobile = sessionStorage.getItem("mobile_home_scroll_pos");
    const savedPos = savedPosHome || savedPosMobile;
    const shouldRestore = restoreHome === "true" || restoreMobileHome === "true";

    if (shouldRestore && savedPos) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: parseInt(savedPos, 10), behavior: "smooth" });
        sessionStorage.removeItem("should_restore_home_scroll");
        sessionStorage.removeItem("should_restore_mobile_home_scroll");
      }, 250);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const frame = requestAnimationFrame(refresh);

    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", refresh);
    };
  }, []);

  useLayoutEffect(() => {
    if (!authSession) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(".hero-card-reveal", {
        autoAlpha: 0,
        y: 28,
        scale: 0.96,
        rotate: -1,
        duration: 0.75,
        ease: "power3.out",
        clearProps: "transform",
      });

      gsap.from(".hero-reveal", {
        autoAlpha: 0,
        y: 18,
        duration: 0.58,
        stagger: 0.08,
        ease: "power3.out",
      });

      if (!isMobile) {
        gsap.to(".hero-image-col", {
          y: 95,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-text-col", {
          y: 45,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.set(".about-content-reveal", {
        autoAlpha: 0,
        y: 16,
      });
      gsap.set(".about-chip.about-content-reveal", { scale: 0.88 });
      gsap.set(".about-story-line.about-content-reveal", {
        clipPath: "inset(0% 34% 0% 0%)",
      });

      const aboutTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 72%",
          once: true,
          invalidateOnRefresh: true,
        },
        onComplete: () => {
          gsap.set(".about-card, .about-window-dot", {
            autoAlpha: 1,
            clearProps: "transform,clipPath,filter",
          });
          gsap.set(".about-content-reveal", {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
          });
        },
      });

      aboutTimeline
        .fromTo(
          ".about-card",
          {
            autoAlpha: 0,
            y: 44,
            scale: 0.955,
            filter: "blur(10px)",
            clipPath: "inset(8% 0% 0% 0% round 32px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            duration: 0.32,
            clearProps: "clipPath,filter",
          }
        )
        .fromTo(
          ".about-window-dot",
          {
            autoAlpha: 0,
            scale: 0.35,
          },
          {
            autoAlpha: 1,
            scale: 1,
            stagger: 0.025,
            duration: 0.14,
            ease: "back.out(1.8)",
          },
          "-=0.3"
        )
        .to(
          ".about-title-block.about-content-reveal",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.16,
          },
          "+=0.06"
        )
        .to(
          ".about-chip.about-content-reveal",
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: 0.03,
            duration: 0.16,
            ease: "back.out(1.45)",
          },
          "-=0.04"
        )
        .to(
          ".about-story-line.about-content-reveal",
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            stagger: 0.045,
            duration: 0.22,
          },
          "+=0.02"
        )
        .to(
          ".about-tech-block.about-content-reveal",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.18,
          },
          "-=0.02"
        );
    }, pageRef);

    return () => ctx.revert();
  }, [isMobile, authSession]);

  const filteredTools = listTools.filter((tool) => tool.nama.toLowerCase() !== "gsap");
  const midPoint = Math.ceil(filteredTools.length / 2);
  const topRowTools = filteredTools.slice(0, midPoint);
  const bottomRowTools = filteredTools.slice(midPoint);

  const socials = [
    { icon: FaLinkedin, url: "https://www.linkedin.com/in/andrepradhit/", label: "LinkedIn", username: "Andre Pradhit" },
    { icon: FaGithub, url: "https://github.com/drepradhit", label: "GitHub", username: "drepradhit" },
    { icon: FaInstagram, url: "https://instagram.com/aaaaanddrre", label: "Instagram", username: "aaaaanddrre" },
  ];

  const updateAuthCredential = (field, value) => {
    setAuthCredentials((current) => ({ ...current, [field]: value }));
  };

  const handlePortfolioLogin = async (event) => {
    event.preventDefault();
    setAuthStatus("loading");
    setAuthMessage("");

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authCredentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Login failed");
      }

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setAuthSession(data);
      setAuthStatus("success");
      window.dispatchEvent(new Event("portfolio-auth-updated"));
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
    } catch (error) {
      sessionStorage.removeItem(STORAGE_KEY);
      setAuthSession(null);
      setAuthStatus("error");
      setAuthMessage(error.message || "Unable to reach login API");
    }
  };

  if (!authChecked) {
    return (
      <div className="site-shell relative flex min-h-screen w-full items-center justify-center bg-[#f7f7f2]">
        <div className="site-background" aria-hidden="true" />
        <div className="relative z-10 flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-black text-neutral-700 shadow-sm">
          <FiShield className="h-4 w-4 text-amber-500" />
          Lagi cek token...
        </div>
      </div>
    );
  }

  if (!authSession) {
    return (
      <PortfolioLoginScreen
        credentials={authCredentials}
        status={authStatus}
        message={authMessage}
        onCredentialChange={updateAuthCredential}
        onSubmit={handlePortfolioLogin}
      />
    );
  }

  return (
    <div ref={pageRef} className="site-shell relative min-h-screen w-full overflow-x-hidden bg-[#f7f7f2]">
      <div className="site-background" aria-hidden="true" />
      <main className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-28 sm:px-6 md:pb-36 xl:px-10">
        <section
          ref={heroRef}
          className="hero mx-auto grid min-h-[auto] max-w-6xl grid-cols-1 items-center gap-10 pt-10 sm:pt-12 lg:min-h-[560px] lg:grid-cols-2 lg:gap-20"
        >
          <div className="hero-image-col order-1 flex w-full justify-center px-2 lg:order-2 lg:px-0">
            <div className="hero-card-reveal relative z-10 flex w-full justify-center">
              <ProfileCard avatarUrl="/assets/andre.jpeg" />
            </div>
          </div>

          <div className="hero-text-col order-2 flex w-full flex-col items-center px-1 text-center lg:order-1 lg:items-start lg:text-left">
            <h1
              className="hero-reveal mb-5 text-4xl font-bold leading-[1.08] tracking-tight text-[#1a1a1a] sm:text-5xl md:text-6xl"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Hai gua Andre
              <br />
              Pradhit
            </h1>

            <div className="hero-reveal mb-4 flex w-full justify-center text-lg leading-relaxed text-neutral-600 lg:justify-start">
              <div className="w-full max-w-[312px] px-1 sm:max-w-md sm:px-0 lg:max-w-none">
                <TerminalRoles roles={["UI/UX Designer", "Mobile Developer", "Web Developer", "Graphic Designer"]} />
              </div>
            </div>

            <div className="hero-reveal mb-8 flex w-full flex-col items-center justify-center gap-1.5 px-2 lg:items-start lg:justify-start">
              <span
                className="text-sm font-bold uppercase tracking-[0.26em] text-neutral-500 sm:text-base"
                style={{ fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
              >
                Made for
              </span>
              <img
                src="/assets/Logo%20Cretivox%20-%20Black.png"
                alt="Cretivox"
                className="h-12 w-auto object-contain opacity-80 sm:h-14"
              />
            </div>

            <div className="hero-reveal flex w-full max-w-[340px] flex-wrap items-center justify-center gap-2.5 px-1 sm:max-w-none lg:justify-start">
              <a
                href="https://drive.google.com/file/d/1je3WZmUi7OidlNM-QsVvqG-CNeG1YXp2/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-white/80 px-6 py-3 font-bold text-neutral-900 shadow-lg shadow-black/5 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-neutral-900 hover:bg-neutral-50"
              >
                <span className="whitespace-nowrap">Resume</span>
                <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[90px] group-hover:opacity-100">
                  &nbsp;Unduh
                </span>
                <svg className="ml-1.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4-4 4m0 0-4-4m4 4V4" />
                </svg>
              </a>

              <div className="flex w-full flex-wrap items-center justify-center gap-2.5 sm:w-auto lg:justify-start">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center overflow-hidden rounded-full border border-neutral-200 bg-white/80 p-3 text-neutral-900 shadow-lg shadow-black/5 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-neutral-900 hover:bg-neutral-50 active:scale-95"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 shrink-0" />
                    <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-bold opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-[120px] group-hover:opacity-100">
                      {social.username}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PortraitSection />

        <section
          ref={aboutRef}
          className="mx-auto mt-36 grid w-full max-w-6xl grid-cols-1 items-start gap-14 px-0 sm:px-4 md:mt-56 lg:grid-cols-2 lg:gap-16"
          id="about"
        >
          <div className="flex w-full flex-col items-center pt-0 lg:items-start">
            <div className="about-card relative w-full cursor-default overflow-hidden rounded-[28px] border border-neutral-200 bg-white/95 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-md transition duration-300 md:rounded-[32px] md:hover:-translate-y-2 md:hover:-rotate-1">
              <div className="sticky top-0 z-20 flex items-center justify-between bg-white/80 px-6 pb-6 pt-7 backdrop-blur-sm sm:px-8 sm:pt-8">
                <div className="flex gap-1.5">
                  <div className="about-window-dot h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <div className="about-window-dot h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <div className="about-window-dot h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="cursor-pointer text-[17px] font-semibold text-[#eab308] transition hover:opacity-70">Done</span>
              </div>

              <div className="px-5 pb-10 pt-0 sm:px-8 md:px-12">
                <div className="about-title-block about-content-reveal mb-6 flex flex-col gap-0 border-b border-neutral-50/50 pb-4 text-center">
                  <span className="text-[13px] font-medium text-neutral-400">Today, 11:56 PM</span>
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-black md:text-3xl">Halo! Gua Andre</h2>
                </div>

                <div className="mb-8 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {["20 tahun", "BINUS University", "Semester 6", "Leo"].map((item) => (
                    <span key={item} className="about-chip about-content-reveal rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[11px] font-bold text-neutral-500">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mb-10 space-y-4 text-[15px] font-normal leading-[1.6] text-neutral-800 md:text-[16px]">
                  <p className="about-story-line about-content-reveal">Gua <strong className="font-semibold text-neutral-900">mahasiswa Computer Science</strong> di <strong className="font-semibold text-neutral-900">BINUS University</strong>, dan sekarang gua semester 6.</p>
                  <p className="about-story-line about-content-reveal">Awalnya gua cuma main di    <strong className="font-semibold text-neutral-900">UI/UX</strong> karena base gua tuh graphic designer pas SMK.</p>
                  <p className="about-story-line about-content-reveal">Dari situ gua mulai ngulik front-end karna gua mikir, yakali gua kuliah computer science tapi gak bisa ngoding.</p>
                  <p className="about-story-line about-content-reveal">Gua suka desain yang clean, gua selalu mikirin every detail dan gua selalu pengen website yang gua develop punya karakter.</p>
                  <div className="about-story-line about-content-reveal pt-4 text-sm italic text-neutral-500">Sekarang lagi open buat <span className="font-medium not-italic text-neutral-900">Internship dan Freelance Web Dev atau UI/UX Design</span>.</div>
                </div>

                <div className="about-tech-block about-content-reveal border-t border-neutral-100/80 pt-8">
                  <h3 className="mb-5 px-1 text-center text-xs font-bold uppercase tracking-widest text-neutral-400 opacity-60 sm:text-left">Tech Stack</h3>

                  <div className="group relative -mt-2 flex flex-col gap-0 overflow-hidden">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white/95 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white/95 to-transparent" />

                    <div className="marquee-left flex w-max gap-9 py-3">
                      {[...topRowTools, ...topRowTools, ...topRowTools, ...topRowTools, ...topRowTools].map((tool, index) => (
                        <div key={`${tool.id}-r1-${index}`} className="shrink-0">
                          <img src={tool.gambar} alt={tool.nama} className="h-8 w-8 object-contain sm:h-9 sm:w-9" />
                        </div>
                      ))}
                    </div>

                    <div className="marquee-right flex w-max gap-9 py-3">
                      {[...bottomRowTools, ...bottomRowTools, ...bottomRowTools, ...bottomRowTools, ...bottomRowTools].map((tool, index) => (
                        <div key={`${tool.id}-r2-${index}`} className="shrink-0">
                          <img src={tool.gambar} alt={tool.nama} className="h-8 w-8 object-contain sm:h-9 sm:w-9" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center pt-0 lg:justify-start" id="experience">
            <WorkExperience experience={listExperience} />
          </div>
        </section>

        <section className="proyek mt-44 w-full md:mt-64" id="projects">
          <FinderWindow />
        </section>

        <SkillsSection />
        <CreativeProcess />
        <GithubDashboard />
      </main>
    </div>
  );
}

export default App;
