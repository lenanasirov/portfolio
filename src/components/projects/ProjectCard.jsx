
import { useState } from "react";
import { FiEye, FiGithub } from "react-icons/fi";

import echoIllustration from "../../assets/echo-illustration.png";
import signLanguageIllustration from "../../assets/sign-language-illustration.png";

function ProjectCard({ project, onViewDetails }) {
  const [showInfo, setShowInfo] = useState(false);

  const illustration =
    project.illustration === "echo"
      ? echoIllustration
      : signLanguageIllustration;

  const isCompleted = project.status === "Completed";

  const technologies =
    project.featuredTechnologies ||
    project.technologies.slice(0, 4);

  const toggleInfo = () => {
    setShowInfo((current) => !current);
  };

  const handleCardKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleInfo();
    }
  };

  return (
    <article
      className={`project-card project-card-${project.illustration} ${
        showInfo ? "project-card-info-visible" : ""
      }`}
      tabIndex={0}
      aria-label={`${
        showInfo ? "Hide" : "Show"
      } information about ${project.name}`}
      aria-expanded={showInfo}
      onClick={toggleInfo}
      onKeyDown={handleCardKeyDown}
    >
      <div className="project-card-header">
        <div className="project-card-title">
          <span
            className={`project-status ${
              isCompleted
                ? "project-status-completed"
                : "project-status-progress"
            }`}
          >
            {isCompleted ? "COMPLETED" : "IN PROGRESS"}
          </span>

          <h3>{project.name}</h3>
        </div>
      </div>

      <div className="project-card-illustration">
        <div
          className="project-illustration-blob"
          aria-hidden="true"
        />

        <div
          className="project-illustration-sparkle"
          aria-hidden="true"
        >
          ✦
        </div>

        <img
          className="project-card-image"
          src={illustration}
          alt={`${project.name} illustration`}
          draggable="false"
        />

        <div className="project-card-info">
          <div className="project-info-description">
            <p>{project.shortDescription}</p>
          </div>

          <div className="project-info-technologies">
            <div className="project-hover-technologies">
              {technologies.map((technology) => (
                <span key={technology}>
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="project-card-actions">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onViewDetails();
            }}
            className="project-icon-button"
            aria-label={`View ${project.name} details`}
            title="View project details"
            type="button"
          >
            <FiEye aria-hidden="true" />
          </button>

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="project-icon-button"
              aria-label={`View ${project.name} on GitHub`}
              title="View on GitHub"
              onClick={(event) => event.stopPropagation()}
            >
              <FiGithub aria-hidden="true" />
            </a>
          ) : (
            <button
              className="project-icon-button project-button-disabled"
              disabled
              aria-label="GitHub repository link unavailable"
              title="Repository link will be added later"
              type="button"
            >
              <FiGithub aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
