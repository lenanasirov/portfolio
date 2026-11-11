
import { motion } from "motion/react";
import {
  FiAward,
  FiBookOpen,
  FiUsers,
  FiMonitor,
} from "react-icons/fi";

import {FaAward} from "react-icons/fa";

import educationIllustration from "../../assets/education-illustration.png";
import idfIllustration from "../../assets/idf-illustration.png";

import "./ExperienceSection.css";

const experiences = [
  {
    id: "education",
    period: "2021 — 2025",
    type: "EDUCATION",
    title: "B.Sc. Software and Information Systems Engineering",
    organization: "Ben-Gurion University of the Negev",
    illustration: educationIllustration,
    illustrationAlt: "Graduation illustration",
    icon: FiBookOpen,
    highlights: [
      {
        icon: FaAward,
        title: "",
        description:
          "GPA: 87 · Certificate of Excellence · Certificate of Recognition (final year).",
      },
    ],
    coursework: [
      "Data Structures",
      "Algorithms",
      "Databases",
      "Web Development",
      "Artificial Intelligence",
      "Machine Learning",
    ],
  },
  {
    id: "idf",
    period: "2016 — 2018",
    type: "PROFESSIONAL EXPERIENCE",
    title:
      "Courseware Developer & Head of Development Training Tools Team",
    organization: "Israel Defense Forces",
    illustration: idfIllustration,
    illustrationAlt: "Military uniform illustration",
    icon: FiUsers,
    highlights: [
      {
        icon: FiUsers,
        title: "Team leadership",
        description:
          "Managed a team of courseware developers and photographers.",
      },
      {
        icon: FiMonitor,
        title: "Interactive application development",
        description:
          "Designed and built interactive training applications.",
      },
      {
        icon: FiBookOpen,
        title: "Cross-functional collaboration",
        description:
          "Worked with content experts to create intuitive learning experiences.",
      },
    ],
  },
];

function ExperienceSection() {
  return (
    <section
      className="portfolio-section experience-section"
      data-theme="dark"
      id="experience"
    >
      <div className="experience-content">
        <motion.div
          className="experience-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="experience-eyebrow">
            THE JOURNEY SO FAR
          </span>

          <h2>
            Experience <span>&amp;</span> Education
          </h2>

          <p>
            The experiences and education that shaped how I build
            software today.
          </p>
        </motion.div>

        <div className="experience-timeline">
          {experiences.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                className={`experience-item experience-item-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
              >
                <div className="experience-timeline-marker">
                  <div className="experience-marker-icon">
                    <Icon />
                  </div>
                </div>

                <div className="experience-card">
                  <div className="experience-card-layout">
                    <div className="experience-card-main">
                      <div className="experience-card-top">
                        <span className="experience-type">
                          {item.type}
                        </span>

                        <span className="experience-period">
                          {item.period}
                        </span>
                      </div>

                      <h3>{item.title}</h3>

                      <p className="experience-organization">
                        {item.organization}
                      </p>

                      <div className="experience-highlights">
                        {item.highlights.map((highlight) => {
                          const HighlightIcon = highlight.icon;

                          return (
                            <div
                              className="experience-highlight"
                              key={highlight.description}
                            >
                              <div className="experience-highlight-icon">
                                <HighlightIcon />
                              </div>

                              <div className="experience-highlight-content">
                                {highlight.title && (
                                  <h4>{highlight.title}</h4>
                                )}

                                <p>{highlight.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {item.coursework && (
                        <div className="experience-coursework">
                          <h4>SELECTED COURSEWORK</h4>

                          <div className="experience-tags">
                            {item.coursework.map((course) => (
                              <span key={course}>{course}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="experience-illustration">
                      <div className="experience-illustration-glow" />

                      <img
                        src={item.illustration}
                        alt={item.illustrationAlt}
                        className="experience-character"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
