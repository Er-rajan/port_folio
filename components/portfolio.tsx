"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { about, certifications, education, experience, personalInfo, projects } from "@/lib/data";

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
  loading: () => <div className="h-80 w-full rounded-2xl bg-surface-muted" />
});

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 }
};

const navItems = ["About", "Experience", "Skills", "Projects", "Contact"];

const skillScores: Record<string, number> = {
  Python: 92,
  "Machine Learning": 88,
  NLP: 84,
  "Computer Vision": 78,
  "Generative AI": 82,
  PyTorch: 80,
  TensorFlow: 76,
  "Scikit-learn": 90,
  "AWS (S3, EC2)": 70,
  "GCP (BigQuery)": 64
};

export function PortfolioPage() {
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const lowPower = navigator.hardwareConcurrency <= 4;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShowScene(!lowPower && !reducedMotion);
  }, []);

  const topSkills = useMemo(
    () => Object.entries(skillScores).sort((a, b) => b[1] - a[1]),
    []
  );

  return (
    <main id="top" className="pb-20">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-surface/95 backdrop-blur">
        <div className="container-base flex items-center justify-between gap-4 py-4">
          <a href="#top" className="text-sm font-semibold tracking-[0.08em] text-muted hover:text-text">
            {personalInfo.name}
          </a>
          <nav className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted transition hover:text-text">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={`mailto:${personalInfo.email}`} className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] hover:border-accent">
              Get in touch
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="container-base section-space grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div variants={rise} initial="hidden" animate="show" transition={{ duration: 0.55 }}>
          <p className="text-sm uppercase tracking-[0.24em] text-accent">Software Engineer</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">{personalInfo.name}</h1>
          <p className="mt-3 text-xl text-muted md:text-2xl">{personalInfo.title}</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">{personalInfo.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-slate-900">
              View projects
            </a>
            <a href="#contact" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-accent">
              Contact
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={rise}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.08, duration: 0.55 }}
          className="overflow-hidden rounded-2xl border border-border/70 bg-surface-muted"
        >
          {showScene ? (
            <div className="h-80 md:h-[28rem]">
              <HeroScene />
            </div>
          ) : (
            <div className="flex h-80 items-center justify-center px-8 text-center text-sm text-muted md:h-[28rem]">
              3D hero preview is disabled on this device to keep performance smooth.
            </div>
          )}
        </motion.div>
      </section>

      <section id="about" className="container-base section-space border-t border-border/70">
        <h2 className="text-3xl font-semibold">About</h2>
        <p className="mt-5 max-w-4xl leading-relaxed text-muted">{about.summary}</p>
      </section>

      <section id="experience" className="container-base section-space border-t border-border/70">
        <h2 className="text-3xl font-semibold">Experience</h2>
        <div className="mt-8 space-y-4">
          {experience.map((item) => (
            <article key={`${item.company}-${item.period}`} className="rounded-2xl border border-border/70 bg-surface-muted p-5">
              <h3 className="text-xl font-semibold">{item.role}</h3>
              <p className="mt-1 text-sm text-muted">
                {item.company} | {item.location} | {item.period}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="container-base section-space border-t border-border/70">
        <h2 className="text-3xl font-semibold">Skills</h2>
        <p className="mt-3 text-sm text-muted">Core strengths and current proficiency</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {topSkills.map(([skill, score]) => (
            <article key={skill} className="rounded-xl border border-border/70 bg-surface-muted p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold">{skill}</h3>
                <span className="text-xs text-muted">{score}%</span>
              </div>
              <div className="h-2 rounded-full bg-border/60">
                <div className="h-full rounded-full bg-accent" style={{ width: `${score}%` }} />
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {Object.entries(about.skills).map(([group, items]) => (
            <article key={group} className="rounded-xl border border-border/70 bg-surface-muted p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">{group}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{items.join(" • ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="container-base section-space border-t border-border/70">
        <h2 className="text-3xl font-semibold">Projects</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="rounded-2xl border border-border/70 bg-surface-muted p-5">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
              <p className="mt-2 text-sm text-muted">{project.impact}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.1em] text-accent">{project.stack.join(" • ")}</p>
              <div className="mt-4 flex gap-3">
                {project.links.map((link) => (
                  <a key={link.label} href={link.href} className="text-sm font-medium text-accent hover:underline">
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="container-base section-space border-t border-border/70">
        <h2 className="text-3xl font-semibold">Contact</h2>
        <p className="mt-4 max-w-2xl text-muted">I have got just what you need. Let&apos;s talk.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`mailto:${personalInfo.email}`} className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent">
            {personalInfo.email}
          </a>
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent">
            GitHub
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent">
            LinkedIn
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {education.map((item) => (
            <article key={`${item.institution}-${item.degree}`} className="rounded-xl border border-border/70 bg-surface-muted p-4">
              <h3 className="font-semibold">{item.degree}</h3>
              <p className="mt-1 text-sm text-muted">{item.institution}</p>
              <p className="mt-1 text-xs text-muted">{item.meta}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-border/70 bg-surface-muted p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">Certifications</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
