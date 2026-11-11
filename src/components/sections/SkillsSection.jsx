
import { useEffect, useRef, useState } from "react";

import "devicon/devicon.min.css";
import "./SkillsSection.css";

import skillsIllustration from "../../assets/skills-illustration.png";

import {
  SiReact,
  SiVuedotjs,
  SiJavascript,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFlask,
  SiDocker,
} from "react-icons/si";

import { FaCode, FaCss3Alt, FaGitAlt } from "react-icons/fa";

const skillGroups = {
  left: [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
    { name: "C/C++", iconClass: "devicon-cplusplus-plain" },
  ],
  right: [
    { name: "Node.js", icon: SiNodedotjs, color: "#83CD29" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Express", icon: SiExpress, color: "#EAEAEA" },
    { name: "Flask", icon: SiFlask, color: "#EAEAEA" },
    { name: "MySQL", iconClass: "devicon-mysql-original" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "REST APIs", icon: FaCode, color: "#B9D1CC" },
  ],
};

function SkillBubble({ skill, index, side }) {
  const Icon = skill.icon;

  return (
    <div
      className={`skill-bubble skill-bubble-${side} skill-bubble-${index + 1}`}
      style={{
        "--reveal-delay": `${
          0.35 + index * 0.09 + (side === "right" ? 0.05 : 0)
        }s`,
        "--float-delay": `${(index % 4) * -0.7}s`,
      }}
    >
      {skill.iconClass ? (
        <i className={`skill-icon ${skill.iconClass}`} />
      ) : (
        <Icon
          className="skill-icon"
          style={{ color: skill.color }}
        />
      )}

      <span>{skill.name}</span>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      data-theme="dark"
      className={`portfolio-section skills-section ${
        isVisible ? "skills-visible" : ""
      }`}
    >
      <div className="skills-container">
        <div className="skills-heading">
          <span className="skills-eyebrow">
            <span className="skills-status-dot" />
            MY TOOLKIT
          </span>

          <h2 className="skills-title">
            The things I build with.
          </h2>

          <p className="skills-subtitle">
            From the interface to the logic behind it — the tools I work with.
          </p>
        </div>

        <div className="skills-stage">
          <div
            className="skills-background-effects"
            aria-hidden="true"
          >
            <span className="skills-sparkle sparkle-1">✦</span>
            <span className="skills-sparkle sparkle-2">✧</span>
            <span className="skills-sparkle sparkle-3">✦</span>
            <span className="skills-sparkle sparkle-4">✧</span>
          </div>

          <div className="skills-group skills-group-left">
            {skillGroups.left.map((skill, index) => (
              <SkillBubble
                key={skill.name}
                skill={skill}
                index={index}
                side="left"
              />
            ))}
          </div>

          <div className="skills-character-wrap">
            <img
              src={skillsIllustration}
              alt="Illustrated developer"
              className="skills-character"
            />
          </div>

          <div className="skills-group skills-group-right">
            {skillGroups.right.map((skill, index) => (
              <SkillBubble
                key={skill.name}
                skill={skill}
                index={index}
                side="right"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
