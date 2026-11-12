
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiArrowUpRight, FiCheck, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

import ProjectCard from "../projects/ProjectCard";
import "./ProjectsSection.css";

/* =========================================
   PROJECT DATA
========================================= */

const projects = [
  {
    id: "echo",
    number: "01",
    name: "Echo",
    category: "FULL-STACK WEB APPLICATION",
    status: "In progress",

    shortDescription:
      "A music-focused social diary for capturing life's moments through songs, moods, photos, and personal thoughts.",

    description:
      "Echo is a full-stack music diary and social platform where users capture everyday moments through a song, mood, photo, and personal thought. The application combines personal memories, social interaction, and music discovery in one experience.",

    features: [
      "Personalized music diary and social feed",
      "Spotify API integration and music playback",
      "Cloudinary image uploads and management",
      "JWT authentication and MySQL persistence",
    ],

    technologies: [
      "React",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "MySQL",
      "Cloudinary",
      "Spotify API",
    ],

    featuredTechnologies: [
      "React",
      "Redux Toolkit",
      "Node.js",
      "MySQL",
    ],

    githubUrl: "https://github.com/lenanasirov/echo",
    illustration: "echo",
  },

  {
    id: "sign-language",
    number: "02",
    name: "Sign Language Translator",
    category: "AI & COMPUTER VISION",
    status: "Completed",

    shortDescription:
      "A bidirectional translation system connecting Israeli Sign Language and Hebrew through video recognition and sign generation.",

    description:
      "A bidirectional translation system connecting Israeli Sign Language (ISL) and Hebrew. It combines computer vision and deep learning to recognize signing from video and support translation between signed and written communication.",

    features: [
      "ISL video-to-Hebrew text recognition",
      "Hebrew text-to-sign video generation",
      "MediaPipe hand and pose landmark extraction",
      "Attention-based sequence modeling",
    ],

    technologies: [
      "Python",
      "Flask",
      "Vue.js",
      "MediaPipe",
      "Machine Learning",
      "Computer Vision",
    ],

    featuredTechnologies: [
      "Vue.js",
      "Python",
      "Flask",
      "MediaPipe",
    ],

    results: [
      {
        value: "86%",
        label: "Single-word recognition",
      },
      {
        value: "87.6%",
        label: "Sentence translation",
      },
      {
        value: "100",
        label: "Project grade",
      },
    ],

    githubUrl:
      "https://github.com/Sign-language-translation/sign_language_translation",

    illustration: "sign-language",
  },
];

/* =========================================
   ANIMATION VARIANTS
========================================= */

const headingVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.97,
  },

  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.7,
      delay: 0.15 + index * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* =========================================
   PROJECT DETAILS MODAL
========================================= */

function ProjectDetailsModal({ project, onClose }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = Array.from(
        dialog.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [onClose]);

  const isCompleted = project.status === "Completed";

  return (
    <motion.div
      className="project-details-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        className="project-details-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-details-title"
        aria-describedby="project-details-description"
        initial={{
          opacity: 0,
          y: 24,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 16,
          scale: 0.98,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}

        <button
          ref={closeButtonRef}
          className="project-details-close"
          type="button"
          onClick={onClose}
          aria-label="Close project details"
        >
          <FiX aria-hidden="true" />
        </button>

        {/* Header */}

        <header className="project-details-header">
          <span className="project-details-kicker">
            PROJECT {project.number}

            <span
              className="project-details-kicker-line"
              aria-hidden="true"
            />

            FEATURED WORK
          </span>

          <h3 id="project-details-title">
            {project.name}
            <span
              className="project-details-title-dot"
              aria-hidden="true"
            >
              .
            </span>
          </h3>

          <span
            className={`project-status ${
              isCompleted
                ? "project-status-completed"
                : "project-status-progress"
            }`}
          >
            {isCompleted ? "COMPLETED" : "IN PROGRESS"}
          </span>
        </header>

        {/* Project overview */}

        <section className="project-details-overview">
          <span className="project-details-section-label">
            THE PROJECT
          </span>

          <p
            id="project-details-description"
            className="project-details-description"
          >
            {project.description}
          </p>
        </section>

        {/* Features and technologies */}

        <div className="project-details-columns">
          <section className="project-details-block">
            <h4>Key features</h4>

            <ul className="project-details-features">
              {project.features.map((feature) => (
                <li key={feature}>
                  <FiCheck aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="project-details-block project-details-stack">
            <h4>Technologies</h4>

            <div className="project-tech-list">
              {project.technologies.map((technology) => (
                <span key={technology}>
                  {technology}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Measurable results */}

        {project.results && project.results.length > 0 && (
          <section className="project-details-results-section">
            <h4>Project results</h4>

            <div className="project-results">
              {project.results.map((result) => (
                <div key={result.label}>
                  <strong>{result.value}</strong>
                  <span>{result.label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}

        <footer className="project-details-footer">
          <span className="project-details-footer-label">
            {project.category}
          </span>

          {project.githubUrl && (
            <a
              className="project-details-github"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub repository
              <FiArrowUpRight aria-hidden="true" />
            </a>
          )}
        </footer>
      </motion.div>
    </motion.div>
  );
}

/* =========================================
   PROJECTS SECTION
========================================= */

function ProjectsSection() {
  const [selectedProject, setSelectedProject] =
    useState(null);

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section
      className="portfolio-section projects-section"
      data-theme="dark"
      id="projects"
    >
      <div className="projects-decoration projects-decoration-top" />
      <div className="projects-decoration projects-decoration-bottom" />

      <div className="projects-content">
        {/* Section heading */}

        <motion.div
          className="projects-heading"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >
          <span className="projects-eyebrow">
            <span className="projects-status-dot" />
            A FEW THINGS I'VE BUILT
          </span>

          <h2>
            Turning ideas into <span>reality.</span>
          </h2>

          <p className="projects-subtitle">
            A collection of projects where creativity,
            problem-solving, and technology come together.
          </p>

          <span
            className="projects-heading-spark"
            aria-hidden="true"
          >
            ✳
          </span>
        </motion.div>

        {/* Project cards */}

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="project-card-motion-wrapper"
            >
              <ProjectCard
                project={project}
                onViewDetails={() =>
                  setSelectedProject(project)
                }
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Portal ensures full-screen modal overlay */}

      {createPortal(
        <AnimatePresence mode="wait">
          {selectedProject && (
            <ProjectDetailsModal
              key={selectedProject.id}
              project={selectedProject}
              onClose={closeModal}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}

export default ProjectsSection;
