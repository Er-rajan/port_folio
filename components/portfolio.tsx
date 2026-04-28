"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { about, certifications, education, experience, personalInfo, projects } from "@/lib/data";

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
  loading: () => <div className="h-72 w-full rounded-2xl border border-border/70 bg-surface/40" />
});

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
};

export function PortfolioPage() {
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const lowPower = navigator.hardwareConcurrency <= 4;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShowScene(!lowPower && !reducedMotion);
  }, []);

  return (
    <main>
      <header className="container-base sticky top-0 z-30 flex items-center justify-between py-5 backdrop-blur">
        <a href="#top" className="text-sm font-medium tracking-wide text-muted hover:text-text">
          {personalInfo.name}
        </a>
        <ThemeToggle />
      </header>

      <section id="top" className="container-base section-space grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div variants={rise} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
          <p className="mb-4 text-sm uppercase tracking-[0.18em] text-accent">Open to AI/ML opportunities</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">{personalInfo.name}</h1>
          <p className="mt-3 text-xl text-muted md:text-2xl">{personalInfo.title}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">{personalInfo.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:opacity-90"
            >
              View Projects
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={rise}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.12, duration: 0.6 }}
          className="h-72 overflow-hidden rounded-2xl border border-border/70 bg-surface/50 shadow-soft md:h-96"
        >
          {showScene ? (
            <HeroScene />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">3D preview disabled for this device</div>
          )}
        </motion.div>
      </section>

      <section id="about" className="container-base section-space border-t border-border/60">
        <h2 className="text-2xl font-semibold md:text-3xl">About</h2>
        <p className="mt-5 max-w-4xl leading-relaxed text-muted">{about.summary}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {Object.entries(about.skills).map(([group, items]) => (
            <div key={group} className="rounded-xl border border-border/70 bg-surface/60 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">{group}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{items.join(" • ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="container-base section-space border-t border-border/60">
        <h2 className="text-2xl font-semibold md:text-3xl">Projects</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <motion.article
              key={project.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-border/70 bg-surface/60 p-5"
            >
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
              <p className="mt-2 text-sm text-muted">{project.impact}</p>
              <p className="mt-4 text-xs uppercase tracking-wide text-accent">{project.stack.join(" • ")}</p>
              <div className="mt-4 flex gap-3">
                {project.links.map((link) => (
                  <a key={link.label} href={link.href} className="text-sm font-medium text-accent hover:underline">
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="experience" className="container-base section-space border-t border-border/60">
        <h2 className="text-2xl font-semibold md:text-3xl">Experience</h2>
        <div className="mt-8 space-y-6 border-l border-border/70 pl-6">
          {experience.map((item) => (
            <div key={`${item.company}-${item.period}`} className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-accent" />
              <h3 className="text-lg font-semibold">{item.role}</h3>
              <p className="text-sm text-muted">
                {item.company} | {item.location} | {item.period}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="education" className="container-base section-space border-t border-border/60">
        <h2 className="text-2xl font-semibold md:text-3xl">Education</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {education.map((item) => (
            <article key={`${item.institution}-${item.degree}`} className="rounded-xl border border-border/70 bg-surface/60 p-4">
              <h3 className="font-semibold">{item.degree}</h3>
              <p className="mt-1 text-sm text-muted">{item.institution}</p>
              <p className="mt-1 text-xs text-muted">{item.meta}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-border/70 bg-surface/60 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Certifications</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="container-base section-space border-t border-border/60">
        <h2 className="text-2xl font-semibold md:text-3xl">Contact</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Interested in collaborating on AI/ML products, intelligent automation, or data-driven platforms? Let’s connect.
        </p>
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

        <form className="mt-8 grid max-w-2xl gap-3" action={`mailto:${personalInfo.email}`} method="post" encType="text/plain">
          <input
            required
            name="name"
            placeholder="Your name"
            className="rounded-lg border border-border bg-transparent px-4 py-3 text-sm outline-none ring-accent/40 transition focus:ring"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Your email"
            className="rounded-lg border border-border bg-transparent px-4 py-3 text-sm outline-none ring-accent/40 transition focus:ring"
          />
          <textarea
            required
            name="message"
            rows={5}
            placeholder="Your message"
            className="rounded-lg border border-border bg-transparent px-4 py-3 text-sm outline-none ring-accent/40 transition focus:ring"
          />
          <button type="submit" className="w-fit rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-slate-900">
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
