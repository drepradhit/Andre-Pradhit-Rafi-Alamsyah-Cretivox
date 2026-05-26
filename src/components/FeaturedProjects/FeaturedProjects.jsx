import { useLayoutEffect, useRef, useState } from "react";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { listProyek, listTools } from "../../data";

gsap.registerPlugin(ScrollTrigger);

const focusProjects = listProyek.filter((project) =>
  ["Rupiah Flow", "Certix"].includes(project.title)
);

const projectCopy = {
  "Rupiah Flow": {
    eyebrow: "Financial Dashboard",
    description:
      "Dashboard fullstack buat nyatet pemasukan, pengeluaran, kategori, sampai laporan. Intinya biar urusan duit kebaca lebih jelas.",
    flow: [
      "Catet transaksi",
      "Atur kategori",
      "Breakdown transaksi",
      "Liat data transaksi bulanan dan taunan",
      "Export data",
    ],
  },
  Certix: {
    eyebrow: "Concert Ticket App Design",
    description:
      "UI/UX Design buat aplikasi ticketing konser.",
    flow: [
      "Cari konser",
      "Buka detail event",
      "Pilih section tiket",
      "Konfirmasi checkout",
      "Selesai bayar",
    ],
  },
};

export default function FeaturedProjects() {
  const sectionRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-heading", {
        autoAlpha: 0,
        y: 22,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      gsap.utils.toArray(".work-row").forEach((row) => {
        const reverse = row.dataset.reverse === "true";
        const visual = row.querySelector(".project-visual");
        const heroImage = row.querySelector(".project-hero-img");
        const copy = row.querySelector(".project-copy");
        const copyBits = row.querySelectorAll(".project-copy-bit");
        const flowItems = row.querySelectorAll(".project-flow-item");
        const screenLabel = row.querySelector(".project-screen-label");
        const screenThumbs = row.querySelectorAll(".project-screen-thumb");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 74%",
              toggleActions: "restart reverse restart reverse",
            },
          })
          .from(
            visual,
            {
              autoAlpha: 0,
              x: reverse ? 38 : -38,
              clipPath: reverse
                ? "inset(0 0 0 18% round 24px)"
                : "inset(0 18% 0 0 round 24px)",
              duration: 0.5,
              ease: "power3.out",
            },
            0
          )
          .from(
            heroImage,
            {
              scale: 1.08,
              duration: 0.7,
              ease: "power3.out",
            },
            0
          )
          .from(
            copy,
            {
              autoAlpha: 0,
              x: reverse ? -30 : 30,
              duration: 0.42,
              ease: "power2.out",
            },
            0.08
          )
          .from(
            copyBits,
            {
              autoAlpha: 0,
              y: 12,
              duration: 0.28,
              stagger: 0.035,
              ease: "power2.out",
              clearProps: "opacity,visibility,transform",
            },
            0.16
          )
          .from(
            flowItems,
            {
              autoAlpha: 0,
              x: reverse ? -14 : 14,
              duration: 0.25,
              stagger: 0.04,
              ease: "power2.out",
            },
            0.3
          )
          .from(
            screenLabel,
            {
              y: 6,
              duration: 0.22,
              ease: "power2.out",
              immediateRender: false,
            },
            0.34
          )
          .from(
            screenThumbs,
            {
              y: 16,
              scale: 0.94,
              duration: 0.32,
              stagger: 0.045,
              ease: "power2.out",
              immediateRender: false,
            },
            0.38
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-10"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="work-heading mb-12">
          <h2
            className="text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Selected Project
          </h2>
        </div>

        <div className="work-list divide-y divide-neutral-200">
          {focusProjects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              onPreview={setPreview}
            />
          ))}
        </div>
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex cursor-default items-center justify-center bg-neutral-950/85 p-4">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={() => setPreview(null)}
            aria-label="Tutup preview gambar"
          />
          <button
            type="button"
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg transition hover:scale-105"
            onClick={() => setPreview(null)}
            aria-label="Tutup preview gambar"
          >
            <FiX className="h-5 w-5" />
          </button>
          <img
            src={preview.src}
            alt={preview.alt}
            className="relative z-10 max-h-[90vh] max-w-[92vw] rounded-[24px] bg-white object-contain opacity-100 shadow-2xl"
            style={{ filter: "none", imageRendering: "auto" }}
          />
        </div>
      )}
    </section>
  );
}

function ProjectRow({ project, index, onPreview }) {
  const copy = projectCopy[project.title];
  const shots = (project.pageImages || [])
    .filter((shot) => !(project.title === "Certix" && shot.title === "Welcome Screen"))
    .slice(0, 4);
  const reverse = index % 2 === 1;

  return (
    <article className="work-row py-10 first:pt-0 last:pb-0" data-reverse={reverse}>
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className={`project-visual ${reverse ? "lg:order-2" : ""}`}>
          <button
            type="button"
            onClick={() => onPreview({ src: project.image, alt: `${project.title} thumbnail` })}
            className="group block w-full overflow-hidden rounded-[24px] border border-neutral-200 bg-neutral-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
            aria-label={`Preview ${project.title}`}
          >
            <div className="aspect-[16/10] bg-neutral-100">
              <img
                src={project.image}
                alt={`${project.title} thumbnail`}
                className="project-hero-img h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                style={{ filter: "none", imageRendering: "auto" }}
              />
            </div>
          </button>

          {shots.length > 0 && (
            <ScreenPreviewRail project={project} shots={shots} onPreview={onPreview} />
          )}
        </div>

        <div className={`project-copy ${reverse ? "lg:order-1" : ""}`}>
          <div className="project-copy-bit flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            <span>{copy.eyebrow}</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span>{project.year}</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span>{project.category}</span>
          </div>

          <h3
            className="project-copy-bit mt-4 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {project.title}
          </h3>

          <p className="project-copy-bit mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600">
            {copy.description}
          </p>

          <div className="mt-5 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-[0.8fr_1.2fr]">
            <ProjectMeta label="Role" value={project.role} className="project-copy-bit" />
            <TechLogoRow techstack={project.techstack} />
          </div>

          <div className="mt-7">
            <span className="project-copy-bit block text-[11px] font-black uppercase tracking-[0.18em] text-neutral-400">
              Project Flow
            </span>
            <div className="mt-3 grid max-w-xl gap-2">
              {copy.flow.map((step, stepIndex) => (
                <div key={step} className="project-flow-item flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-[11px] font-black text-white">
                    {stepIndex + 1}
                  </span>
                  <span className="text-[14px] font-bold text-neutral-800">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="project-copy-bit mt-7 flex flex-wrap gap-3">
            {project.githubUrl && project.githubUrl !== "#" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-800"
              >
                <FiGithub className="h-4 w-4" />
                GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm font-bold text-neutral-900 transition hover:border-neutral-900"
              >
                Live Preview
                <FiExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ScreenPreviewRail({ project, shots, onPreview }) {
  const isMobileProject = project.category === "UI/UX";

  if (isMobileProject) {
    return (
      <div className="mt-3">
        <div className="project-screen-label mb-2 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-neutral-400">
            Preview
          </span>
          <span className="text-[10px] font-bold text-neutral-400">Tap to view</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {shots.map((shot) => (
            <button
              key={`${project.title}-${shot.title}`}
              type="button"
              onClick={() => onPreview({ src: shot.src, alt: `${project.title} - ${shot.title}` })}
              className="project-screen-thumb shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 transition hover:-translate-y-0.5 hover:border-neutral-500"
              aria-label={`Preview ${shot.title}`}
              title={shot.title}
            >
              <div className="aspect-[9/16] w-[86px] sm:w-[96px]">
                <img
                  src={shot.src}
                  alt={`${project.title} - ${shot.title}`}
                  className="h-full w-full object-cover"
                  style={{ filter: "none", imageRendering: "auto" }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div className="project-screen-label mb-2 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.16em] text-neutral-400">
          Preview
        </span>
        <span className="text-[10px] font-bold text-neutral-400">Tap to view</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {shots.slice(0, 3).map((shot) => (
          <button
            key={`${project.title}-${shot.title}`}
            type="button"
            onClick={() => onPreview({ src: shot.src, alt: `${project.title} - ${shot.title}` })}
            className="project-screen-thumb overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 transition hover:-translate-y-0.5 hover:border-neutral-500"
            aria-label={`Preview ${shot.title}`}
            title={shot.title}
          >
            <div className="aspect-[16/10]">
              <img
                src={shot.src}
                alt={`${project.title} - ${shot.title}`}
                className="h-full w-full object-cover"
                style={{ filter: "none", imageRendering: "auto" }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectMeta({ label, value, className = "" }) {
  return (
    <div className={className}>
      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-neutral-400">
        {label}
      </span>
      <p className="mt-1 text-[13px] font-bold text-neutral-900">{value}</p>
    </div>
  );
}

function TechLogoRow({ techstack = [], className = "" }) {
  const tools = techstack
    .map((name) => listTools.find((tool) => tool.nama.toLowerCase() === name.toLowerCase()))
    .filter(Boolean)
    .slice(0, 6);

  return (
    <div className={`project-tech-stack ${className}`.trim()}>
      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-neutral-400">
        Tech Stack
      </span>
      <div className="mt-2 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <div
            key={tool.id}
            title={tool.nama}
            className="project-tech-icon flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-50 p-2 ring-1 ring-neutral-200/70 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
          >
            <img
              src={tool.gambar}
              alt={tool.nama}
              className={`h-full w-full object-contain ${tool.nama.toLowerCase() === "gsap" ? "scale-125" : ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
